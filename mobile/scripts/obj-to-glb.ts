/**
 * 102 FreeSurfer .obj surfaces → one assets/brain.glb with one mesh per region.
 *
 * Runs once at build time, so the encoder may use anything (meshoptimizer's
 * simplifier is WASM). The output relies only on KHR_mesh_quantization, which
 * Three's GLTFLoader reads without a decoder — Hermes has no WebAssembly, so
 * Draco and meshopt are not options on the phone.
 *
 * Files are grouped by lib/brain-regions.ts and joined into one primitive per
 * region, plus one for the unassigned slivers: 50 draw calls instead of 102,
 * and draw calls are what the expo-gl bridge charges for. Every node and mesh
 * carries extras.regionId (null for unassigned); the viewer never trusts node
 * names because GLTFLoader strips dots and slashes from them.
 *
 * Winding is left alone: the closed subcortical meshes all face outward and the
 * cortical patches are cut from one consistently wound pial surface, so the
 * viewer can cull back faces.
 *
 * Normals are computed here, not with gltf-transform's normals(): that helper
 * only produces flat normals and unwelds every triangle, which tripled the
 * vertex count and the file size.
 *
 * usage: node scripts/obj-to-glb.ts [ratio=0.25] [error=0.01]   (Node ≥ 23 strips the types)
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Document, NodeIO, type Primitive } from "@gltf-transform/core";
import { KHRMeshQuantization } from "@gltf-transform/extensions";
import { dedup, joinPrimitives, prune, quantize, simplify, weld } from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";
import { buildMeshToRegionMap } from "../../lib/brain-regions.ts";

const here = fileURLToPath(new URL(".", import.meta.url));
const MESH_ROOT = join(here, "../../public/brain-meshes");
const OUT = join(here, "../assets/brain.glb");
const UNASSIGNED = "unassigned";
const RATIO = Number(process.argv[2] ?? 0.25);
const ERROR = Number(process.argv[3] ?? 0.01);
if (!(RATIO > 0 && RATIO <= 1)) throw new Error(`ratio must be in (0,1]: ${RATIO}`);
if (!(ERROR > 0 && ERROR < 1)) throw new Error(`error must be in (0,1): ${ERROR}`);

interface ObjGeometry {
  readonly positions: Float32Array;
  readonly indices: Uint32Array;
}

/** Plain "v x y z" / "f a b c" files; fans any polygon with more than 3 verts. */
function parseObj(text: string): ObjGeometry {
  const positions: number[] = [];
  const indices: number[] = [];
  for (const line of text.split("\n")) {
    if (line.startsWith("v ")) {
      const [, x, y, z] = line.trim().split(/\s+/);
      positions.push(+x, +y, +z);
    } else if (line.startsWith("f ")) {
      const verts = line
        .trim()
        .split(/\s+/)
        .slice(1)
        .map((t) => parseInt(t.split("/")[0], 10) - 1);
      for (let i = 1; i + 1 < verts.length; i++) {
        indices.push(verts[0], verts[i], verts[i + 1]);
      }
    }
  }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
}

/** Area-weighted smooth normals. Run while POSITION is still float32. */
function smoothNormals(positions: Float32Array, indices: Uint32Array): Float32Array {
  const n = new Float32Array(positions.length);
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3;
    const b = indices[i + 1] * 3;
    const c = indices[i + 2] * 3;
    const abx = positions[b] - positions[a];
    const aby = positions[b + 1] - positions[a + 1];
    const abz = positions[b + 2] - positions[a + 2];
    const acx = positions[c] - positions[a];
    const acy = positions[c + 1] - positions[a + 1];
    const acz = positions[c + 2] - positions[a + 2];
    const nx = aby * acz - abz * acy;
    const ny = abz * acx - abx * acz;
    const nz = abx * acy - aby * acx;
    for (const v of [a, b, c]) {
      n[v] += nx;
      n[v + 1] += ny;
      n[v + 2] += nz;
    }
  }
  for (let v = 0; v < n.length; v += 3) {
    const len = Math.hypot(n[v], n[v + 1], n[v + 2]) || 1;
    n[v] /= len;
    n[v + 1] /= len;
    n[v + 2] /= len;
  }
  return n;
}

const files = readdirSync(MESH_ROOT)
  .filter((d) => statSync(join(MESH_ROOT, d)).isDirectory())
  .flatMap((dir) =>
    readdirSync(join(MESH_ROOT, dir))
      .filter((f) => f.endsWith(".obj"))
      .map((f) => `${dir}/${f}`),
  );
if (files.length === 0) throw new Error(`no .obj files under ${MESH_ROOT}`);

const fileToRegion = buildMeshToRegionMap();
const groups = new Map<string, readonly string[]>();
for (const file of files) {
  const key = fileToRegion.get(file) ?? UNASSIGNED;
  groups.set(key, [...(groups.get(key) ?? []), file]);
}

const doc = new Document();
const buffer = doc.createBuffer();
const scene = doc.createScene("brain");
let trisIn = 0;

function loadPrimitive(file: string): Primitive {
  const { positions, indices } = parseObj(readFileSync(join(MESH_ROOT, file), "utf8"));
  if (positions.length === 0 || indices.length === 0) {
    throw new Error(`${file}: parsed to empty geometry`);
  }
  trisIn += indices.length / 3;
  const pos = doc.createAccessor().setType("VEC3").setArray(positions).setBuffer(buffer);
  const idx = doc.createAccessor().setType("SCALAR").setArray(indices).setBuffer(buffer);
  return doc.createPrimitive().setAttribute("POSITION", pos).setIndices(idx);
}

for (const [key, groupFiles] of groups) {
  const parts = groupFiles.map(loadPrimitive);
  const prim = parts.length === 1 ? parts[0] : joinPrimitives(parts);
  if (parts.length > 1) for (const part of parts) part.dispose();
  const extras = { regionId: key === UNASSIGNED ? null : key };
  const mesh = doc.createMesh(key).addPrimitive(prim).setExtras(extras);
  scene.addChild(doc.createNode(key).setMesh(mesh).setExtras(extras));
}

await MeshoptSimplifier.ready;
await doc.transform(
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio: RATIO, error: ERROR }),
);

for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    const idx = prim.getIndices();
    const pos = prim.getAttribute("POSITION");
    if (!idx || !pos) throw new Error(`${mesh.getName()}: lost its index or position buffer`);
    const normals = smoothNormals(pos.getArray() as Float32Array, idx.getArray() as Uint32Array);
    prim.setAttribute(
      "NORMAL",
      doc.createAccessor().setType("VEC3").setArray(normals).setBuffer(buffer),
    );
  }
}

await doc.transform(quantize(), dedup(), prune());

const io = new NodeIO().registerExtensions([KHRMeshQuantization]);
writeFileSync(OUT, await io.writeBinary(doc));

let trisOut = 0;
for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    trisOut += (prim.getIndices()?.getCount() ?? 0) / 3;
  }
}
const meshes = doc.getRoot().listMeshes().length;
const tagged = doc.getRoot().listNodes().filter((n) => "regionId" in n.getExtras()).length;
if (meshes !== groups.size || tagged !== groups.size) {
  throw new Error(`expected ${groups.size} meshes/nodes, got ${meshes} meshes and ${tagged} tagged nodes`);
}
process.stdout.write(
  `${files.length} files → ${meshes} meshes · tris ${trisIn} → ${trisOut} (${Math.round((trisOut / trisIn) * 100)}%) · ${(statSync(OUT).size / 1e6).toFixed(2)} MB\n`,
);

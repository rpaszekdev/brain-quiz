/**
 * 102 FreeSurfer .obj surfaces → one assets/brain.glb.
 *
 * Runs once at build time, so the encoder may use anything (meshoptimizer's
 * simplifier is WASM). The output relies only on KHR_mesh_quantization, which
 * Three's GLTFLoader reads without a decoder — Hermes has no WebAssembly, so
 * Draco and meshopt are not options on the phone.
 *
 * Every node carries extras.meshFile = "<dir>/<file>.obj", the same key
 * lib/brain-regions.ts uses, so the viewer maps meshes to regions without
 * trusting node names (GLTFLoader strips dots and slashes from those).
 *
 * Normals are computed here, not with gltf-transform's normals(): that helper
 * only produces flat normals and unwelds every triangle, which tripled the
 * vertex count and the file size.
 *
 * usage: node scripts/obj-to-glb.mjs [ratio=0.4] [error=0.005]
 */
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { Document, NodeIO } from "@gltf-transform/core";
import { KHRMeshQuantization } from "@gltf-transform/extensions";
import { dedup, prune, quantize, simplify, weld } from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";

const here = fileURLToPath(new URL(".", import.meta.url));
const MESH_ROOT = join(here, "../../public/brain-meshes");
const OUT = join(here, "../assets/brain.glb");
const RATIO = Number(process.argv[2] ?? 0.4);
const ERROR = Number(process.argv[3] ?? 0.005);
if (!(RATIO > 0 && RATIO <= 1)) throw new Error(`ratio must be in (0,1]: ${RATIO}`);
if (!(ERROR > 0 && ERROR < 1)) throw new Error(`error must be in (0,1): ${ERROR}`);

/** Plain "v x y z" / "f a b c" files; fans any polygon with more than 3 verts. */
function parseObj(text) {
  const positions = [];
  const indices = [];
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
  return {
    positions: new Float32Array(positions),
    indices: new Uint32Array(indices),
  };
}

/** Area-weighted smooth normals. Run while POSITION is still float32. */
function smoothNormals(positions, indices) {
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

const doc = new Document();
const buffer = doc.createBuffer();
const scene = doc.createScene("brain");
let trisIn = 0;

for (const file of files) {
  const { positions, indices } = parseObj(readFileSync(join(MESH_ROOT, file), "utf8"));
  if (positions.length === 0 || indices.length === 0) {
    throw new Error(`${file}: parsed to empty geometry`);
  }
  trisIn += indices.length / 3;

  const pos = doc.createAccessor().setType("VEC3").setArray(positions).setBuffer(buffer);
  const idx = doc.createAccessor().setType("SCALAR").setArray(indices).setBuffer(buffer);
  const prim = doc.createPrimitive().setAttribute("POSITION", pos).setIndices(idx);
  const safe = file.replace(/[^A-Za-z0-9]+/g, "_");
  const mesh = doc.createMesh(safe).addPrimitive(prim).setExtras({ meshFile: file });
  scene.addChild(doc.createNode(safe).setMesh(mesh).setExtras({ meshFile: file }));
}

await MeshoptSimplifier.ready;
await doc.transform(
  weld(),
  simplify({ simplifier: MeshoptSimplifier, ratio: RATIO, error: ERROR }),
);

for (const mesh of doc.getRoot().listMeshes()) {
  for (const prim of mesh.listPrimitives()) {
    const idx = prim.getIndices();
    if (!idx) throw new Error(`${mesh.getName()}: lost its index buffer`);
    const normals = smoothNormals(prim.getAttribute("POSITION").getArray(), idx.getArray());
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
    trisOut += prim.getIndices().getCount() / 3;
  }
}
const tagged = doc.getRoot().listNodes().filter((n) => n.getExtras().meshFile).length;
if (tagged !== files.length) {
  throw new Error(`extras lost: ${tagged}/${files.length} nodes tagged`);
}
process.stdout.write(
  `${files.length} meshes · tris ${trisIn} → ${trisOut} (${Math.round((trisOut / trisIn) * 100)}%) · ${(statSync(OUT).size / 1e6).toFixed(2)} MB\n`,
);

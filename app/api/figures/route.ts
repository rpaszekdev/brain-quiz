import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Dev-only sink for the figure capture at /render?mode=shots.
 *
 * The browser alternative is showDirectoryPicker(), which needs a native OS
 * dialog and so cannot be driven by a script; the other alternative is 48
 * downloads to land in ~/Downloads and be moved by hand. Writing straight to
 * public/figures keeps the capture one click and repeatable.
 *
 * Returns 404 outside development so it cannot exist in production, where an
 * unauthenticated write endpoint would be an arbitrary file write.
 */
export async function POST(request: Request): Promise<Response> {
  if (process.env.NODE_ENV !== "development") {
    return new Response("Not found", { status: 404 });
  }

  const name = new URL(request.url).searchParams.get("name") ?? "";
  // Slug plus extension only: no separators, no dots, nothing that can climb
  // out of public/figures even though this never runs in production.
  if (!/^[a-z0-9-]{1,64}\.webp$/.test(name)) {
    return new Response(`Bad figure name: ${name}`, { status: 400 });
  }

  const body = new Uint8Array(await request.arrayBuffer());
  if (body.byteLength === 0) {
    return new Response("Empty body", { status: 400 });
  }

  const dir = join(process.cwd(), "public", "figures");
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, name), body);

  return Response.json({ name, bytes: body.byteLength });
}

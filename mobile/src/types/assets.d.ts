/** Metro turns asset imports into numeric module ids; expo-asset resolves them. */
declare module "*.glb" {
  const assetId: number;
  export default assetId;
}

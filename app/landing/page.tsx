import { redirect } from "next/navigation";

/**
 * The landing IS the home page now. This route only exists so the /landing
 * URL used while the design was in review does not 404 for anyone holding it.
 */
export default function LandingRedirect() {
  redirect("/");
}

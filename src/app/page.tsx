import { redirect } from "next/navigation";

/** Laravel: Route::get('/') -> redirect()->route('welcome') */
export default function Home() {
  redirect("/qr-menu");
}

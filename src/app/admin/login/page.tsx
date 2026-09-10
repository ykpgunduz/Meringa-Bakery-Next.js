import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/admin-login.css";
import { readFlash } from "@/lib/session";
import FlashCleanup from "@/components/FlashCleanup";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Giriş - Meringa QR Menu",
};

/** Laravel: resources/views/admin/login.blade.php */
export default async function AdminLoginPage() {
  const flash = await readFlash();

  return (
    <div className="page-admin-login">
      {flash && <FlashCleanup />}
      <div className="login-container">
        <div className="login-header">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/meringa.png" alt="Meringa" className="img-fluid" />
          <h4 className="mb-0">Yönetim Paneli</h4>
        </div>

        <div className="login-body">
          <LoginForm
            flashMessage={flash?.type === "success" ? flash.message : null}
          />

          <hr className="my-4" />

          <div className="text-center">
            <a href="/qr-menu" className="qr-link">
              <i className="fas fa-qrcode me-2" />
              QR Menüyü Görüntüle
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

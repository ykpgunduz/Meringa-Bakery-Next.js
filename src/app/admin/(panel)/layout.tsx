import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/styles/admin-layout.css";
import AdminSidebar from "./AdminSidebar";

/** Laravel: resources/views/admin/layout.blade.php */
export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-shell">
      <div className="container-fluid p-0">
        <div className="row g-0">
          <AdminSidebar />

          {/* Main content */}
          <main className="col-md-9 ms-sm-auto col-lg-10 main-content">
            <div className="p-3 p-md-4">{children}</div>
          </main>

          <div className="ad-bar">
            <div className="ad-content harpy-ad">
              <a
                href="https://harpysocial.com"
                target="_blank"
                rel="noopener"
                className="harpy-link"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/img/harpy-credit.png"
                  alt="Harpy Social"
                  className="harpy-credit"
                  loading="lazy"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { logoutAction } from "../actions";

/** layout.blade.php içindeki sidebar + mobil menü davranışının karşılığı. */
export default function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const hideSidebar = useCallback(() => {
    setOpen(false);
    document.body.style.overflow = "";
  }, []);

  const showSidebar = useCallback(() => {
    setOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  // Pencere büyüdüğünde mobil menüyü kapat
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) hideSidebar();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hideSidebar]);

  useEffect(() => () => {
    document.body.style.overflow = "";
  }, []);

  const isDashboard = pathname === "/admin";
  const isProducts = pathname.startsWith("/admin/products");
  const isCategories = pathname.startsWith("/admin/categories");

  const onNavClick = () => {
    if (window.innerWidth < 768) hideSidebar();
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="d-md-none mobile-header">
        <div className="d-flex justify-content-center align-items-center position-relative">
          <button
            className="btn btn-link text-white position-absolute start-0 ms-3"
            id="sidebarToggle"
            style={{ zIndex: 2 }}
            onClick={showSidebar}
            aria-label="Menüyü aç"
          >
            <i className="fas fa-bars fa-lg" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/meringa.png" alt="Meringa" style={{ height: "75px" }} />
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`sidebar-overlay${open ? " show" : ""}`}
        id="sidebarOverlay"
        onClick={hideSidebar}
      />

      {/* Sidebar */}
      <nav
        className={`col-md-3 col-lg-2 d-md-block sidebar${open ? " show" : ""}`}
        id="sidebar"
      >
        <div className="position-sticky pt-0">
          {/* Desktop Brand */}
          <div className="sidebar-brand d-none d-md-block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/meringa.png"
              alt="Meringa"
              style={{ maxHeight: "100px" }}
            />
            <h5 className="sidebar-brand-title">Yönetim Paneli</h5>
            <small className="sidebar-brand-subtitle">Meringa QR Menu</small>
          </div>

          {/* Mobile close button */}
          <div className="d-md-none">
            <button
              className="sidebar-close-btn text-white"
              id="sidebarClose"
              onClick={hideSidebar}
              aria-label="Menüyü kapat"
            >
              <i className="fas fa-times" />
            </button>
            <div className="text-center pt-4 pb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/img/meringa.png"
                alt="Meringa"
                style={{
                  maxHeight: "100px",
                  marginBottom: "15px",
                  filter: "brightness(1.1)",
                }}
              />
              <h6 className="text-white mt-0 mb-2 fw-bold">Yönetim Paneli</h6>
              <small
                className="text-white-50"
                style={{
                  fontSize: "11px",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                }}
              >
                Meringa QR Menu
              </small>
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className="nav flex-column mt-2">
            <li className="nav-item">
              <Link
                className={`nav-link${isDashboard ? " active" : ""}`}
                href="/admin"
                onClick={onNavClick}
              >
                <i className="fas fa-house" />
                Anasayfa
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${isProducts ? " active" : ""}`}
                href="/admin/products"
                onClick={onNavClick}
              >
                <i className="fas fa-cube" />
                Ürünler
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link${isCategories ? " active" : ""}`}
                href="/admin/categories"
                onClick={onNavClick}
              >
                <i className="fas fa-layer-group" />
                Kategoriler
              </Link>
            </li>
          </ul>

          <hr className="sidebar-divider" />

          <div className="nav-item">
            <a
              className="nav-link external-link"
              href="/qr-menu"
              target="_blank"
              rel="noopener"
              onClick={onNavClick}
            >
              <i className="fas fa-external-link-alt" />
              Menüyü Görüntüle
            </a>
          </div>

          <hr className="sidebar-divider" />

          <div className="nav-item mt-2">
            <form action={logoutAction} className="w-100">
              <button type="submit" className="logout-btn text-white">
                <i className="fas fa-sign-out-alt" />
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

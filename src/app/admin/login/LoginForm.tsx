"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { loginAction } from "../actions";
import { EMPTY_FORM_STATE } from "@/lib/form-state";
import DismissibleAlert from "@/components/DismissibleAlert";

export default function LoginForm({
  flashMessage,
}: {
  flashMessage: string | null;
}) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    EMPTY_FORM_STATE
  );
  const [showPassword, setShowPassword] = useState(false);
  const usernameRef = useRef<HTMLInputElement>(null);

  // Otomatik odaklanma (login.blade.php)
  useEffect(() => {
    usernameRef.current?.focus();
  }, []);

  return (
    <>
      {flashMessage && (
        <DismissibleAlert variant="success">
          <i className="fas fa-check-circle me-2" />
          {flashMessage}
        </DismissibleAlert>
      )}

      {state.errors.length > 0 && (
        <DismissibleAlert variant="danger">
          <i className="fas fa-exclamation-circle me-2" />
          {state.errors[0]}
        </DismissibleAlert>
      )}

      <form action={formAction}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            <i className="fas fa-user me-2" />
            Kullanıcı Adı
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-user" />
            </span>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              ref={usernameRef}
              required
              autoComplete="username"
              placeholder="Kullanıcı adınızı girin"
            />
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="form-label">
            <i className="fas fa-lock me-2" />
            Şifre
          </label>
          <div className="input-group">
            <span className="input-group-text">
              <i className="fas fa-lock" />
            </span>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Şifrenizi girin"
            />
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="togglePassword"
              onClick={() => setShowPassword((value) => !value)}
            >
              <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-login btn-primary w-100"
          disabled={pending}
        >
          <i className="fas fa-sign-in-alt me-2" />
          Giriş Yap
        </button>
      </form>
    </>
  );
}

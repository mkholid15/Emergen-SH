import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLang } from "../context/LangContext";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { formatApiError } from "../lib/api";
import { toast } from "sonner";
import { Factory, ArrowRight } from "lucide-react";

// REMINDER: DO NOT HARDCODE THE URL, OR ADD ANY FALLBACKS OR REDIRECT URLS, THIS BREAKS THE AUTH
export default function Login() {
  const { user, login } = useAuth();
  const { t, lang, setLang } = useLang();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await login(email.trim(), password);
      toast.success(t("welcome_back"));
    } catch (err) {
      toast.error(formatApiError(err) || t("invalid_login"));
    } finally {
      setSubmitting(false);
    }
  };

  const googleLogin = () => {
    const redirect = window.location.origin + "/dashboard";
    window.location.href = `https://auth.emergentagent.com/?redirect=${encodeURIComponent(redirect)}`;
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Left: Hero */}
      <div className="relative hidden lg:flex flex-col justify-between p-10 overflow-hidden bg-zinc-950 text-zinc-100">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1717386255773-1e3037c81788?crop=entropy&cs=srgb&fm=jpg&q=85&w=1600')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950/80 via-zinc-950/60 to-zinc-950/90" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-9 w-9 border border-zinc-100 grid place-items-center">
            <Factory className="h-5 w-5" />
          </div>
          <div>
            <div className="font-semibold tracking-tight">{t("app_name")}</div>
            <div className="label-caps text-zinc-400">{t("tagline")}</div>
          </div>
        </div>
        <div className="relative z-10 space-y-4">
          <div className="label-caps text-zinc-400">Operations · Line 01</div>
          <h1 className="text-4xl xl:text-5xl font-semibold tracking-tight leading-tight">
            Real-time production intelligence.<br />
            <span className="text-zinc-400">From shopfloor to spreadsheet.</span>
          </h1>
          <div className="grid grid-cols-3 gap-4 pt-6 max-w-md">
            {[
              { k: "OEE", v: "87.4%" },
              { k: "SHIFT", v: "S2" },
              { k: "UPTIME", v: "94.1%" },
            ].map((s) => (
              <div key={s.k} className="border border-zinc-700 p-3">
                <div className="label-caps text-zinc-500">{s.k}</div>
                <div className="font-mono text-lg mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative z-10 label-caps text-zinc-500">© Momogi · Production Control</div>
      </div>

      {/* Right: Form */}
      <div className="flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-between mb-8">
            <div className="lg:hidden flex items-center gap-2">
              <div className="h-8 w-8 border border-border grid place-items-center">
                <Factory className="h-4 w-4" />
              </div>
              <span className="font-semibold">{t("app_name")}</span>
            </div>
            <div className="ml-auto flex items-center gap-1 border border-border p-0.5">
              <button
                data-testid="lang-id-btn"
                onClick={() => setLang("id")}
                className={`px-2 py-1 text-xs font-mono ${lang === "id" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >ID</button>
              <button
                data-testid="lang-en-btn"
                onClick={() => setLang("en")}
                className={`px-2 py-1 text-xs font-mono ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground"}`}
              >EN</button>
            </div>
          </div>

          <div className="label-caps mb-2">{t("login")}</div>
          <h2 className="text-3xl font-semibold tracking-tight mb-2">{t("welcome_back")}</h2>
          <p className="text-sm text-muted-foreground mb-8">{t("login_subtitle")}</p>

          <form onSubmit={onSubmit} className="space-y-4" data-testid="login-form">
            <div>
              <Label className="label-caps">{t("email")}</Label>
              <Input
                data-testid="login-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="mt-1.5 rounded-sm h-11"
                placeholder="you@company.com"
              />
            </div>
            <div>
              <Label className="label-caps">{t("password")}</Label>
              <Input
                data-testid="login-password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="mt-1.5 rounded-sm h-11"
                placeholder="••••••••"
              />
            </div>
            <Button
              data-testid="login-submit-button"
              type="submit"
              disabled={submitting}
              className="w-full h-11 rounded-sm gap-2"
            >
              {submitting ? "…" : t("sign_in")} <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-border" />
            <span className="label-caps">{t("or")}</span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <Button
            data-testid="google-login-button"
            variant="outline"
            onClick={googleLogin}
            className="w-full h-11 rounded-sm gap-2 border-border"
          >
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/><path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/><path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/><path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/></svg>
            {t("sign_in_google")}
          </Button>

          <div className="mt-8 border border-border p-3 text-xs">
            <div className="label-caps mb-1">Demo</div>
            <div className="font-mono text-muted-foreground">admin: sma.adm.production@momogi.co.id / admin123</div>
            <div className="font-mono text-muted-foreground">user: user@momogi.co.id / user123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

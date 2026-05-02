import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { Loader2, Lock } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    document.title = "Admin Login — NorthVave";
  }, []);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate("/admin", { replace: true });
  }, [user, isAdmin, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    const { error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setBusy(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in");
    navigate("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-2xl border border-border bg-card/60 p-8 backdrop-blur-xl shadow-card"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary glow-blue">
            <Lock className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-display text-xl font-bold">Admin Access</h1>
            <p className="text-xs text-muted-foreground">NorthVave Studio</p>
          </div>
        </div>
        <label className="block mb-4">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Email</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm focus:border-primary focus:outline-none"
          />
        </label>
        <label className="block mb-6">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">Password</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-lg border border-border bg-background/60 px-4 py-3 text-sm focus:border-primary focus:outline-none"
          />
        </label>
        <button
          type="submit"
          disabled={busy}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign In
        </button>
        <p className="mt-6 text-xs text-muted-foreground text-center">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={async () => {
              if (!email || !password) return toast.error("Enter email and password first");
              setBusy(true);
              const { error } = await supabase.auth.signUp({
                email: email.trim(),
                password,
                options: { emailRedirectTo: `${window.location.origin}/admin` },
              });
              setBusy(false);
              if (error) toast.error(error.message);
              else toast.success("Account created. You can sign in now.");
            }}
            className="text-primary hover:underline"
          >
            Create admin account
          </button>
        </p>
      </form>
    </div>
  );
};

export default Auth;
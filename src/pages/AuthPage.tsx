import { useState, SubmitEvent } from "react";
import { supabase } from "../supabaseClient";

export function AuthPage() {
  const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const result =
      mode === "signIn"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    if (result.error) {
      console.error(result.error.message);
      return;
    }

    console.log("Auth success", result.data);
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>{mode === "signIn" ? "Sign In" : "Create Account"}</h1>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit">
        {mode === "signIn" ? "Sign In" : "Create Account"}
      </button>

      <button
        type="button"
        onClick={() => setMode(mode === "signIn" ? "signUp" : "signIn")}
      >
        Switch to {mode === "signIn" ? "Create Account" : "Sign In"}
      </button>
    </form>
  );
}
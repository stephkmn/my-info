import { useState, SubmitEvent } from "react";
import { supabase } from "../supabaseClient";
import { useLocation, useNavigate } from "react-router-dom";

export function AuthPage() {
    const [mode, setMode] = useState<"signIn" | "signUp">("signIn");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const location = useLocation();
    const redirectTo = (location.state as { redirectTo?: string } | null)?.redirectTo ?? "/form";

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setMessage("");
        setErrorMessage("");

        if (mode === "signIn") {
            const result = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (result.error) {
                setErrorMessage(result.error.message);
                return;
            }

            navigate(redirectTo, { replace: true });
            return;
        }

        const result = await supabase.auth.signUp({
            email,
            password,
        });

        if (result.error) {
            setErrorMessage(result.error.message);
            return;
        }

        if (result.data.session) {
            navigate(redirectTo, { replace: true });
            return;
        }

        setMessage("Check your email to confirm your account. After confirming, come back here and sign in.");
    }

    return (
        <form onSubmit={handleSubmit}>
            <h1>{mode === "signIn" ? "Sign In" : "Create Account"}</h1>
            <p>{mode === "signIn"
                ? "Sign in to edit your medical profile."
                : "Create an account to create your medical profile."
            }</p>

            {errorMessage && <p>{errorMessage}</p>}
            {message && <p>{message}</p>}
            
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

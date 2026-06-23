import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export function LandingPage() {
    const navigate = useNavigate();

    async function handleSignOut() {
        console.log("Clicked Sign Out");

        await supabase.auth.signOut();
        navigate("/auth", { replace: true });
        return;
    }

    return (
        <>
            <h1>Welcome to MInfo</h1>
            <h3>All of your emergency medical information in a single QR code. </h3>
            <Link to="/form">Generate QR Code</Link>
            <Link to="/auth">Sign in</Link>
            <button onClick={handleSignOut}>Sign Out</button>
        </>
    );
}
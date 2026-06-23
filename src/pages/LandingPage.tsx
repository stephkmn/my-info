import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <>
            <h1>Welcome to MInfo</h1>
            <Link to="/form">Generate QR Code</Link>
            <Link to="/qr">Temporary QR button</Link>
            <Link to="/30000">QR id route</Link>
            <Link to="/auth">Sign in</Link>
        </>
    );
}
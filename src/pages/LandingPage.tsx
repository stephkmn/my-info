import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <>
            <h1>Welcome to MyInfo</h1>
            <h3>All of your emergency medical information in a single QR code. </h3>
            <Link to="/form">Generate QR Code</Link>
            <Link to="/auth">Sign in</Link>
        </>
    );
}

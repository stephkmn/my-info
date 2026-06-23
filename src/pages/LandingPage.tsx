import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <>
            <h1>Welcome to MyInfo</h1>
            <h3>All of your emergency medical information in a single QR code. </h3>
            <Link to="/form">Edit My Medical Profile</Link>
            <Link to="/qr">View My QR Code</Link>
        </>
    );
}

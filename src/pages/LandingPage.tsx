import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <main className="landing-page">
            <h1 style={{fontSize: '4rem'}}>Welcome to MyInfo</h1>
            <h3>All of your emergency medical information in a single QR code. </h3>
            <Link to="/form">Edit My Medical Profile</Link>
            <Link to="/qr">View My QR Code</Link>
        </main>
    );
}

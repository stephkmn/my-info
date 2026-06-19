import { Link } from "react-router-dom";

export function LandingPage() {
    return (
        <>
            <h1>Welcome to MInfo</h1>
            <Link to="/form">Generate QR Code</Link>
            <button>Edit My Info</button>
        </>
    );
}
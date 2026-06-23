import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link, useParams } from "react-router-dom";

export function QRPage() {
    const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

    const { qrId } = useParams();
    const emergencyPath = qrId ? `/${qrId}` : "/";
    const emergencyUrl = `${window.location.origin}${emergencyPath}`;
    const formPage = "/form"

    function handleDownload() {
        const canvas = qrCanvasRef.current;

        if (!canvas) {
            return;
        }

        const pngUrl = canvas.toDataURL("image/png");

        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "my-info-emergency-qr.png";
        downloadLink.click();
    }

    return (
        <>
            <h1>Your Emergency QR Code</h1>

            <QRCodeCanvas
                ref={qrCanvasRef}
                value={emergencyUrl}
                size={256}
            />

            <Link to={emergencyPath}>{emergencyUrl}</Link>

            <button
                type="button"
                className="qr-download-btn"
                onClick={handleDownload}
            >
                Download QR
            </button>
        </>
    );
}
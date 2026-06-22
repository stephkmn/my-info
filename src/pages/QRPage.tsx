import { useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";

export function QRPage() {
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const mockQrId = "892384303";
  const emergencyUrl = `${window.location.origin}/${mockQrId}`;

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

      <p>{emergencyUrl}</p>

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
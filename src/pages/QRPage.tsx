import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export function QRPage() {
    const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);
    const navigate = useNavigate();
    const { qrId } = useParams();
    const [isLoadingQrId, setIsLoadingQrId] = useState(!qrId);
    const [qrLookupError, setQrLookupError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function loadCurrentUserQrId() {
            if (qrId) {
                setIsLoadingQrId(false);
                return;
            }

            const {
                data: { user },
                error: userError,
            } = await supabase.auth.getUser();

            if (ignore) {
                return;
            }

            if (userError || !user) {
                navigate("/auth", {
                    replace: true,
                    state: { redirectTo: "/qr" },
                });
                return;
            }

            const { data, error } = await supabase
                .from("medical_profiles")
                .select("qr_id")
                .eq("user_id", user.id)
                .maybeSingle();

            if (ignore) {
                return;
            }

            if (error) {
                setQrLookupError("Could not load your QR code.");
                setIsLoadingQrId(false);
                return;
            }

            if (!data?.qr_id) {
                setQrLookupError("No QR code available yet. Submit your profile first.");
                setIsLoadingQrId(false);
                return;
            }

            navigate(`/qr/${data.qr_id}`, { replace: true });
        }

        loadCurrentUserQrId();

        return () => {
            ignore = true;
        };
    }, [navigate, qrId]);

    if (isLoadingQrId) {
        return <main>Loading your QR code...</main>;
    }

    if (!qrId) {
        return <main>{qrLookupError}</main>;
    }

    const emergencyPath = `/${qrId}`;
    const emergencyUrl = `${window.location.origin}${emergencyPath}`;

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

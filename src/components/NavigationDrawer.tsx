import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { BsList, BsX } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

export function NavigationDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [session, setSession] = useState<Session | null>(null);
    const [qrId, setQrId] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let ignore = false;

        async function loadSession() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!ignore) {
                setSession(session);
            }
        }

        loadSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            ignore = true;
            subscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        async function loadQrId() {
            if (!session?.user) {
                setQrId(null);
                return;
            }

            const { data, error } = await supabase
                .from("medical_profiles")
                .select("qr_id")
                .eq("user_id", session.user.id)
                .maybeSingle();

            if (error || !data?.qr_id) {
                setQrId(null);
                return;
            }

            setQrId(data.qr_id);
        }

        loadQrId();
    }, [session, location.pathname]);

    function closeDrawer() {
        setIsOpen(false);
    }

    async function handleSignOut() {
        await supabase.auth.signOut();
        setIsOpen(false);
        navigate("/auth", { replace: true });
    }

    return (
        <>
            <button
                type="button"
                className="menu-toggle-btn"
                aria-label="Open navigation menu"
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
            >
                <BsList aria-hidden="true" />
            </button>

            {isOpen && (
                <button
                    type="button"
                    className="nav-backdrop"
                    aria-label="Close navigation menu"
                    onClick={closeDrawer}
                />
            )}

            <nav className={`nav-drawer ${isOpen ? "open" : ""}`} aria-label="Site navigation">
                <div className="nav-drawer-header">
                    <h2>Menu</h2>
                    <button
                        type="button"
                        className="nav-close-btn"
                        aria-label="Close navigation menu"
                        onClick={closeDrawer}
                    >
                        <BsX aria-hidden="true" />
                    </button>
                </div>

                <Link to="/" onClick={closeDrawer}>
                    Home
                </Link>
                <Link to="/form" onClick={closeDrawer}>
                    Medical Profile
                </Link>

                {qrId && (
                    <Link to={`/qr/${qrId}`} onClick={closeDrawer}>
                        My QR Code
                    </Link>
                )}

                {session ? (
                    <button type="button" onClick={handleSignOut}>
                        Sign Out
                    </button>
                ) : (
                    <Link to="/auth" onClick={closeDrawer}>
                        Sign In
                    </Link>
                )}
            </nav>
        </>
    );
}

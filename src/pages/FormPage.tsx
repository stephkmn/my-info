import { useEffect, useState, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";

import { PersonalSection, EMPTY_PERSONAL, PersonalInfo } from "./form-page-sections/PersonalSection";
import { MedicationsSection, MedicationRow } from "./form-page-sections/MedicationsSection";
import { AllergiesSection, AllergyRow } from "./form-page-sections/AllergiesSection";
import { CConditionsSection, CConditionRow } from "./form-page-sections/ChronicConditionsSection";
import { VaccinesSection, VaccineRow } from "./form-page-sections/VaccinesSection";
import { EmergencyContactsSection, ContactRow } from "./form-page-sections/EmergencyContactsSection";
import { poundsToKg, feetInchesToCm } from "../utils/unitConversionHelpers";
import { saveMedicalProfile, loadCurrentUserMedicalProfile } from "../services/medicalProfileService";
import { ProfileDraft } from "../types/ProfileDraft";

export function FormPage() {
    const [personal, setPersonal] = useState<PersonalInfo>(EMPTY_PERSONAL)
    const [medications, setMedications] = useState<MedicationRow[]>([]);
    const [allergies, setAllergies] = useState<AllergyRow[]>([]);
    const [chronicConditions, setChronicConditions] = useState<CConditionRow[]>([]);
    const [vaccines, setVaccines] = useState<VaccineRow[]>([]);
    const [emergencyContacts, setEmergencyContacts] = useState<ContactRow[]>([]);

    const [isLoadingProfile, setIsLoadingProfile] = useState(true);
    const [loadError, setLoadError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        async function loadProfile() {
            try {
                const savedProfile = await loadCurrentUserMedicalProfile();

                if (ignore) {
                    return;
                }

                if (savedProfile) {
                    setPersonal(savedProfile.personal);
                    setMedications(savedProfile.medications);
                    setAllergies(savedProfile.allergies);
                    setChronicConditions(savedProfile.chronicConditions);
                    setVaccines(savedProfile.vaccines);
                    setEmergencyContacts(savedProfile.emergencyContacts);
                }
            } catch (error) {
                console.error(error);
                setLoadError("Could not load your existing medical profile.");
            } finally {
                if (!ignore) {
                    setIsLoadingProfile(false);
                }
            }
        }

        loadProfile();

        return () => {
            ignore = true;
        };
    }, []);

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();

        const weightKg =
            personal.weight === ""
                ? null
                : personal.weightUnit === "lb"
                    ? poundsToKg(Number(personal.weight))
                    : Number(personal.weight)

        const heightCm =
            personal.heightUnit === "in"
                ? feetInchesToCm(
                    Number(personal.heightFt || 0),
                    Number(personal.heightIn || 0)
                )
                : personal.heightCm === ""
                    ? null
                    : Number(personal.heightCm)

        const profileDraft: ProfileDraft = {
            personal: {
                name: personal.name,
                dob: personal.dob || null,
                addr: personal.addr || null,
                weight_kg: weightKg,
                height_cm: heightCm,
                preferred_weight_unit: personal.weightUnit,
                preferred_height_unit: personal.heightUnit
            },
            medications,
            allergies,
            chronicConditions,
            vaccines,
            emergencyContacts
        }

        const result = await saveMedicalProfile(profileDraft);
        navigate(`/qr/${result.qrId}`);
    }

    if (isLoadingProfile) {
        return <main>Loading your medical profile...</main>;
    }

    if (loadError) {
        return <main>{loadError}</main>;
    }

    return (
        <form className="form-page" onSubmit={handleSubmit}>
            <h2 className="section-header">Personal Information</h2>
            <PersonalSection personal={personal} setPersonal={setPersonal} />

            <h2 className="section-header">Medications and Known Allergies</h2>
            <MedicationsSection rows={medications} setRows={setMedications} />
            <AllergiesSection rows={allergies} setRows={setAllergies} />

            <h2 className="section-header">Health History</h2>
            <CConditionsSection rows={chronicConditions} setRows={setChronicConditions} />
            <VaccinesSection rows={vaccines} setRows={setVaccines} />

            <h2 className="section-header">Emergency Contacts</h2>
            <EmergencyContactsSection rows={emergencyContacts} setRows={setEmergencyContacts} />

            <button type="submit">Submit</button>
        </form>
    )
}








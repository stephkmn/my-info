import { useEffect, useState, SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

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
    const [formError, setFormError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        let ignore = false;

        async function loadProfile() {
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
                    state: { redirectTo: "/form" },
                });
                return;
            }

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
    }, [navigate]);

    async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setFormError("");

        const requiredError = validateProfile();

        if (requiredError) {
            setFormError(requiredError);
            return;
        }

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

    function validateProfile() {
        if (personal.name.trim() === "") {
            return "Name is required.";
        }

        if (personal.dob.trim() === "") {
            return "Date of birth is required.";
        }

        if (!isPositiveNumber(personal.weight)) {
            return "Weight is invalid.";
        }

        if (personal.heightUnit === "cm") {
            if (!isPositiveNumber(personal.heightCm)) {
                return "Height is invalid.";
            }
        } else {
            const feet = Number(personal.heightFt || 0);
            const inches = Number(personal.heightIn || 0);

            if (!Number.isFinite(feet) || !Number.isFinite(inches) || feet * 12 + inches <= 0) {
                return "Height is invalid.";
            }
        }

        if (emergencyContacts.length === 0) {
            return "At least one emergency contact is required.";
        }

        const invalidContact = emergencyContacts.some(
            (contact) => contact.name.trim() === "" || contact.phone.trim() === ""
        );

        if (invalidContact) {
            return "Each emergency contact needs a name and phone number.";
        }

        const invalidAllergy = allergies.some(
            (allergy) =>
                allergy.allergen.trim() === "" ||
                allergy.reaction.trim() === "" ||
                allergy.severity.trim() === ""
        );

        if (invalidAllergy) {
            return "Each allergy needs an allergen, reaction, and severity.";
        }

        const invalidVaccine = vaccines.some(
            (vaccine) => vaccine.vaccine.trim() === "" || vaccine.dateGiven.trim() === ""
        );

        if (invalidVaccine) {
            return "Each vaccine needs a vaccine name and date given.";
        }

        const invalidCondition = chronicConditions.some(
            (condition) => condition.condition.trim() === ""
        );

        if (invalidCondition) {
            return "Each chronic condition needs a condition name.";
        }

        const invalidMedication = medications.some(
            (medication) => medication.medication.trim() === "" || medication.dosage.trim() === ""
        );

        if (invalidMedication) {
            return "Each medication needs a medication name and dosage.";
        }

        return "";
    }

    function isPositiveNumber(value: string) {
        const numberValue = Number(value);
        return value.trim() !== "" && Number.isFinite(numberValue) && numberValue > 0;
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

            {formError && <p className="validation-error">{formError}</p>}
            <button type="submit">Submit</button>
        </form>
    )
}







import type { MedicationRow } from "../pages/form-page-sections/MedicationsSection";
import type { AllergyRow } from "../pages/form-page-sections/AllergiesSection";
import type { CConditionRow } from "../pages/form-page-sections/ChronicConditionsSection";
import type { VaccineRow } from "../pages/form-page-sections/VaccinesSection";
import type { ContactRow } from "../pages/form-page-sections/EmergencyContactsSection";

export type ProfileDraft = {
  personal: {
    name: string;
    dob: string | null;
    addr: string | null;
    weight_kg: number | null;
    height_cm: number | null;
    preferred_weight_unit: "lb" | "kg";
    preferred_height_unit: "in" | "cm";
  };
  medications: MedicationRow[];
  allergies: AllergyRow[];
  chronicConditions: CConditionRow[];
  vaccines: VaccineRow[];
  emergencyContacts: ContactRow[];
};
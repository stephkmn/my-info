import { Dispatch, SetStateAction, ChangeEvent } from "react";
import { InputField } from "../../components/InputField";

export type PersonalInfo = {
  name: string;
  dob: string;
  addr: string;
  weight: string;
  weightUnit: "lb" | "kg";
  heightUnit: "in" | "cm";
  heightFt: string;
  heightIn: string;
  heightCm: string;
};

export const EMPTY_PERSONAL: PersonalInfo = {
  name: "",
  dob: "",
  addr: "",
  weight: "",
  weightUnit: "lb",
  heightUnit: "in",
  heightFt: "",
  heightIn: "",
  heightCm: "",
};

type PersonalSectionProps = {
  personal: PersonalInfo;
  setPersonal: Dispatch<SetStateAction<PersonalInfo>>;
};

export function PersonalSection({personal, setPersonal}: PersonalSectionProps) {
    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;

        setPersonal((current) => ({
            ...current, 
            [name]: value
        }));
    }

    return (
        <div className="section-wrapper personal-section">
            <div className="personal-field">
                <InputField
                    field="Name"
                    fieldID="name"
                    fieldType="text"
                    placeHolder="Enter your full name"
                    value={personal.name}
                    onChange={handleChange}
                />
            </div>

            <div className="personal-field">
                <InputField
                    field="Date of Birth"
                    fieldID="dob"
                    fieldType="date"
                    placeHolder="Enter your date of birth"
                    value={personal.dob}
                    onChange={handleChange}
                />
            </div>

            <div className="personal-field personal-address">
                <InputField
                    field="Address"
                    fieldID="addr"
                    fieldType="text"
                    placeHolder="Enter your address"
                    value={personal.addr}
                    onChange={handleChange}
                />
            </div>

            <div className="personal-field">
                <label htmlFor="weight">Weight</label>
                <div className="measurement-row">
                    <input
                        type="number"
                        id="weight"
                        name="weight"
                        placeholder="Enter your weight"
                        value={personal.weight}
                        onChange={handleChange}
                    />
                    <select name="weightUnit"
                        id="weightUnit"
                        value={personal.weightUnit}
                        onChange={handleChange}>
                        <option value="lb">lb</option>
                        <option value="kg">kg</option>
                    </select>
                </div>
            </div>

            <div className="personal-field">
                <label htmlFor={personal.heightUnit === "in" ? "heightFt" : "heightCm"}>Height</label>
                <div className="measurement-row height-row">
                    {personal.heightUnit === "in" ? (
                        <>
                            <input
                                type="number"
                                id="heightFt"
                                name="heightFt"
                                placeholder="ft"
                                value={personal.heightFt}
                                onChange={handleChange}
                            />
                            <input
                                type="number"
                                id="heightIn"
                                name="heightIn"
                                placeholder="in"
                                value={personal.heightIn}
                                onChange={handleChange}
                            />
                        </>
                    ) : (
                        <input
                            type="number"
                            id="heightCm"
                            name="heightCm"
                            placeholder="cm"
                            value={personal.heightCm}
                            onChange={handleChange}
                        />
                    )}

                    <select name="heightUnit"
                        id="heightUnit"
                        value={personal.heightUnit}
                        onChange={handleChange}>
                        <option value="in">ft/in</option>
                        <option value="cm">cm</option>
                    </select>
                </div>
            </div>
        </div>
    )
}

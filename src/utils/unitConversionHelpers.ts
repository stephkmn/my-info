const POUND_KG_CONVERSION = 0.45359237;
const FT_CM_CONVERSION = 30.48;
const IN_CM_CONVERSION = 2.54;

export function poundsToKg(lb: number) {
    return lb * POUND_KG_CONVERSION;
}

export function kgToPounds(kg: number) {
    return kg / POUND_KG_CONVERSION;
}

export function feetInchesToCm(ft: number, inches: number) {
    return ft * FT_CM_CONVERSION + inches * IN_CM_CONVERSION;
}

export function cmToFeetInches(cm: number) {
    const totalInches = cm / IN_CM_CONVERSION;

    return {
        ft: Math.floor(totalInches / 12),
        inches: Math.round(totalInches % 12)
    };
}
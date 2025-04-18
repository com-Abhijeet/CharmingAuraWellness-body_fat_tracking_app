export const centimeterToInches = (centimeters :  number) => {
    const centimeterToInchRatio = 0.393701;
    const inches = centimeters * centimeterToInchRatio;
    return inches;
}

export const inchtoCentimeters =  (inches : number) => {
    const centimeterToInchRatio = 0.393701;
    const centimeters = inches / centimeterToInchRatio;
    return centimeters;
}

export const  centimeterToFeet = (centimeters : number) => {
    const feet = centimeterToInches(centimeters) / 12;
    return feet;
}

export const feetToCentimeter =  (feet : number) => {
    const centimeters = inchtoCentimeters(feet * 12);
    return centimeters;
}

export const kilogramsToLbs = (kilograms : number) => {
    const lbs = kilograms * 2.20462;
    return lbs;
}

export const  lbsToKilograms = (lbs : number) => {
    const kilograms = lbs / 2.20462;
    return kilograms;
}



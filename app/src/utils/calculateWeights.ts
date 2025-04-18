import { centimeterToInches, kilogramsToLbs, lbsToKilograms} from "./conversions";


// this function takes weight in KG as input , Gender : Male OR Female, height in cm 
//converts them to weight KG - > Lbs, and height CM - > inches  
//  returns ideal weight in kg as output.
export const calculateIdealWeight = (gender : string , heightInCm : number) =>{
    let idealWeight = 0;
    // using Robbinson formula 
    // Male:	52 kg + 1.9 kg per inch over 5 feet
    // Female:	49 kg + 1.7 kg per inch over 5 feet
    const heightInInches = centimeterToInches(heightInCm);
    console.log("height in iinches,  ", heightInInches, gender);


    if(gender === 'male'){
        idealWeight = 52 + (1.9 * (heightInInches - 60));
    }
    else if(gender === 'female'){
        idealWeight = 49 + (1.7 * (heightInInches - 60));
    }
    console.log("Ideal Weight",idealWeight);
    return idealWeight.toPrecision(4);
}

export const calculateWeightDifference = (weight  : number, idealWeight : number) => {
    return weight - idealWeight;
}

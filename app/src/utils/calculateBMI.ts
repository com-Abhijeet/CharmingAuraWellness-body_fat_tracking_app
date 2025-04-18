const calculateBMI = (weight : number, height : number) =>{
    const bmi = weight / (height * height);
    return bmi;
}

export default calculateBMI;
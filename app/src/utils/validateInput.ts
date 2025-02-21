const validateInput = (name: string, value: string) => {
    let error = "";
  
    switch (name) {
      case "name":
        if (!value) {
          error = "Name is required.";
        }
        break;
      case "email":
        if (!value) {
          error = "Email is required.";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email is invalid.";
        }
        break;
      case "contact":
        if (!value) {
          error = "Contact is required.";
        } else if (!/^\+?\d{10,15}$/.test(value)) {
          error = "Contact is invalid.";
        }
        break;
      case "dob":
        if (!value) {
          error = "Date of Birth is required.";
        }
        break;
      case "age":
        if (!value) {
          error = "Age is required.";
        } else if (isNaN(Number(value)) || Number(value) <= 0) {
          error = "Age must be a positive number.";
        }
        break;
      case "height":
        if (!value) {
          error = "Height is required.";
        } else if (isNaN(Number(value)) || Number(value) <= 0) {
          error = "Height must be a positive number.";
        }
        break;
      case "weight":
        if (!value) {
          error = "Weight is required.";
        } else if (isNaN(Number(value)) || Number(value) <= 0) {
          error = "Weight must be a positive number.";
        }
        break;
      case "address":
        if (!value) {
          error = "Address is required.";
        }
        break;
      case "gender":
        if (!value) {
          error = "Gender is required.";
        }
        break;
      default:
        break;
    }
  
    return error;
  };
  
  export default validateInput;
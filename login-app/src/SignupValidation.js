function Validation(values) {
   let error = {};  
   const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

   if (values.name === "") {
      error.name = "Name should not be empty";
   } else {
      error.name = "";
   }

   if (!email_pattern.test(values.email)) {
      error.email = "Email did not match";
   } else if (values.email === "") {
      error.email = "Email should not be empty";
   } else {
      error.email = "";
   }

   if (values.password === "") {
      error.password = "Password should not be empty";
   } else if (!password_pattern.test(values.password)) {
      error.password = "Password must contain at least 8 characters including one uppercase letter, one lowercase letter, and one number";
   } else {
      error.password = "";
   }

   if (values.confirmPassword !== values.password) {
      error.confirmPassword = "Passwords do not match";
   } else {
      error.confirmPassword = "";
   }

   return error;
}

export default Validation;

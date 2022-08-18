const regexPhoneNo = /^\(?([1-9]{1})\)?[-. ]?([0-9]{5})[-. ]?([0-9]{4})$/;
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
const regexPassword =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
const nameRegex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;

const handleNameValidation=(val:any,callback:Function)=>{
  let errorMsg=''
  if(val.length==0)
  {
    errorMsg='name must be entered'
  }
  else if(nameRegex.test(val)==false)
  {
    errorMsg='name must be valid'
  }
  else{
    errorMsg=''
  }
  callback(errorMsg);

}



const handleValidPhoneNo = (val: any, callback: Function) => {
  let errorMsg = '';
  if (val.length === 0) {
    errorMsg = 'Mobile Number or email must be enter';
  } else if (regexPhoneNo.test(val) == false) {
    errorMsg = 'Mobile Number must contain 10 digits.';
  } else if (regexPhoneNo.test(val) == true) {
    errorMsg = '';
  }
  callback(errorMsg);
};
const handleValidEmail = (val: any, callback: Function) => {
  let errorMsg = '';
  if (val.length === 0) {
    errorMsg = 'Mobile Number or email must be enter';
  } else if (emailRegex.test(val) == false) {
    errorMsg = 'please enter valid email.';
  } else if (emailRegex.test(val) == true) {
    errorMsg = '';
  }
  callback(errorMsg);
};

const handlePassword = (val: any, callback: Function) => {
  let errorMsg = '';
  if (val.length === 0) {
    errorMsg = 'Password must be enter';
  } else if (regexPassword.test(val) === false) {
    errorMsg =
      'Password must contain minimum 8 characters, 1 uppercase,  1 lowercase, 1 number and 1 special character.';
  } else if (regexPassword.test(val) === true) {
    errorMsg = '';
  }
  callback(errorMsg);
};

const handleConfirmPassword = (
  val: any,
  password: any,

  callback: Function,
) => {
  console.log('------->', password);
  console.log('------------dfuyiofiuiufiufdui', val);

  let errorMsg = '';
  if (val.length === 0) {
    errorMsg = 'Confirm Password is required ';
  } else if (regexPassword.test(val) === false) {
    errorMsg =
      'Password must contain minimum 8 characters, 1 uppercase,  1 lowercase, 1 number and 1 special character.';
  } else if (password !== val) {
    errorMsg = 'Passwoad and confirm password should be same.';
  } else if (regexPassword.test(val) === true) {
    errorMsg = '';
  }
  callback(errorMsg);
};

export {
  handleValidPhoneNo,
  handleValidEmail,
  handlePassword,
  handleConfirmPassword,
  handleNameValidation,
};

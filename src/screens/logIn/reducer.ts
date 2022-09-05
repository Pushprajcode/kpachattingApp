const intailState = {
  uidLogInuser: '',
};

const LoginReducer = (state = intailState, action: any) => {
  const {type, payload} = action;
  console.log('payload', payload);

  switch (type) {
    case 'uidloginUser  ':
      return {...state, uidLogInuser: payload};
    default:
      return state;
  }
};
export default LoginReducer;

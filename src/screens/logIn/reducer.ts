const intailState = {
  uidLogInuser: '',
};

const LoginReducer = (state = intailState, action: any) => {
  const {type, payload} = action;
  console.log('payload', payload);

  switch (type) {
    case 'SET_USER_UID':
      return {...state, ...payload};
    default:
      return state;
  }
};
export default LoginReducer;

const intailState = {
    uid:'',
  };
  
  const LoginReducer = (state = intailState, action: any) => {
   
    const {type, payload} = action;
    console.log('payload',payload)
  
    switch (type) {
      case 'uid':
        return {...state, uid: payload};
      default:
        return state;
    }
  };
  export default LoginReducer;
  
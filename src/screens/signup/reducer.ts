const intailState = {
    homeData: [],
  };
  
  const SignUpReducer = (state = intailState, action: any) => {
   
    const {type, payload} = action;
    console.log('payload',payload)
  
    switch (type) {
      case 'uid':
        return {...state, homeData: payload};
      default:
        return state;
    }
  };
  export default SignUpReducer;
  
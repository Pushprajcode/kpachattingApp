const intailState = {
    url:'',
  };
  
  const profileReducer = (state = intailState, action: any) => {
   
    const {type, payload} = action;
    console.log('payload',payload)
  
    switch (type) {
      case 'sendurl':
        return {...state, url: payload};
      default:
        return state;
    }
  };
  export default profileReducer;
  
const intailState = {
  loginUserId: '',
};

const HomeReducer = (state = intailState, action: any) => {
  const {type, payload} = action;
  console.log('payload', payload);

  switch (type) {
    case 'userDetails':
      return {...state, loginUserId: {}};
    default:
      return state;
  }
};
export default HomeReducer;

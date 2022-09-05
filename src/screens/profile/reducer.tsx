const intailState = {
  userProfileDetails: {},
};

const profileReducer = (state = intailState, action: any) => {
  const {type, payload} = action;
  console.log('payload', payload);

  switch (type) {
    case 'ProfileDetails':
      return {...state, ...payload};
    default:
      return state;
  }
};
export default profileReducer;

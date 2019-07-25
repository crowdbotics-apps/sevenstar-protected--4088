const initialAuthState = {
  isLoggedIn: false
};

const Auth = (state = initialAuthState, action) => {

  console.log('auth:', action.type);
  switch (action.type) {
      case 'Setting':
          return {
              ...state,
              userData: action.userData
          };
      case 'Login':
          return {
              ...state,
              isLoggedIn: true,
              userData: action.userData
          };
      case 'UpdateSignUpData':
          return {
              ...state,
              userData: action.userData
          };
      case 'UpdateMapLatLong':
          console.log('auth:', action.mapLatLong);
          return {
              ...state,
              mapLatLong: action.mapLatLong
          };
      case 'Logout':
          return {
              ...state,
              isLoggedIn: false
          };
      case 'ActiveAppointment':
          return {
              ...state,
              activeAppointment: action.activeAppointment
          };
      case 'Navigation/CLOSE_DRAWER':
          return {
              ...state,
              isDrawerOpen: false
          };
      case 'Navigation/DRAWER_CLOSED':
          return {
              ...state,
              isDrawerOpen: false
          };
      case 'Navigation/OPEN_DRAWER':
          return {
              ...state,
              isDrawerOpen: true,
              loginPopDialogShow: false
          };
      default:
          return state;
  }
}

export default Auth;
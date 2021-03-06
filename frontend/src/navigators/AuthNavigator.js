import { createStackNavigator } from 'react-navigation';

import Login from '../containers/Login';
import Signup from '../containers/Signup';
import ChooseRole from '../containers/ChooseRole';
import ForgotPassword from '../containers/ForgotPassword';
import OfficerSignUp from '../containers/OfficerSignUp';
import OfficerInfo from '../containers/OfficerInfo';
import CitizenSignUp from '../containers/CitizenSignUp';
import CitizenInfo from '../containers/CitizenInfo';
import SignUpComplete from '../containers/SignUpComplete';
import ChoosePurchase from '../containers/ChoosePurchase';


const AuthNavigator = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  ChooseRole: {
    screen: ChooseRole,
    navigationOptions: {
      header: null,
    },
  },
  ChoosePurchase: {
    screen: ChoosePurchase,
    navigationOptions: {
      header: null,
    },
  },
  OfficerSignUp: {
    screen: OfficerSignUp,
    navigationOptions: {
      header: null,
    },
  },
  SignUpComplete: {
    screen: SignUpComplete,
    navigationOptions: {
      header: null,
    },
  },
  OfficerInfo: {
    screen: OfficerInfo,
    navigationOptions: {
      header: null,
    },
  },
  CitizenSignUp: {
    screen: CitizenSignUp,
    navigationOptions: {
      header: null,
    },
  },
  CitizenInfo: {
    screen: CitizenInfo,
    navigationOptions: {
      header: null,
    },
  },
  Signup: {
    screen: Signup,
    navigationOptions: {
      header: null,
    },
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null,
    },
  },
});

export default AuthNavigator;

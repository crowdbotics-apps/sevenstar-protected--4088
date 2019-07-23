import {
  PixelRatio,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: PixelRatio.getPixelSizeForLayoutSize(12),
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(20),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(40),
  },
  logoText: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
  },
  logo: {
    height: PixelRatio.getPixelSizeForLayoutSize(80),
    width: "100%",
    resizeMode: 'contain',
  },
  form: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  item: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#fff',
    borderColor: '#000',
  },
  input: {
    color: '#333',
  },
  buttonContainer: {
    flex: 1,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(10),
  },
  forgotPasswordContainer: {
    alignItems: 'center',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(2),
  },
  forgotPasswordText: {
    color: '#333',
    fontSize: 16,
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#E71E3C',
    borderColor:"#B71F30",
    borderWidth:2
  },
  loginText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
    alignItems:'center'
  },
  dontHaveAccountText: {
    color: '#bec0ce',
    fontSize: 16,
  },
  signupText: {
    color: '#333',
    fontSize: 16,
  },
});


export default styles;

import {
  PixelRatio,
  StyleSheet,
} from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a1142',
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
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  logoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
  },
  subText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
    width:'100%',
    textAlign:'center',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(10),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(10),
  },
  logo: {
    height: PixelRatio.getPixelSizeForLayoutSize(40),
    width: PixelRatio.getPixelSizeForLayoutSize(40),
    resizeMode: 'contain',
  },
  form: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  item: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#121d56',
    borderColor: '#121d56',
  },
  input: {
    color: 'white',
  },
  buttonContainer: {
    flex: 1,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#7646e4',
  },
  signupText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
  },
  haveAccountText: {
    color: '#bec0ce',
    fontSize: 16,
  },
  loginText: {
    color: 'white',
    fontSize: 16,
  },
});


export default styles;

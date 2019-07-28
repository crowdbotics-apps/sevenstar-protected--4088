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
    marginTop: 5,
    marginBottom: 5,
  },
  logoText: {
    color: '#333',
    fontSize: 18,
    fontWeight: '700',
  },
  subText: {
    color: '#333',
    fontSize: 20,
    fontWeight: '700',
    width:'100%',
    textAlign:'center',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(10),
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(10),
  },
  sub: {
    color: 'white',
    fontSize: 14,
    fontWeight: '700',
    width:'100%',
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
    backgroundColor: '#fff',
    borderColor: '#000',
  },
  input: {
    color: '#333',
  },
  buttonContainer: {
    flex: 1,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#E71E3C',
    borderColor:"#B71F30",
    borderWidth:2
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

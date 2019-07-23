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
    marginBottom: PixelRatio.getPixelSizeForLayoutSize(20),
  },
  logoText: {
    color: '#333',
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
    justifyContent: 'center',
  },
  item: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#fff',
    borderColor: '#000',
  },
  input: {
    color: '#333',
  },
  descriptionText: {
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  resetInstructionsText: {
    color: '#bec0ce',
    fontSize: 12,
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginTop: PixelRatio.getPixelSizeForLayoutSize(15),
  },
  button: {
    marginVertical: PixelRatio.getPixelSizeForLayoutSize(2),
    backgroundColor: '#E71E3C',
    borderColor:"#B71F30",
    borderWidth:2
  },
  sendText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: PixelRatio.getPixelSizeForLayoutSize(5),
  },
  rememberAccountText: {
    color: '#bec0ce',
    fontSize: 16,
  },
  loginText: {
    color: '#333',
    fontSize: 16,
  },
});


export default styles;

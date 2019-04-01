import { Platform, StyleSheet } from 'react-native';
import commonStyles from './commonStyles';
import { Constants } from 'expo';

export default StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: commonStyles.colors.primary,
    paddingTop: Platform.OS == "android" ? Constants.statusBarHeight : 0,
  },
  pageBody: {
    width: '100%',
    height: Platform.OS == "android" ? '100%' : 270,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  StatusKey: {
    width: 300,
    height: 270,
    position: 'absolute',
    alignSelf: 'center',
    justifyContent:'center',
  },
  BarCodeScanner: {
    width: Platform.OS == "android" ? '100%' : 230,
    height: Platform.OS == "android" ? '100%' : 215
  },

  Header: {
    top: Constants.statusBarHeight,
    width: '100%',
    padding: 25,
    position: 'absolute',
    alignContent: 'center',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: commonStyles.colors.white
  },
  commonText: {
    fontSize: 16,
    textAlign: 'center',
    color: commonStyles.colors.white
  },
  Footer: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    bottom: Constants.statusBarHeight,
  },
  Copyright: {
    width: '60%',
    height: 40
  },

  ////////////////////////////////////////////////////////////////////// END OFCOMPONENTS ///////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
});
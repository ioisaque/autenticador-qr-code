// Arquivos das telas
import Reader from './screens/Reader'
import commonStyles from './assets/styles/commonStyles'
import { createAppContainer, createStackNavigator } from 'react-navigation'

const AppNavigator = createStackNavigator (
  {
    Reader: Reader
  },
  {
    initialRouteName: 'Reader',
    /* The header config from HomeScreen is now here */
    navigationOptions: {      
      headerBackTitle: '',
      headerTruncatedBackTitle: '',
      headerStyle: {
        elevation: 0,
        borderBottomWidth: 0,
        backgroundColor: commonStyles.colors.primary,
      },
      headerTintColor: commonStyles.colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'left',
      },
    },
  }
)

const AppContainer = createAppContainer(AppNavigator);

export const CONFIG = {
  event: 'Demonstração',
  keyword: 'cleared'
}

export default AppContainer;
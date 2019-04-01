import React, { Component } from 'react'
import { Alert, Image, StatusBar , Text, View, TouchableOpacity, Linking } from 'react-native'
import { BarCodeScanner, Permissions } from 'expo'

import CONFIG from '../App'
import styles from '../assets/styles/otherStyles'

export default class App extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    qrDialog: '',
    qrData: 'Para começar a validar os convidados, favor ler primeiramente o código de configuração...',
    qrDataLast: '',
    keyColor: 'config',
    isCodeValid: false,
    secondsToIdle: 3600,
    isAlertOpen: false,
    hasCameraPermission: null
  }

  componentDidMount() {
    this._requestCameraPermission()
    setInterval( () => {
      // console.log('UPDATED => secondsToIdle = ', this.state.secondsToIdle)
      
      if (this.state.secondsToIdle > 1)
        this.setState({ secondsToIdle: this.state.secondsToIdle-1})
      else
        this.setState({ secondsToIdle: 3600, qrDialog: '', qrData: 'Aguardando QR Code...', keyColor: 'idle', isCodeValid: false})
    },1000)
  }

  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA)
    this.setState({
      hasCameraPermission: status === 'granted',
    })
  }

  _handleBarCodeRead = data => {
    if (!this.state.isAlertOpen)
    {
      console.log('RUNNING => @_handleBarCodeRead')
      let qrData = JSON.stringify(data.data).replace(/"/g, '')

      if (qrData.search('{') >= 0)
        qrData = JSON.parse(data.data)

      if (this.state.keyColor == 'config')
      {
        if (qrData.event && qrData.keyword)
        {
          CONFIG.event = qrData.event
          CONFIG.keyword = qrData.keyword
          this.setState({ secondsToIdle: 5, qrDialog: 'PRONTO!', qrData: 'Agora você já pode validar os convidados.', keyColor: 'success', isCodeValid: false})

          this.setState({ isAlertOpen: true })
          Alert.alert('Feito!', 'Código de configuração valiado com sucesso.', [{text: 'OK', onPress: () => this.setState({ isAlertOpen: false }) }], { cancelable: false })
        }else{
          if (!this.state.isAlertOpen)
          {
            this.setState({ isAlertOpen: true })
            Alert.alert('Desculpe', 'Código de configuração Inválido!', [{text: 'OK', onPress: () => this.setState({ isAlertOpen: false }) }], { cancelable: false })
          }
        }

      }else{
        if (qrData.guest && qrData.keyword == CONFIG.keyword)
          this.setState({ qrDialog: 'ENTRADA LIBERADA!', qrData: 'Bem Vindo ' + qrData.guest + '!',  keyColor: 'success', isCodeValid: true, secondsToIdle: 3 })
        else
          this.setState({ qrDialog: 'ENTRADA NEGADA!', qrData: 'Código QR deconhecido.',  keyColor: 'danger', isCodeValid: false,  secondsToIdle: 3 })
      }
    }
  }

  render() {
      return (
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
          {
            this.state.hasCameraPermission === null ?
              <Text style={styles.commonText}>Aguardando permissão para acessar a Camera...</Text> :
            this.state.hasCameraPermission === false ?
              <Text style={styles.commonText}>Permissão para acessar a Camera NEGADA.</Text> :

            <View style={styles.pageBody}>
              <BarCodeScanner
                onBarCodeRead={this._handleBarCodeRead}
                style={styles.BarCodeScanner}
              />
              <TouchableOpacity
                style={{ position: 'absolute', alignSelf: 'center', justifyContent:'center' }}
                  onPress={
                  () => this.state.keyColor != 'config' ?
                        this.setState({ secondsToIdle: 3600, qrDialog: 'AGUARDANDO QR CODE', qrData: '...', keyColor: 'idle', isCodeValid: false})
                  : null }
              >
              {
                this.state.keyColor == 'config' ? 
                <Image style={styles.StatusKey} source={require('../assets/images/config-key.png')} /> :

                this.state.keyColor == 'success' ? 
                <Image style={styles.StatusKey} source={require('../assets/images/success-key.png')} /> :
                
                this.state.keyColor == 'danger' ?
                <Image style={styles.StatusKey} source={require('../assets/images/danger-key.png')} /> :
                
                <Image style={styles.StatusKey} source={require('../assets/images/idle-key.png')} />
              }
              </TouchableOpacity>
            </View>
          }

          <View style={styles.Header}>
            <Text style={styles.titleText}>{this.state.qrDialog}</Text>
            <Text style={styles.commonText}>{this.state.qrData}</Text>
          </View>

          <TouchableOpacity style={styles.Footer} onPress={() => Linking.openURL('https://isaquecosta.com.br')}>
            <Image style={styles.Copyright} source={require('../assets/images/footer.png')} />
          </TouchableOpacity>
        </View>
      )
  }
}
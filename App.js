import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  TouchableHighlight,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import PINCode, { hasUserSetPinCode, deleteUserPinCode } from '@haskkor/react-native-pincode';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pinState: '',
    };
  }

  componentDidMount() {
    this.checkExistsPinNumber();
  }

  async checkExistsPinNumber() {
    var pinState = 'choose';
    var hasPin = await hasUserSetPinCode('innodea');

    if (hasPin) {
      pinState = 'enter';
    }

    this.setState({
      pinState: pinState
    });
  }

  getPinStatus(pinCode) {
    console.log('pinStatus', pinCode)
  };

  render() {
    return (
      <View style={styles.contaciner}>
        <Text>Finger</Text>
        <PINCode 
          status={this.state.pinState}
          pinCodeKeychainName={'innodea'}  
          customBackSpaceIcon={<Icon name="ios-backspace" size={60} color="rgb(232, 245, 241)"></Icon>}
          passwordLength={6}
          // endProcessFunction={() => {
          //   console.log('endProcessFunction');
          // }}
          finishProcess={() => {
            console.log('finishProcess');
          }}
          storePin={(pin) => {
            console.log('pin', pin)
          }}
          handleResultEnterPin={(code) => {
            console.log('code', code)
          }}
          pinStatus={this.getPinStatus}
          subtitleChoose={'등록-핀입력'}
          subtitleConfirm={'등록-핀확인'}
          subtitleEnter={'인증 입력'}
          subtitleError={'인증오류'}
          textCancelButtonTouchID={'취소'}
          titleEnter={'핀 인증번호를 입력하세요.'}

        /> 

      <Button
        title="확인"
        onPress={this.checkExistsPinNumber}
      />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  contaciner: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});


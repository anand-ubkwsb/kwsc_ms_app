import React, {useState} from 'react';
import {View, ImageBackground, Text} from 'react-native';
import {styles} from './style';

import TextInputWrapper from '../../components/TextInputWrapper';
import ButtonWrapper from '../../components/ButtonWrapper';
import Loader from '../../components/Loader';

import {GetMeterUserLogin} from '../../helper/apis/mcc_meter_api';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({navigation}) {
  const [userName, setUserName] = useState('');
  const [passWord, setPassWord] = useState('');

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  async function getLogin() {
    setErrorMessage('');
    const params = {
      userName: userName,
      passWord: passWord,
    };
    console.log(params);
    setLoading(true);
    try {
      const response = await GetMeterUserLogin(params);
      console.log('response', response);
      if (response.status == 'Success') {
        AsyncStorage.setItem('loginCredentials', JSON.stringify(params));
        navigation.navigate('home');
        setLoading(false);
      } else {
        setErrorMessage('username or password not correct!');
        setLoading(false);
        console.log('login failed', response.status);
      }
    } catch (error) {
      setLoading(false);
      console.log('---GetMeterConsumerInfo Catch Error---', error);
    }
  }

  return (
    <ImageBackground
      style={styles.imageBackground}
      resizeMode="cover"
      source={require('../../assets/images/loginBg.jpg')}>
      {/* free space of flex */}
      <View style={styles.freeSpace} />
      <View style={styles.container}>
        <TextInputWrapper
          label={'Username'}
          inputContainerStyle={styles.input}
          onChangeText={text =>
            setUserName(text.toLocaleLowerCase().replace(' ', ''))
          }
        />
        <TextInputWrapper
          label={'Password'}
          keyboardType={'password'}
          isPassword={true}
          inputContainerStyle={styles.input}
          onChangeText={text => setPassWord(text)}
        />
        <ButtonWrapper
          buttonStyle={styles.loginBtn}
          labelStyle={styles.loginBtnTxt}
          label={loading == true ? <Loader animating={loading} /> : 'Login'}
          activeOpacity={0.9}
          onPress={() => getLogin()}
        />
        {errorMessage.length > 1 && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
      </View>
    </ImageBackground>
  );
}

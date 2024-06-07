import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  View,
  Text,
  ScrollView,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import {styles} from './style';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import TextInputWrapper from '../../components/TextInputWrapper';
import ButtonWrapper from '../../components/ButtonWrapper';
import DropDownWrapper from '../../components/DropDownWrapper';
import Loader from '../../components/Loader';

import {Colors, Icons} from '../../const';

import {
  meterCalculation,
  requestCameraPermission,
  requestExternalWritePermission,
} from '../../utils';

import {
  GetMeterConsumerInfo,
  GetListMeterType,
  UpdateMaterInfo,
} from '../../helper/apis/mcc_meter_api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home({navigation}) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [value, setValue] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [thankyouModalVisible, setThankyouModalVisible] = useState(false);

  const [filePath, setFilePath] = useState(null);
  const [meterReadingImageName, setMeterReadingImageName] = useState();
  const [imageResponse, setImageResponse] = useState();
  const [imageBase, setImageBase] = useState('');

  const [consumerNo, setconsumerNo] = useState('');

  const [prevReading, setPrevReading] = useState('');
  const [currReading, setCurrReading] = useState('');
  const [consumption, setConsumption] = useState('');
  const [remarks, setRemarks] = useState('');
  const [meterData, setMeterData] = useState([]);
  const [credentials, setCredentials] = useState();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loginDetail();
    getListMeterType();
  }, []);

  async function loginDetail() {
    const loginCredentials = await AsyncStorage.getItem('loginCredentials');
    setCredentials(JSON.parse(loginCredentials));
  }

  async function captureImage(type) {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30,
      saveToPhotos: false,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, response => {
        if (response.didCancel) {
          console.log('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert(response.errorMessage);
          return;
        }
        setFilePath(response.assets[0].uri);
        setImageResponse(response);
        setImageBase('normal');
      });
    }
  }

  async function chooseFile(type) {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert(response.errorMessage);
        return;
      }
      setFilePath(response.assets[0].uri);
      setImageResponse(response);
      setImageBase('normal');
    });
  }

  async function getListMeterType() {
    try {
      const {status, message, data} = await GetListMeterType();
      // console.log('GetListMeterType response', response);
      const meterDataArr = [];
      const arr = [];
      for (let i = 0; i < data.length; i++) {
        const element = data[i];
        const obj = {
          label: element.meter_type_id,
          value: element.meter_type_id,
        };
        arr.push(obj);

        const obj2 = {
          meter_type_id: element.meter_type_id,
          measurement_criteria: element.measurement_criteria,
          meter_description: element.meter_description,
          factor: element.factor,
        };
        meterDataArr.push(obj2);
      }
      setItems(arr);
      setMeterData(meterDataArr);
      // console.log('meter code', arr);
      // console.log('meter data arr', meterData);
    } catch (error) {
      console.log('---GetListMeterType Catch Error---', error);
    }
  }

  async function searchMeterInfo() {
    const params = {
      userName: credentials.userName ?? '',
      passWord: credentials.passWord ?? '',
      consumer_no: consumerNo ?? '',
    };
    console.log(params);
    setLoading(true);
    try {
      const response = await GetMeterConsumerInfo(params);
      console.log('response', response);
      if (response.status == 'Success') {
        setValue(JSON.stringify(response.meter_code));
        setPrevReading(JSON.stringify(response.previous_reading));
        setCurrReading(JSON.stringify(response.current_reading));
        setConsumption(JSON.stringify(response.consumption));
        setRemarks(response.remarks);
        setFilePath(response.imageFile);
        setMeterReadingImageName(response.meter_reading_image);
        setImageBase('base64');
        setLoading(false);
      } else {
        setValue('');
        setPrevReading('');
        setCurrReading('');
        setConsumption('');
        setRemarks('');
        setFilePath(null);
        setImageBase('');
        setLoading(false);
      }
    } catch (error) {
      console.log('---GetMeterConsumerInfo Catch Error---', error);
    }
  }

  async function updateCalc() {
    const calculation = await meterCalculation(
      meterData,
      value,
      prevReading,
      currReading,
    );
    setConsumption(JSON.stringify(calculation.consumption));
    // console.log('calculation', calculation);
  }

  async function updateMeterBtn() {
    try {
      const formData = new FormData();
      formData.append('userName', credentials.userName);
      formData.append('passWord', credentials.passWord);
      formData.append('consumer_no', consumerNo);
      formData.append('meter_code', value);
      formData.append('previous_reading', prevReading);
      formData.append('current_reading', currReading);
      formData.append('consumption', consumption);
      formData.append('remarks', remarks);
      formData.append(
        'meter_reading_image',
        !imageResponse
          ? meterReadingImageName
          : imageResponse.assets[0].fileName,
      );
      formData.append(
        'formFile',
        !imageResponse
          ? null
          : {
              uri: imageResponse.assets[0].uri,
              type: imageResponse.assets[0].type,
              name: imageResponse.assets[0].fileName,
            },
      );
      // console.log('Update Meter Info Params', formData);
      setLoading(true);
      const response = await UpdateMaterInfo(formData);
      // console.log('Update Meter Info Response ', response);
      if (response.status == 'Success') {
        setThankyouModalVisible(!thankyouModalVisible);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('---updateMeterBtn Catch Error---', error);
    }
  }

  async function logout() {
    try {
      await AsyncStorage.removeItem('loginCredentials');
      navigation.goBack();
    } catch (error) {
      console.log('---logout Catch Error---', error);
    }
  }

  return (
    <ImageBackground
      style={styles.imageBackground}
      resizeMode="cover"
      source={require('../../assets/images/homeBg.jpg')}>
      {/* free space for header */}
      <View style={styles.freeSpace}>
        <View style={styles.logoutIcon}>
          <Icons
            type={'MaterialIcons'}
            name={'logout'}
            color={'#0c2273'}
            size={20}
            onPress={() => logout()}
          />
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}>
          <Text style={styles.welcomeTxt}>
            Welcome{' '}
            <Text style={styles.usernameTxt}>
              {' '}
              {credentials && credentials.userName}
            </Text>
          </Text>
          {/* divider */}
          <View style={styles.divider} />
          <View style={styles.consSearchContianer}>
            <TextInputWrapper
              label={'Consumer No'}
              maxLength={11}
              inputContainerStyle={styles.consSearchInput}
              onChangeText={text => setconsumerNo(text)}
            />
            <ButtonWrapper
              activeOpacity={0.9}
              label={
                loading == true ? <Loader animating={loading} /> : 'Search'
              }
              buttonStyle={styles.consSearchBtn}
              labelStyle={styles.consSearchBtnLabel}
              onPress={() => searchMeterInfo()}
            />
          </View>
          {/* divider */}
          <View style={styles.divider} />
          <DropDownWrapper
            isOpen={open}
            placeholder={value ? value : 'Meter Code'}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            mainContainerStyle={styles.pickerContainer}
            pickerContainerStyle={styles.picker}
            placeholderStyle={
              value
                ? [styles.placeholderStyle, {color: '#000'}]
                : styles.placeholderStyle
            }
            textStyle={styles.pickerText}
            dropDownContainerStyle={styles.dropDownContainerStyle}
            onChangeValue={item => {
              setValue(item);
              updateCalc();
            }}
          />
          <View style={styles.divider} />
          <TextInputWrapper
            inputValue={prevReading}
            label={'Previous Reading'}
            inputContainerStyle={styles.inputs}
            editable={value == '9' ? false : true}
            onChangeText={text => {
              setPrevReading(text);
              // updateCalc();
            }}
          />
          <View style={styles.divider} />
          <TextInputWrapper
            inputValue={currReading}
            label={'Current Reading'}
            inputContainerStyle={styles.inputs}
            editable={value == '9' ? false : true}
            onChangeText={text => {
              setCurrReading(text);
              updateCalc();
            }}
          />
          <View style={styles.divider} />
          <TextInputWrapper
            inputValue={value.length > 0 && consumption}
            label={'Consumption'}
            inputContainerStyle={styles.inputs}
            onChangeText={text => {
              setConsumption(text);
              value != '9' && updateCalc();
            }}
          />
          <View style={styles.divider} />
          <TextInputWrapper
            inputValue={remarks}
            multiline={true}
            label={'Remarks'}
            inputContainerStyle={styles.remarksInput}
            onChangeText={text => setRemarks(text)}
          />
          <View style={styles.divider} />
          <View style={styles.addImgContainer}>
            <Text style={styles.addImgTxt}>Add Image:</Text>
            <ButtonWrapper
              activeOpacity={0.9}
              label={'Select'}
              buttonStyle={styles.addImgBtn}
              labelStyle={styles.addImgBtnTxt}
              onPress={() => setModalVisible(!modalVisible)}
            />
          </View>
          <View style={styles.divider} />
          <View style={styles.showImgHere}>
            {filePath === null ? (
              <Text style={styles.showImgHereTxt}>No Image</Text>
            ) : imageBase == 'base64' ? (
              <Image
                style={styles.showImage}
                resizeMode="cover"
                source={{
                  uri: `data:image/png;base64,${filePath}`,
                }}
              />
            ) : (
              <Image
                style={styles.showImage}
                resizeMode="cover"
                source={{
                  uri: filePath,
                }}
              />
            )}
          </View>
          <ButtonWrapper
            buttonStyle={styles.updateBtn}
            labelStyle={styles.updateBtnTxt}
            label={loading == true ? <Loader animating={loading} /> : 'Update'}
            activeOpacity={0.9}
            onPress={() => updateMeterBtn()}
          />
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
              style={styles.pressableContainer}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>Choose From</Text>
                <View style={styles.BtnContainer}>
                  <ButtonWrapper
                    label={
                      <View style={styles.BtnLabelView}>
                        <Icons
                          type={'Feather'}
                          name={'camera'}
                          color={'#0c2273'}
                          size={25}
                        />
                        <Text style={styles.BtnLabelTxt}>Camera</Text>
                      </View>
                    }
                    labelStyle={styles.labelStyle}
                    activeOpacity={0.9}
                    buttonStyle={styles.btnStyle}
                    onPress={() => {
                      captureImage('photo');
                      setModalVisible(!modalVisible);
                    }}
                  />
                  <ButtonWrapper
                    label={
                      <View style={styles.BtnLabelView}>
                        <Icons
                          type={'Feather'}
                          name={'image'}
                          color={'#0c2273'}
                          size={25}
                        />
                        <Text style={styles.BtnLabelTxt}>Gallery</Text>
                      </View>
                    }
                    labelStyle={styles.labelStyle}
                    activeOpacity={0.9}
                    buttonStyle={styles.btnStyle}
                    onPress={() => {
                      chooseFile('photo');
                      setModalVisible(!modalVisible);
                    }}
                  />
                </View>
              </View>
            </Pressable>
          </Modal>
          <Modal
            animationType="fade"
            transparent={true}
            visible={thankyouModalVisible}
            onRequestClose={() => {
              setThankyouModalVisible(!thankyouModalVisible);
            }}>
            <Pressable
              onPress={() => setThankyouModalVisible(!modalVisible)}
              style={styles.thankyouPressableContainer}>
              <View style={styles.thankyouModalView}>
                <View style={styles.crossIconView}>
                  <ButtonWrapper
                    label={
                      <Icons
                        type={'Feather'}
                        name={'x'}
                        color={Colors.black}
                        size={15}
                      />
                    }
                    activeOpacity={0.9}
                    buttonStyle={styles.crossbtnStyle}
                    onPress={() => {
                      setThankyouModalVisible(!thankyouModalVisible);
                    }}
                  />
                </View>
                <View style={styles.checkViewStyle}>
                  <View style={styles.checkIconStyle}>
                    <Icons
                      type={'Feather'}
                      name={'check'}
                      color={Colors.primary}
                      size={30}
                    />
                  </View>
                  <Text style={styles.checkTxtStyle}>Thank You</Text>
                </View>
              </View>
            </Pressable>
          </Modal>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

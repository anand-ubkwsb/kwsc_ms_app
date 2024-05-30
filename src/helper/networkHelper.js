import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const PostNetworkHandler = async (url, method) => {
  console.log(url, method);
  try {
    const response = await axios({
      method: method,
      url: url,
    })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        return error;
      });
    return response;
  } catch (error) {
    console.log('PostNetworkHandler Catch Error:', error);
  }
};

export const GetNetworkHandler = async (url, method) => {
  console.log(url, method);
  try {
    const response = await axios({
      method: method,
      url: url,
    })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        return error;
      });
    return response;
  } catch (error) {
    console.log('GetNetworkHandler Catch Error:', error);
  }
};

export const PostFileNetworkHandler = async (
  url,
  method,
  params = undefined,
) => {
  const token = await AsyncStorage.getItem('token');
  // console.log(url, method, params);
  try {
    const response = await axios({
      method: method,
      url: url,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        return res.data;
      })
      .catch(error => {
        return error;
      });
    return response;
  } catch (error) {
    console.log('PostNetworkHandler Catch Error:', error);
  }
};

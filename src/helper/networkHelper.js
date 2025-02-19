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
  console.log(url, method, params);
  try {
    const response = await axios({
      method: method,
      url: url,
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data',
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
    console.log('PostFileNetworkHandler Catch Error:', error);
  }
};

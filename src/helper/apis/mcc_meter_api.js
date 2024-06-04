import {baseUrl} from '../../config';
import {
  GetNetworkHandler,
  PostNetworkHandler,
  PostFileNetworkHandler,
} from '../networkHelper';

const getMeterConsumerInfoUrl = baseUrl + '/MCC/GetMeterConsumerInfo';
const getMeterUserLoginUrl = baseUrl + '/MCC/GetMeterUserLogin';
const getListMeterTypeUrl = baseUrl + '/MCC/GetListMeterType';
const getUpdateMeterInfoUrl = baseUrl + '/MCC/UpdateMeterConsumerInfo';

export const GetMeterConsumerInfo = async params => {
  const meterConsumerInfo = await GetNetworkHandler(
    `${getMeterConsumerInfoUrl}?userName=${params.userName}&passWord=${params.passWord}&consumer_no=${params.consumer_no}`,
    'GET',
  );
  return meterConsumerInfo;
};

export const GetListMeterType = async params => {
  const listMeterType = await GetNetworkHandler(getListMeterTypeUrl, 'GET');
  return listMeterType;
};

export const GetMeterUserLogin = async params => {
  const meterUserLogin = await PostNetworkHandler(
    `${getMeterUserLoginUrl}?userName=${params.userName}&passWord=${params.passWord}`,
    'POST',
  );
  return meterUserLogin;
};

export const UpdateMaterInfo = async params => {
  const udpateMeterInfo = await PostFileNetworkHandler(
    getUpdateMeterInfoUrl,
    'POST',
    params,
  );
  return udpateMeterInfo;
};

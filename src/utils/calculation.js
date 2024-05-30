export async function meterCalculation(
  meterData,
  value,
  prevReading,
  currReading,
) {
  let params = {
    reading: 0,
    consumption: 0,
  };
  for (let i = 0; i < meterData.length; i++) {
    const element = meterData[i];
    if (element.meter_type_id == value) {
      // console.log('calulate', element.factor, element.measurement_criteria);
      if (element.factor == '*') {
        params.reading = currReading - prevReading;
        params.consumption = params.reading * element.measurement_criteria;
        // console.log(params.consumption);
      } else if (element.factor == '/') {
        params.reading = currReading - prevReading;
        params.consumption = params.reading / element.measurement_criteria;
        // console.log(params.consumption);
      } else {
        params.consumption;
      }
    }
  }
  return params;
}

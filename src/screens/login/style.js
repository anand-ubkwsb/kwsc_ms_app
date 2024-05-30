import {StyleSheet} from 'react-native';
import {globalStyle, Colors} from '../../const';

export const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    alignItems: 'center',
  },
  freeSpace: {
    flex: 0.6,
  },
  container: {
    flex: 1,
    width: '100%',
    paddingHorizontal: globalStyle.padding_horizontal,
  },
  input: {
    fontSize: globalStyle.font_size_small,
    fontFamily: globalStyle.font_family_medium,
    paddingLeft: globalStyle.inputPadding,
    marginVertical: globalStyle.inputMargin,
    backgroundColor: Colors.white,
    borderRadius: globalStyle.border_radius,
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    color: 'black',
  },
  loginBtn: {
    height: globalStyle.height,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: globalStyle.border_radius,
    marginVertical: globalStyle.margin_vertical,
    backgroundColor: Colors.primary,
  },
  loginBtnTxt: {
    fontSize: globalStyle.font_size_small,
    fontFamily: globalStyle.font_family_medium,
    color: Colors.white,
  },
  errorMessage: {
    fontSize: globalStyle.font_size_xsmall,
    fontFamily: globalStyle.font_family_regular,
    color: Colors.error,
    textAlign: 'center',
    marginVertical: globalStyle.margin_vertical,
  },
});

import React from 'react';
import {View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function DropDownWrapper({
  isOpen,
  value,
  items,
  setOpen,
  setValue,
  setItems,
  placeholder,
  pickerContainerStyle,
  textStyle,
  dropDownContainerStyle,
  mainContainerStyle,
  placeholderStyle,
  currScreen,
  itemKey,
  dropdownKey,
  onPress,
  onChangeValue,
  onSelectItem,
}) {
  return (
    <View style={[{flex: currScreen === true ? 1 : 0}, mainContainerStyle]}>
      <DropDownPicker
        key={dropdownKey}
        itemKey={itemKey}
        open={isOpen}
        value={value}
        items={items}
        listMode="SCROLLVIEW"
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={placeholder}
        placeholderStyle={placeholderStyle}
        style={pickerContainerStyle}
        textStyle={textStyle}
        dropDownContainerStyle={dropDownContainerStyle}
        closeOnBackPressed
        onPress={onPress}
        onChangeValue={onChangeValue}
        onSelectItem={onSelectItem}
      />
    </View>
  );
}

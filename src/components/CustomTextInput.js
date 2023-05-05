import React from 'react';
import {TextInput} from 'react-native';

export default function CustomTextInput(props) {
  if (props?.inputRef) {
    return (
      <TextInput
        {...props}
        ref={props.inputRef || null}
        onChangeText={text => {
          if (props?.keyboardType === 'numeric') {
            props?.setValue(text.replace(/[^0-9]/g, ''));
          } else {
            props?.setValue(text);
          }
        }}
      />
    );
  } else {
    return (
      <TextInput
        {...props}
        onChangeText={text => {
          if (props?.keyboardType === 'numeric') {
            props?.setValue(text.replace(/[^0-9]/g, ''));
          } else {
            props?.setValue(text);
          }
        }}
      />
    );
  }
}

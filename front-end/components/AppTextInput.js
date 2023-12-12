import {
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useTheme } from '../theme/ThemeProvider';

const AppTextInput = ({ customStyles, ...otherProps }) => {

  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  return (
    <TextInput
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      placeholderTextColor={colors.grey}
      style={[
        {
          padding: 15,
          backgroundColor: colors.bg_secondary,
          borderRadius: 10,
          marginVertical: 10,
          elevation: 2,
          color: colors.text_main
        },
        focused && {
          borderWidth: 1.2,
          borderColor: colors.purple_pink,
        },
        customStyles,
      ]}
      {...otherProps}
    />

  );
};

export default AppTextInput;


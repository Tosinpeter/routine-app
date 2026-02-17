import React, { forwardRef } from "react";
import { TextInput as RNTextInput, TextInputProps } from "react-native";

export const AppTextInput = forwardRef<RNTextInput, TextInputProps>(
  (props, ref) => {
    return (
      <RNTextInput
        ref={ref}
        allowFontScaling={false}
        maxFontSizeMultiplier={1}
        {...props}
      />
    );
  }
);

AppTextInput.displayName = "AppTextInput";

/**
 * Re-export as TextInput for easier migration
 * Usage: import { TextInput } from '@/components/app-text-input'
 */
export const TextInput = AppTextInput;

export default AppTextInput;

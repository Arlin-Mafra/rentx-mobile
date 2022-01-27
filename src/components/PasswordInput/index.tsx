import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";
import theme from "../../styles/theme";

import { Container, InputText, IconContainer } from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
  value?: string;
}

export function PasswordInput({ iconName, value, ...rest }: Props) {
  const [isPassVisible, setIsPassVisible] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  function handleInputFocus() {
    setIsFocused(true);
  }
  function handleInputBlur() {
    setIsFocused(false);
    setIsFilled(!!value);
  }

  function handlePassVisibilyChange() {
    setIsPassVisible((prestate) => !prestate);
  }
  return (
    <Container isFocused={isFocused}>
      <IconContainer>
        <Feather
          name={iconName}
          size={24}
          color={isFocused || isFilled ? theme.colors.main : theme.colors.text}
        />
      </IconContainer>
      <InputText
        {...rest}
        secureTextEntry={isPassVisible}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <BorderlessButton onPress={handlePassVisibilyChange}>
        <IconContainer>
          <Feather
            name={isPassVisible ? "eye" : "eye-off"}
            size={24}
            color={theme.colors.text}
          />
        </IconContainer>
      </BorderlessButton>
    </Container>
  );
}

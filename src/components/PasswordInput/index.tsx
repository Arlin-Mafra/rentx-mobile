import React, { useState } from "react";
import { TextInputProps } from "react-native";
import { Feather } from "@expo/vector-icons";

import { Container, InputText, IconContainer } from "./styles";
import { BorderlessButton } from "react-native-gesture-handler";
import theme from "../../styles/theme";

interface Props extends TextInputProps {
  iconName: React.ComponentProps<typeof Feather>["name"];
}

export function PasswordInput({ iconName, ...rest }: Props) {
  const [isPassVisible, setIsPassVisible] = useState(true);

  function handlePassVisibilyChange() {
    setIsPassVisible((prestate) => !prestate);
  }
  return (
    <Container>
      <IconContainer>
        <Feather name={iconName} size={24} color={theme.colors.text} />
      </IconContainer>
      <InputText {...rest} secureTextEntry={isPassVisible} />
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

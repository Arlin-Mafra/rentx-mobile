import React from "react";
import { Feather } from "@expo/vector-icons";
import { Container } from "./styles";
import { useTheme } from "styled-components";
import { BorderlessButtonProps } from "react-native-gesture-handler";

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function LogOutButton({ color, ...rest }: Props) {
  const theme = useTheme();
  return (
    <Container {...rest}>
      <Feather
        size={24}
        name="power"
        color={color ? color : theme.colors.text_detail}
      />
    </Container>
  );
}

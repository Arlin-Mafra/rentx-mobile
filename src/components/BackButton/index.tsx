import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Container } from "./styles";
import { useTheme } from "styled-components";
import { BorderlessButtonProps } from "react-native-gesture-handler";

interface Props extends BorderlessButtonProps {
  color?: string;
}

export function BackButton({ color }: Props) {
  const theme = useTheme();
  return (
    <Container>
      <MaterialIcons
        size={24}
        name="chevron-left"
        color={color ? color : theme.colors.text}
      />
    </Container>
  );
}

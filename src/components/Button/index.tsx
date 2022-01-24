import React from "react";
import { ActivityIndicator } from "react-native";
import theme from "../../styles/theme";

import { Container, Title } from "./styles";

interface Props {
  title: string;
  color?: string;
  enabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  ligth?: boolean;
}
export function Button({
  title,
  color,
  ligth,
  enabled = true,
  loading = false,
  onPress,
  ...rest
}: Props) {
  return (
    <Container
      {...rest}
      onPress={onPress}
      color={color}
      enabled={enabled}
      style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }}
    >
      {loading ? (
        <ActivityIndicator size={20} color={theme.colors.shape} />
      ) : (
        <Title ligth={ligth}>{title}</Title>
      )}
    </Container>
  );
}

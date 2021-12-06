import React from "react";

import { Container, Title } from "./styles";

interface Props {
  title: string;
  color?: string;
  enabled?: boolean;
  onPress: () => void;
}
export function Button({
  title,
  color,
  enabled = true,
  onPress,
  ...rest
}: Props) {
  return (
    <Container
      {...rest}
      onPress={onPress}
      color={color}
      enabled={enabled}
      style={{ opacity: enabled ? 1 : 0.5 }}
    >
      <Title>{title}</Title>
    </Container>
  );
}

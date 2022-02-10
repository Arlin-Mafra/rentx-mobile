import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar, useWindowDimensions } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";
import { useRoute } from "@react-navigation/native";

type Props = NativeStackScreenProps<any, "Confirmation">;

interface Params {
  title: string;
  message?: string;
  nextScreenRoute: string;
}

export function Confirmation({ navigation }: Props) {
  const { width } = useWindowDimensions();

  const route = useRoute();
  const { title, message, nextScreenRoute } = route.params as Params;
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <LogoSvg width={width} />

      <Content>
        <DoneSvg width={80} height={80} />
        <Title>{title}</Title>

        <Message>{message}</Message>
      </Content>
      <Footer>
        <ConfirmButton
          title="Ok"
          onPress={() => navigation.navigate(nextScreenRoute)}
        />
      </Footer>
    </Container>
  );
}

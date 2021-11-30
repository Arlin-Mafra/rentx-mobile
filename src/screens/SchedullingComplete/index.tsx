import React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar, useWindowDimensions } from "react-native";

import LogoSvg from "../../assets/logo_background_gray.svg";
import DoneSvg from "../../assets/done.svg";

import { Container, Content, Title, Message, Footer } from "./styles";
import { ConfirmButton } from "../../components/ConfirmButton";

type Props = NativeStackScreenProps<any, "SchedullingComplete">;

export function SchedullingComplete({ navigation }: Props) {
  const { width } = useWindowDimensions();
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
        <Title>Carro alugado!</Title>

        <Message>
          Agora você só precisa ir {"\n"}
          até a concessionária da RENTX {"\n"}
          pegar seu automóvel
        </Message>
      </Content>
      <Footer>
        <ConfirmButton title="Ok" onPress={() => navigation.navigate("Home")} />
      </Footer>
    </Container>
  );
}

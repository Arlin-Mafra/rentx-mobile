import React from "react";
import { StatusBar } from "react-native";
import Logo from "../../assets/logo.svg";

import { Container, Header, HeaderContent, TotalCars } from "./styles";

export function Home() {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo />
          <TotalCars>Total de 12 carros</TotalCars>
        </HeaderContent>
      </Header>
    </Container>
  );
}

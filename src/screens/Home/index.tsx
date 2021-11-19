import React from "react";
import { StatusBar } from "react-native";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";

import { Container, Header, HeaderContent, TotalCars } from "./styles";

export function Home() {
  const DataCarOne = {
    brad: "audi",
    name: "RS 5 Coupé",
    rent: {
      period: "ao dia",
      price: 120,
    },
    thumbnail:
      "https://www.webmotors.com.br/imagens/prod/347972/AUDI_RS5_2.9_V6_FSI_GASOLINA_QUATTRO_TIPTRONIC_3479721705455744.png?s=fill&w=440&h=330&q=80&t=true",
  };

  const DataCarTwo = {
    brad: "audi",
    name: "RS 5 Coupé",
    rent: {
      period: "ao dia",
      price: 120,
    },
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRun7JVbIqz9BpNjV4TOxa6gPXKLZ_PV9ArtA&usqp=CAU",
  };
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
      <Car data={DataCarOne} />
      <Car data={DataCarTwo} />
    </Container>
  );
}

import React from "react";
import { BackButton } from "../../components/BackButton";
import { ImagesSlider } from "../../components/ImagesSlider";

import { Container, Header, CarImages } from "./styles";

export function CarDetails() {
  return (
    <Container>
      <Header>
        <BackButton onPress={() => {}} />
      </Header>
      <CarImages>
        <ImagesSlider
          imagesUrl={[
            "https://www.webmotors.com.br/imagens/prod/347972/AUDI_RS5_2.9_V6_FSI_GASOLINA_QUATTRO_TIPTRONIC_3479721705455744.png?s=fill&w=440&h=330&q=80&t=true",
          ]}
        />
      </CarImages>
    </Container>
  );
}

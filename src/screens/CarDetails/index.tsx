import React from "react";
import { useRoute } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImagesSlider } from "../../components/ImagesSlider";
import { Button } from "../../components/Button";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoriesIcon } from "../../Utils/getAccessoriesIcon";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Acessories,
  Footer,
} from "./styles";

type Props = NativeStackScreenProps<any, "CarDetails">;

interface Params {
  car: CarDTO;
}

export function CarDetails({ navigation }: Props) {
  const route = useRoute();
  const { car } = route.params as Params;
  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} />
      </Header>
      <CarImages>
        <ImagesSlider imagesUrl={car.photos} />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>
        <Acessories>
          {car.accessories.map((accessory) => (
            <Accessory
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoriesIcon(accessory.type)}
            />
          ))}
        </Acessories>
        <About>{car.about}</About>
      </Content>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={() => navigation.navigate("Schedulling", { car })}
        />
      </Footer>
    </Container>
  );
}

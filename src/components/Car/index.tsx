import React from "react";
import { useNetInfo } from "@react-native-community/netinfo";
import { RectButtonProps } from "react-native-gesture-handler";
import { Car as ModelCar } from "../../database/models/Car";
import { CarDTO } from "../../dtos/CarDTO";
import { getAccessoriesIcon } from "../../Utils/getAccessoriesIcon";

import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage,
} from "./styles";

interface Props extends RectButtonProps {
  data: ModelCar;
}

export function Car({ data, ...rest }: Props) {
  const MotorIcon = getAccessoriesIcon(data.fuel_type);

  const netinfo = useNetInfo();
  return (
    <Container {...rest}>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.period}</Period>
            <Price>
              R$ {netinfo.isConnected === true ? data.price : "..."}
            </Price>
          </Rent>
          <Type>
            <MotorIcon />
          </Type>
        </About>
      </Details>

      <CarImage
        source={{
          uri: data.thumbnail,
        }}
        resizeMode="contain"
      />
    </Container>
  );
}

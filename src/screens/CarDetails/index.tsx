import React, { useEffect, useState } from "react";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import { useRoute } from "@react-navigation/core";
import { useTheme } from "styled-components";

import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Accessory } from "../../components/Accessory";
import { BackButton } from "../../components/BackButton";
import { ImagesSlider } from "../../components/ImagesSlider";
import { Button } from "../../components/Button";

import { Car as ModelCar } from "../../database/models/Car";
import { CarDTO } from "../../dtos/CarDTO";
import { api } from "../../services/api";

import { getAccessoriesIcon } from "../../Utils/getAccessoriesIcon";
import { StatusBar, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import {
  Container,
  Header,
  CarImages,
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
  OffLineMessage,
} from "./styles";
import { useNetInfo } from "@react-native-community/netinfo";

type Props = NativeStackScreenProps<any, "CarDetails">;

interface Params {
  car: ModelCar;
}

export function CarDetails({ navigation }: Props) {
  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO);

  const route = useRoute();
  const { car } = route.params as Params;
  const theme = useTheme();
  const netinfo = useNetInfo();

  const scrolly = useSharedValue(0);

  const scrollHandle = useAnimatedScrollHandler((event) => {
    scrolly.value = event.contentOffset.y;
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrolly.value,
        [0, 200],
        [200, 90],
        Extrapolate.CLAMP
      ),
    };
  });

  const sliderCarStyleAnimated = useAnimatedStyle(() => {
    return {
      opacity: interpolate(scrolly.value, [0, 150], [1, 0], Extrapolate.CLAMP),
    };
  });

  useEffect(() => {
    async function fetchCarUpdated() {
      const response = await api.get(`/cars/${car.id}`);
      setCarUpdated(response.data);
    }

    if (netinfo.isConnected === true) {
      fetchCarUpdated();
    }
  }, [netinfo.isConnected]);
  return (
    <Container>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="transparent"
      />
      <Animated.View
        style={[
          headerStyleAnimation,
          styles.header,
          { backgroundColor: theme.colors.background_secondary },
        ]}
      >
        <Header>
          <BackButton onPress={() => navigation.goBack()} />
        </Header>
        <Animated.View style={sliderCarStyleAnimated}>
          <CarImages>
            <ImagesSlider
              imagesUrl={
                !!carUpdated.photos
                  ? carUpdated.photos
                  : [{ id: car.thumbnail, photo: car.thumbnail }]
              }
            />
          </CarImages>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: getStatusBarHeight() + 160,
        }}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>R$ {netinfo.isConnected === true ? car.price : "..."}</Price>
          </Rent>
        </Details>
        {carUpdated.accessories && (
          <Acessories>
            {carUpdated.accessories.map((accessory) => (
              <Accessory
                key={accessory.type}
                name={accessory.name}
                icon={getAccessoriesIcon(accessory.type)}
              />
            ))}
          </Acessories>
        )}
        <About>{car.about}</About>
      </Animated.ScrollView>
      <Footer>
        <Button
          title="Escolher período do aluguel"
          onPress={() => navigation.navigate("Schedulling", { car })}
          enabled={netinfo.isConnected === true}
        />
      </Footer>
      {netinfo.isConnected === false && (
        <OffLineMessage>
          Para realizar o agendamento do veículo é preciso estar conectado à
          internet.
        </OffLineMessage>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    overflow: "hidden",
    zIndex: 1,
  },
});

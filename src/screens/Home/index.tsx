import React, { useEffect, useState } from "react";
import { CarDTO } from "../../dtos/CarDTO";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import { Container, Header, HeaderContent, TotalCars, CarList } from "./styles";
import api from "../../services/api";
import { Load } from "../../components/Load";

type Props = NativeStackScreenProps<any, "Home">;

export function Home({ navigation }: Props) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getCars() {
      try {
        const response = await api.get("/cars");

        setCars(response.data);
        console.log(cars);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getCars();
  }, []);

  function handleCarDetails(car: CarDTO) {
    navigation.navigate("CarDetails", { car });
  }

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

      {loading ? (
        <Load />
      ) : (
        <CarList
          data={cars}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Car data={item} onPress={() => handleCarDetails(item)} />
          )}
        />
      )}
    </Container>
  );
}

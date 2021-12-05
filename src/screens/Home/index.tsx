import React, { useEffect, useState } from "react";
import { CarDTO } from "../../dtos/CarDTO";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import Logo from "../../assets/logo.svg";
import { Car } from "../../components/Car";
import api from "../../services/api";
import { Load } from "../../components/Load";
import theme from "../../styles/theme";
import {
  Container,
  Header,
  HeaderContent,
  TotalCars,
  CarList,
  MyCarButton,
} from "./styles";

type Props = NativeStackScreenProps<any, "Home">;

export function Home({ navigation }: Props) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getCars() {
      try {
        const response = await api.get("/cars");

        setCars(response.data);
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
  function handleMyCarsOpen() {
    navigation.navigate("MyCars");
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
      <MyCarButton onPress={handleMyCarsOpen}>
        <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
      </MyCarButton>
    </Container>
  );
}

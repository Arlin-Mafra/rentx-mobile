import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StatusBar } from "react-native";
import { BackButton } from "../../components/BackButton";
import { Car } from "../../components/Car";
import { Load } from "../../components/Load";
import { CarDTO } from "../../dtos/CarDTO";
import api from "../../services/api";
import theme from "../../styles/theme";

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsNumber,
} from "./styles";

interface CarsProps {
  id: string;
  user_id: string;
  car: CarDTO;
}

export function MyCars({ navigation }) {
  const [cars, setCars] = useState<CarsProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get(`/schedules_byuser?user_id=1`);
        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);
  return (
    <Container>
      <Header>
        <StatusBar
          barStyle="light-content"
          translucent
          backgroundColor="transparent"
        />
        <BackButton
          color={theme.colors.shape}
          onPress={() => navigation.goBack()}
        />
        <Title>
          Seus agendamentos,{"\n"}
          estão aqui.
        </Title>

        <SubTitle>Conforto, segurança e praticidade.</SubTitle>
      </Header>

      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsNumber>{cars.length}</AppointmentsNumber>
        </Appointments>
        {loading ? (
          <Load />
        ) : (
          <FlatList
            data={cars}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <Car data={item.car} />}
          />
        )}
      </Content>
    </Container>
  );
}

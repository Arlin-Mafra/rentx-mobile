import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { StatusBar } from "react-native";
import { BackButton } from "../../components/BackButton";
import { LogOutButton } from "../../components/LogOutButton ";
import { Feather } from "@expo/vector-icons";
import theme from "../../styles/theme";

import {
  Container,
  Header,
  HeaderContent,
  Title,
  PhotoContainer,
  Photo,
  PhotoButton,
} from "./styles";

type Props = NativeStackScreenProps<any, "Profile">;

export function Profile({ navigation }: Props) {
  return (
    <Container>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <BackButton
            onPress={() => navigation.goBack()}
            color={theme.colors.background_secondary}
          />
          <Title>Editar Perfil</Title>
          <LogOutButton />
        </HeaderContent>

        <PhotoContainer>
          <Photo
            source={{
              uri: "https://avatars.githubusercontent.com/u/55093136?v=4",
            }}
          />
          <PhotoButton>
            <Feather name="camera" color={theme.colors.shape} size={24} />
          </PhotoButton>
        </PhotoContainer>
      </Header>
    </Container>
  );
}

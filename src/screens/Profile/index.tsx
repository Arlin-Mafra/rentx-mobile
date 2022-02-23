import React, { useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Alert,
} from "react-native";
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
  Content,
  Options,
  Option,
  OptionTitle,
  Section,
} from "./styles";
import { Input } from "../../components/Input";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { PasswordInput } from "../../components/PasswordInput";
import { useAuth } from "../../hooks/Auth";
import { Button } from "../../components/Button";
import { useNetInfo } from "@react-native-community/netinfo";

type Props = NativeStackScreenProps<any, "Profile">;

export function Profile({ navigation }: Props) {
  const { user, SignOut, updatedUser } = useAuth();
  const netInfo = useNetInfo();

  const [option, setOption] = useState<"dataEdit" | "passwordEdit">("dataEdit");
  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driver_license, setDriverLicense] = useState(user.driver_license);

  function handleChangeOption(option: "dataEdit" | "passwordEdit") {
    if (netInfo.isConnected === false && option === "passwordEdit") {
      Alert.alert(
        "Você está offLine",
        "Para alterar a senha, é preciso está conectado à internet! "
      );
    } else {
      setOption(option);
    }
  }

  async function handleSelectAvatar() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (result.cancelled) {
      return;
    }

    if (result.uri) {
      setAvatar(result.uri);
    }
  }

  async function handleUpdateUser() {
    try {
      const schema = Yup.object().shape({
        driver_license: Yup.number().required("CNH é obrigatória!"),
        name: Yup.string().required("O nome é obrigatório!"),
      });

      const data = { driver_license, name };
      await schema.validate(data);

      await updatedUser({
        id: user.id,
        user_id: user.user_id,
        name,
        avatar,
        driver_license,
        token: user.token,
        email: user.email,
      });
      Alert.alert("Perfil Atualizado!");
      navigation.navigate("Home");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert("Opa!", error.message);
      } else {
        Alert.alert("Opa!", "Não foi possível atualizar o perfil.");
      }
    }
  }

  async function handleSignOut() {
    Alert.alert(
      "Tem certeza?",
      "Se você sair, precisrá de internet para conectar-se novamente.",
      [
        {
          text: "Cancelar",
          onPress: () => {},
        },
        {
          text: "Sim",
          onPress: () => SignOut(),
        },
      ]
    );
  }
  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
              <LogOutButton onPress={handleSignOut} />
            </HeaderContent>

            <PhotoContainer>
              {!!avatar && (
                <Photo
                  source={{
                    uri: avatar,
                  }}
                />
              )}
              <PhotoButton onPress={handleSelectAvatar}>
                <Feather name="camera" color={theme.colors.shape} size={24} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>
            <Options>
              <Option
                active={option === "dataEdit"}
                onPress={() => handleChangeOption("dataEdit")}
              >
                <OptionTitle active={option === "dataEdit"}>Dados</OptionTitle>
              </Option>
              <Option
                active={option === "passwordEdit"}
                onPress={() => handleChangeOption("passwordEdit")}
              >
                <OptionTitle active={option === "passwordEdit"}>
                  Trocar senha
                </OptionTitle>
              </Option>
            </Options>
            {option === "dataEdit" ? (
              <Section>
                <Input
                  iconName="user"
                  placeholder="Nome"
                  autoCorrect={false}
                  defaultValue={user.name}
                  onChangeText={setName}
                />
                <Input
                  iconName="mail"
                  editable={false}
                  defaultValue={user.email}
                />
                <Input
                  iconName="credit-card"
                  placeholder="CNH"
                  defaultValue={user.driver_license}
                  onChangeText={setDriverLicense}
                  keyboardType="numeric"
                />
                <Button title="Salvar alterações" onPress={handleUpdateUser} />
              </Section>
            ) : (
              <Section>
                <PasswordInput iconName="lock" placeholder="Senha atual" />
                <PasswordInput iconName="lock" placeholder="Senha" />
                <PasswordInput iconName="lock" placeholder="Repetir senha" />
              </Section>
            )}
          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

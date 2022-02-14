import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { Alert, Keyboard, KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { BackButton } from "../../../components/BackButton";
import { Bullet } from "../../../components/Bullet";
import { Button } from "../../../components/Button";
import { PasswordInput } from "../../../components/PasswordInput";
import { api } from "../../../services/api";
import theme from "../../../styles/theme";

import {
  Container,
  Header,
  Steps,
  Title,
  SubTitle,
  Form,
  FormTitle,
} from "./styles";

type Props = NativeStackScreenProps<any, " SignUpSecondStep">;

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  };
}

export function SignUpSecondStep({ navigation }: Props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const route = useRoute();
  const { user } = route.params as Params;
  function handleBack() {
    navigation.goBack();
  }

  async function handleRegister() {
    if (!password || !passwordConfirm) {
      Alert.alert("Opa!", "A senha e a confirmação são obrigatórias!");
    }
    if (password != passwordConfirm) {
      Alert.alert("Opa!", "A senha e a confirmação não conferem!");
    }

    try {
      await api.post("/users", {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password,
      });
    } catch (error) {
      console.log(error);
      Alert.alert("Opa!", "Algo deu errado na criação da sua conta.");
    }
    navigation.navigate("Confirmation", {
      title: "Conta criada!",
      message: `Agora é só fazer o login\n e aproveitar.`,
      nextScreenRoute: "SignIn",
    });
  }
  return (
    <Container>
      <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active={true} />
              <Bullet active={false} />
            </Steps>
          </Header>
          <Title>Crie sua{"\n"}conta</Title>
          <SubTitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil.
          </SubTitle>
          <Form>
            <FormTitle>2. Senha</FormTitle>
            <PasswordInput
              iconName="lock"
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              iconName="lock"
              placeholder="Repetir Senha"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
            />
          </Form>
          <Button
            title="Cadastrar"
            color={theme.colors.success}
            onPress={handleRegister}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Container>
  );
}

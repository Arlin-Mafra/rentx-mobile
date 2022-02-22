import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "../hooks/Auth";
import { AppTabRoutes } from "./app.tab.routes";
import { AuthRoutes } from "./auth.routes";
import { LoadingCar } from "../components/LoadingCar";

export function Routes() {
  const { user, loading } = useAuth();
  return loading ? (
    <LoadingCar />
  ) : (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}

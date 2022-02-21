import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { api } from "../services/api";
import { database } from "../database";
import { User as ModelUser } from "../database/models/User";

interface User {
  id: string;
  user_id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (crendials: SignInCredentials) => Promise<void>;
  SignOut: () => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", { email, password });

      const { token, user } = response.data;
      api.defaults.headers.authorization = `Bearer ${token}`;

      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        const userCreated = await userCollection.create((newUser) => {
          (newUser.user_id = user.id),
            (newUser.name = user.name),
            (newUser.email = user.email),
            (newUser.avatar = user.avatar),
            (newUser.driver_license = user.driver_license),
            (newUser.token = token);
        });
        const userData = userCreated._raw as unknown as User;
        setData(userData);
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async function SignOut() {
    try {
      const userCollection = database.get<ModelUser>("users");
      await database.write(async () => {
        const userSelected = await userCollection.find(data.id);
        await userSelected.destroyPermanently();
      });
      setData({} as User);
    } catch (error) {
      throw new Error(error);
    }
  }

  useEffect(() => {
    async function loadData() {
      const userCollection = database.get<ModelUser>("users");
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;
        console.log(userData);
        setData(userData);
      }
    }
    loadData();
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, SignOut, user: data }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };

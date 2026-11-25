import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppNavigation from "./src/Navegation/AppNavigation";

export default function App() {
  const [listo, setListo] = useState(false);

  useEffect(() => {
    AsyncStorage.removeItem("sesion_estadia").finally(() => setListo(true));
  }, []);

  if (!listo) return null;

  return <AppNavigation />;
}

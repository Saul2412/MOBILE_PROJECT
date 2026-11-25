import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import styles from "../css/loginStyles";

const CARRERA = "Ingeniería en Desarrollo y Gestión de Software";

function Register() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    password: "",
  });
  const [mostrarPassword, setMostrarPassword] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.nombre.trim() ||
      !formData.correo.trim() ||
      !formData.password
    ) {
      Alert.alert(
        "Campos obligatorios",
        "Por favor complete los campos obligatorios",
      );
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.correo.trim())) {
      Alert.alert("Correo inválido", "Ingresa un correo institucional válido");
      return;
    }

    if (formData.password.length < 8) {
      Alert.alert(
        "Contraseña muy corta",
        "La contraseña debe tener mínimo 8 caracteres",
      );
      return;
    }

    // La contraseña no se guarda: no hay servidor que la valide
    const payload = {
      nombre: formData.nombre.trim(),
      correo: formData.correo.trim(),
      matricula: "",
      carrera: CARRERA,
      proyecto: "",
      empresa: "",
      fechaIngreso: new Date().toLocaleTimeString(),
    };

    try {
      await AsyncStorage.setItem("sesion_estadia", JSON.stringify(payload));
      navigation.replace("Catalog");
    } catch (_error) {
      Alert.alert("Error", "No se pudo guardar la sesión");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            {/* Marca */}
            <View style={styles.brandRow}>
              <View style={styles.logo}>
                <Ionicons name="basketball-outline" size={28} color="#ffffff" />
              </View>
              <View>
                <Text style={styles.brandName}>CampusPlay</Text>
                <Text style={styles.brandSub}>Deporte universitario</Text>
              </View>
            </View>

            {/* Encabezado */}
            <Text style={styles.eyebrow}>ÚNETE A CAMPUSPLAY</Text>
            <Text style={styles.title}>Crea tu cuenta.</Text>
            <Text style={styles.subtitle}>
              Usa tus datos institucionales para comenzar.
            </Text>

            {/* Nombre completo */}
            <View style={styles.group}>
              <Text style={styles.label}>Nombre completo</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color="#94a3b8"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.nombre}
                  onChangeText={(text) => handleChange("nombre", text)}
                  placeholder="Tu nombre y apellidos"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Correo institucional */}
            <View style={styles.group}>
              <Text style={styles.label}>Correo institucional</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#94a3b8"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.correo}
                  onChangeText={(text) => handleChange("correo", text)}
                  placeholder="nombre@universidad.edu"
                  placeholderTextColor="#94a3b8"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>

            {/* Contraseña */}
            <View style={styles.group}>
              <Text style={styles.label}>Contraseña</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#94a3b8"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.password}
                  onChangeText={(text) => handleChange("password", text)}
                  placeholder="Mínimo 8 caracteres"
                  placeholderTextColor="#94a3b8"
                  secureTextEntry={!mostrarPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  onPress={() => setMostrarPassword((prev) => !prev)}
                  accessibilityLabel={
                    mostrarPassword
                      ? "Ocultar contraseña"
                      : "Mostrar contraseña"
                  }
                >
                  <Ionicons
                    name={mostrarPassword ? "eye-off-outline" : "eye-outline"}
                    size={20}
                    color="#94a3b8"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/* Botón */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Crear cuenta</Text>
              <Ionicons name="chevron-forward" size={18} color="#ffffff" />
            </TouchableOpacity>

            {/* Volver al login */}
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>¿Ya tienes una cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.linkAction}>Acceder</Text>
              </TouchableOpacity>
            </View>

            {/* Pie */}
            <View style={styles.footer}>
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color="#94a3b8"
              />
              <Text style={styles.footerText}>
                Acceso protegido por tu institución
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export default Register;

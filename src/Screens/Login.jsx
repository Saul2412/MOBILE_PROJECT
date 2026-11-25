import React, { useState, useEffect } from "react";
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

function Login() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    nombre: "",
    matricula: "",
    carrera: "Ingeniería en Desarrollo y Gestión de Software",
  });

  useEffect(() => {
    const verificarSesion = async () => {
      try {
        const sesionExistente = await AsyncStorage.getItem("sesion_estadia");
        if (sesionExistente) {
          navigation.replace("Catalog");
        }
      } catch (error) {
        console.error("Error al leer la sesión:", error);
      }
    };
    verificarSesion();
  }, [navigation]);

  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.nombre.trim() || !formData.matricula.trim()) {
      Alert.alert(
        "Campos obligatorios",
        "Por favor complete los campos obligatorios",
      );
      return;
    }

    const payload = {
      ...formData,
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
            <Text style={styles.eyebrow}>BIENVENIDO DE VUELTA</Text>
            <Text style={styles.title}>Todo listo para jugar.</Text>
            <Text style={styles.subtitle}>
              Accede al material deportivo de tu universidad en segundos.
            </Text>

            {/* Nombre */}
            <View style={styles.group}>
              <Text style={styles.label}>Nombre Completo</Text>
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
                  placeholder="Ej. Juan Pérez"
                  placeholderTextColor="#94a3b8"
                  autoCapitalize="words"
                />
              </View>
            </View>

            {/* Matrícula */}
            <View style={styles.group}>
              <Text style={styles.label}>Matrícula</Text>
              <View style={styles.inputWrapper}>
                <Ionicons
                  name="card-outline"
                  size={20}
                  color="#94a3b8"
                  style={styles.icon}
                />
                <TextInput
                  style={styles.input}
                  value={formData.matricula}
                  onChangeText={(text) => handleChange("matricula", text)}
                  placeholder="Ej. 21000123"
                  placeholderTextColor="#94a3b8"
                  keyboardType="numeric"
                />
              </View>
            </View>

            {/* Carrera */}
            <View style={styles.group}>
              <Text style={styles.label}>Carrera</Text>
              <View style={[styles.inputWrapper, styles.wrapperDisabled]}>
                <Ionicons
                  name="school-outline"
                  size={20}
                  color="#94a3b8"
                  style={styles.icon}
                />
                <TextInput
                  style={[styles.input, styles.inputDisabled]}
                  value={formData.carrera}
                  editable={false}
                  multiline
                />
              </View>
            </View>

            {/* Botón */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Acceder</Text>
              <Ionicons name="chevron-forward" size={18} color="#ffffff" />
            </TouchableOpacity>

            {/* Ir a registro */}
            <View style={styles.linkRow}>
              <Text style={styles.linkText}>¿Aún no tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                <Text style={styles.linkAction}>Crear cuenta</Text>
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

export default Login;

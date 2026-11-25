import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Admin() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel admin</Text>
      <Text style={styles.text}>Aquí irá la gestión del inventario.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1e293b",
  },
  text: {
    fontSize: 15,
    color: "#64748b",
    marginTop: 8,
  },
});

import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Catalog from "../Screens/Catalog";
import Loans from "../Screens/Loans";
import Admin from "../Screens/Admin";
import Profile from "../Screens/Profile";
import styles from "../css/tabsStyles";

const Tab = createBottomTabNavigator();

const TabIcon = ({ name, nameActive, focused, color, badge }) => (
  <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
    <Ionicons name={focused ? nameActive : name} size={22} color={color} />
    {badge && <View style={styles.badge} />}
  </View>
);

export default function MainTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Inventario"
      screenOptions={{
        headerStyle: { backgroundColor: "#0284c7" },
        headerTintColor: "#ffffff",
        headerTitleStyle: { fontWeight: "bold" },
        tabBarActiveTintColor: "#0ea5e9",
        tabBarInactiveTintColor: "#64748b",
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
        tabBarStyle: {
          height: 72,
          paddingTop: 8,
          paddingBottom: 10,
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#e2e8f0",
        },
      }}
    >
      <Tab.Screen
        name="Inventario"
        component={Catalog}
        options={{
          title: "Catálogo",
          tabBarLabel: "Inventario",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="home-outline"
              nameActive="home"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Prestamos"
        component={Loans}
        options={{
          title: "Mis préstamos",
          tabBarLabel: "Mis préstamos",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="bag-outline"
              nameActive="bag"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Admin"
        component={Admin}
        options={{
          title: "Panel admin",
          tabBarLabel: "Panel admin",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="shield-checkmark-outline"
              nameActive="shield-checkmark"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Mi Perfil",
          tabBarLabel: "Perfil",
          tabBarIcon: ({ focused, color }) => (
            <TabIcon
              name="person-outline"
              nameActive="person"
              focused={focused}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

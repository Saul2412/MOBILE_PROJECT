import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  iconWrap: {
    width: 48,
    height: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapActive: {
    backgroundColor: "#e0f2fe",
  },
  badge: {
    position: "absolute",
    top: 3,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#f97316",
  },
});

export default styles;

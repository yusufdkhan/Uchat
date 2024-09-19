import { Image, StyleSheet, View } from "react-native";
import { ActivityIndicator } from "react-native";

export default function StartPage() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/wallpaper.png")}
        style={{ resizeMode: "contain", height: 400 }}
      />
      <ActivityIndicator size="large" color="gray" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

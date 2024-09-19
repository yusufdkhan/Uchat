import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";

export default function Loader({ size }) {
  console.log(size);

  return (
    <View style={{ height: size, aspectRatio: 1 }}>
      <ActivityIndicator size={size} color="#6770C6" />
    </View>
  );
}

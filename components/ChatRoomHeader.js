import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";
import React, { useState } from "react";
import { router, Stack } from "expo-router";
import { Entypo, Ionicons } from "@expo/vector-icons";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";

export default function ChatRoomHeader({ user, router }) {
  const [openImage, setOpenImage] = useState(false);

  const handleImage = () => {
    setOpenImage((prev) => !prev);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "",
          headerShadowVisible: false,
          headerLeft: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              <TouchableOpacity onPress={() => router.back()}>
                <Entypo name="chevron-left" size={hp(4)} color="#737373" />
              </TouchableOpacity>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
              >
                <TouchableOpacity onPress={handleImage}>
                  <Image
                    source={{ uri: user?.profilUrl }}
                    style={{
                      height: hp(4.5),
                      aspectRatio: 1,
                      borderRadius: 100,
                    }}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: hp(2.5),
                    fontWeight: "500",
                    color: "#3F3F46",
                  }}
                >
                  {user.username}
                </Text>
              </View>
            </View>
          ),
          headerRight: () => (
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 32 }}
            >
              <TouchableOpacity>
                <Ionicons name="call" size={hp(2.8)} color={"#737373"} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="videocam" size={hp(2.8)} color={"#737373"} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />

      {/* Full-screen modal */}
      <Modal
        visible={openImage}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setOpenImage(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalBackground}
            onPress={() => setOpenImage(false)}
          >
            <View style={styles.circleContainer}>
              <Image
                source={{ uri: user?.profilUrl }}
                style={styles.modalImage}
                resizeMode="cover"
              />
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBackground: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  circleContainer: {
    width: wp(80),
    height: wp(80),
    borderRadius: wp(40),
    overflow: "hidden",
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
});

import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function MessageItem({ message, currentUser }) {
  if (currentUser?.userId == message?.userId) {
    // my message
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
          marginRight: 13,
        }}
      >
        <View style={{ width: wp(80) }}>
          <View
            style={{
              alignSelf: "flex-end",
              padding: 6,
              borderRadius: "60",
              borderWidth: 1,
              backgroundColor: "white",
              borderColor: "#e5e5e5",
            }}
          >
            <Text style={{ fontSize: hp(2.1) }}>{message?.text}</Text>
          </View>
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ width: wp(80), marginLeft: 10, marginBottom: 10 }}>
        <View
          style={{
            alignSelf: "flex-start",
            padding: 3,
            paddingHorizontal: 4,
            borderRadius: "60",
            borderWidth: 1,
            backgroundColor: "#e0e7ff",
            borderColor: "#c7d2fe",
          }}
        >
          <Text style={{ fontSize: hp(2.1) }}>{message?.text}</Text>
        </View>
      </View>
    );
  }
}

import { View, Text, Platform } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "../utilities/common";
import { useAuth } from "../context/authContext";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MenuItem } from "./CustomMenuItem";
import { AntDesign, Feather } from "@expo/vector-icons";

const ios = Platform.OS == "ios";

export default function HomeHeader() {
  const { top } = useSafeAreaInsets();
  const { user, logout } = useAuth();

  const handleProfile = () => {};
  const handleLogout = async () => {
    await logout();
  };

  return (
    <View
      style={{
        paddingTop: ios ? top : top + 10,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
        backgroundColor: "#6366F1",
        borderBottomEndRadius: 10,
        borderBottomStartRadius: 10,
        paddingBottom: 24,
      }}
    >
      <View>
        <Text style={{ fontSize: hp(3), fontWeight: "400", color: "white" }}>
          Chats
        </Text>
      </View>

      <View>
        <Menu>
          <MenuTrigger>
            <Image
              style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
              source={user?.profilUrl}
              placeholder={blurhash}
              transition={500}
            />
          </MenuTrigger>
          <MenuOptions
            customStyles={{
              optionsContainer: {
                borderRadius: 10,
                borderCurve: "continuous",
                marginTop: 30,
                marginLeft: -30,
                backgroundColor: "white",
                shadowOpacity: 0.2,
                shadowOffset: { width: 0, height: 0 },
                width: 160,
              },
            }}
          >
            <MenuItem
              text="profile"
              action={handleProfile}
              value={null}
              icon={<Feather name="user" size={hp(2.5)} color="#737373" />}
            />
            <Divider />
            <MenuItem
              text="Logout"
              action={handleLogout}
              value={null}
              icon={<AntDesign name="logout" size={hp(2.5)} color="#737373" />}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
}
const Divider = () => {
  return (
    <View style={{ padding: 1, width: "full", backgroundColor: "#e5e5e5" }} />
  );
};

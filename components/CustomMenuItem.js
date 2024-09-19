import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { MenuOption } from "react-native-popup-menu";
import { Text, View } from "react-native";

export const MenuItem = ({ text, action, value, icon }) => {
  return (
    <MenuOption onSelect={() => action(value)}>
      <View
        style={{
          paddingHorizontal: 16,
          paddingVertical: 4,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: hp(1.7),
            fontWeight: "semibold",
            color: "#525252",
          }}
        >
          {text}
        </Text>
        <Text>{icon}</Text>
      </View>
    </MenuOption>
  );
};

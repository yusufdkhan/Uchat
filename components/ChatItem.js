import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { formatDate, getRoomId } from "../utilities/common";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
// import { Image } from "expo-image";
export default function ChatItem({ item, router, currentUser }) {
  const [lastMessage, setLastMessage] = useState(undefined);

  useEffect(() => {
    let roomId = getRoomId(currentUser?.userId, item?.userId);

    console.log("currentuser", item);

    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "desc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setLastMessage(allMessages[0] ? allMessages[0] : null);
    });
    return unsub;
  }, []);

  const OpenChatRoom = () => {
    router.push({ pathname: "/ChatRoom", params: item });
  };

  const renderTime = () => {
  if(lastMessage){
    let date= lastMessage?.createdAt;
    return formatDate(new Date(date?.seconds * 1000))
  }
  };

  const renderLastMessage = () => {
    if (typeof lastMessage == "undefined") return "Loading...";
    if (lastMessage) {
      if (currentUser?.userId == lastMessage?.userId)
        return "You: " + lastMessage?.text;
      return lastMessage?.text;
    } else {
      return `Say hello to ${item?.username}`;
    }
  };

  return (
    <TouchableOpacity
      onPress={OpenChatRoom}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: 4,
        alignItems: "center",
        gap: 3,
        marginBottom: 4,
        paddingBottom: 2,
        borderBottom: "2px solid #E5E5E5",
      }}
    >
      <Image
        source={{ uri: item?.profilUrl }}
        style={{ height: hp(6), width: hp(6), borderRadius: 100 }}
        transition={500}
      />

      {/* name aand last message  */}
      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: hp(1.8),
              fontWeight: "semibold",
              color: "#262626",
            }}
          >
            {item?.username}
          </Text>
          <Text
            style={{
              fontSize: hp(1.6),
              fontWeight: "medium",
              color: "#737373",
            }}
          >
            {renderTime()}
          </Text>
        </View>
        <Text
          style={{
            fontSize: hp(1.6),
            fontWeight: "medium",
            color: "#737373",
          }}
        >
          {renderLastMessage()}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

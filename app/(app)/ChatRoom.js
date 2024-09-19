import {
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Alert,
  Keyboard,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import ChatRoomHeader from "../../components/ChatRoomHeader";
import MessageList from "../../components/MessageList";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Feather } from "@expo/vector-icons";
import CustomeKeyboard from "../../components/CustomeKeyboard";
import { useAuth } from "../../context/authContext";
import { getRoomId } from "../../utilities/common";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function ChatRoom() {
  const item = useLocalSearchParams(); //second user
  const { user } = useAuth(); //logged in user
  const router = useRouter();
  const [messages, setMessages] = useState([]);
  const textRef = useRef("");
  const inputRef = useRef(null);
  const scrollViewRef = useRef(null);

  useEffect(() => {
    createRoomIfNotExists();

    let roomId = getRoomId(user?.userId, item?.userId);
    const docRef = doc(db, "rooms", roomId);
    const messagesRef = collection(docRef, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    let unsub = onSnapshot(q, (snapshot) => {
      let allMessages = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setMessages([...allMessages]);
    });

    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      updateScrollView
    );

    return () => {
      unsub();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    updateScrollView();
  }, [messages]);

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const createRoomIfNotExists = async () => {
    // roomId
    let roomId = getRoomId(user?.userId, item?.userId);
    await setDoc(doc(db, "rooms", roomId), {
      roomId,
      createdAt: Timestamp.fromDate(new Date()),
    });
  };

  const handleSendMessage = async () => {
    let message = textRef.current.trim();
    if (!message) return;

    try {
      let roomId = getRoomId(user?.userId, item?.userId);
      const docRef = doc(db, "rooms", roomId);
      const messagesRef = collection(docRef, "messages");
      textRef.current = "";
      if (inputRef) inputRef?.current?.clear();

      const newDoc = await addDoc(messagesRef, {
        userId: user?.userId,
        text: message,
        profilUrl: user?.profilUrl,
        senderName: user?.username,
        createdAt: Timestamp.fromDate(new Date()),
      });

      console.log("new message id", newDoc.id);
    } catch (err) {
      Alert.alert("Message", err.message);
    }
  };

  return (
    <CustomeKeyboard inchat={true}>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar style="dark" />
        <ChatRoomHeader user={item} router={router} />
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <MessageList
              scrollViewRef={scrollViewRef}
              messages={messages}
              currentUser={user}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 10,
              paddingVertical: 8,
              backgroundColor: "white",
              borderTopWidth: 1,
              borderColor: "#D4D4D8",
              marginBottom: 18,
            }}
          >
            <TextInput
              ref={inputRef}
              onChangeText={(value) => (textRef.current = value)}
              placeholder="Type message..."
              style={{
                flex: 1,
                fontSize: hp(2),
                borderWidth: 1,
                borderColor: "#D4D4D8",
                borderRadius: 20,
                paddingHorizontal: 10,
                backgroundColor: "#F5F5F5",
                marginRight: 10,
                height: hp(4.5),
              }}
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              style={{
                backgroundColor: "#E4E4E7",
                padding: 10,
                borderRadius: 50,
              }}
            >
              <Feather name="send" size={hp(2.7)} color="#737373" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </CustomeKeyboard>
  );
}

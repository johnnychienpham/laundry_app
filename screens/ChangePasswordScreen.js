import {
    Pressable,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";

const ChangePasswordScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    // console.log(email);

    const handleChangePassword = () => {
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert("Password reset email is sent");
                navigation.goBack()
            })
            .catch((err) => {
                alert(err);
            });
    };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
            }}
        >
            <KeyboardAvoidingView style={{ padding: 10 }}>
                <Pressable
                    onPress={() => {
                        navigation.goBack();
                    }}
                    style={{ flexDirection: "row", alignItems: "center" }}
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                    <Text>Back</Text>
                </Pressable>

                <View style={{ marginVertical: 40 }}>
                    <Text
                        style={{
                            fontSize: 40,
                            fontWeight: "bold",
                            color: "black",
                            marginBottom: 15,
                        }}
                    >
                        Reset password
                    </Text>
                    <Text style={{ fontSize: 18, color: "gray" }}>
                        Enter the email associated with your account and we'll send an email
                        with instructions to reset your password.
                    </Text>
                </View>

                <View style={{ flexDirection: "column", marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, color: "gray" }}>Email Address</Text>
                    <TextInput
                        // placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholderTextColor="black"
                        style={{
                            fontSize: email ? 18 : 18,
                            borderWidth: 1,
                            borderColor: "gray",
                            width: "90%",
                            marginVertical: 10,
                            borderRadius: 7,
                            padding: 15,
                        }}
                    />
                </View>
                <Pressable
                    onPress={handleChangePassword}
                    style={{
                        width: "90%",
                        backgroundColor: "#662d91",
                        padding: 15,
                        borderRadius: 7,
                        // marginLeft: "auto",
                        // marginRight: "auto",
                    }}
                >
                    <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                        Send Instructions
                    </Text>
                </Pressable>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({});

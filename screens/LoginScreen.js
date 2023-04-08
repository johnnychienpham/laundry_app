import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("")
    const navigation = useNavigation();

    //nếu mà đã đăng nhập thì vào homescreen đầu tiên nếu ko thì vào login
    useEffect(() => {
        setLoading(true);
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (!authUser) {
                setLoading(false);
            }
            if (authUser) {
                navigation.navigate("Home");
            }
        });
        return unsubscribe;
    }, []);

    // const validate = () => {
    //     if (!email.includes("@")) {
    //         setEmailError("Invalid Email")
    //     } else if (password.length < 6) {
    //         setPasswordError("Wrong Password")
    //     } else if (email.length === 0) {
    //         setEmailError("Email is required")
    //     } else if (email.indexOf(' ') >= 0) {
    //         setEmailError('Email cannot contain spaces')
    //     } else if (password.indexOf(' ') >= 0) {
    //         setPasswordError('Password cannot contain spaces')
    //     } else {
    //         setEmailError("")
    //         setPasswordError("")
    //     }

    // }
    const login = () => {
        // validate()
        signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
            console.log("user credential", userCredential);
            const user = userCredential.user;
            console.log("user details", user);
        });
    };


    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
                alignItems: "center",
                padding: 10,
            }}
        >
            {loading ? (
                <View style={{ alignItems: "center", justifyContent: "center", flexDirection: "row", flex: 1 }}>
                    <Text style={{ marginRight: 10 }}>Loading</Text>
                    <ActivityIndicator size="large" color={"red"} />
                </View>
            ) : (
                <KeyboardAvoidingView>
                    <View
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 100,
                        }}
                    >
                        <Text
                            style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}
                        >
                            Sign In
                        </Text>
                        <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
                            Sign In to your account
                        </Text>
                    </View>

                    <View style={{ marginTop: 50 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <MaterialCommunityIcons
                                name="email-outline"
                                size={24}
                                color="black"
                            />
                            <TextInput
                                placeholder="Email"
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                                placeholderTextColor="black"
                                style={{
                                    fontSize: email ? 18 : 18,
                                    marginLeft: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "gray",
                                    width: 300,
                                    marginVertical: 10,
                                }}
                            />
                        </View>

                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Ionicons name="key-outline" size={24} color="black" />
                            <TextInput
                                placeholder="Password"
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                                secureTextEntry={true}
                                placeholderTextColor="black"
                                style={{
                                    fontSize: password ? 18 : 18,
                                    marginLeft: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "gray",
                                    width: 300,
                                    marginVertical: 20,
                                }}
                            />
                        </View>

                        <Pressable onPress={() => { navigation.navigate("ChangePassword") }}>
                            <Text style={{ textAlign: "right", color: "#662d91", fontSize: 14 }}>Forgot your password?</Text>
                        </Pressable>

                        {/* <View>
                            <Text style={{ color: "red" }}>{emailError}</Text>
                            <Text style={{ color: "red" }}>{passwordError}</Text>
                        </View> */}

                        <Pressable
                            onPress={login}
                            style={{
                                width: 200,
                                backgroundColor: "#662d91",
                                padding: 15,
                                borderRadius: 7,
                                marginTop: 50,
                                marginLeft: "auto",
                                marginRight: "auto",
                            }}
                        >
                            <Text
                                style={{ fontSize: 18, textAlign: "center", color: "white" }}
                            >
                                Login
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={() => navigation.navigate("Register")}
                            style={{ marginTop: 20 }}
                        >
                            <Text
                                style={{
                                    textAlign: "center",
                                    fontSize: 17,
                                    color: "gray",
                                    fontWeight: "500",
                                }}
                            >
                                Don't have an account? <Text style={{ color: "#BDB5D5" }}>Sign Up</Text>
                            </Text>
                        </Pressable>
                    </View>
                </KeyboardAvoidingView>
            )
            }
        </SafeAreaView >
    );
};

export default LoginScreen;

const styles = StyleSheet.create({});

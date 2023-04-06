import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    KeyboardAvoidingView,
    Alert,
    Image,
} from "react-native";
import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { TextInput } from "react-native";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { ImageBackground } from "react-native";
import BottomSheet, {
    BottomSheetView,
    bottomSheetView,
} from "@gorhom/bottom-sheet";
import * as ImagePicker from "expo-image-picker";

const UpdateScreen = () => {
    const userUid = auth.currentUser.uid
    const [image, setImage] = useState("https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png");
    const [phone, setPhone] = useState("");
    const navigation = useNavigation();

    const bottomSheetRef = useRef();
    const snapPoints = useMemo(() => ["40%"]);
    const handleBottomSheet = () => {
        bottomSheetRef.current.expand();
    };

    const takePhoto = async () => {
        //Ask the user for the permission to access the camera
        const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You've refused to allow this app to access your camera!");
            return;
        }

        const result = await ImagePicker.launchCameraAsync();

        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            // console.log(result.uri);
        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        // console.log(result);
        // setImage(result.assets[0].uri);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    const update = async () => {
        navigation.goBack()
        await updateDoc(doc(db, "users", `${userUid}`), {
            imageProfile: image,
            phone: phone
        })
    }

    // const register = () => {
    //     if (email === "" || password === "" || phone === "") {
    //         Alert.alert(
    //             "Invalid Details",
    //             "Please fill all the details",
    //             [
    //                 {
    //                     text: "Cancel",
    //                     onPress: () => console.log("Cancel Pressed"),
    //                     style: "cancel",
    //                 },
    //                 { text: "OK", onPress: () => console.log("OK Pressed") },
    //             ],
    //             { cancelable: false }
    //         );
    //     }
    //     createUserWithEmailAndPassword(auth, email, password).then(
    //         (userCredential) => {
    //             console.log("user credential", userCredential);
    //             const user = userCredential._tokenResponse.email
    //             const myUserUid = auth.currentUser.uid

    //             setDoc(doc(db, "users", `${myUserUid}`), {
    //                 email: user, // có thể pass email
    //                 phone: phone,
    //             })
    //         }
    //     );
    // };
    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "white",
                alignItems: "center",
                padding: 10,
            }}
        >
            <KeyboardAvoidingView>
                <View
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 100,
                    }}
                >
                    <Text style={{ fontSize: 20, color: "#662d91", fontWeight: "bold" }}>
                        Update
                    </Text>
                    <Text style={{ fontSize: 18, marginTop: 8, fontWeight: "600" }}>
                        Update your Account
                    </Text>
                </View>

                <Pressable
                    onPress={handleBottomSheet}
                    style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 30,
                    }}
                >
                    {image ? (
                        <ImageBackground
                            style={{
                                width: 100,
                                height: 100,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            source={{
                                uri: `${image}`,
                            }}
                        >
                            <MaterialCommunityIcons
                                style={{ opacity: 0.8 }}
                                name="file-image-plus-outline"
                                size={24}
                                color="white"
                            />
                        </ImageBackground>
                    ) : (
                        <ImageBackground
                            style={{
                                width: 100,
                                height: 100,
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                            source={{
                                uri: "https://www.kindpng.com/picc/m/451-4517876_default-profile-hd-png-download.png",
                            }}
                        >
                            <MaterialCommunityIcons
                                style={{ opacity: 0.8 }}
                                name="file-image-plus-outline"
                                size={24}
                                color="white"
                            />
                        </ImageBackground>
                    )}
                </Pressable>

                <View style={{ marginTop: 20 }}>
                    {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                    </View> */}

                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Feather name="phone" size={24} color="black" />
                        <TextInput
                            placeholder="Phone No"
                            value={phone}
                            onChangeText={(text) => setPhone(text)}
                            placeholderTextColor="black"
                            style={{
                                fontSize: phone ? 18 : 18,
                                marginLeft: 10,
                                borderBottomWidth: 1,
                                borderBottomColor: "gray",
                                width: 300,
                                marginVertical: 10,
                            }}
                        />
                    </View>

                    <Pressable
                        onPress={update}
                        style={{
                            width: 200,
                            backgroundColor: "#318CE7",
                            padding: 15,
                            borderRadius: 7,
                            marginTop: 50,
                            marginLeft: "auto",
                            marginRight: "auto",
                        }}
                    >
                        <Text style={{ fontSize: 18, textAlign: "center", color: "white" }}>
                            Update
                        </Text>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>

            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose={true}
                style={{
                    shadowColor: "#000000",
                    shadowOffset: {
                        width: 0,
                        height: 10,
                    },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                    elevation: 12,
                }}
            >
                <View style={{ flex: 1, alignItems: "center" }}>
                    <View style={{ alignItems: "center" }}>
                        <Text style={{ fontSize: 20, marginTop: 10, fontWeight: "600" }}>
                            Upload Image
                        </Text>
                        <Text style={{ fontSize: 12, marginVertical: 5 }}>
                            Choose your profile image
                        </Text>
                    </View>
                    <Pressable
                        onPress={takePhoto}
                        style={{
                            width: "90%",
                            padding: 15,
                            borderRadius: 7,
                            marginTop: 15,
                            borderColor: "gray",
                            borderWidth: 0.8,
                        }}
                    >
                        <Text
                            style={{ fontSize: 18, textAlign: "center", color: "#088F8F" }}
                        >
                            Take photo
                        </Text>
                    </Pressable>
                    <Pressable
                        onPress={pickImage}
                        style={{
                            width: "90%",
                            padding: 15,
                            borderRadius: 7,
                            marginTop: 15,
                            borderColor: "gray",
                            borderWidth: 0.8,
                        }}
                    >
                        <Text
                            style={{ fontSize: 18, textAlign: "center", color: "#088F8F" }}
                        >
                            Choose From Library
                        </Text>
                    </Pressable>
                    <Pressable
                        style={{
                            width: "90%",
                            padding: 15,
                            borderRadius: 7,
                            marginTop: 15,
                            borderColor: "gray",
                            borderWidth: 0.8,
                        }}
                        onPress={() => bottomSheetRef.current.close()}
                    >
                        <Text
                            style={{ fontSize: 18, textAlign: "center", color: "#088F8F" }}
                        >
                            Cancel
                        </Text>
                    </Pressable>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
};

export default UpdateScreen;

const styles = StyleSheet.create({});

import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

const OrderScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView>
            <View style={{ padding: 10, flexDirection: "row", alignItems: "center", height: "10%" }}>
                <Ionicons onPress={() => { navigation.navigate("Home") }} name="arrow-back" size={24} color="black" />
                <Text>Your Bucket</Text>
            </View>
            <LottieView
                source={require("../assets/thumbs.json")}
                style={{
                    height: 360,
                    width: 300,
                    alignSelf: "center",
                    marginTop: 40,
                    justifyContent: "center",
                }}
                autoPlay
                loop={false}
                speed={0.7}
            />
            <Text style={{ marginTop: 40, fontSize: 19, fontWeight: "600", textAlign: "center" }}>Your order has been placed</Text>
            <LottieView
                source={require("../assets/sparkle.json")}
                style={{
                    height: 300,
                    position: "absolute",
                    top: 100,
                    width: 300,
                    alignSelf: "center",

                }}
                autoPlay
                loop={false}
                speed={0.7}

            />
        </SafeAreaView>
    );
};

export default OrderScreen;

const styles = StyleSheet.create({});

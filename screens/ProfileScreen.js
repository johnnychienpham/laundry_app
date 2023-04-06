import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';
import { height } from 'deprecated-react-native-prop-types/DeprecatedImagePropType'


const ProfileScreen = () => {
    const user = auth.currentUser
    const navigation = useNavigation()
    const signOutUser = () => {
        signOut(auth).then(() => {
            navigation.replace("Login")
        }).catch(err => {
            console.log(err)
        })
    }
    return (
        // <SafeAreaView style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        //     <View style={{ padding: 10, flexDirection: "row", alignItems: "center" }}>
        //         <Ionicons onPress={() => { navigation.goBack() }} name="arrow-back" size={24} color="black" />
        //         <Text>Your Bucket</Text>
        //     </View>
        //     <Pressable style={{ marginVertical: 10 }}>
        //         <Text>welcome {user.email}</Text>
        //     </Pressable>

        //     <Pressable onPress={signOutUser}>
        //         <Text>Sign Out</Text>
        //     </Pressable>
        // </SafeAreaView>
        <SafeAreaView style={{ flex: 1 }}>
            <View style={{ padding: 10, flexDirection: "row", alignItems: "center", height: "10%" }}>
                <Ionicons onPress={() => { navigation.goBack() }} name="arrow-back" size={24} color="black" />
                <Text>Your Bucket</Text>
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", height: "90%" }}>
                <Pressable style={{ marginVertical: 10 }}>
                    <Text>Welcome {user.email}</Text>
                </Pressable>

                <Pressable onPress={() => navigation.navigate("Update")}>
                    <Text style={{
                        borderColor: "gray",
                        borderRadius: 6,
                        borderWidth: 0.8,
                        marginVertical: 10,
                        width: 90,
                        color: "#088F8F",
                        textAlign: "center",
                        padding: 5,
                        fontSize: 17,
                        fontWeight: "bold",
                    }}>Update</Text>
                </Pressable>
                <Pressable onPress={signOutUser}>
                    <Text style={{
                        borderColor: "gray",
                        borderRadius: 6,
                        borderWidth: 0.8,
                        marginVertical: 10,
                        width: 90,
                        color: "#E31837",
                        textAlign: "center",
                        padding: 5,
                        fontSize: 17,
                        fontWeight: "bold",
                    }}>Sign Out</Text>
                </Pressable>

            </View>

        </SafeAreaView>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({})
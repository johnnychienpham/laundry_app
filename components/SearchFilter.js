import { FlatList, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { Feather } from "@expo/vector-icons";
import DressItem from './DressItem';

const SearchFilter = ({ data, input, setInput }) => {
    return (
        <View>
            {/* <Text>Search Filter</Text> */}
            <FlatList data={data} renderItem={({ item }) => {
                if (input === "") {
                    return (
                        <DressItem item={item} />
                    )
                }
                if (item.name.toLowerCase().includes(input.toLowerCase())) {
                    return (
                        <DressItem item={item} />
                        // <Text>{item.name}</Text>
                    )
                    // console.log(item)
                }
            }}>

            </FlatList>
        </View>

    )
}

export default SearchFilter

const styles = StyleSheet.create({})
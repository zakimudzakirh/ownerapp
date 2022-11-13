import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNShake from 'react-native-shake';
import { useDispatch } from 'react-redux';

import { Colors, Fonts, Size } from '@styles/index';
import { Button, ImageView, ListItem, ButtonHeader } from '@components/index';
import { formatAge } from '@helpers/functionDate';
import { setMaster } from '@store/actions';

const OwnerDetailScreen = props => {

    const id = props?.route?.params?.id ?? {};
    const [data, setData] = useState();

    const dispatch = useDispatch();

    useEffect(() => {
        loadData();
        let shakeEvent = RNShake.addListener(() => {
            onMakeMaster(data);
        });
        return () => {
            shakeEvent.remove();
        }
    }, [data])

    const loadData = async () => {
        try {
            const response = await fetch(`https://ownerapp-d58c7-default-rtdb.firebaseio.com/owners/${id}.json`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            const resData = await response.json();
            setData(resData);
        }catch(error) {
            Alert.alert("Error", error.message, [{ text: "Ok", onPress: () => {} }])
        }
    }

    const onMakeMaster = async (data) => {
        try {
            await dispatch(setMaster(data));
            props.navigation.setParams({master: data});
        }catch(error) {
            Alert.alert("Error", error.message, [{ text: "Ok", onPress: () => {} }])
        }
    }

    const onFavorite = async () => {
        try {
            const response = await fetch(`https://ownerapp-d58c7-default-rtdb.firebaseio.com/owners/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    favorite: !data?.favorite
                })
            })
            const resData = await response.json();
            setData({
                ...data,
                favorite: resData?.favorite
            });
        } catch(error) {
            Alert.alert("Error", error.message, [{ text: "Ok", onPress: () => {} }])
        }
    }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={{flex: 1}}>
                <Text allowFontScaling={false} style={styles.title}>Owner Card</Text>
                <View style={styles.containerOwner}>
                    <ImageView 
                        style={styles.image}
                        textStyle={{color: Colors.white}}
                        text={`${data?.firstName?.[0] ?? ''}${data?.lastName?.[0] ?? ''}`}
                    />
                    <View style={{flex: 1}}>
                        <Text allowFontScaling={false} style={{fontFamily: Fonts.circularStd, color: Colors.gray, marginBottom: 2}}>First Name</Text>
                        <Text allowFontScaling={false} style={{fontFamily: Fonts.circularStd, color: Colors.black}}>{data?.firstName}</Text>
                        <Text allowFontScaling={false} style={{marginTop: Size.scaleSize(10), fontFamily: Fonts.circularStd, color: Colors.gray, marginBottom: 2}}>Last Name</Text>
                        <Text allowFontScaling={false} style={{fontFamily: Fonts.circularStd, color: Colors.black}}>{data?.lastName}</Text>
                    </View>
                    <AntDesign 
                        name={data?.favorite? "star" : "staro"}
                        size={28}
                        color={Colors.accent}
                        onPress={() => onFavorite()}
                    />
                </View>
                <Text allowFontScaling={false} style={styles.title}>Cats</Text>
                <FlatList 
                    data={data?.cats ?? []}
                    keyExtractor={(_, idx) => idx.toString()}
                    renderItem={(itemData) => (
                        <ListItem 
                            name={itemData.item.name}
                            desc={"Age: " + formatAge(itemData.item.born)}
                        />
                    )}
                />
            </View>
            <Button 
                disabled={!data}
                containerStyle={{marginHorizontal: 40}}
                title="Make Master"
                onPress={() => onMakeMaster(data)}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: Fonts.circularStdMedium,
        color: Colors.black,
        fontSize: Size.scaleFont(16)
    },
    title: {
        fontFamily: Fonts.circularStd,
        color: Colors.gray,
        marginHorizontal: Size.scaleSize(20), 
        marginTop: Size.scaleSize(30), 
        marginBottom: Size.scaleSize(12)
    },
    containerOwner: {
        flexDirection: 'row', 
        alignSelf: 'center', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginHorizontal: Size.scaleSize(15), 
        backgroundColor: Colors.white, 
        borderRadius: Size.scaleSize(20), 
        padding: Size.scaleSize(20)
    },
    image: {
        width: 56, 
        height: 56, 
        borderRadius: 56, 
        marginRight: Size.scaleSize(30), 
        backgroundColor: Colors.black, 
        borderColor: Colors.black
    }
})

export const screenOptions = navData => {
    const firstName = navData?.route?.params?.master?.firstName ?? '';
    const lastName = navData?.route?.params?.master?.lastName ?? '';
    const master = (firstName ?? '') + ' ' + (lastName ?? '');
    return {
        headerShown: true,
        headerLeft: () => (
            <HeaderButtons HeaderButtonComponent={ButtonHeader}>
                <Item 
                    IconComponent={AntDesign}
                    title="Back"
                    iconName={'arrowleft'}
                    onPress={() => navData.navigation.goBack()}
                />
            </HeaderButtons>
        ),
        headerTitle: () => (
            <View style={styles.header}>
                <ImageView 
                    style={{backgroundColor: Colors.white, borderColor: Colors.primary}}
                    textStyle={{color: Colors.primary}}
                    text={master !== ' '? firstName?.[0] + lastName?.[0] : '?'}
                />
                <Text allowFontScaling={false} style={styles.headerText}>{`Master: ${master !== ' '? master : '-empty-'}`}</Text>
            </View>
        ),
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: Colors.background
        }
    }
}

export default OwnerDetailScreen;
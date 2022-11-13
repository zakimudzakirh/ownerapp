import React, { useEffect, useState } from 'react';
import { FlatList, View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import { Colors, Fonts, Size } from '@styles/index';
import { ImageView, ListItem, Dropdown } from '@components/index';

const OwnersScreen = props => {

    const [owners, setOwners] = useState([]);
    const [sort, setSort] = useState('Name');

    const master = useSelector(state => state.master);

    useEffect(() => {
        const didFocus = props.navigation.addListener('focus', () => {
            loadOwners();
        });
        return () => {
            props.navigation.removeListener('focus', didFocus);
        }
    }, [])

    useEffect(() => {
        props.navigation.setParams({master: master});
    }, [master])

    const loadOwners = async () => {
        try {
            const response = await fetch('https://ownerapp-d58c7-default-rtdb.firebaseio.com/owners.json', {
                method: 'GET'
            })
            const resData = await response.json();
            onOwnerSort(sort, Object.values(resData));
        } catch(error) {
            Alert.alert("Error", error.message, [{ text: "Ok", onPress: () => {} }])
        }
    }

    const onOwnerSort = async (sort, array) => {
        try {
            setSort(sort);
            if(sort.toLowerCase() === 'name') {
                setOwners(onSortByName(array))
            }
            if(sort.toLowerCase() === 'number of cats') {
                setOwners(onSortByNumberCats(array))
            }
        } catch(error) {
            Alert.alert("Error", error.message, [{ text: "Ok", onPress: () => {} }])
        }
    }

    const onFavorite = async (id, favorite) => {
        try {
            const response = await fetch(`https://ownerapp-d58c7-default-rtdb.firebaseio.com/owners/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    favorite: !favorite
                })
            })
            const resData = await response.json();
            await loadOwners();
        } catch(error) {
            Alert.alert("Error", error.message, [{ text: "Ok", onPress: () => {} }])
        }
    }

    const onSortByName = (owners) => {
        const result = owners.sort((a, b) => {
            if(`${a.firstName} ${a.lastName}` > `${b.firstName} ${b.lastName}`) {
                return 1;
            } else if(`${b.firstName} ${b.lastName}` > `${a.firstName} ${a.lastName}`) {
                return -1;
            } else {
                return 0
            }
        })
        return result;
    }

    const onSortByNumberCats = (owners) => {
        const result = owners.sort((a, b) => {
            if(a.cats?.length > b.cats?.length) {
                return 1;
            } else if(b.cats?.length > a.cats?.length) {
                return -1;
            } else {
                return 0
            }
        })
        return result;
    }

    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.titleList}>
                <Text allowFontScaling={false} style={styles.labelTitle}>Owners List</Text>
                <Dropdown 
                    data={['Name', 'Number of cats']}
                    value={`Sort By: ${sort}`}
                    selected={(value) => onOwnerSort(value, owners)}
                />
            </View>
            <FlatList 
                refreshing={false}
                onRefresh={loadOwners}
                data={owners}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={(itemData) => (
                    <ListItem 
                        imageText={`${itemData.item.firstName[0]}${itemData.item.lastName[0]}`}
                        name={`${itemData.item.firstName} ${itemData.item.lastName}`}
                        usingFavorite
                        isFavorite={itemData.item.favorite}
                        onFavorite={() => onFavorite(itemData.item.id, itemData.item.favorite)}
                        onPress={() => props.navigation.navigate('OwnerDetail', { id: itemData.item.id })}
                    />
                )}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.background
    },
    titleList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: Size.scaleSize(20),
        marginVertical: Size.scaleSize(15)
    },
    labelTitle: {
        fontFamily: Fonts.circularStd,
        color: Colors.gray,
        marginRight: Size.scaleSize(5)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: Fonts.circularStdMedium,
        color: Colors.black,
        fontSize: Size.scaleFont(16)
    }
})

export const screenOptions = navData => {
    const firstName = navData?.route?.params?.master?.firstName ?? '';
    const lastName = navData?.route?.params?.master?.lastName ?? '';
    const master = (firstName ?? '') + ' ' + (lastName ?? '');
    return {
        headerShown: true,
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

export default OwnersScreen;
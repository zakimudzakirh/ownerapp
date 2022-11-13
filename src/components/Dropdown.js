import { Colors, Fonts, Size } from '@styles/index';
import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableHighlight,
    FlatList,
    Pressable
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign'

export const Dropdown = ({ selected, value, data }) => {
    const buttonRef = useRef();
    const [showDropdown, setShowDropdown] = useState(false);
    const [buttonFrame, setButtonFrame] = useState();

    const onSubmitHandler = (item) => {
        selected(item)
        hide();
    }

    const updatePosition = (callback) => {
        if (buttonRef && buttonRef.current.measure) {
            buttonRef.current.measure((fx, fy, width, height, px, py) => {
                setButtonFrame({x: px, y: py, w: width, h: height})
                callback && callback();
            });
        }
    }

    const show = () => {
        updatePosition(() => setShowDropdown(true));
    }

    const hide = () => {
        setShowDropdown(false);
    }

    const calculationPosition = () => {
        const dimensions = Dimensions.get('window');
        const windowWidth = dimensions.width;
        const windowHeight = dimensions.height;

        const rightSpace = windowWidth - buttonFrame.x;
        const showInLeft = rightSpace >= buttonFrame.x;

        const dropdownFrameHeight = data.length;

        const currentHeight = dropdownFrameHeight >= 300? 300 : dropdownFrameHeight;

        const positionStyle = {
            maxHeight: 300,
            top: (currentHeight + (buttonFrame.y + buttonFrame.h)) < windowHeight? buttonFrame.y + buttonFrame.h : buttonFrame.y - currentHeight,
            topBtn: buttonFrame.y + buttonFrame.h,
            heightBtn: buttonFrame.h
        };

        if (showInLeft) {
            positionStyle.left = buttonFrame.x;
        } else {
            positionStyle.right = rightSpace - buttonFrame.w;
        }

        return positionStyle;
    }
    
    const renderModal = () => {
        if (showDropdown && buttonFrame) {
            const frameStyle = calculationPosition();
            return (
                <Modal 
                    style={styles.modal}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                    backdropColor="transparent"
                    onBackdropPress={hide}
                    isVisible={true}
                >
                    <TouchableWithoutFeedback disabled={!showDropdown} onPress={hide}>
                        <TouchableWithoutFeedback disabled={!showDropdown}>
                            <View style={[styles.dropdown, frameStyle]}>
                                <FlatList 
                                    data={data}
                                    keyExtractor={(_, idx) => idx.toString()}
                                    renderItem={(itemData) => (
                                        <TouchableHighlight onPress={() => onSubmitHandler(itemData.item)} underlayColor="#ddd" >
                                            <View style={styles.dropdownItem}>
                                                <Text 
                                                    allowFontScaling={false}
                                                    style={[styles.textDropdownStyle]}>{itemData.item}</Text>
                                            </View>
                                        </TouchableHighlight>
                                    )}
                                />
                            </View>
                        
                        </TouchableWithoutFeedback>
                    </TouchableWithoutFeedback>
                </Modal>
            );
        }
    }
    
    return (
        <View>
            <Pressable ref={buttonRef} onPress={show}>
                <View style={styles.container}>
                    <Text allowFontScaling={false} style={styles.label}>{value}</Text>
                    <AntDesign 
                        name="caretdown"
                        color={Colors.gray}
                        size={Size.scaleSize(12)}
                    />
                </View>
            </Pressable>
            {renderModal()}
        </View>
    );
}

const styles = StyleSheet.create({
    modal: {
        height: '100%', 
        width: '100%', 
        padding: 0, 
        margin: 0
    },
    container: {
        flexDirection: 'row', 
        alignItems: 'center'
    },
    label: {
        fontFamily: Fonts.circularStd,
        color: Colors.gray,
        marginRight: Size.scaleSize(5)
    },
    dropdown: {
        position: 'absolute',
        backgroundColor: 'white',
        paddingVertical: 0, 
        elevation: 5
    },
    textDropdownStyle: {
        fontSize: Size.scaleFont(14),
        fontFamily: Fonts.circularStd,
        color: Colors.black
    },
    dropdownItem: {
        justifyContent: 'center',
        paddingHorizontal: 10, 
        borderBottomColor: '#ddd', 
        borderBottomWidth: 0.5, 
        paddingVertical: Size.scaleSize(10)
    }
});
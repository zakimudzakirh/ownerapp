import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';

import { Colors } from '@styles/index';

export const ButtonHeader = props => {
    return (
        <HeaderButton
            iconSize={28}
            color={Colors.black}
            {...props}
            style={{marginLeft: 5}}
        />
    )
}
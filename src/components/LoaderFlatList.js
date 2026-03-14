import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import colors from '../theme/colors';

const LoaderFlatList = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ActivityIndicator size="large" color={colors.primary} />
        </View>
    );
}

export default LoaderFlatList;
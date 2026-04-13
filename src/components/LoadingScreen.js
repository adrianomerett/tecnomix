import { View, ActivityIndicator } from 'react-native';

import colors from "../theme/colors";

import DefaultHeader from './DeaultHeader';

export default LoadingScreen = () => {
    return (
        <>
            <DefaultHeader />
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" color={colors.primary} />
            </View>
        </>
    );
}
import { View, ActivityIndicator } from 'react-native';

import styleflat from '../styles/StyleFlat';
import colors from '../theme/colors';

export default LoaderFavoritos = () => {
    return (
        <View style={styleflat.loaderfavorit}>
            <View style={styleflat.ctactiviindicator}>
                <ActivityIndicator size="small" color={colors.primary} />
            </View>
        </View>
    );
}
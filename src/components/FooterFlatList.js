import { View, Text, ActivityIndicator } from 'react-native';

import styleflat from '../styles/StyleFlat';

export default FooterFlatList = ({ loadingMore, paginaatual, totalpages, produtos }) => {
    if (loadingMore) {
        return <ActivityIndicator style={{ padding: 10 }} size="large" />
    }
    if (paginaatual >= totalpages && produtos.length > 0) {
        return (
            <View style={styleflat.footer}>
                <Text style={styleflat.txtfooter}>Fim dos resultados...</Text>
            </View>
        )
    }
}
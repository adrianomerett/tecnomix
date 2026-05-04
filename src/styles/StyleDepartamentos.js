import { StyleSheet } from 'react-native';
import colors from '../theme/colors';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#DDD9D9',
        padding: 16,
    },
    cttitle: {
        paddingBottom: 16,
    },
    txttitle: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    containercate: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 4
    },
    rowcat: {
        flexDirection: 'row',
        backgroundColor: colors.gray,
    },
    tochablecate: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingBottom: 8,
        paddingLeft: 4,
        paddingTop: 8,
    },
    txtcat:{
        fontSize : 16,
        fontWeight: 'bold',
        color: colors.primary,
        marginLeft: 4
    },
    rowsubcate: {
        paddingLeft: 16
    },
    tochablesubcate:{
        flex: 1,
        justifyContent: 'center',
        paddingBottom: 6,
        paddingTop: 6,
        borderBottomColor: colors.grayborder,
        borderStyle: 'dotted',
        borderBottomWidth: 1,
    },
    txtsubcate:{
        fontSize : 14,
        fontWeight: 'bold',
        color: colors.tertiary
    },
    lastSubCategoria: {
        borderWidth: 0
    }
});
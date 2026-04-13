import { StyleSheet } from 'react-native';

import color from "../theme/colors";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.grayfundo,
        padding: 10
    },
    containercadastro: {
        flex: 1,
        backgroundColor: color.white,
        marginTop: 10,
        borderRadius: 4,
        padding: 10,
    },
    cttitlelogin: {
        width: '100%',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txttitle: {
        fontSize: 16,
        color: color.graynavigation,
        fontWeight: 'bold',
    },
    containericon: {
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    circleicon: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: color.primary,
        padding: 4,
        backgroundColor: color.grayfundo,
    },
    fundoicon: {
        flex: 1,
        backgroundColor: color.secondary,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginBottom: 10,
    },
    containerloader: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 10,
    },
    ctcheckbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    txtcheckbox: {
        fontSize: 14,
        color: color.primary,
        fontWeight: 'bold',
    },
    containerloader: {
        flex: 1,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 10,
    }
});
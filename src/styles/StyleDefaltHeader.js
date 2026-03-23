import { StyleSheet } from "react-native";
import colors from "../theme/colors";

export default StyleSheet.create({
    header: {
        backgroundColor: colors.primary,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 16,
        color: colors.colorfont,
    },
    bars: {
        color: colors.colorfont,
    },
    centerheaders: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 16,
    },
    ctnameloja: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 4
    },
    txtnameloja: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.colorfont,
    },
    txtslogan: {
        fontSize: 14,
        color: colors.grayborder,
        paddingVertical: 4,
        fontWeight: "bold",
        fontStyle: "italic",
    },
    ctsearch: {
        width: "100%",
        flexDirection: 'column',
        padding: 2,
        backgroundColor: colors.white,
        borderRadius: 4,
        flexDirection: "row",
    },
    search: {
        padding: 2,
        width: "76%"
    },
    searchInput:{
        backgroundColor: colors.white,
        padding: 5,
        color: colors.colortitleproduct,
    },
    ctbutton: {
        width: "24%",
    },
    tchablebutton: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: colors.primary,
        borderBottomEndRadius: 4,
        borderTopEndRadius: 4,
    },
    txtbtn:{
        color: colors.colorfont,
        fontSize: 14,
        fontWeight: "bold",
    }
    
});

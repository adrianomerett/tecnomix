import { Snackbar, Text } from "react-native-paper";
export default SnackBarFavoritos = ({ visible, message, changeSnackbar }) => {
    return (
        <Snackbar
            visible={visible}
            onDismiss={changeSnackbar}
            action={{
                label: 'Fechar',
                onPress: () => {
                    // Faça algo quando o botão for clicado
                },
            }}
        >
            {message}
        </Snackbar>
    );
}
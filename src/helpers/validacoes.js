
const validaemail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}

// Função para gerar um código alfanumérico de 8 caracteres
const generateCode = () => {
    let code = "";
    const possible = "A0B1C2D3E4F5G6H7I8J9K0L1M2N3O4P5Q6R7S8T9U0V1W2X3Y4Z";
    for (let i = 0; i < 8; i++) {
        code += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return code;    
}

module.exports = {
    validaemail,
    generateCode
}
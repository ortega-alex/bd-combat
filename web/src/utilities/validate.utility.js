export const passwordIsValid = (password, currentPass = null) => {
    if (!password || String(password).trim() === '') return 'Contraseña vacío';
    const passRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*$/g;
    if (password.length < 6) return 'La contraseña debe tener al menos 6 caracteres';
    if (password.trim() === '') return 'La contraseña no puede estar vacía';
    if (currentPass && password === currentPass) return 'La nueva contraseña no puede ser igual a la actual';
    if (!passRegExp.test(password)) return 'La contraseña debe tener al menos una letra mayúscula, una letra minúscula y un número';
    return null;
};

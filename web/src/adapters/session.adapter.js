export const sessionAdapter = values => ({
    id_sesion: values.id_usuario,
    usuario: values.usuario,
    estado: values?.estado,
    correo: values?.correo,
    nombre: values?.nombre,
    imagen: values?.imagen,
    abreviatura: String(values.nombre).substring(0, 2).toUpperCase()
});

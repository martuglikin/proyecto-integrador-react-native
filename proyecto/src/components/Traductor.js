function traductor(error) {
    console.log(error);
    let result = ''

    if (error.code === "auth/invalid-email") { //vemos que error sale en consola y en base a eso le asignamos un texto
        result = "Ingrese una direccion de correo valida";
    } else if (error.code === "auth/email-already-in-use") {
        result = "Ya existe una cuenta creada con esa direccion de correo";
    } else {
        result = 'Error';
    }
    
    return result;
}
  export default traductor;
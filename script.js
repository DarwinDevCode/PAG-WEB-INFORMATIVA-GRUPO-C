document.addEventListener("DOMContentLoaded", function () {
    const botonMenu = document.querySelector(".boton-menu");
    const navegacionPrincipal = document.getElementById("navegacion-principal");

    if (botonMenu && navegacionPrincipal) {
        botonMenu.addEventListener("click", function () {
            const estaAbierto = navegacionPrincipal.classList.toggle("abierto");
            botonMenu.setAttribute("aria-expanded", estaAbierto ? "true" : "false");
        });

        const enlacesMenu = navegacionPrincipal.querySelectorAll("a");
        enlacesMenu.forEach(function (enlace) {
            enlace.addEventListener("click", function () {
                if (window.innerWidth < 768 && navegacionPrincipal.classList.contains("abierto")) {
                    navegacionPrincipal.classList.remove("abierto");
                    botonMenu.setAttribute("aria-expanded", "false");
                }
            });
        });
    }

    const formularioContacto = document.getElementById("formulario-contacto");
    const mensajeFormulario = document.getElementById("mensaje-formulario");

    if (formularioContacto) {
        formularioContacto.addEventListener("submit", function (evento) {
            evento.preventDefault();

            const campoNombre = document.getElementById("nombre");
            const campoCorreo = document.getElementById("correo");
            const campoMensaje = document.getElementById("mensaje");

            const mensajeErrorNombre = campoNombre.nextElementSibling;
            const mensajeErrorCorreo = campoCorreo.nextElementSibling;
            const mensajeErrorMensaje = campoMensaje.nextElementSibling;

            let formularioValido = true;

            [campoNombre, campoCorreo, campoMensaje].forEach(function (campo) {
                campo.classList.remove("campo-invalido");
            });
            [mensajeErrorNombre, mensajeErrorCorreo, mensajeErrorMensaje].forEach(function (texto) {
                texto.style.display = "none";
            });

            if (!campoNombre.value.trim()) {
                campoNombre.classList.add("campo-invalido");
                mensajeErrorNombre.style.display = "block";
                formularioValido = false;
            }

            const valorCorreo = campoCorreo.value.trim();
            const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!valorCorreo || !expresionCorreo.test(valorCorreo)) {
                campoCorreo.classList.add("campo-invalido");
                mensajeErrorCorreo.style.display = "block";
                formularioValido = false;
            }

            if (!campoMensaje.value.trim()) {
                campoMensaje.classList.add("campo-invalido");
                mensajeErrorMensaje.style.display = "block";
                formularioValido = false;
            }

            if (!formularioValido) {
                mensajeFormulario.textContent = "Por favor corrige los campos marcados.";
                mensajeFormulario.className = "mensaje-formulario mensaje-error-envio";
                return;
            }

            mensajeFormulario.textContent = "¡Gracias! Tu consulta se ha enviado con éxito.";
            mensajeFormulario.className = "mensaje-formulario mensaje-exito";

            formularioContacto.reset();
        });

        formularioContacto.addEventListener(
            "input",
            function (evento) {
                const elemento = evento.target;
                if (elemento.classList.contains("form-control")) {
                    if (elemento.value.trim()) {
                        elemento.classList.remove("campo-invalido");
                        const mensajeError = elemento.nextElementSibling;
                        if (mensajeError && mensajeError.classList.contains("mensaje-error")) {
                            mensajeError.style.display = "none";
                        }
                    }
                }
            },
            true
        );
    }
});

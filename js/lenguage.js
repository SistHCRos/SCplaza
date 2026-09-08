"use strict";

let textos = null;
let idiomaActual = "es";


/* ==================================================
   CARGAR JSON
================================================== */

async function cargarTextos() {

    const respuesta = await fetch("json/textos.json");

    if (!respuesta.ok) {
        throw new Error("No se pudo cargar textos.json");
    }

    textos = await respuesta.json();

}


/* ==================================================
   APLICAR TEXTOS
================================================== */

function aplicarIdioma() {

    if (!textos || !textos[idiomaActual]) {
        return;
    }

    const idioma = textos[idiomaActual];


    /* TEXTO */

    document.querySelectorAll("[data-texto]").forEach(elemento => {

        const clave = elemento.dataset.texto;

        if (idioma[clave] !== undefined) {
            elemento.textContent = idioma[clave];
        }

    });


    /* ARIA */

    document.querySelectorAll("[data-texto-aria]").forEach(elemento => {

        const clave = elemento.dataset.textoAria;

        if (idioma[clave] !== undefined) {

            elemento.setAttribute(
                "aria-label",
                idioma[clave]
            );

        }

    });


    /* ALT */

    document.querySelectorAll("[data-texto-alt]").forEach(elemento => {

        const clave = elemento.dataset.textoAlt;

        if (idioma[clave] !== undefined) {

            elemento.setAttribute(
                "alt",
                idioma[clave]
            );

        }

    });


    /* BOTÓN IDIOMA */

    const indicadorIdioma =
        document.getElementById("idiomaActual");

    if (indicadorIdioma) {

        indicadorIdioma.textContent =
            idioma.idiomaActual;

    }


    document.documentElement.lang =
        idiomaActual;

}


/* ==================================================
   CAMBIAR IDIOMA
================================================== */

function cambiarIdioma() {

    idiomaActual =
        idiomaActual === "es"
            ? "en"
            : "es";


    localStorage.setItem(
        "idioma",
        idiomaActual
    );


    aplicarIdioma();

}


/* ==================================================
   PREPARAR NAV
================================================== */

function prepararNav() {

    aplicarIdioma();


    const boton =
        document.getElementById("btnIdioma");


    if (boton && !boton.dataset.activado) {

        boton.addEventListener(
            "click",
            cambiarIdioma
        );

        boton.dataset.activado = "true";

    }

}


/* ==================================================
   CUANDO COMPONENTS.JS CARGA UN MÓDULO
================================================== */

document.addEventListener(
    "moduloCargado",
    prepararNav
);


/* ==================================================
   INICIO
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        const guardado =
            localStorage.getItem("idioma");


        if (
            guardado === "es" ||
            guardado === "en"
        ) {

            idiomaActual = guardado;

        }


        try {

            await cargarTextos();

            /*
             * Aplicamos los textos inmediatamente
             * por si el NAV ya terminó de cargar.
             */

            prepararNav();


        } catch (error) {

            console.error(
                "Error al cargar textos.json",
                error
            );

        }

    }
);
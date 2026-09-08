"use strict";


async function cargarModulo(id, archivo) {

    const contenedor = document.getElementById(id);

    if (!contenedor) {
        return;
    }


    try {

        const respuesta = await fetch(archivo);

        if (!respuesta.ok) {
            throw new Error();
        }


        const html = await respuesta.text();

        contenedor.innerHTML = html;


        /*
         * Avisamos al resto del sitio que
         * el módulo terminó de cargarse.
         */

        document.dispatchEvent(
            new CustomEvent("moduloCargado", {
                detail: {
                    id: id
                }
            })
        );


    } catch (error) {

        console.error("Error al cargar módulo:", archivo);

    }

}


/* ==============================
   CARGAR MÓDULOS
============================== */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await cargarModulo(
            "nav",
            "mod/nav.html"
        );

         await cargarModulo(
            "heroModulo",
            "mod/hero.html"
        );

    }
);
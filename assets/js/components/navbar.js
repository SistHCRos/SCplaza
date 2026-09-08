
import { iniciarIdioma } from "../components/idioma.js";


export async function loadNavbar() {

    try {

        const response = await fetch("..components/navbar.html");

        if (!response.ok) {
            throw new Error("No se pudo cargar el navbar");
        }

        const navbarHTML = await response.text();

        const navbarContainer = document.getElementById("navbar");

        navbarContainer.innerHTML = navbarHTML;

        initializeNavbar();

        // Iniciar idioma después de cargar el navbar
        iniciarIdioma();

    } catch (error) {

        console.error("Error cargando navbar:", error);

    }

}


function initializeNavbar() {

    const toggle = document.getElementById("navbarToggle");
    const menu = document.getElementById("navbarMenu");

    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {

        menu.classList.toggle("active");

        const icon = toggle.querySelector("i");

        icon.classList.toggle("bi-list");
        icon.classList.toggle("bi-x");

    });


    const links = menu.querySelectorAll(".nav-link");

    links.forEach(link => {

        link.addEventListener("click", () => {

            menu.classList.remove("active");

            const icon = toggle.querySelector("i");

            icon.classList.remove("bi-x");
            icon.classList.add("bi-list");

        });

    });

}
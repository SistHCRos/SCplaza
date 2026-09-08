"use strict";


function controlarNavScroll() {

    const nav = document.querySelector(".navbar");

    if (!nav) {
        return;
    }


    if (window.scrollY > 40) {

        nav.classList.add("nav-scroll");

    } else {

        nav.classList.remove("nav-scroll");

    }

}


window.addEventListener(
    "scroll",
    controlarNavScroll,
    {
        passive: true
    }
);


window.addEventListener(
    "load",
    controlarNavScroll
);
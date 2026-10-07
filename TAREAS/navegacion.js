document.addEventListener("click", function (evento) {
    if (
        evento.defaultPrevented ||
        evento.button !== 0 ||
        evento.metaKey ||
        evento.ctrlKey ||
        evento.shiftKey ||
        evento.altKey
    ) {
        return;
    }

    const enlace = evento.target.closest("a[href]");
    if (
        !enlace ||
        enlace.target === "_blank" ||
        enlace.hasAttribute("download")
    ) {
        return;
    }

    const destino = new URL(enlace.href, window.location.href);
    if (
        destino.origin !== window.location.origin ||
        (destino.pathname === window.location.pathname && destino.hash)
    ) {
        return;
    }

    evento.preventDefault();
    window.location.replace(destino.href);
});

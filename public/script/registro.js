function loadScreen(seleccion) {
    const caption = document.getElementById('captionSeleccion')
    const restOfData = document.getElementById('restOfData')

    caption.style.display = "none";
    restOfData.style.display = "block";

    if (seleccion == 'Fisica') {
        document.getElementById('fisicaContainer').style.display = "block";
        document.getElementById('moralContainer').style.display = "none";
    } else {
        document.getElementById('moralContainer').style.display = "block";
        document.getElementById('fisicaContainer').style.display = "none";
    }
}

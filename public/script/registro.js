function loadScreen(seleccion) {
    const caption=document.getElementById('regimen')
    const restOfData=document.getElementById('restOfData')
    document.getElementById('regimen').style.display="block"

    caption.style.display="none";
    restOfData.style.display="block";

    if (seleccion=='Fisica') {
        document.getElementById('fisicaContainer').style.display="block";
        document.getElementById('moralContainer').style.display="none";
    } else {
        document.getElementById('moralContainer').style.display="block";
        document.getElementById('fisicaContainer').style.display="none";
    }   
}
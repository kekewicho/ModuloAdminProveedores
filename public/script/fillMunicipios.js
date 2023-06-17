const estadoSelect = document.getElementById('entidad');
const municipioSelect = document.getElementById('municipio');
const localidadSelect = document.getElementById('localidad');
let csvData; // Declara la variable csvData en un alcance más amplio


fetch('/utils/localidadesData.csv')
    .then(response => response.text())
    .then(data => {
        const lines = data.split('\n');
        const headers = lines[0].split(',');

        csvData = lines.slice(1).map(line => {
            const columns = line.split(',');
            const rowData = {};

            headers.forEach((header, index) => {
                rowData[header] = columns[index];
            });

            return rowData;
        });

        // Aquí dentro del bloque de la función then, csvData está disponible
        estadoSelect.addEventListener('change', () => {
            munSeleccionados=[];
            const estadoSeleccionado = estadoSelect.value;
            municipioSelect.innerHTML = '';
            localidadSelect.innerHTML = '';

            csvData.forEach((row) => {
                if (row.CVE_ENT.includes(estadoSeleccionado)) {
                    if (!munSeleccionados.includes(row.CVE_MUN)) {
                        const option = document.createElement('option');
                        option.text = row.NOM_MUN.replace(/['"]+/g, '');
                        option.value = row.CVE_MUN.replace(/['"]+/g, '');
                        municipioSelect.add(option);
                        munSeleccionados.push(row.CVE_MUN)
                    }

                }
            });

            // Limpiar las opciones del selector de localidades
            localidadSelect.innerHTML = '';
        });

        municipioSelect.addEventListener('change', () => {
            const municipioSeleccionado = municipioSelect.value;
            const estadoSeleccionado = estadoSelect.value;

            localidadSelect.innerHTML = '';

            csvData.forEach((row) => {
                if (row.CVE_MUN.includes(municipioSeleccionado)&&row.CVE_ENT.includes(estadoSeleccionado)) {
                    console.log(municipioSeleccionado+" "+row.CVE_MUN.replace(/['"]+/g+" "+row.NOM_LOC.replace(/['"]+/g, '')))
                    const optionLoc = document.createElement('option');
                    optionLoc.text = row.NOM_LOC.replace(/['"]+/g, '');
                    optionLoc.value = row.CVE_LOC.replace(/['"]+/g, '');
                    localidadSelect.add(optionLoc);
                }
            });
        });
    });

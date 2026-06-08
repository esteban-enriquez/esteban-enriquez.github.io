const MESES = { 1: 'ene', 2: 'feb', 3: 'mar', 4: 'abr', 5: 'may', 6: 'jun', 7: 'jul', 8: 'ago', 9: 'sep', 10: 'oct', 11: 'nov', 12: 'dic' };

function formatearFecha(fechaStr) {
    if (!fechaStr) return "";
    const partes = fechaStr.split('-');
    return `${parseInt(partes[2], 10)} ${MESES[parseInt(partes[1], 10)]} ${partes[0]}`;
}

function configurarFechasPorDefecto() {
    const hoy = new Date();
    const anio = hoy.getFullYear();
    const mes = String(hoy.getMonth() + 1).padStart(2, '0');
    const dia = String(hoy.getDate()).padStart(2, '0');
    
    let diasHastaDomingo = (7 - hoy.getDay()) % 7;
    if (diasHastaDomingo === 0) diasHastaDomingo = 7;
    
    const proximoDomingo = new Date(hoy);
    proximoDomingo.setDate(hoy.getDate() + diasHastaDomingo);
    
    const anioDom = proximoDomingo.getFullYear();
    const mesDom = String(proximoDomingo.getMonth() + 1).padStart(2, '0');
    const diaDom = String(proximoDomingo.getDate()).padStart(2, '0');

    if(document.getElementById('fecha_emision')) {
        document.getElementById('fecha_emision').value = `${anio}-${mes}-${dia}`;
    }
    if(document.getElementById('fecha_reunion')) {
        document.getElementById('fecha_reunion').value = `${anioDom}-${mesDom}-${diaDom}`;
    }
}

function generarTextoDiscurso(tratamiento, fEmi, fReu, titulo) {
    return `Envigado ${fEmi}\n\n${tratamiento}\nCon gran alegría y gratitud, le extendemos una cordial invitación a participar en nuestra próxima Reunión Sacramental, que se llevará a cabo el domingo ${fReu}. Se le ha asignado un discurso de siete minutos ${titulo}.\n\nLe invitamos a prepararse con espíritu de oración, buscando inspiración para tocar el corazón de quienes asistan. Su dedicación, disposición y esmero en la preparación de este mensaje contribuirán a que nuestra reunión sea una experiencia espiritual significativa y edificante. Rogamos que el Espíritu Santo le guíe en este proceso, para que su mensaje llegue con poder y amor a cada alma presente.\n\nLe invitamos a sentarse con nosotros en el púlpito durante esta reunión y a llegar con 5 minutos de anticipación como preparación. Como parte de su preparación recuerde que "En la reunión sacramental no se deben utilizar ayudas visuales ni materiales audiovisuales" (véase 38.8.3 - Manual General: Servir en La Iglesia de Jesucristo de los Santos de los Últimos Días).\n\nSi lo desea, le animamos a escribir su discurso y compartirlo con nosotros. De este modo, podremos difundirlo entre nuestros hermanos y preservarlo como parte de la historia de nuestro amado Barrio Envigado.\n\nAgradecemos de antemano su confirmación y el servicio amoroso que brinda en esta sagrada asignación.\n\nCon aprecio y gratitud,\nOBISPADO BARRIO ENVIGADO\nJohan Ruiz - 1er Consejero\nAlejandro Taborda - Obispo\nLuis Vasquez - 2do Consejero`;
}

function generarTextoOracion(tratamiento, fEmi, fReu, tipoOracion) {
    return `Envigado ${fEmi}\n\n${tratamiento}\nCon alegría y gratitud en nuestro corazón, le extendemos una cordial invitación a elevar la ${tipoOracion} oración en nuestra próxima Reunión Sacramental, que se llevará a cabo el domingo ${fReu}.\n\nLe invitamos a prepararse con espíritu de reverencia, buscando inspiración para dirigirnos en humildad y fe ante nuestro Padre Celestial. Su disposición para ofrecer esta oración será una bendición para todos los presentes, invitando al Espíritu Santo a acompañarnos y a preparar nuestros corazones para recibir el mensaje del evangelio.\n\nApreciamos profundamente su disposición para servir en esta sagrada asignación y confiamos en que su oración será un medio para unirnos espiritualmente como congregación.\n\nLe invitamos a sentarse con nosotros en el púlpito durante esta reunión y a llegar con 5 minutos de anticipación como preparación.\n\nAgradecemos su confirmación y oramos para que el Señor le bendiga en este servicio.\n\nCon aprecio y gratitud,\nOBISPADO BARRIO ENVIGADO\nJohan Ruiz - 1er Consejero\nAlejandro Taborda - Obispo\nLuis Vasquez - 2do Consejero`;
}

document.addEventListener('DOMContentLoaded', () => {
    configurarFechasPorDefecto();

    // Lógica para la página de Discursos (index.html)
    const formDiscurso = document.getElementById('form-discurso');
    if(formDiscurso) {
        formDiscurso.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const sexo = document.getElementById('sexo').value;
            let nombre = document.getElementById('nombre').value.trim();
            const titulo = document.getElementById('titulo').value.trim();
            const fEmi = formatearFecha(document.getElementById('fecha_emision').value);
            const fReu = formatearFecha(document.getElementById('fecha_reunion').value);
            
            let tratamiento = sexo === 'F' ? "Estimada hermana" : "Estimado hermano";
            if (nombre) tratamiento += ` ${nombre}`;

            document.getElementById('out-fecha-emision').innerText = fEmi;
            document.getElementById('out-tratamiento').innerText = tratamiento;
            document.getElementById('out-fecha-reunion').innerText = fReu;
            document.getElementById('out-titulo').innerText = titulo ? ` ${titulo}` : '';

            document.getElementById('textoOculto').value = generarTextoDiscurso(tratamiento, fEmi, fReu, titulo);

            document.getElementById('seccion-formulario').style.display = 'none';
            document.getElementById('vista-resultado').style.display = 'block';
        });
    }

    // Lógica para la página de Oraciones (oracion.html)
    const formOracion = document.getElementById('form-oracion');
    if(formOracion) {
        formOracion.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const sexo = document.getElementById('sexo').value;
            let nombre = document.getElementById('nombre').value.trim();
            const tipoOracion = document.getElementById('tipo_oracion').value;
            const fEmi = formatearFecha(document.getElementById('fecha_emision').value);
            const fReu = formatearFecha(document.getElementById('fecha_reunion').value);
            
            let tratamiento = sexo === 'F' ? "Estimada hermana" : "Estimado hermano";
            if (nombre) tratamiento += ` ${nombre}`;

            document.getElementById('out-fecha-emision').innerText = fEmi;
            document.getElementById('out-tratamiento').innerText = tratamiento;
            document.getElementById('out-fecha-reunion').innerText = fReu;
            document.getElementById('out-tipo-oracion').innerText = tipoOracion;

            document.getElementById('textoOculto').value = generarTextoOracion(tratamiento, fEmi, fReu, tipoOracion);

            document.getElementById('seccion-formulario').style.display = 'none';
            document.getElementById('vista-resultado').style.display = 'block';
        });
    }

    // Interacciones de los botones de resultado
    const btnVolver = document.getElementById('btn-volver');
    if(btnVolver) {
        btnVolver.addEventListener('click', () => {
            document.getElementById('vista-resultado').style.display = 'none';
            document.getElementById('seccion-formulario').style.display = 'block';
        });
    }

    const btnCopiar = document.getElementById('btn-copiar');
    if(btnCopiar) {
        btnCopiar.addEventListener('click', () => {
            const texto = document.getElementById("textoOculto").value; 
            navigator.clipboard.writeText(texto)
                .then(() => alert("Mensaje copiado al portapapeles."))
                .catch(err => alert("Error al copiar: " + err));
        });
    }

    const btnPdf = document.getElementById('btn-pdf');
    if(btnPdf) {
        btnPdf.addEventListener('click', () => {
            window.scrollTo(0, 0); 
            const elemento = document.getElementById('hoja-carta'); 
            const nombreArchivo = formDiscurso ? 'Invitacion_Discurso.pdf' : 'Invitacion_Oracion.pdf';
            const opciones = { 
                margin: 0, 
                filename: nombreArchivo, 
                image: { type: 'jpeg', quality: 0.98 }, 
                html2canvas: { scale: 2, useCORS: true, scrollY: 0 }, 
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } 
            }; 
            html2pdf().set(opciones).from(elemento).save();
        });
    }
});
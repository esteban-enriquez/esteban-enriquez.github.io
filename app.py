from flask import Flask, render_template, request
from datetime import date, timedelta

app = Flask(__name__)

MESES = {
    1: 'ene', 2: 'feb', 3: 'mar', 4: 'abr',
    5: 'may', 6: 'jun', 7: 'jul', 8: 'ago',
    9: 'sep', 10: 'oct', 11: 'nov', 12: 'dic'
}

def formatear_fecha(fecha_str):
    if not fecha_str: return ""
    partes = fecha_str.split('-')
    return f"{str(int(partes[2]))} {MESES[int(partes[1])]} {partes[0]}"

def obtener_fechas_default():
    hoy = date.today()
    dias_hasta_domingo = (6 - hoy.weekday()) % 7
    if dias_hasta_domingo == 0: dias_hasta_domingo = 7
    proximo_domingo = hoy + timedelta(days=dias_hasta_domingo)
    return hoy.strftime('%Y-%m-%d'), proximo_domingo.strftime('%Y-%m-%d')

@app.route('/', methods=['GET', 'POST'])
def discurso():
    if request.method == 'POST':
        sexo = request.form.get('sexo')
        nombre = request.form.get('nombre', '').strip()
        titulo = request.form.get('titulo', '').strip()
        
        f_emi = formatear_fecha(request.form.get('fecha_emision'))
        f_reu = formatear_fecha(request.form.get('fecha_reunion'))
        
        tratamiento = "Estimada hermana" if sexo == 'F' else "Estimado hermano"
        if nombre:
            tratamiento += f" {nombre}"
            
        invitacion_plana = (
            f"Envigado {f_emi}\n\n"
            f"{tratamiento}\n"
            f"Con gran alegría y gratitud, le extendemos una cordial invitación a participar en nuestra próxima "
            f"Reunión Sacramental, que se llevará a cabo el domingo {f_reu}. Se le ha asignado un "
            f"discurso de siete minutos {titulo}.\n\n"
            f"Le invitamos a prepararse con espíritu de oración, buscando inspiración para tocar el corazón de "
            f"quienes asistan. Su dedicación, disposición y esmero en la preparación de este mensaje "
            f"contribuirán a que nuestra reunión sea una experiencia espiritual significativa y edificante. "
            f"Rogamos que el Espíritu Santo le guíe en este proceso, para que su mensaje llegue con poder y amor a cada alma presente.\n\n"
            f"Le invitamos a sentarse con nosotros en el púlpito durante esta reunión y a llegar con 5 minutos de anticipación como preparación. "
            f"Como parte de su preparación recuerde que \"En la reunión sacramental no se deben utilizar ayudas "
            f"visuales ni materiales audiovisuales\" (véase 38.8.3 - Manual General: Servir en La Iglesia de "
            f"Jesucristo de los Santos de los Últimos Días).\n\n"
            f"Si lo desea, le animamos a escribir su discurso y compartirlo con nosotros. De este modo, "
            f"podremos difundirlo entre nuestros hermanos y preservarlo como parte de la historia de nuestro amado Barrio Envigado.\n\n"
            f"Agradecemos de antemano su confirmación y el servicio amoroso que brinda en esta sagrada asignación.\n\n"
            f"Con aprecio y gratitud,\n"
            f"OBISPADO BARRIO ENVIGADO\n"
            f"Johan Ruiz - 1er Consejero\n"
            f"Alejandro Taborda - Obispo\n"
            f"Luis Vasquez - 2do Consejero"
        )
        
        return render_template('resultado_discurso.html', 
                               invitacion_plana=invitacion_plana,
                               tratamiento=tratamiento,
                               fecha_emision=f_emi,
                               fecha_reunion=f_reu,
                               titulo=titulo)

    f_emi, f_reu = obtener_fechas_default()
    return render_template('discurso.html', fecha_emision=f_emi, fecha_reunion=f_reu)

@app.route('/oracion', methods=['GET', 'POST'])
def oracion():
    if request.method == 'POST':
        sexo = request.form.get('sexo')
        nombre = request.form.get('nombre', '').strip()
        tipo_oracion = request.form.get('tipo_oracion')
        
        f_emi = formatear_fecha(request.form.get('fecha_emision'))
        f_reu = formatear_fecha(request.form.get('fecha_reunion'))
        
        tratamiento = "Estimada hermana" if sexo == 'F' else "Estimado hermano"
        if nombre:
            tratamiento += f" {nombre}"
            
        invitacion_plana = (
            f"Envigado {f_emi}\n\n"
            f"{tratamiento}\n"
            f"Con alegría y gratitud en nuestro corazón, le extendemos una cordial invitación a elevar la "
            f"{tipo_oracion} oración en nuestra próxima Reunión Sacramental, que se llevará a cabo el "
            f"domingo {f_reu}.\n\n"
            f"Le invitamos a prepararse con espíritu de reverencia, buscando inspiración para dirigirnos "
            f"en humildad y fe ante nuestro Padre Celestial. Su disposición para ofrecer esta oración será "
            f"una bendición para todos los presentes, invitando al Espíritu Santo a acompañarnos y a "
            f"preparar nuestros corazones para recibir el mensaje del evangelio.\n\n"
            f"Apreciamos profundamente su disposición para servir en esta sagrada asignación y "
            f"confiamos en que su oración será un medio para unirnos espiritualmente como congregación.\n\n"
            f"Le invitamos a sentarse con nosotros en el púlpito durante está reunión "
            f"y a llegar con 5 minutos de anticipación como preparación.\n\n"
            f"Agradecemos su confirmación y oramos para que el Señor le bendiga en este servicio.\n\n"
            f"Con aprecio y gratitud,\n"
            f"OBISPADO BARRIO ENVIGADO\n"
            f"Johan Ruiz - 1er Consejero\n"
            f"Alejandro Taborda - Obispo\n"
            f"Luis Vasquez - 2do Consejero"
        )
        
        return render_template('resultado_oracion.html', 
                               invitacion_plana=invitacion_plana,
                               tratamiento=tratamiento,
                               fecha_emision=f_emi,
                               fecha_reunion=f_reu,
                               tipo_oracion=tipo_oracion)

    f_emi, f_reu = obtener_fechas_default()
    return render_template('oracion.html', fecha_emision=f_emi, fecha_reunion=f_reu)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=False)
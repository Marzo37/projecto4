//todo==========================================
//todo          Header
//todo==========================================

const select = document.getElementById('select')
const navegadorItem = document.querySelectorAll('.navegador')
var remove = document.querySelectorAll('.remove')

select.style.width =` ${navegadorItem[0].getBoundingClientRect().width + 20}px`
select.style.left =`${navegadorItem[0].getBoundingClientRect().left - 10}px`
navegadorItem[0].style.mixBlendMode= 'hard-light'

navegadorItem.forEach(navI => {
    navI.addEventListener('click', (e)=>{
        select.style.width =` ${navI.getBoundingClientRect().width + 20}px`
        select.style.left =`${navI.getBoundingClientRect().left - 10}px`
        navI.style.mixBlendMode= 'hard-light'
        navegadorItem.forEach(navi =>{
            if (navi != navI){
                navi.style.mixBlendMode = 'normal'
            }
        })
    })
});

//todo==========================================
//todo          Relojes
//todo==========================================

const zonaHoraria = document.getElementById('zonaHoraria')
const relojes = document.querySelectorAll('.hora')
const fechas = document.querySelectorAll('.fecha')
const zonas = document.getElementById('zonaHoraria')
const todasLasZonasHorarias = Intl.supportedValuesOf("timeZone");

function opcionZonaHoraria(zona){
        return `<option value="${zona}">${zona}</option>`
    }

todasLasZonasHorarias.forEach(zona => {
    zonas.innerHTML += opcionZonaHoraria(zona)
});

function relojZona(timeZone) {
    const ahora = new Date();
    let hora = new Intl.DateTimeFormat("es-ES", {
    timeZone: timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
    }).format(ahora)
    
    let fecha = new Intl.DateTimeFormat("es-ES", {
    timeZone: timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric"
    }).format(ahora)

    return [hora, fecha]
}
function actualizar(){
    var timeZone = zonaHoraria.value
    relojes.forEach(reloj => {
        reloj.textContent = relojZona(timeZone)[0]
    });
    fechas.forEach(fecha => {
        fecha.textContent = relojZona(timeZone)[1]
    });
}

setInterval(actualizar, 1000)



//todo==========================================
//todo          Temporizador
//todo==========================================

const form = document.getElementById('addTemporizador')
const temporizadores = document.querySelector('.temporizadorList')
const temporizadorReloj = document.querySelector('.temporizadorReloj')
const detener = document.querySelector('.detenerTemporizador')

var idTemporizador = 0
var botonIniciarTemporizador = document.querySelectorAll('.iniciarTemporizador')
var pausar = document.querySelector('.pausarTemporizador')
var pausa = false
var detenidoT = true

const audio = new Audio("assets/alarm.wav");

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    let data = new FormData(form)

    let horas = data.get('horas')
    let minutos = data.get('minutos')
    let segundos = data.get('segundos')

    if (horas+minutos+segundos!=0){
        
        horas =cerar(horas);
        minutos =cerar(minutos);
        segundos =cerar(segundos);
        
        let newTemporizador = `
            <div class="temporizadotItem">
                <h4 class="temporizadorReloj">${horas}:${minutos}:${segundos}</h4>
                <button class="botones iniciarTemporizador" >Iniciar</button>
                <button type="button" class="botones remove" >Remove</button>
            </div>
        `;
        
        temporizadores.innerHTML+= newTemporizador;

        idTemporizador++;

        botonIniciarTemporizador = document.querySelectorAll('.iniciarTemporizador');
        
        bitonesIniciar()

        remove = document.querySelectorAll('.remove')
        remover()
    }
})
detener.addEventListener('click',(e)=>{
    temporizadorReloj.textContent= '00:00:00'
    pausa = false
    detenidoT= true
})

function cerar(a){
    if (a==0) return '00'
    else if (a < 10) return  `0${a}`
    else return a
}
function decrescer(a){
    a=Number(a)
    if (a>0) return cerar(a-1)
    return cerar(a)
}
function bitonesIniciar(){
    botonIniciarTemporizador.forEach(iniciar => {
        iniciar.addEventListener('click', (e)=>{
            timeTemporizador = [...iniciar.parentElement.children].find(el=>el.classList.contains('temporizadorReloj')).textContent
            temporizadorReloj.textContent = timeTemporizador
            pausa = false
        })
    });
}
function descontar() {
    if (!pausa){
        if (temporizadorReloj.textContent != '00:00:00'){
            detenidoT = false
            let segundos=temporizadorReloj.textContent.split(':')[2]
            let minutos=temporizadorReloj.textContent.split(':')[1]
            let horas=temporizadorReloj.textContent.split(':')[0]

            if (segundos == "00"){
                if(minutos == "00"){
                    horas = decrescer(horas)
                    minutos = "59"
                }else{
                    minutos = decrescer(minutos)
                    segundos = "59"
                }
            }else{
                segundos = decrescer(segundos)
            }

            temporizadorReloj.textContent=`${horas}:${minutos}:${segundos}`
        }
    }
    if (temporizadorReloj.textContent == '00:00:00'){
        if (!detenidoT) {
            audio.play()
            detenidoT = true
        }
    }
}

setInterval(descontar, 1000)

pausar.addEventListener(`click`, e => {
    if (pausa) {
        pausa = false;
        pausar.textContent = `Pausar`
    }
    else {
        pausa = true
        pausar.textContent = `Reproducir`
    }
})


function remover(){
    remove.forEach(rem => {
        rem.addEventListener('click',()=>{
            if (rem.classList.contains('removeAlarma')){
                alarmas = alarmas.filter(al => al[2] != Number(rem.dataset.idAlarma) )
            }
            rem.parentElement.remove()
        })
    });
}

//todo==========================================
//todo          Cronometro
//todo==========================================

const cronometroReloj = document.querySelector('.cronometroReloj')
const pausarC = document.querySelector('.pausarCronometro')
const detenerC = document.querySelector('.detenerCronometro')
const iniciarC = document.querySelector('.iniciarCronometro')
const guardar = document.querySelector('.guardarCronometro')
const historialCronometro = document.querySelector('.historialList')

var detenidoC = true
var pausaC = false
var detenidoC = true
var iniciar = false
var numeroDeCrono = 0


function crescer(a){
    a=Number(a)
    if (a<1000) return cerar(a+1)
    return cerar(a)
}

function contar() {
    if (iniciar){
        if (!pausaC){
            detenidoC = false
            let milisegundos=cronometroReloj.textContent.split(':')[3]
            let segundos=cronometroReloj.textContent.split(':')[2]
            let minutos=cronometroReloj.textContent.split(':')[1]
            let horas=cronometroReloj.textContent.split(':')[0]
            
            if (milisegundos == "99") {
                if (segundos == "59"){
                    if(minutos == "59"){
                        horas = crescer(horas)
                        minutos = "00"
                    }else{
                        minutos = crescer(minutos)
                        segundos = "00"
                    }
                }else{
                    segundos = crescer(segundos)
                    milisegundos = "00"
                }
            }else{
                    milisegundos = crescer(milisegundos)
            }
            
            cronometroReloj.textContent=`${horas}:${minutos}:${segundos}:${milisegundos}`
        }
        if (cronometroReloj.textContent == '00:00:00'){
            if (!detenidoC) {
                audio.play()
                detenidoC = true
            }
        }
    }
}

pausarC.addEventListener(`click`, e => {
    if (pausaC) {
        pausaC = false;
        pausarC.textContent = `Pausar`
    }
    else {
        pausaC = true
        pausarC.textContent = `Reproducir`
    }
})

detenerC.addEventListener('click',(e)=>{
    cronometroReloj.textContent= '00:00:00:00'
    pausaC = false
    detenidoC= true
    iniciar= false
})

iniciarC.addEventListener('click',()=>{
    iniciar = true
})

guardar.addEventListener('click',()=>{
    numeroDeCrono++
    let timeGuard = cronometroReloj.textContent
    historialCronometro.innerHTML += `
        <div class="temporizadorGuardado">
            <h3>${numeroDeCrono} - </h3>
            <h3>${timeGuard}</h3>
            <button type="button" class="botones remove" >Remove</button>
        </div>
    `
    remove = document.querySelectorAll('.remove')
    remover()
})




setInterval(contar,10)



//todo==========================================
//todo          Alarma
//todo==========================================

const addAlarma = document.getElementById('addAlarma')
const historialAlarmas = document.getElementById('listaAlarmas')
var diaActual = relojZoneAlarm(zonaHoraria.value).split(', ')
var alarmas = []
var idAlarma = 0

function relojZoneAlarm(zona) {
    const ahora = new Date();
    let infoZone = new Intl.DateTimeFormat("es-ES",{
        timeZone: zona,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        weekday: "long",
    }).format(ahora)
    return infoZone
}

addAlarma.addEventListener('submit',(e)=>{

    e.preventDefault();

    let dataAlarma = new FormData(addAlarma)

    let hora = dataAlarma.get('horas')
    let minuto = dataAlarma.get('minutos')
    let segundo = dataAlarma.get('segundos')

    let horaExacta = `${cerar(hora)}:${cerar(minuto)}:${cerar(segundo)}`

    const dias = {
        lunes: dataAlarma.get('lunes') , 
        martes: dataAlarma.get('martes') , 
        miercoles: dataAlarma.get('miercoles') , 
        jueves: dataAlarma.get('jueves') , 
        viernes: dataAlarma.get('viernes') , 
        sabado: dataAlarma.get('sabado') , 
        domingo: dataAlarma.get('domingo') , 
    }

    const diasDeAlarma = Object.keys(dias).filter(key => dias[key] != null )

    
    for (let i = 0; i < diasDeAlarma.length; i++) {
        alarmas.push([diasDeAlarma[i],horaExacta,idAlarma])
        
    }
    
    
    let alarmaContent = `
            <div class="alarmaItem">
                <h3>${horaExacta}</h3>
                <p>${diasDeAlarma}</p>
                <button type="button" class="removeAlarma botones remove" data-id-alarma="${idAlarma}">Remove</button>
            </div>
    
    `
    
    if (diasDeAlarma.length == 0) {
        let todaLaSemana = ['lunes','martes','miercoles','jueves','viernes','sabado','domingo']
        for (let i = 0; i < todaLaSemana.length; i++) {
            alarmas.push([todaLaSemana[i],horaExacta,idAlarma])
        }
        alarmaContent = `
            <div class="alarmaItem">
                <h3>${horaExacta}</h3>
                <p>${todaLaSemana.join(', ')}</p>
                <button type="button" class="removeAlarma botones remove" data-id-alarma="${idAlarma}">Remove</button>
            </div>
    
    `
    }
    historialAlarmas.innerHTML += alarmaContent
    idAlarma++

    
    remove = document.querySelectorAll('.remove')
    remover()
    
})

function revisarAlarmas() {
    for (let i = 0; i < alarmas.length; i++) {
        const element = alarmas[i];
        if (element[0] == diaActual[0]){
            if (element[1] == diaActual[1]){
                audio.play()
            }
        }
    }
}

function actualizarDiaActual() {
    diaActual = relojZoneAlarm(zonaHoraria.value).split(', ')
}

setInterval(revisarAlarmas, 1000)
setInterval(actualizarDiaActual, 1000)




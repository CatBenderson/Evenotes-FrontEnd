function newEvent(){
    const titulo= document.getElementById('titulo');
    const descripcion = document.getElementById('descripcion')
    const fecha= document.getElementById('fecha')
    const horaInicio=document.getElementById('horaInicio')
    const horaFin=document.getElementById('horaFin')
    const lugar=document.getElementById('lugar')
    const estadoEv=document.getElementById('estadoEv')
  
  if(titulo.value!="" & fecha.value!=""){
    axios({
      method:"POST",
      url: 'http://localhost:80/main',
      data:{
          "titulo": titulo.value,
          "descripcion": descripcion.value,
          "fecha": fecha.value,
          "horaInicio": horaInicio.value,
          "horaFin": horaFin.value,
          "lugar": lugar.value,
          "usuario":""
      }
  }).then((res)=>{
      console.log(res);
      if(res.data=="Evento creado"){
        recuperaTarjetas();
        estadoEv.innerHTML=res.data
        titulo.value=""
        descripcion.value=""
        fecha.value=""
        horaInicio.value=""
        horaFin.value=""
        lugar.value=""
      }else{
        estadoEv.innerHTML="Título de evento ya existente"
      }
  }).catch(error=>{
      console.log(error);
      throw new Error(error);
  });
  }else if(titulo.value=="" || fecha.value==""){
    estadoEv.innerHTML="Campos obligatorios vacios"
  }

}

function recuperaTarjetas(){
    axios({
      method:"GET",
      url: 'http://localhost:80/main',
  }).then((res)=>{
        var evento = res.data
        conjuntoTarjetas.innerHTML="";
        for (let i = 0; i < evento.length; i++) {
            let content = `<div class="row row-striped border mt-2" id="${evento[i].titulo}">
    <div class="col-2">
        <h1><span class="badge badge-secondary bg-primary">${getDia(evento[i].fecha)}</span></h1>
        <h4 style="font-size: calc(0.5em + 0.8vw); text-align: left;" >${getMesTxt(evento[i].fecha)}</h4>
        <h4 style="font-size: calc(0.5em + 0.8vw); text-align: left;">${getAnio(evento[i].fecha)}</h4>
    </div>
    <div class="col-8 pl-5 pr-4">
        <h3 class="text-uppercase"><strong>${evento[i].titulo}</strong></h3>
        <ul class="list-inline">
            <li class="list-inline-item"><i class="fa fa-clock-o text-primary" aria-hidden="true"></i> ${evento[i].horaInicio} - ${evento[i].horaFin}</li>
            <li class="list-inline-item"><i class="fa fa-location-arrow text-primary" aria-hidden="true"></i> ${evento[i].lugar}</li>
        </ul>
        <p>${evento[i].descripcion}</p>
    </div>
    <div class="col-2 row justify-content-center align-items-center">
        <button id="${evento[i].titulo}M" onclick='modifyB(this)' type="button" class="lis-inblock-item btn btn-outline-primary w-100 h-25 p-0" style="font-size: calc(0.5em + 0.8vw)">Editar</button>
        <button id="${evento[i].titulo}D" onclick='deleteB(this)' type="button" class="lis-inblock-item btn btn-outline-danger w-100 h-25 p-0" style="font-size: calc(0.5em + 0.8vw)">Eliminar</button>
    </div>
</div>`;
conjuntoTarjetas.innerHTML+= content;
        }

  }).catch(error=>{
      console.log(error);
      throw new Error(error);
  });


}

function getAnio(fecha){
    var x= ""
    var n=0
    while (fecha.charAt(n)!="-"){
        x= x+fecha.charAt(n)
        n++
    }
    return x;
}

function getMes(fecha){
    var x= ""
    var n=0
    var aux=0
    while (n<fecha.length){
        if(n>=5&&n<7){
        x=x+fecha.charAt(n)
        }
        n++
    }
    return x;
}

function getMesTxt(fecha){
    var x =""
    switch (getMes(fecha)) {
        case "01":
            x="Enero"
            break;
        case "02":
            x="Febrero"
            break;
        case "03":
            x="Marzo"
            break;
        case "04":
            x="Abril"
            break;
        case "05":
            x="Mayo"
            break;
        case "06":
            x="Junio"
            break;
        case "07":
            x="Julio"
            break;
        case "08":
            x="Agosto"
            break;
        case "09":
            x="Septiembre"
            break;
        case "10":
            x="Octubre"
            break;
        case "11":
            x="Noviembre"
            break;
        case "12":
            x="Diciembre"
            break;
        default:
            x="Error"
    }
    return x
}

function getDia(fecha){
    var x= ""
    var n=0
    var aux=0
    while (n<fecha.length){
        if(n>=8){
        x=x+fecha.charAt(n)
        }
        n++
    }
    return x;
}

function modifyB(comp){

    const titulo= document.getElementById('titulo');
    const descripcion = document.getElementById('descripcion')
    const fecha= document.getElementById('fecha')
    const horaInicio=document.getElementById('horaInicio')
    const horaFin=document.getElementById('horaFin')
    const lugar=document.getElementById('lugar')
    const estadoEv=document.getElementById('estadoEv')
    const BotonAgregar=document.getElementById('AgregaE')
    const BotonCancelar=document.getElementById('Cancelar')
    const BotonGuardar=document.getElementById('GuardaC')
    let id = comp.id;
    var n=0
    var x=""
    while (n<id.length-1){
        x=x+id.charAt(n)
        n++
    }
    axios({
      method:"POST",
      url: 'http://localhost:80/mainBM',
      data:{
        "titulo": x
      }
  }).then((res)=>{
        titulo.value=res.data.titulo
        descripcion.value=res.data.descripcion
        fecha.value=res.data.fecha
        horaInicio.value=res.data.horaInicio
        horaFin.value=res.data.horaFin
        lugar.value=res.data.lugar
  }).catch(error=>{
      console.log(error);
      throw new Error(error);
  });

    BotonAgregar.style.visibility="hidden";
    BotonGuardar.style.visibility="visible";
    BotonCancelar.style.visibility="visible";
    console.log(x)
}

function deleteB(comp){
    const titulo= document.getElementById('titulo');
    const descripcion = document.getElementById('descripcion')
    const fecha= document.getElementById('fecha')
    const horaInicio=document.getElementById('horaInicio')
    const horaFin=document.getElementById('horaFin')
    const lugar=document.getElementById('lugar')
    const estadoEv=document.getElementById('estadoEv')


    const BotonAgregar=document.getElementById('AgregaE')
    const BotonCancelar=document.getElementById('Cancelar')
    const BotonGuardar=document.getElementById('GuardaC')
    let id = comp.id;
    var n=0
    var x=""
    while (n<id.length-1){
        x=x+id.charAt(n)
        n++
    }
    axios({
      method:"POST",
      url: 'http://localhost:80/mainD',
      data:{
        "titulo": x
      }
  }).then((res)=>{
      if(res.data=="El evento se eliminó"){
        recuperaTarjetas();
        estadoEv.innerHTML=res.data
        titulo.value=""
        descripcion.value=""
        fecha.value=""
        horaInicio.value=""
        horaFin.value=""
        lugar.value=""

        BotonAgregar.style.visibility="visible";
        BotonCancelar.style.visibility="hidden";
        BotonGuardar.style.visibility="hidden";
      }else{
        estadoEv.innerHTML="Error al eliminar"
      }
  }).catch(error=>{
      console.log(error);
      throw new Error(error);
  });
}

function modifyEvent(){
    const titulo= document.getElementById('titulo');
    const descripcion = document.getElementById('descripcion')
    const fecha= document.getElementById('fecha')
    const horaInicio=document.getElementById('horaInicio')
    const horaFin=document.getElementById('horaFin')
    const lugar=document.getElementById('lugar')
    const estadoEv=document.getElementById('estadoEv')

    const BotonAgregar=document.getElementById('AgregaE')
    const BotonCancelar=document.getElementById('Cancelar')
    const BotonGuardar=document.getElementById('GuardaC')
  
  if(titulo.value!="" & fecha.value!=""){
    axios({
      method:"POST",
      url: 'http://localhost:80/mainM',
      data:{
          "titulo": titulo.value,
          "descripcion": descripcion.value,
          "fecha": fecha.value,
          "horaInicio": horaInicio.value,
          "horaFin": horaFin.value,
          "lugar": lugar.value,
          "usuario":""
      }
  }).then((res)=>{
      console.log(res);
      if(res.data=="El evento se modificó"){
        recuperaTarjetas();
        estadoEv.innerHTML=res.data
        titulo.value=""
        descripcion.value=""
        fecha.value=""
        horaInicio.value=""
        horaFin.value=""
        lugar.value=""

        BotonAgregar.style.visibility="visible";
        BotonGuardar.style.visibility="hidden";

      }else{
        estadoEv.innerHTML="Título de evento ya existente"
      }
  }).catch(error=>{
      console.log(error);
      throw new Error(error);
  });
  }else if(titulo.value=="" || fecha.value==""){
    estadoEv.innerHTML="Campos obligatorios vacios"
  }

}

function cancelar() {
    const titulo= document.getElementById('titulo');
    const descripcion = document.getElementById('descripcion')
    const fecha= document.getElementById('fecha')
    const horaInicio=document.getElementById('horaInicio')
    const horaFin=document.getElementById('horaFin')
    const lugar=document.getElementById('lugar')
    const BotonAgregar=document.getElementById('AgregaE')
    const BotonCancelar=document.getElementById('Cancelar')
    const BotonGuardar=document.getElementById('GuardaC')

        titulo.value=""
        descripcion.value=""
        fecha.value=""
        horaInicio.value=""
        horaFin.value=""
        lugar.value=""

        BotonAgregar.style.visibility="visible";
        BotonCancelar.style.visibility="hidden";
        BotonGuardar.style.visibility="hidden";

}
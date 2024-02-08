// Contenedor donde se va a renderizar toda la data
const containerSection = document.getElementById('container-notavailable')
const buyTicket = document.getElementById('buyTicket')

// Al apenas cargar la pagina consume el servicio
window.onload = () =>{
    getBuyers()
}

/**
 * Funcion que se dispara cuando se da click sobre un boleto que este disponible
 * @param {Object} e el objeto del evento
 */
const ticketsSelection = []

function addTicket(e){
  const ticketItem = e.target.dataset.ticket
  ticketsSelection.push(ticketItem)
 
}

/**
 * Evento cuando se seleccionan los tickets y se quiere comprar
 */
buyTicket.addEventListener('click', () =>{
  // convert object to string using JSON.stringify()
  
  const stringifyObj = JSON.stringify(ticketsSelection)
  // convert string to base64
  
  const b64Str = btoa(stringifyObj)

  const url = `http://localhost:3000/api/coindraw/comprar?tickets=${b64Str}`
  
  console.log(b64Str)

  window.location.href = url
  // convert base64 to original form
  
 /*  const objStr = atob(b64Str)
  console.log(objStr) */
  
  //  parse objStr to object
  
  /* const obj = JSON.parse(objStr)
  console.log(obj) */
})


/**
 * Funcion que se encarga de Obtener el boleto de todos los compradores
 * y renderiza los disponibles y no disponibles
 */
async function getBuyers() {
    
 // Me traigo todos los numeros disponibles 
 let url = `http://localhost:3000/api/coindraw/getCustomers`
 const response = await fetch(url,{
     headers: {
         'Content-Type': 'application/json'
       }
 })
 const data = await response.json()
 const cleanData = cleanTickets(data)

 cleanData.forEach(item => {
    const container = document.createElement("div");
    
    if (item.avaliable) {
        container.addEventListener('click', addTicket)
        container.className ="ticket-active"
    }else{
        container.className ="ticket-inactive"
    }
    container.innerHTML =`
    <div class="item-ticket" data-ticket=${item.value} >
         ${item.value}
    </div>`;
    containerSection.appendChild(container)
 });
 
                 
} 

/**
 * 
 * @param {Array} data array de objetos donde obtengo solo el numero de boletos 
 * @param {*} init valor inicial para el rango
 * @param {*} finish valor final del rango
 * @returns Array de objetos con la configuracion lista para ser renderizada la data
 */
function cleanTickets(data,init = 1,finish = 101) {
  // Capacity contendra los numeros disponibles entre el rango que se le establezca
  const capacity = []
  
  // Creo los items al inicio con avaliable siempre en true 
  for (let i = init; i < finish; i++) {
    const item = {
        value: i,
        avaliable: true
    }
    capacity.push(item)
  }

  // Busco entre el rango los que ya se han comprado y los coloco en false el avaliable
  let i= 0;
  // la repeticion sera dependiendo de la longitud de los boletos comprados
  while (i< data.length) {
    for (let x = 0; x < capacity.length; x++) {
        if (parseInt(data[i].boleto) === capacity[x].value) {
            //capacity.splice(x, 1);
            capacity[x].avaliable = false
        }
    }
    i++
  }
  // Finalmente retorno los valores
  return capacity;
}



    

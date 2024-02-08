/**
 * Funcion que se encarga de capturar el numero de Boleto para Generar enlace
 */
const btn_generLink = document.getElementById('btn_genere_link')
const textLink = document.getElementById('text_link')

btn_generLink.addEventListener('click', tomarValue)
 
function tomarValue () {
    let value = document.getElementById('boleto').value
     fetching(value)
}


const fetching =  async (value) => {
    console.log(value);
    let url = `http://localhost:3000/api/coindraw/searchTicket/${value}`
    const response = await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
          }
    })
    const dataTicket = await response.json()
    const {enlace, error } = dataTicket
    if (error) {
        textLink.innerText = dataTicket.message
    }else{
        if(enlace) {
           const { id_enlace } = dataTicket
            textLink.innerText = dataTicket.message = `Tu enlace es: https://fix-pruebas001--profound-tulumba-9d56a4.netlify.app/selectticket?afiliate=${id_enlace}`
            
        }else{
            textLink.innerText = dataTicket.message
        }
    }
  }

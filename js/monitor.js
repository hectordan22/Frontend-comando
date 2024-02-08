// Constantes 

const dateMonitor = document.getElementById('date-monitor')
const hourMonitor = document.getElementById('hour-monitor')
const priceMonitor = document.getElementById('price-monitor')

const loader = document.getElementById('container-loader')

window.onload = () =>{
    const dolarPrice = JSON.parse(localStorage.getItem('priceMonitor'))
    if (dolarPrice != null) {
      const {price, date, hour}  = dolarPrice
         // renderizo la data
         dateMonitor.innerText = date
         hourMonitor.innerText = hour
         priceMonitor.innerText = price
    }else{
        loader.style.display = 'flex'
        getPrice()
       // getCotizacion()
    }
 
}

// API Publica que hace Scrapping con python a la pagina de Monitor Dolar 
const getPrice = async () =>{
    let url = `https://pydolarvenezuela-api.vercel.app/api/v1/dollar/unit/enparalelovzla`
    const response = await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
          }
    })
    const dataPrice = await response.json()
    try {
        const {last_update,price} = dataPrice
        const dateHour = last_update.split(',')
        const date = dateHour[0]
        const hour = dateHour[1]
    
        // renderizo la data
        dateMonitor.innerText = date
        hourMonitor.innerText = hour
        priceMonitor.innerText = price

        const dolarData = {
            price,
            date,
            hour
        }

        localStorage.setItem('priceMonitor',JSON.stringify(dolarData) )
    
        loader.style.display = 'none'
    } catch (error) {
        loader.style.display = 'none';
    }
  
}


// EndPoint propio de nuestra Api que obtiene la cotizacion por medio de un Modulo npm de un tercero

const getCotizacion = async () =>{
    let url = `http://localhost:3000/api/coindraw/getDolar`
    const response = await fetch(url,{
        headers: {
            'Content-Type': 'application/json'
          }
    })
    const dataPrice = await response.json()
    try {
        const {lastUpdate,price} = dataPrice.dolarPrice
        const dateHour = lastUpdate.split('T')
        const date = dateHour[0]
        const hourLarge = dateHour[1]
        const hourSplit = hourLarge.split('.')
        const hour = hourSplit[0]
    
        // renderizo la data
        dateMonitor.innerText = date
        hourMonitor.innerText = hour
        priceMonitor.innerText = price

        const dolarData = {
            price,
            date,
            hour
        }

        localStorage.setItem('priceMonitor',JSON.stringify(dolarData) )
    
        loader.style.display = 'none'
    } catch (error) {
        loader.style.display = 'none'
    }
  
}






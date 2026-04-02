import "./style.css";
const weatherapi = process.env.VISUAL_CROSSING 
const giphy = process.env.GIPHY

const search = document.getElementById("search")
const text = document.getElementById("result")
const celsius = document.getElementById("switch")
const display = document.querySelector("img")
///fetch weather data 
async function GetWeather(location) {
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+location+`?key=${weatherapi}` 
    try {
        const response = await fetch(url)
        if(!response.ok) throw new Error(`Response status: ${response.status}`)
        const result = await response.json()
           return result
        
} catch(error){
        console.log(error.message)
    }
}


async function GetGif(weather) {
    const url = "https://api.giphy.com/v1/gifs/translate?"+`api_key=${giphy}`+"&s=weather+"+weather
    try {
        const response = await fetch(url)
        if(!response.ok) throw new Error(`Response status: ${response.status}`)
        const result = await response.json()
        return result
    } catch(error){
        console.log(error.message)
    }

    
}
search.addEventListener("keydown",(event) => {
  if(event.key=== 'Enter'){
    GetWeather(search.value).then((result) => {
        let temperature = parseInt(result.currentConditions.temp)
        let feel = result.currentConditions.feelslike
        if(celsius.checked === true) {
            feel = Math.round((temperature -32) * (5/9))
            temperature = Math.round((temperature -32) * (5/9))
            temperature = temperature.toString()+ "°C"
            feel = feel.toString() + "°C"
        }
        else {
            temperature = temperature.toString() + "°F"
            feel = feel.toString() + "°F"
        }
        text.textContent = "Condition : "+result.currentConditions.conditions + " ,Temperature : "+ temperature + " ,Feels like : "+ feel
        GetGif(result.currentConditions.conditions).then((gif) => {
            display.src = gif.data.images.original.url
        })

})
  }
    

})

/// result.currentConditions.conditions , result.currentConditions.temp , .humidity , .feelslike

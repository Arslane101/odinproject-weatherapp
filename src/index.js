
const weatherapi = process.env.VISUAL_CROSSING 
///fetch weather data 
async function GetWeather(location) {
    const url = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/"+location+`?key=${weatherapi}` 
    try {
        const response = await fetch(url)
        if(!response.ok) throw new Error(`Response status: ${response.status}`)
        const result = await response.json()
        console.log(result)
    } catch(error){
        console.log(error.message)
    }
}

GetWeather("london")
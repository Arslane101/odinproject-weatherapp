import "./style.css";
const weatherapi = process.env.VISUAL_CROSSING 
const gihpy = process.env.GIPHY

const search = document.getElementById("search")
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

/*search.addEventListener("keypress",() => {
    let result = GetWeather(search.value)

})
*/
/// result.currentConditions.conditions , result.currentConditions.temp , .humidity , .feelslike
let results = GetWeather("london")
console.log(results)
const userCity = document.getElementById("city");
const displayWeather = document.getElementById("weather");
const cityBtns = document.getElementById("bonus-buttons");


let apiKey = "4fc891e22a594c5c84f222018211412";
let baseUrl ="http://api.weatherapi.com/v1/current.json";

if(!localStorage.getItem("cities")){
    let initialArray = JSON.stringify([]);
    localStorage.setItem("cities", initialArray);
} 
// INTENTO 1 del proceso
// fetch (`${baseUrl}?key=${apiKey}&q=miami`)
//     .then ( response => response.json())
//     .then(data => {
//         console.log(data);
//     })

// -----------------------------------------------------------


// INTENTO 2

const makeRequest = async (userInput) => {
    let response = await fetch(`${baseUrl}?key=${apiKey}&q=${userInput}`)

    if(response.ok){
        let data = await response.json();
        renderWeather(data);
        addCitiesLocal(data.location.name);
    }

    if(response.status >= 400 && response.status <= 600 ){
        console.log("error");
    }
}

const handleSubmit = (event) =>{
    event.preventDefault();
    let userInput = userCity.value.trim();
    makeRequest(userInput);
    userCity.value = "";
}

const renderWeather = (data) => {
    console.log(data);
    displayWeather.innerHTML = 
    `
    <p>City:${data.location.name} </p>
    <p> Condition:${data.current.condition.text}</p>
    <img src="${data.current.condition.icon}">
    <p> Temperature:${data.current.temp_f} F  </p>
    
    `
}

const addCitiesLocal =(city) =>{
    let citiesArray = JSON.parse(localStorage.getItem("cities"));
    citiesArray.push(city);
    let cityStrArray = JSON.stringify(citiesArray);
    localStorage.setItem("cities", cityStrArray);
    
    for (let i = 0; i < cityStrArray; i++){
        let newBtn = document.createComment("button");
        newBtn.setAttribute("class", "btn");
        newBtn.onclick = function(event){
            let city = event.target.textContent;
            makeRequest(city);

        }
        newBtn.textContent =cityStrArray[i];
        cityBtns.appendChild(newBtn);
    }
}





// ------------------------------------------------------------------

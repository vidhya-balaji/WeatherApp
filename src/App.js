import axios from "axios";
import { useState } from "react";
import logo from "./Assets/logo.png";
import moment from "moment";
import sunny from "./Assets/Sunnyimage.png"
import tmpimage from "./Assets/Temperature.png"
import windspeedimage from "./Assets/wind.png"
import weatherdesc from "./Assets/weatherdesc.png"

function App() {
  const [country, setcountry] = useState('');
  const apikeyvalue = '24a91a2dfa63237aa0e21c18b7a3b647';
  const [temperature, settemperature] = useState('');
  const [weather, setweather] = useState('');
  const [desc, setdesc] = useState('');
  const [srcimage, setsrcimage] = useState('');
  const [windspeed,setwindspeed]=useState('');
  let date = new Date();
  let formattedDate = moment(date).format('MMMM Do,YYYY');
  console.log(formattedDate); // e.g., "April 6th 2022, 2:30:00 pm"

  function handleChange(event) {
    return (
      setcountry(event.target.value)
    );
  }
  function searchWeather() {
    const apicall = axios(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apikeyvalue}`)
    console.log(apicall);
    apicall.then(function (success) {
      settemperature(success.data.main.temp);
      setweather(success.data.weather[0].main);
      setdesc(success.data.weather[0].description);
      setwindspeed(success.data.wind.speed);
      setTimeout(() => {
        if (weather.toLowerCase === 'clear') {
          setsrcimage(sunny)
          console.log(srcimage);

        }
      }, 2000)

    })
  }

  return (

    <div id='container'>
      <div id='header' className="bg-white justify-between w-screen bg-transparent">
        <img src={logo} alt='logo' className="w-10 h-10"></img>
        <h1 className="md:text-2xl font-bold text-1xl">Thunderstorm</h1>
        <input type='text' className="sm:w-72" value={country} onChange={handleChange} id='inputdata' placeholder="search for places" ></input>
        <button className="border-black p-2" onClick={searchWeather} id='searchbutton'>Search</button>
      </div >

      <div id='weatherdata' className="bg-white p-10">
        <div id='weatherdata_s1'>
          <h1 className="text-3xl font-bold">{country}</h1>
          <p className="">{formattedDate}</p>
          <img src={sunny} alt='climate change' className="md:w-40 h-40 p-5"></img>
          <h1  className="text-4xl font-bold">{temperature}{`\u00B0`}C</h1>
        </div>
        <div>
          <p className="text-1xl p-0"> Weather </p>
          <h1 id='weather_t1' className="sm:text-2xl md:text-6xl">{weather}</h1>
        </div>
      </div>
      <div id='footer' className="flex gap-5 justify-evenly p-10 ">
        <div className="bg-[#eef2f3]  flex  gap-3 p-10 rounded-md opacity-0.5 ">
          <img src={tmpimage} alt='temperature' className="w-8 h-8 md:w-20 md:h-20 "></img>
          <div className="flex flex-col p-2">
            <p className="text-sm md:text-1xl">Temperature </p>
            <h1 className="text-1xl md:text-3xl font-bold">{temperature}{`\u00B0`}C</h1>
          </div>
        </div>
        <div className="bg-[#eef2f3]  flex  gap-3 p-10 rounded-md opacity-0.5">
          <img src={windspeedimage} alt='temperature' className="w-8 h-8 md:w-20 md:h-20 "></img>
          <div className="flex flex-col p-2">
            <p className="text-sm md:text-1xl">Wind Speed </p>
            <h1 className="text-1xl md:text-3xl font-bold">{windspeed} km/h</h1>
          </div>
        </div>
        <div className="bg-[#eef2f3]  flex  gap-3 p-10 rounded-md opacity-0.5">
          <img src={weatherdesc} alt='temperature' className="w-8 h-8 md:w-20 md:h-20 "></img>
          <div className="flex flex-col p-2">
            <p className="text-sm md:text-1xl">Description </p>
            <h1 className="text-1xl md:text-3xl font-bold">{desc}</h1>
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;

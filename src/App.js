import axios from "axios";
import { useEffect,useState } from "react";
import logo from "./Assets/logo (2).svg";
import searchicon from "./Assets/searchicon.png";
import moment from "moment";
import sunny from "./Assets/Sunnyimage.png"
import tmpimage from "./Assets/Temperature.png"
import windspeedimage from "./Assets/wind.png"
import weatherdesc from "./Assets/weatherdesc.png"
import clouds from "./Assets/cloudy.png";
import rain from "./Assets/Rainy.png";
import Thunder from "./Assets/Thunder.png";
import snowy from "./Assets/snowy.png"


function App() {
  const [country, setcountry] = useState('Chennai');
  const apikeyvalue = '24a91a2dfa63237aa0e21c18b7a3b647';
  const [temperature, settemperature] = useState('');
  const [weather, setweather] = useState('');
  const [desc, setdesc] = useState('');
  const [windspeed,setwindspeed]=useState('');
  const [data,setData]=useState('');
  const errormsg="Invalid country name";
  const [textflag,settextflag]=useState(false);
  const [location,setlocation]=useState('');
  const weatherimages={
    Clear: sunny,
    Clouds:clouds,
    Rain:rain,
    Snow:snowy,
    Mist:clouds,
    Haze:clouds,
  };
  const weatherimage=data.weather?weatherimages[data.weather[0].main]:Thunder;

  const backgroundimages={
    Clear: "dognSol10 opacity",
    Clouds:"dognSol6 opacity",
    Rain:"dognSol23 opacity",
    Snow:"dognSol8 opacity",
    Mist:"dognSol opacity",
    Haze:"dognSol15 opacity",
  };
  const backgroundimage=data.weather?backgroundimages[data.weather[0].main]:"dognSol10 opacity";

  let date = new Date();
  let formattedDate = moment(date).format('MMMM Do,YYYY');
  console.log(formattedDate); // e.g., "April 6th 2022, 2:30:00 pm"


  useEffect(() => {
      searchWeather();
  }, [])

  
  function handleChange(event) {
    return (
      setcountry(event.target.value)
    );
  }
  function searchWeather() {
    const apicall = axios(`https://api.openweathermap.org/data/2.5/weather?q=${country}&appid=${apikeyvalue}`)
    console.log(apicall);
    apicall.then(function (success) {
      setData(success.data)
      settemperature(success.data.main.temp);
      setweather(success.data.weather[0].main);
      setdesc(success.data.weather[0].description);
      setwindspeed(success.data.wind.speed);
      setlocation(success.data.name);
    }).catch((reject)=>{
      settextflag(true);
      ClearState();
      setlocation(errormsg);
      alert("Invalid country name");
    })
  }

  function ClearState(){
    setData("")
    settemperature("");
    setweather("");
    setdesc("");
    setwindspeed("");
    setlocation("");
  }

  return (

    <div id='container'>
      {/* <div class="bg-img"></div> */}
      <div className= {backgroundimage} ></div>
      <div id='header' className="bg-white justify-between w-screen bg-transparent">
        <img src={logo} alt='logo' className="w-16 h-10"></img>
        <h1 className="md:text-2xl font-bold text-1xl" id="appName">World Weather</h1>
        <input type='text' className="sm:w-72" value={country} onChange={handleChange} id='inputdata' placeholder="search for places" ></input>
        <button className="border-black" onClick={searchWeather} id='searchbutton'><img src={searchicon} alt='search' className="w-10 h-10"></img></button>
      </div >

      <div id='weatherdata' className="bg-white p-10">
        <div id='weatherdata_s1'>
          <h1 style={{text:textflag?'red':'black'}}className="text-3xl font-bold">{location}</h1>
          <p className="">{formattedDate}</p>
          <img src={weatherimage} alt='climate change' className="sm:w-20 md:w-40 h-40 p-5"></img>
          <h1  className="text-4xl font-bold">{temperature}{`\u00B0`}C</h1>
        </div>
        <div>
          <p id='weathertitle'className="text-1xl p-0"> Weather </p>
          <h1 id='weather_t1' className="text-5xl">{weather}</h1>
        </div>
      </div>
      <div id='footer' className="flex flex-col md:flex md:flex-row gap-5 justify-evenly p-10 ">
        <div id="footer_t1" className="bg-[#eef2f3]  flex  gap-3 p-10 rounded-md opacity-0.5 ">
          <img id="footer_m1"src={tmpimage} alt='temperature' className="w-20 h-20 "></img>
          <div className="flex flex-col p-2">
            <p className="text-sm md:text-1xl">Temperature </p>
            <h1 className="text-1xl md:text-3xl font-bold">{temperature}{`\u00B0`}C</h1>
          </div>
        </div>
        <div id="footer_t2" className="bg-[#eef2f3]  flex  gap-3 p-10 rounded-md opacity-0.5">
          <img id="footer_m2"src={windspeedimage} alt='temperature' className="w-20 h-20 "></img>
          <div className="flex flex-col p-2">
            <p className="text-sm md:text-1xl">Wind Speed </p>
            <h1 className="text-1xl md:text-3xl font-bold">{windspeed} km/h</h1>
          </div>
        </div>
        <div id="footer_t3" className="bg-[#eef2f3]  flex  gap-3 p-10 rounded-md opacity-0.5">
          <img id="footer_m3"src={weatherdesc} alt='temperature' className="w-20 h-20 "></img>
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

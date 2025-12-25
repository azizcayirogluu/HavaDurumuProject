const url = "https://api.openweathermap.org/data/2.5/";
const key = "0607506d6721fe2c75e75dc4019bfd88";

const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const weatherBody = document.getElementById("weatherBody");
const welcomeMsg = document.getElementById("welcomeMsg");

const setQuery = (e) => {
  if (e.key === "Enter" || e.type === "click") {
    if (searchBar.value.trim() !== "") {
      getResult(searchBar.value);
    }
  }
};

const getResult = (cityName) => {
  let query = `${url}weather?q=${cityName}&appid=${key}&units=metric&lang=tr`;

  fetch(query)
    .then((weather) => {
      if (!weather.ok) throw new Error("Şehir bulunamadı");
      return weather.json();
    })
    .then(displayResult)
    .catch((err) => {
      alert("Hata: Şehir ismini kontrol edin.");
    });
};

const displayResult = (result) => {
  welcomeMsg.style.display = "none";
  weatherBody.style.display = "block";

  document.getElementById(
  ).innerText = `${result.name}, ${result.sys.country}`;

  const now = new Date();
  const options = { day: "numeric", month: "long", year: "numeric" };
  document.getElementById("date").innerText = now.toLocaleDateString(
    "tr-TR",
    options
  );

  document.getElementById("temp").innerText = `${Math.round(
    result.main.temp
  )}°C`;
  document.getElementById("desc").innerText = result.weather[0].description;

  const iconCode = result.weather[0].icon;
  document.getElementById(
  ).src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

  document.getElementById("minmax").innerText = `${Math.round(
    result.main.temp_min
  )}° / ${Math.round(result.main.temp_max)}°`;
  document.getElementById("humidity").innerText = `%${result.main.humidity}`;

  searchBar.value = "";
};

// Event Listeners
searchBar.addEventListener("keydown", setQuery);
searchBtn.addEventListener("click", setQuery);

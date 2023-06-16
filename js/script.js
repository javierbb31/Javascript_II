

function consultarClima() {
    const ciudad = document.getElementById('ciudad').value;
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65'; // Sustituye "tu_api_key" por tu propia API key de OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;

    fetch(url).then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la respuesta de la API');
      }
    })
    .then(data => {
      // Mostrar resultado en la tabla
      const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
      const fila = tabla.insertRow();
      fila.insertCell().innerHTML = data.name;
      fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
      fila.insertCell().innerHTML = data.weather[0].description;
      fila.insertCell().innerHTML = '<button id="btn" onClick="consultarDetalles(\'' + data.name + '\')" name="btn">Detalles</button>'; 
    })
    .catch(error => {
      console.error('Error al consultar el clima', error);
    });

}



function consultarClimas() {
    const ciudades = document.getElementById('ciudades').value.split(',').map(ciudad => ciudad.trim());
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65'; // Sustituye "tu_api_key" por tu propia API key de OpenWeatherMap


    Promise.all(ciudades.map(ciudad => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
        return fetch(url).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la respuesta de la API');
          }
        });
      }))
      .then(data => {
        // Mostrar resultados en la tabla
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        data.forEach(ciudad => {
          const fila = tabla.insertRow();
          fila.insertCell().innerHTML = ciudad.name;
          fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
          fila.insertCell().innerHTML = ciudad.weather[0].description;
          fila.insertCell().innerHTML = '<button id="btn" onClick="consultarDetalles(\'' + ciudad.name + '\')" name="btn">Detalles</button>'; 
        });
      })
      .catch(error => {
        console.error('Error al consultar el clima', error);
      });
    }

    function limpiarTabla() {
        // Mostrar resultado en la tabla
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody');
        for(let i = 0; i<tabla.length; i++)
        {
            tabla[i].innerHTML = "";
        }
  }

  function consultarDetalles(ciudad){
    document.querySelector(".popup").style.display = "flex";
    const API_KEY = '7988e38cdeafad1d912e3c3ab218ad65'; // Sustituye "tu_api_key" por tu propia API key de OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;

    fetch(url).then(response => {
      if (response.ok) {
        return response.json();
        console.log(response.json());
      } else {
        throw new Error('Error en la respuesta de la API');
      }
    })
    .then(data => {
      // Mostrar resultado en la tabla
      //{"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],
      //"base":"stations","main":{"temp":286.59,"feels_like":286.21,"temp_min":283.49,"temp_max":288.2,"pressure":1019,"humidity":85},"visibility":10000,"wind":{"speed":1.79,"deg":8,"gust":2.68},
      //"clouds":{"all":17},"dt":1686803714,"sys":{"type":2,"id":2075535,"country":"GB","sunrise":1686800570,"sunset":1686860344},"timezone":3600,"id":2643743,"name":"London","cod":200}
      const tabla = document.getElementById('tabla-detalles').getElementsByTagName('tbody')[0];
      document.getElementById('nombre').innerHTML = data.name;
      document.getElementById('descripcion').innerHTML = data.weather[0].description;
      document.getElementById('temp_max').innerHTML = `${(data.main.temp_max - 273.15).toFixed(1)}°C`;
      document.getElementById('temp_min').innerHTML = `${(data.main.temp_min - 273.15).toFixed(1)}°C`;
      document.getElementById('presion').innerHTML = data.main.pressure;
      document.getElementById('humedad').innerHTML = `${data.main.humidity}%`;
      //fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
      //fila.insertCell().innerHTML = data.weather[0].description;
    })
    .catch(error => {
      console.error('Error al consultar el clima', error);
    });
  }

  
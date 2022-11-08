<template>
  <div class="app" :class="weatherBackground">
    <main>
      <div class="search-box">
        <input type="text" class="search-bar" placeholder="Search..." @keypress="fetchWeather" v-model.trim='searchQuery'>
      </div>
      <div class="searchError" v-if="searchError">Sorry, can't check the weather of <span>{{ searchQueryErrored }}</span></div>
      <div class="weather-box" v-if="typeof weather.main != 'undefined'">

        <div class="location-item">
          <div class="location">{{ weather.name }}, {{ weather.sys.country }}</div>
          <div class="date">{{ dateCreate() }}</div>
        </div>
        <div class="weather-wrapper">
          <div class="temp-item">
            <div class="temp">{{ Math.round(weather.main.temp) }}&deg;C</div>
            <div class="weather">{{ weather.weather[0].main }}</div>
            <div class="weather-icon">
              <img :src="icon" alt="">
            </div>
          </div>
          <div class="weather-info">
            <div class="column">
              <div class="title">Wind speed</div>
              <div class="wind-box">
                <div class="wind-speed item">{{ Math.round(weather.wind.speed) }}</div>
                <div class="wind-direction" :style="speed">
                  <svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_102_6)">
                      <path
                      d="M120.9 36.5001L26.3003 205.4C25.5143 206.823 25.1803 208.451 25.3428 210.068C25.5053 211.686 26.1566 213.215 27.2099 214.453C28.2632 215.691 29.6685 216.578 31.2389 216.998C32.8093 217.417 34.4701 217.348 36.0003 216.8L125.2 185C126.932 184.299 128.868 184.299 130.6 185L219.8 216.8C221.33 217.348 222.991 217.417 224.562 216.998C226.132 216.578 227.537 215.691 228.591 214.453C229.644 213.215 230.295 211.686 230.458 210.068C230.62 208.451 230.286 206.823 229.5 205.4L134.9 36.5001C134.208 35.2497 133.194 34.2074 131.963 33.4816C130.732 32.7558 129.329 32.373 127.9 32.373C126.471 32.373 125.068 32.7558 123.837 33.4816C122.606 34.2074 121.592 35.2497 120.9 36.5001Z"
                      stroke="white" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M127.9 184V120" stroke="white" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
                    </g>
                    <defs>
                      <clipPath id="clip0_102_6">
                        <rect width="256" height="256" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
            <div class="column">
              <div class="title">Humidity</div>
              <div class="humidity item">{{ weather.main.humidity }}%</div>
            </div>
            <div class="column">
              <div class="title">Feels like</div>
              <div class="feels-like item">{{ Math.round(weather.main.feels_like) }}&deg;C</div>
            </div>
            <div class="column">
              <div class="title">Pressure</div>
              <div class="pressure item">{{ weather.main.pressure }}mbar</div>
            </div>

          </div>
        </div>
      </div>
      <div class="tip" v-else>Type the name of the city and press "enter" to check the weather</div>
      <div v-if="isLoading" class="loader"></div>
    </main>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      api_key: 'c7027b105ec329b7a16d77794ef4da2c',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      searchQuery: '',
      weather: {},
      windDirection: 0,
      icon: '',
      weatherBackground: '',
      isLoading: false,
      searchError: false,
      searchQueryErrored: '',
    }
  },
  methods: {
    async fetchWeather(e) {
      if (e.key == 'Enter') {
        try {
          this.isLoading = true
          const response = await axios.get(`${this.url_base}weather?q=${this.searchQuery}&units=metric&appid=${this.api_key}`)
          console.log(response.data)

          this.searchQuery = '',
          this.searchQueryErrored = '',
          this.searchError = false

          this.weather = response.data

          this.windDirection = Math.round(this.weather.wind.deg)
          this.icon = `http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`

          if (this.weather.weather[0].main == 'Rain') {
            this.weatherBackground = 'rain'
          } else if (this.weather.weather[0].main == 'Clouds') {
            this.weatherBackground = 'clouds'
          } else if (this.weather.weather[0].main == 'Snow') {
            this.weatherBackground = 'Snow'
          } else if (this.weather.weather[0].main == 'Clear') {
            this.weatherBackground = 'clear'
          }
        } catch (e) {
          console.log(e)
          this.searchQueryErrored = this.searchQuery
          this.searchQuery = ''
          this.searchError = true
        } finally {
          this.isLoading = false
        }
      }

    },
    dateCreate() {
      const d = new Date();
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

      const day = days[d.getDay()];
      const date = d.getDate();
      const month = months[d.getMonth()];
      const year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`
    },
    weatherChange() {

    }
  },
  computed: {
    speed() {
      return {
        transform: 'rotate(' + this.windDirection + 'deg)'
      }
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Lato', sans-serif;
}

main {
  min-height: 100vh;
  padding: 20px;
  background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.75));
}

input {
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
  background: #084383;
  transition: background 0.5s ease 0s;
  background-size: cover;
  background-position: bottom;
}

.app.rain {
  background: #000 url('./assets/215948.gif') no-repeat;
  background-size: cover;
  background-position: bottom;

}

.app.clouds {
  background: #000 url('./assets/clouds.gif') no-repeat;
  background-size: cover;
  background-position: bottom;
}

.app.clear {
  background: #000 url('./assets/clear.gif') no-repeat;
  background-size: cover;
  background-position: bottom;

}

.app.snow {
  background: #000 url('./assets/snow.gif') no-repeat;
  background-size: cover;
  background-position: bottom;

}

.search-box {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.search-bar {
  width: 100%;
  display: block;
  padding: 20px;
  font-size: 16px;
  max-width: 500px;
  background: rgba(224, 224, 224, 0.5);
  box-shadow: 0 8px 32px 0 rgba(16, 19, 67, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 0px 20px 0px 20px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #fbfbfb;
  transition: all 0.3s ease 0s;

  &::placeholder {
    font-size: 16px;
    color: #b7b4b4;
  }

  &:focus {
    background: rgba(110, 103, 103, 0.653);
  }
}

.weather-box {
  margin-top: 15px;
  max-width: 500px;
  margin: 0 auto;
}

.location-item {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 15px;
  margin-top: 25px;
}

.location {
  font-size: 24px;
  font-weight: 700;
}

.date {
  font-size: 20px;
  font-weight: 500;
  font-style: italic;
}

.weather-wrapper {
  padding: 15px;
}

.temp-item {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 20px;
}

.temp {
  padding: 30px;
  font-size: 36px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  margin-bottom: 10px;
}

.weather {
  font-size: 25px;
}

.weather-info {
  display: grid;
  justify-items: center;
  gap: 20px;
  grid-template-columns: repeat(2, 1fr);
  padding: 20px;
  background: rgba(255, 255, 255, 0.25);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.title {
  font-size: 18px;
  font-weight: 700;
}

.item {
  font-size: 16px;
}

.wind-box {
  display: flex;
  gap: 5px;
  justify-content: center;
  align-items: center;
}

.wind-speed {}

.wind-direction {}

.humidity {}

.feels_like {}

.pressure {}

.tip {
  margin-top: 50px;
  color: rgba(255, 255, 255, 0.607);
}
.searchError {
  margin-top: 20px;
  span {
    font-style: italic;
    font-weight: 700;
    color: #952b44;
  }
}
.loader {
  width: 50px;
  height: 50px;
  border: 3px solid #ccc;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  animation: rotation 1s linear infinite;

  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 50px - 8px;
    height: 50px - 8px;
    border-radius: 50%;
    border: 3px solid transparent;
    border-bottom-color: #75283a;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg)
  }

  100% {
    transform: rotate(360deg)
  }
}
</style>

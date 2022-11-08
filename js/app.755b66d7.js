(function(){"use strict";var e={156:function(e,r,t){var a=t(963),i=t(252),s=t(577);const n={class:"search-box"},o={key:0,class:"searchError"},h={key:1,class:"weather-box"},c={class:"location-item"},d={class:"location"},l={class:"date"},u={class:"weather-wrapper"},w={class:"temp-item"},p={class:"temp"},v={class:"weather"},f={class:"weather-icon"},y=["src"],m={class:"weather-info"},g={class:"column"},_=(0,i._)("div",{class:"title"},"Wind speed",-1),k={class:"wind-box"},b={class:"wind-speed item"},C=(0,i.uE)('<svg width="20" height="20" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_102_6)"><path d="M120.9 36.5001L26.3003 205.4C25.5143 206.823 25.1803 208.451 25.3428 210.068C25.5053 211.686 26.1566 213.215 27.2099 214.453C28.2632 215.691 29.6685 216.578 31.2389 216.998C32.8093 217.417 34.4701 217.348 36.0003 216.8L125.2 185C126.932 184.299 128.868 184.299 130.6 185L219.8 216.8C221.33 217.348 222.991 217.417 224.562 216.998C226.132 216.578 227.537 215.691 228.591 214.453C229.644 213.215 230.295 211.686 230.458 210.068C230.62 208.451 230.286 206.823 229.5 205.4L134.9 36.5001C134.208 35.2497 133.194 34.2074 131.963 33.4816C130.732 32.7558 129.329 32.373 127.9 32.373C126.471 32.373 125.068 32.7558 123.837 33.4816C122.606 34.2074 121.592 35.2497 120.9 36.5001Z" stroke="white" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"></path><path d="M127.9 184V120" stroke="white" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"></path></g><defs><clipPath id="clip0_102_6"><rect width="256" height="256" fill="white"></rect></clipPath></defs></svg>',1),D=[C],E={class:"column"},O=(0,i._)("div",{class:"title"},"Humidity",-1),x={class:"humidity item"},Q={class:"column"},z=(0,i._)("div",{class:"title"},"Feels like",-1),M={class:"feels-like item"},j={class:"column"},L=(0,i._)("div",{class:"title"},"Pressure",-1),$={class:"pressure item"},B={key:2,class:"tip"},S={key:3,class:"loader"};function P(e,r,t,C,P,F){return(0,i.wg)(),(0,i.iD)("div",{class:(0,s.C_)(["app",P.weatherBackground])},[(0,i._)("main",null,[(0,i._)("div",n,[(0,i.wy)((0,i._)("input",{type:"text",class:"search-bar",placeholder:"Search...",onKeypress:r[0]||(r[0]=(...e)=>F.fetchWeather&&F.fetchWeather(...e)),"onUpdate:modelValue":r[1]||(r[1]=e=>P.searchQuery=e)},null,544),[[a.nr,P.searchQuery,void 0,{trim:!0}]])]),P.searchError?((0,i.wg)(),(0,i.iD)("div",o,[(0,i.Uk)("Sorry, can't check the weather of "),(0,i._)("span",null,(0,s.zw)(P.searchQueryErrored),1)])):(0,i.kq)("",!0),"undefined"!=typeof P.weather.main?((0,i.wg)(),(0,i.iD)("div",h,[(0,i._)("div",c,[(0,i._)("div",d,(0,s.zw)(P.weather.name)+", "+(0,s.zw)(P.weather.sys.country),1),(0,i._)("div",l,(0,s.zw)(F.dateCreate()),1)]),(0,i._)("div",u,[(0,i._)("div",w,[(0,i._)("div",p,(0,s.zw)(Math.round(P.weather.main.temp))+"°C",1),(0,i._)("div",v,(0,s.zw)(P.weather.weather[0].main),1),(0,i._)("div",f,[(0,i._)("img",{src:P.icon,alt:""},null,8,y)])]),(0,i._)("div",m,[(0,i._)("div",g,[_,(0,i._)("div",k,[(0,i._)("div",b,(0,s.zw)(Math.round(P.weather.wind.speed)),1),(0,i._)("div",{class:"wind-direction",style:(0,s.j5)(F.speed)},D,4)])]),(0,i._)("div",E,[O,(0,i._)("div",x,(0,s.zw)(P.weather.main.humidity)+"%",1)]),(0,i._)("div",Q,[z,(0,i._)("div",M,(0,s.zw)(Math.round(P.weather.main.feels_like))+"°C",1)]),(0,i._)("div",j,[L,(0,i._)("div",$,(0,s.zw)(P.weather.main.pressure)+"mbar",1)])])])])):((0,i.wg)(),(0,i.iD)("div",B,'Type the name of the city and press "enter" to check the weather')),P.isLoading?((0,i.wg)(),(0,i.iD)("div",S)):(0,i.kq)("",!0)])],2)}var F=t(196),T={data(){return{api_key:"c7027b105ec329b7a16d77794ef4da2c",url_base:"https://api.openweathermap.org/data/2.5/",searchQuery:"",weather:{},windDirection:0,icon:"",weatherBackground:"",isLoading:!1,searchError:!1,searchQueryErrored:""}},methods:{async fetchWeather(e){if("Enter"==e.key)try{this.isLoading=!0;const e=await F.ZP.get(`${this.url_base}weather?q=${this.searchQuery}&units=metric&appid=${this.api_key}`);console.log(e.data),this.searchQuery="",this.searchQueryErrored="",this.searchError=!1,this.weather=e.data,this.windDirection=Math.round(this.weather.wind.deg),this.icon=`http://openweathermap.org/img/wn/${this.weather.weather[0].icon}@2x.png`,"Rain"==this.weather.weather[0].main?this.weatherBackground="rain":"Clouds"==this.weather.weather[0].main?this.weatherBackground="clouds":"Snow"==this.weather.weather[0].main?this.weatherBackground="Snow":"Clear"==this.weather.weather[0].main&&(this.weatherBackground="clear")}catch(e){console.log(e),this.searchQueryErrored=this.searchQuery,this.searchQuery="",this.searchError=!0}finally{this.isLoading=!1}},dateCreate(){const e=new Date,r=["January","February","March","April","May","June","July","August","September","October","November","December"],t=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a=t[e.getDay()],i=e.getDate(),s=r[e.getMonth()],n=e.getFullYear();return`${a} ${i} ${s} ${n}`},weatherChange(){}},computed:{speed(){return{transform:"rotate("+this.windDirection+"deg)"}}}},W=t(744);const q=(0,W.Z)(T,[["render",P]]);var J=q;(0,a.ri)(J).mount("#app")}},r={};function t(a){var i=r[a];if(void 0!==i)return i.exports;var s=r[a]={exports:{}};return e[a](s,s.exports,t),s.exports}t.m=e,function(){var e=[];t.O=function(r,a,i,s){if(!a){var n=1/0;for(d=0;d<e.length;d++){a=e[d][0],i=e[d][1],s=e[d][2];for(var o=!0,h=0;h<a.length;h++)(!1&s||n>=s)&&Object.keys(t.O).every((function(e){return t.O[e](a[h])}))?a.splice(h--,1):(o=!1,s<n&&(n=s));if(o){e.splice(d--,1);var c=i();void 0!==c&&(r=c)}}return r}s=s||0;for(var d=e.length;d>0&&e[d-1][2]>s;d--)e[d]=e[d-1];e[d]=[a,i,s]}}(),function(){t.d=function(e,r){for(var a in r)t.o(r,a)&&!t.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:r[a]})}}(),function(){t.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)}}(),function(){var e={143:0};t.O.j=function(r){return 0===e[r]};var r=function(r,a){var i,s,n=a[0],o=a[1],h=a[2],c=0;if(n.some((function(r){return 0!==e[r]}))){for(i in o)t.o(o,i)&&(t.m[i]=o[i]);if(h)var d=h(t)}for(r&&r(a);c<n.length;c++)s=n[c],t.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return t.O(d)},a=self["webpackChunkweather_app"]=self["webpackChunkweather_app"]||[];a.forEach(r.bind(null,0)),a.push=r.bind(null,a.push.bind(a))}();var a=t.O(void 0,[998],(function(){return t(156)}));a=t.O(a)})();
//# sourceMappingURL=app.755b66d7.js.map
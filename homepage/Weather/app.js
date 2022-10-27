window.addEventListener("load",() => {
    let long;
    let lat;
    let tempdescription = document.querySelector('.tempdescription');
    let tempdegree = document.querySelector('.tempdegree');
    let locationTimezone = document.querySelector(".locationTimezone");
    let degreesection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            let api = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/knoxville%20tn?unitGroup=metric&include=current&key=5HMLCCDVCV2AA889GUPZ3NTH5&contentType=json`;

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temp, conditions, icon}= data.currently;
                    //set DOM Elements from the API
                    tempdegree.textContent = temp;
                    tempdescription.textContent = conditions;
                    locationTimezone.textContent = data.address;
                    //FORMULA for celsius
                    let celsius = (temperature - 32) * (5/9);
                    //set Icon
                    setIcons(icon, document.querySelector('icon'));
                    //Change temp degree
                    degreesection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "C";
                            tempdegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "F";
                            tempdegree.textContent = temperature;
                        }
                    })
        });
            });
    }
   function setIcons(icon, iconID) {
        const skycons = new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
       return skycons.set(iconID, Skycons[currentIcon]);
    }
});
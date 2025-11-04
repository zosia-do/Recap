 document.addEventListener("DOMContentLoaded", function(){
    const IO = new AdafruitIO(username, key);
    
    
    const temperatureFeed = "temperature";
    const temperatureDisplay = document.getElementById("temp-value");
    const ringTempDisplay = document.getElementById("ring-temp-value");
    
    const humidityFeed = "humidity";
    const humidityDisplay = document.getElementById("humidity-value");
    const ringHumidityDisplay = document.getElementById("ring-humidity-value");

    const ringStatus = document.getElementById("status");

    let latestTemp = null;
    let latestHumidity = null;

    function updateTemperature() {
        IO.getData(temperatureFeed, function({ json }) {
            if (Array.isArray(json) && json.length > 0) {
                let latest = json[0];
                let tempValue = parseFloat(latest.value).toFixed(1); // Round to 1 decimal
                latestTemp = tempValue;
                temperatureDisplay.textContent = `${tempValue} °C`;
                if (ringTempDisplay){
                    ringTempDisplay.textContent = tempValue;
                }
            } else {
                temperatureDisplay.textContent = "-- °C";
                if (ringTempDisplay){
                    ringTempDisplay.textContent = "-- °C";
                }
            }
        });
    }
    updateTemperature();
    setInterval(updateTemperature, 8000);


    function updateHumidity(){
        IO.getData(humidityFeed, function({json}){
            if(Array.isArray(json) && json.length > 0){
                let latest=json[0];
                let humidityValue = parseFloat(latest.value).toFixed(1);
                latestHumidity = humidityValue; 
                humidityDisplay.textContent = `${humidityValue} %`;
                if(ringHumidityDisplay){
                    ringHumidityDisplay.textContent = humidityValue;
                }
            } else {
                humidityDisplay.textContent = "-- %";
                if (ringHumidityDisplay){
                    ringHumidityDisplay.textContent = "--%"
                }
            }
        })
    }
    updateHumidity();
    setInterval(updateHumidity, 8000);


    function updateRing(){
        let status = "---";
        if (latestTemp !== null && latestHumidity !== null){
             if (latestTemp >= 20 && latestTemp <= 25 && latestHumidity >= 40 && latestHumidity <= 60){
                status = "Good";
            }else if (latestTemp>= 15 && latestTemp<=30 && latestHumidity>= 30 && latestHumidity<= 70){
                status = "Average";
            }else{
                status = "Bad";
            }
        }
        if (ringStatus) {
            ringStatus.textContent = status;
        }
    }
    updateRing();
    setInterval(updateRing, 8000);


});


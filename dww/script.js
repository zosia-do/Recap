 document.addEventListener("DOMContentLoaded", function(){
    const IO = new AdafruitIO(username, key);
    
    
    const temperatureFeed = "temperature";
    const temperatureDisplay = document.getElementById("temp-value");
    const ringTempDisplay = document.getElementById("ring-temp-value");
    
    const humidityFeed = "humidity";
    const humidityDisplay = document.getElementById("humidity-value");
    const ringHumidityDisplay = document.getElementById("ring-humidity-value");

    function updateTemperature() {
        IO.getData(temperatureFeed, function({ json }) {
            if (Array.isArray(json) && json.length > 0) {
                let latest = json[0];
                let tempValue = latest.value;
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
    setInterval(updateTemperature, 20000);

    function updateHumidity(){
        IO.getData(humidityFeed, function({json}){
            if(Array.isArray(json) && json.length > 0){
                let latest=json[0];
                let humidityValue = latest.value;
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
    setInterval(updateHumidity, 20000);

});


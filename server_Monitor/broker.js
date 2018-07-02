mqtt = require('mqtt');

module.exports.connectToBroker = function () {
    //tcp://iot.eclipse.org:1883
    //tcp://172.20.6.125:1883
    mqttClient = mqtt.connect('tcp://172.20.6.125:1883', {
            keepalive: 3000
        }),
        //connect to the broker by the given url and options and return a client
        //mqttTopic_1 = 'danyang/1022';
    mqttTopic_mine = 'randomData_xushu';
    mqttTopic_test = 'xushuTesting0109';

    mqttTopic_light = 'light_xuxu0109';
    mqttTopic_pressure = 'pressure_xuxu0109';
    mqttTopic_temp = 'temperature_xuxu0109';
    mqttTopic_humidity = 'humidity_xuxu0109';

    /* 
    Subscribe (listen) to MQTT topic and start publishing
    simulated data after successful MQTT connection 
    */
    mqttClient.on('connect', () => {
        console.log('Mqtt connected.');
        // mqttClient.subscribe(mqttTopic_test);
        //mqttClient.subscribe(mqttTopic_light);
        mqttClient.subscribe(mqttTopic_temp);
        mqttClient.subscribe(mqttTopic_pressure);
        mqttClient.subscribe(mqttTopic_humidity);

        //mqttClient.subscribe(mqttTopic_1); //subscribe
        //startStreamSimulation(); //publish

    })

    mqttClient.on('offline', () => {
        console.log('Mqtt offline.');
        mqttClient.unsubscribe(mqttTopic_test);
        clearInterval(streamInterval);
    })
}

module.exports.getMessage = function () {
    // Message event fires, when new messages arrive on the subscribed topic
    mqttClient.on('message', function (topic, message) {
        console.log('Received: ' + message.toString() + ' from topic: ' + topic.toString());
        //let parsedMessage = JSON.parse(message);
        //io.emit('randomData_xushu', parsedMessage);
        //io.emit('accelerate', parsedMessage);
    });
}

module.exports.testMsg = function (data) {
    mqttClient.publish(mqttTopic_test, JSON.stringify(data))

}

module.exports.light_Msg = function (data) {
    mqttClient.publish(mqttTopic_light, JSON.stringify(data))

}

module.exports.temp_Msg = function (data) {
    mqttClient.publish(mqttTopic_temp, JSON.stringify(data))

}

module.exports.pressure_Msg = function (data) {
    mqttClient.publish(mqttTopic_pressure, JSON.stringify(data))

}

module.exports.humidity_Msg = function (data) {
    mqttClient.publish(mqttTopic_humidity, JSON.stringify(data))

}


/* 
   Function that publishes simulated data to the MQTT broker every ≈20ms
   */
var streamInterval;
var msFrequency = 5000;

function startStreamSimulation() {

    var v1 = 0,
        v2 = 0,
        v3 = 0;

    streamInterval = setInterval(function () {

        /* Prepare random data */
        v1 = returnRandomFloat(0, 10);
        v2 = returnRandomFloat(0, 10);
        v3 = returnRandomFloat(0, 10);

        /* Publish random data to the corresponding MQTT topic as a JSON string  */
        mqttClient.publish(mqttTopic_mine, JSON.stringify({
            'v1': v1,
            'v2': v2,
            'v3': v3
        }));


    }, msFrequency);
}

function returnRandomFloat(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}
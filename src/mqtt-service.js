// Trong file mqttService.js
import mqtt from "mqtt";
import { TOPIC_CHECK_MODE, TOPIC_DATA, TOPIC_RESPONSE_MODE } from "./constant";
const connectMQTT = (
  setTemperature,
  setHumidity,
  setLux,
  setIsLightOn,
  setPumpSpeed,
  setFanSpeed,
  setIsHealthy,
  setIsRaining,
  setOutdoorTemperature
) => {
  const client = mqtt.connect("ws://103.77.246.226:8083/mqtt");

  client.on("connect", () => {
    console.log("Connected to MQTT Broker");
    client.subscribe(TOPIC_DATA);
    // client.subscribe(TOPIC_CHECK_MODE);

    // ...subscribe to other topics as needed...
  });

  client.on("message", (topic, message) => {
    const msg = message.toString();
    const data = JSON.parse(msg);

    Object.keys(data).forEach((key) => {
      switch (key) {
        case "temperature":
          setTemperature(data[key]);
          break;
        case "humidity":
          setHumidity(data[key]);
          break;
        case "lux":
          setLux(data[key]);
          break;
        case "isLight":
          setIsLightOn(data[key]);
          break;
        case "pumpSpeed":
          setPumpSpeed(data[key]);
          break;
        case "fanSpeed":
          setFanSpeed(data[key]);
          break;
        case "healthy":
          setIsHealthy(data[key]);
          break;
        case "isRain":
          setIsRaining(data[key]);
          break;
        case "temperatureOut":
          setOutdoorTemperature(data[key]);
          break;
        default:
          console.log(`Unknown key: ${key}`);
      }
    });
  });

  return client;
};
const initMQTT = () => {
  const client = mqtt.connect("ws://103.77.246.226:8083/mqtt");
  return client;
};
const modeMQTT = () => {
  const client = mqtt.connect("ws://103.77.246.226:8083/mqtt");
  client.on("connect", () => {
    client.subscribe(TOPIC_CHECK_MODE);
  });
  client.on("message", (topic, message) => {
    const isManualControl = JSON.parse(
      sessionStorage.getItem("isManualControl")
    );
    const mode = { isManualControl: isManualControl };
    sendMessageToMQTT(client, TOPIC_RESPONSE_MODE, mode);
  });
  return client;
};
const sendMessageToMQTT = (client, topic, message) => {
  // Chuyển đổi message thành chuỗi JSON
  const msg = JSON.stringify(message);

  // Gửi tin nhắn
  client.publish(topic, msg, (err) => {
    console.log("mesage", message);
    if (err) {
      console.error("Error sending message:", err);
    } else {
      console.log(`Message sent to topic ${topic}:`, msg);
    }
  });
};

export { connectMQTT, sendMessageToMQTT, initMQTT, modeMQTT };

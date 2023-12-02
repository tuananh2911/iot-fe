import React, { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Icon } from "@iconify/react";
import { TOPIC_DATA, TOPIC_CONTROL, TOPIC_CHECK_MODE, TOPIC_RESPONSE_MODE } from "../constant";
import { connectMQTT, sendMessageToMQTT, initMQTT, modeMQTT } from "../mqtt-service";
function PlantDetail({ match }) {
  const { id } = 1;
  const [temperature, setTemperature] = useState(25);
  const [humidity, setHumidity] = useState(60);
  const [lux, setLux] = useState(500);
  const [isHealthy, setIsHealthy] = useState(true);
  const [fanSpeed, setFanSpeed] = useState(0);
  const [pumpSpeed, setPumpSpeed] = useState(0);
  const [isLightOn, setIsLightOn] = useState(false);
  const [isManualControl, setIsManualControl] = useState(false);
  const [knobRotationPump, setKnobRotationPump] = useState(0);
  const [knobRotationFan, setKnobRotationFan] = useState(0);
  const [mqttClient, setMqttClient] = useState(null);
  const [initMqtt, setInitMQTT] = useState(null);
  const [modeCheckMQTT, setModeMQTT] = useState(null);
  useEffect(() => {
    const client = connectMQTT(
      setTemperature,
      setHumidity,
      setLux,
      setIsLightOn,
      setPumpSpeed,
      setFanSpeed,
      setIsHealthy
    );
    setMqttClient(client);
    return () => client.end();
  }, []);
  useEffect(() => {
    const clientInit = initMQTT();
    setInitMQTT(clientInit);
    return () => {
      clientInit.end();
    };
  }, []);
  useEffect(() => {
    const clientInit = modeMQTT();
    setModeMQTT(clientInit);
    return () => {
      clientInit.end();
    };
  }, []);
  const sendFanSpeed = () => {
    const message = { fanSpeed: pendingFanSpeed, pumpSpeed: pendingPumpSpeed, isLight: !isLightOn };
    sendMessageToMQTT(initMqtt, TOPIC_CONTROL, message);
  };
  const sendPumpSpeed = () => {
    const message = { fanSpeed: pendingFanSpeed, pumpSpeed: pendingPumpSpeed, isLight: !isLightOn };
    sendMessageToMQTT(initMqtt, TOPIC_CONTROL, message);
  };
  const sendLight = () => {
    const message = { fanSpeed: pendingFanSpeed, pumpSpeed: pendingPumpSpeed, isLight: !isLightOn };
    sendMessageToMQTT(initMqtt, TOPIC_CONTROL, message);
  };
  // Handlers for plant condition changes
  const handleFanSpeedChange = (e) => setFanSpeed(e.target.value);
  const handlePumpSpeedChange = (e) => setPumpSpeed(e.target.value);
  const handleLightToggle = () => {
    setIsLightOn(!isLightOn);
    sendLight();
  };
  const handleKnobClick = () => {
    setKnobRotationPump((prevRotation) => prevRotation + 45); // Tăng góc xoay thêm 45 độ
    confirmPumpSpeedChange();
  };
  const handleKnobClickFan = () => {
    setKnobRotationFan((prevRotation) => prevRotation + 45); // Tăng góc xoay thêm 45 độ
    confirmFanSpeedChange();
  };

  // Toggle handler for manual control
  const handleControlToggle = () => {
    setIsManualControl(!isManualControl);
    sessionStorage.setItem("isManualControl", JSON.stringify(isManualControl));
    if (!isManualControl) {
      // Ngay khi chuyển sang chế độ chỉnh tay, gửi dữ liệu hiện tại
      sendFanSpeed();
      sendPumpSpeed();
      // Có thể thêm các hàm gửi khác nếu cần
    }
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  // Hàm xử lý khi rời khỏi thẻ
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const [pendingFanSpeed, setPendingFanSpeed] = useState(fanSpeed);
  const [pendingPumpSpeed, setPendingPumpSpeed] = useState(pumpSpeed);

  // Handlers for setting pending values
  const handlePendingFanSpeedChange = (e) => setPendingFanSpeed(e.target.value);
  const handlePendingPumpSpeedChange = (e) =>
    setPendingPumpSpeed(e.target.value);

  // Handlers for confirming changes
  const confirmFanSpeedChange = () => {
    setFanSpeed(pendingFanSpeed);
    if (isManualControl) {
      sendFanSpeed();
    }
  };

  const confirmPumpSpeedChange = () => {
    setPumpSpeed(pendingPumpSpeed);
    if (isManualControl) {
      sendPumpSpeed();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8 mt-16">
        <h2 className="text-2xl font-bold text-center mb-4">
          Thông tin chi tiết của cây trồng có id {id}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Trạng thái cây */}
          <div className="col-span-3">
            <div
              className={`data-card p-4 rounded-lg bg-blue-200 transform ${
                isHovered
                  ? "hover:scale-105 transition-transform ease-in-out duration-300"
                  : ""
              }`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="flex items-center justify-center mb-2">
                <Icon
                  icon="streamline:tree-2"
                  className={`text-red-600 text-5xl ${
                    isHealthy ? "opacity-100" : "opacity-50"
                  }`}
                />
              </div>
              <h3 className="text-xl font-bold text-red-800 text-center">
                Trạng thái cây:
              </h3>
              <p
                className={`text-lg text-red-700 text-center ${
                  isHealthy ? "text-opacity-100" : "text-opacity-50"
                }`}
              >
                {isHealthy ? "Khỏe mạnh" : "Bị bệnh"}
              </p>
            </div>
          </div>

          {/* Thông tin Nhiệt độ */}
          <div
            className={`data-card p-4 rounded-lg bg-blue-200 transform ${
              isHovered
                ? "hover:scale-105 transition-transform ease-in-out duration-300"
                : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-center mb-2">
              <Icon icon="mdi:temperature" className="text-blue-600 text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-blue-800 text-center">
              Nhiệt độ:
            </h3>
            <p className="text-lg text-blue-700 text-center">
              {temperature} °C
            </p>
          </div>

          {/* Thông tin Độ ẩm */}
          <div
            className={`data-card p-4 rounded-lg bg-blue-200 transform ${
              isHovered
                ? "hover:scale-105 transition-transform ease-in-out duration-300"
                : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-center mb-2">
              <Icon icon="wi:humidity" className="text-yellow-600 text-5xl" />
            </div>
            <h3 className="text-xl font-bold text-yellow-800 text-center">
              Độ ẩm:
            </h3>
            <p className="text-lg text-yellow-700 text-center">{humidity} %</p>
          </div>

          {/* Thông tin Ánh sáng */}
          <div
            className={`data-card p-4 rounded-lg bg-blue-200 transform ${
              isHovered
                ? "hover:scale-105 transition-transform ease-in-out duration-300"
                : ""
            }`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="flex items-center justify-center mb-2">
              <Icon
                icon="arcticons:flux-2"
                className="text-green-600 text-5xl"
              />
            </div>
            <h3 className="text-xl font-bold text-green-800 text-center">
              Ánh sáng:
            </h3>
            <p className="text-lg text-green-700 text-center">{lux} lux</p>
          </div>

          {/* Thông tin Quạt - Tốc độ quạt */}
          <div className="data-card p-8 rounded-lg bg-blue-200">
            <div className="flex items-center justify-center mb-2">
              <Icon icon="bi:fan" className="text-indigo-600 text-5xl" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-indigo-800">
                Quạt - Tốc độ quạt: {pendingFanSpeed}
              </h3>
              {isManualControl ? (
                <>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={pendingFanSpeed}
                    onChange={handlePendingFanSpeedChange}
                    className="my-2"
                  />
                  <button
                    onClick={handleKnobClickFan}
                    className="p-2 text-white font-bold py-2 px-2 rounded-full inline-block"
                  >
                    <Icon
                      icon="mdi:knob"
                      style={{ transform: `rotate(${knobRotationFan}deg)` }}
                      className="text-black hover:text-lime-500 text-2xl"
                    />
                  </button>
                </>
              ) : (
                <p className="text-lg text-indigo-700">{fanSpeed}</p>
              )}
            </div>
          </div>

          {/* Thông tin Bơm - Tốc độ bơm */}
          <div className="data-card p-8 rounded-lg bg-blue-200">
            <div className="flex items-center justify-center mb-2">
              <Icon icon="ion:water" className="text-purple-600 text-5xl" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold text-purple-800 text-center">
                Bơm - Tốc độ bơm: {pendingPumpSpeed}
              </h3>
              {isManualControl ? (
                <>
                  <input
                    type="range"
                    min="0"
                    max="255"
                    value={pendingPumpSpeed}
                    onChange={handlePendingPumpSpeedChange}
                  />
                  <button
                    onClick={handleKnobClick}
                    className="p-2  text-white font-bold py-2 px-2 rounded-full"
                  >
                    <Icon
                      icon="mdi:knob"
                      style={{ transform: `rotate(${knobRotationPump}deg)` }}
                      className="text-black hover:text-lime-500 text-2xl"
                    />
                  </button>
                </>
              ) : (
                <p className="text-lg text-purple-700 text-center">
                  {pumpSpeed}
                </p>
              )}
            </div>
          </div>

          {/* Thông tin Trạng thái đèn */}
          <div className="data-card p-4 rounded-lg bg-blue-200">
            <div className="flex items-center justify-center mb-2">
              <Icon
                icon="arcticons:digilux"
                className={`text-pink-600 text-5xl ${
                  isLightOn ? "opacity-100" : "opacity-50"
                }`}
              />
            </div>
            <h3 className="text-xl font-bold text-pink-800 text-center">
              Trạng thái đèn:
            </h3>
            <div className="text-center mt-2">
              {isManualControl ? (
                <label className="inline-flex relative items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={isLightOn}
                    onChange={handleLightToggle}
                  />
                  <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-pink-500 peer-focus:ring-2 dark:peer-focus:ring-pink-800 transition duration-300 ease-in-out after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-pink-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600 peer-checked:after:translate-x-full peer-checked:after:left-0.5"></div>
                  <span className="ml-3 text-sm font-medium  dark:text-slate-950">
                    {isLightOn ? "Bật" : "Tắt"}
                  </span>
                </label>
              ) : (
                <p
                  className={`text-lg text-slate-950 font-medium ${
                    isLightOn ? "text-opacity-100" : "text-opacity-50"
                  }`}
                >
                  {isLightOn ? "Bật" : "Tắt"}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="text-center mt-4">
          <button
            onClick={handleControlToggle}
            className={`w-40 h-12 px-4 py-2 ${
              isManualControl ? "bg-blue-600" : "bg-orange-600"
            } text-white rounded-full text-sm`}
          >
            {isManualControl ? "Chế độ tự động" : "Chế độ chỉnh tay"}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default PlantDetail;

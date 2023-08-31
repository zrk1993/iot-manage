#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include "PubSubClient.h"
#include "ota.h"
#define ID_MQTT "D2308B183F28E2BA"     //用户私钥，控制台获取

const char* mqtt_server = "192.168.200.54"; //默认，MQTT服务器
const int mqtt_server_port = 9501;      //默认，MQTT服务器
String topic;

WiFiClient espClient;
PubSubClient client(espClient);

String getMacAddress() {
  uint8_t mac[6];
  WiFi.macAddress(mac);
  String macString = "";
  for (int i = 0; i < 6; i++) {
    macString += String(mac[i], HEX);
  }
  macString.toUpperCase(); // 将字符串转换为大写
  Serial.print(macString);
  return macString;
}

void callback(char* topic, byte* payload, size_t length) {
	Serial.print("Topic:");
	Serial.println(topic);
	String msg = "";
	for (size_t i = 0; i < length; i++) {
		msg += (char)payload[i];
	}
	if (strcmp(msg.c_str(), "UPDATE")) {
		String h = "http://192.168.200.54:9500/api/firmware/update/";
		updateBin(h + ID_MQTT, "1.1.1");
	}
	Serial.print("Msg:");
	Serial.println(msg);
}

void reconnect() {
	// Loop until we're reconnected
	while (!client.connected()) {
		Serial.print("Attempting MQTT connection...");
		// Attempt to connect
		if (client.connect(ID_MQTT, topic.c_str(), "")) {
			Serial.println("connected");
			Serial.print("subscribe:");
			Serial.println(topic);
			//订阅主题，如果需要订阅多个主题，可发送多条订阅指令client.subscribe(topic2);client.subscribe(topic3);
			client.subscribe(topic.c_str());
		} else {
			Serial.print("failed, rc=");
			Serial.print(client.state());
			Serial.println(" try again in 5 seconds");
      delay(5000);
		}
	}
}

void setup() {
  Serial.begin(9600);
  topic = getMacAddress();

  WiFiManager wifiManager;
  wifiManager.autoConnect(topic.c_str());

  Serial.println("connected...yeey :)");

  client.setServer(mqtt_server, mqtt_server_port);
  client.setCallback(callback);
}

void loop() {
  // 程序主循环
  if (client.connected()) {
		client.loop();
	} else {
		reconnect();
	}
}


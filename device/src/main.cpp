#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <WiFiManager.h>
#include <ArduinoJson.h>
#include "PubSubClient.h"
#include "ota.h"
#include "topic.h"

const char* mqtt_server = "192.168.200.55"; //默认，MQTT服务器
const int mqtt_server_port = 9501;      //默认，MQTT服务器

WiFiClient espClient;
PubSubClient client(espClient);

void callback(char* topic, byte* payload, size_t length) {
	Serial.printf("Topic: %s \n", topic);
	StaticJsonDocument<512> doc;
  DeserializationError error = deserializeJson(doc, payload, length);
	if (error) {
		Serial.println(F("Failed to read file, using default configuration"));
		return;
	}
	if (SUB_EXT_NTP_ID_RESPONSE.equals(topic)) {
		return;
	}
	if (SUB_OTA_DEVICE_UPGRADE_ID.equals(topic)) {
		Serial.printf("%s", doc["url"].as<const char*>());
		updateBin(espClient, doc["url"].as<const char*>(), "1.0");
		return;
	}
}

void reconnect() {
	// Loop until we're reconnected
	while (!client.connected()) {
		Serial.print("Attempting MQTT connection...");
		// Attempt to connect
		if (client.connect(id.c_str(), productKey.c_str(), "123456780")) {
			Serial.println("connected");

			client.subscribe(SUB_OTA_DEVICE_UPGRADE_ID.c_str());
			client.subscribe(SUB_EXT_NTP_ID_RESPONSE.c_str());
			client.subscribe(SUB_SYS_ID_THING_EVENT_PROPERTY_POST_REPLY.c_str());
			client.subscribe(SUB_SYS_ID_SERVICE_PROPERTY_SET.c_str());
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
	initTopicVar();
  WiFiManager wifiManager;
  wifiManager.autoConnect(deviceKey.c_str());

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


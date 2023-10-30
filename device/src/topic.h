#ifndef TOPIC_h
#define TOPIC_h
#include <Arduino.h>
#include <ESP8266WiFi.h>

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

String productKey = "jdwSdrphKj";
String deviceKey;
String id;

String SUB_OTA_DEVICE_UPGRADE_ID = "";                    // 固件升级信息下行
String PUB_OTA_DEVICE_PROGRESS_ID = "";                   // 设备上报固件升级进度

String SUB_EXT_NTP_ID_RESPONSE = "";                      // NTP 时钟同步响应
String SUB_SYS_ID_THING_EVENT_PROPERTY_POST_REPLY = "";   // 云端响应属性上报
String SUB_SYS_ID_SERVICE_PROPERTY_SET = "";              // 设备属性设置

void initTopicVar () {
  deviceKey = getMacAddress();
	id =  productKey + "/" + deviceKey;

  SUB_OTA_DEVICE_UPGRADE_ID = "/ota/device/upgrade/" + id;
  PUB_OTA_DEVICE_PROGRESS_ID = "/ota/device/progress/" + id;

  SUB_EXT_NTP_ID_RESPONSE = "/ext/ntp/" + id + "/response";
  SUB_SYS_ID_THING_EVENT_PROPERTY_POST_REPLY = "/sys/" + id + "/thing/event/property/post_reply";
  SUB_SYS_ID_SERVICE_PROPERTY_SET = "/sys/" + id + "/thing/service/property/set";
}

#endif
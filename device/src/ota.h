#ifndef OTAt_h
#define OTAt_h
#include <ESP8266httpUpdate.h>
#include "topic.h"

/**
 * 固件升级函数
 * 在需要升级的地方，加上这个函数即可，例如setup中加的updateBin(); 
 * 原理：通过http请求获取远程固件，实现升级
 */
void updateBin(WiFiClient& UpdateClient, String upUrl, String currentVersion){
  Serial.println("start update");    

  ESPhttpUpdate.onStart([](){
    Serial.println("CALLBACK:  HTTP update process started");
  });

  ESPhttpUpdate.onEnd([](){
    Serial.println("CALLBACK:  HTTP update process finished");
  });

  ESPhttpUpdate.onProgress([](int cur, int total){
    Serial.printf("CALLBACK:  HTTP update process at %d of %d bytes...\n", cur, total);
  });

  ESPhttpUpdate.onError([](int err){
    Serial.printf("CALLBACK:  HTTP update fatal error code %d\n", err);
  });
  
  t_httpUpdate_return ret = ESPhttpUpdate.update(UpdateClient, upUrl, currentVersion);
  switch(ret) {
    case HTTP_UPDATE_FAILED:      //当升级失败
        Serial.println("[update] Update failed.");
        break;
    case HTTP_UPDATE_NO_UPDATES:  //当无升级
        Serial.println("[update] Update no Update.");
        break;
    case HTTP_UPDATE_OK:         //当升级成功
        Serial.println("[update] Update ok.");
        break;
  }
}

#endif
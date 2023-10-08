const topics = [
  {
    category: 'OTA 升级',
    list: [
      {
        topic: '/ota/device/inform/${productKey}/${deviceKey}',
        op: '发布',
        desc: '设备上报固件升级信息'
      },
      {
        topic: '/ota/device/upgrade/${productKey}/${deviceKey}',
        op: '订阅',
        desc: '固件升级信息下行'
      },
      {
        topic: '/ota/device/progress/${productKey}/${deviceKey}',
        op: '发布',
        desc: '设备上报固件升级进度'
      },
      {
        topic: '/sys/${productKey}/${deviceKey}/thing/ota/firmware/get',
        op: '发布',
        desc: '设备主动拉取固件升级信息'
      }
    ]
  },
  {
    category: '时钟同步',
    list: [
      {
        topic: '/ext/ntp/${productKey}/${deviceKey}/request',
        op: '发布',
        desc: 'NTP 时钟同步请求'
      },
      {
        topic: '/ext/ntp/${productKey}/${deviceKey}/response',
        op: '订阅',
        desc: 'NTP 时钟同步响应'
      }
    ]
  },
  {
    category: '属性上报',
    list: [
      {
        topic: '/sys/${productKey}/${deviceKey}/thing/event/property/post',
        op: '发布',
        desc: '设备属性上报'
      },
      {
        topic: '/sys/${productKey}/${deviceKey}/thing/event/property/post_reply',
        op: '订阅',
        desc: '云端响应属性上报'
      }
    ]
  },
  {
    category: '属性设置',
    list: [
      {
        topic: '/sys/${productKey}/${deviceKey}/thing/service/property/set',
        op: '订阅',
        desc: '设备属性设置'
      }
    ]
  },
  {
    category: '事件上报',
    list: [
      {
        topic: '/sys/${productKey}/${deviceKey}/thing/event/${tsl.event.identifier}/post',
        op: '发布',
        desc: '设备事件上报'
      },
      {
        topic: '/sys/${productKey}/${deviceKey}/thing/event/${tsl.event.identifier}/post_reply',
        op: '订阅',
        desc: '云端响应事件上报'
      }
    ]
  },
  {
    category: '服务调用',
    list: [
      {
        topic: '/sys/${productKey}/${deviceKey}/thing/service/${tsl.service.identifier}',
        op: '订阅',
        desc: '设备服务调用'
      },
      {
        topic: '/sys/${productKey}/${deviceKey}/thing/service/${tsl.service.identifier}_reply',
        op: '发布',
        desc: '设备端响应服务调用'
      }
    ]
  }
]

export default topics

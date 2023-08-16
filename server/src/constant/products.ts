type product = {
  name: string
  code: string
  type: string
}

const products: product[] = [
  {
    name: '插座',
    type: 'socket',
    code: '001'
  },
  {
    name: '灯泡',
    type: 'bulb',
    code: '002'
  },
  {
    name: '开关',
    type: 'switch',
    code: '003'
  },
  {
    name: '窗帘',
    type: 'curtain',
    code: '004'
  },
  {
    name: '风扇',
    type: 'fan',
    code: '005'
  },
  {
    name: '空调',
    type: 'aircondition',
    code: '009'
  }
]

export default products

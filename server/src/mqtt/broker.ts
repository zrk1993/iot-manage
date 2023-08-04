import Aedes from 'aedes'
import { createServer } from 'net'

const port = 1883
const aedes = new Aedes()

const server = createServer(aedes.handle)

server.listen(port, function () {
  console.log('server started and listening on port ', port)
})

export function getcClients(): Aedes.Client[] {
  return Object.values((aedes as any).clients)
}

export default aedes

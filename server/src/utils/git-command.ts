import { spawn } from 'node:child_process'

export async function gitLog(): Promise<{ commit: string; author: string; date: string }[]> {
  const command = spawn('git', ['log', '-10'])
  const result = []

  command.stdout.on('data', data => {
    const s = data
      .toString()
      .split('\n')
      .filter(Boolean)
      .map((v: string) => v.trim())
    result.push({
      commit: s[0].replace('commit', '').trim(),
      author: s[1].replace('Author:', '').trim(),
      date: s[2].replace('Date:', '').trim(),
      summary: s[3]
    })
  })

  return new Promise((resolve, reject) => {
    command.stderr.on('data', data => {
      console.error(`stderr: ${data}`)
      reject(new Error(data.toString()))
    })
    command.on('close', code => {
      resolve(result)
    })
  })
}

export async function gitBranch(): Promise<string> {
  const command = spawn('git', ['log', '-10'])
  let result = ''

  command.stdout.on('data', data => {
    result = data.toString()
  })

  return new Promise((resolve, reject) => {
    command.stderr.on('data', data => {
      console.error(`stderr: ${data}`)
      reject(new Error(data.toString()))
    })
    command.on('close', code => {
      resolve(result.split('\n')[0]?.replace('*', '').trim())
    })
  })
}

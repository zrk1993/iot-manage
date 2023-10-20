const { spawn } = require('node:child_process')
const ls = spawn('git', ['log', '-10'])

const a = []

ls.stdout.on('data', data => {
  // console.log(`stdout: ${data}`)
  const v = data.toString()
  const s = v
    .split('\n')
    .filter(Boolean)
    .map(v => v.trim())
  a.push({
    commit: s[0],
    Author: s[1],
    date: s[2],
    summary: s[3]
  })
})

ls.stderr.on('data', data => {
  console.error(`stderr: ${data}`)
})

ls.on('close', code => {
  console.log(a)
  console.log(`child process exited with code ${code}`)
})

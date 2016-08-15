#!/usr/bin/node

var _ = require('lodash')
var program = require('commander')

var translate = require('./translate')

var method
program
  .version('1.0.0')
  .arguments('<method>')
  .action(m => method = m)
  .parse(process.argv)

var pipedInput = ''
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', data => pipedInput += data)
process.stdin.on('end', () =>
  process.stdout.write(
    translate[method](
      JSON.parse(pipedInput)
    )
  )
)


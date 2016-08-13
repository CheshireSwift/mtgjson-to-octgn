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

process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', _.flow(
  JSON.parse,
  translate[method],
  x => process.stdout.write(x)
))


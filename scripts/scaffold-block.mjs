#!/usr/bin/env node
import fs from 'fs'
import path from 'path'

const args = process.argv.slice(2)

const help = `
Usage: scaffold-block name element

Generates a Block Component scaffold for quick development.
The name argument should be SnakeCased and will be used as
the component name and file name. The element argment should
be a valid HTMLElement.

Other Commands:

help\tPrints this help message
`

if (args.length < 1 || args[0] === 'help') {
  console.log(help)
  process.exit(1)
}

const [name, element] = args
const filePath = path.resolve(`./src/blocks/${name}.tsx`)
const testFilePath = path.resolve(`./src/blocks/${name}.test.tsx`)

if (fs.existsSync(filePath) || fs.existsSync(testFilePath)) {
  console.error('Error: File already exists. Delete it first if you want to replace it.')
  process.exit(1)
}


const template = fs.readFileSync('./scripts/template.tsx', 'utf8')
const templateTest = fs.readFileSync('./scripts/template.test.tsx', 'utf8')

const fileData = template.replace(/COMP_NAME/g, name).replace(/COMP_ELEM/g, element)
const testFileData = templateTest.replace(/COMP_NAME/g, name).replace(/COMP_ELEM/g, element)

fs.writeFileSync(filePath, fileData)
fs.writeFileSync(testFilePath, testFileData)

console.log(`Complete!

Files Created
./scripts/blocks/${name}.tsx
./scripts/blocks/${name}.test.tsx
`)

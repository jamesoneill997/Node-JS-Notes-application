const chalk = require('chalk')
const yargs = require('yargs')
const fs = require('fs')
const notes = require('./notes.js')

const command = process.argv[2]

//add command

yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv){notes.addNote(argv.title, argv.body)}
})

//remove command
yargs.command({
    command: 'remove',
    describe: 'Removes a note',
    builder: {
        title:{
            describe: 'Note title',
            type: 'string'
        }
    },
    handler(argv){notes.removeNote(argv.title)} 
})

//list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler(){console.log(notes.listNotes(argv.title))}
})

//read command
yargs.command({
    command: 'read',
    describe: 'Reads a note',
    builder:{
        title:{
            describe: 'Note title',
            type: 'string',
            demandOption: true
        }
    },
    handler(argv){console.log(notes.readNotes(argv.title))}})

yargs.parse()
const fs = require('fs')
const chalk = require('chalk')

//adds a note to the notes.json file, utilising the other methods in this file
const addNote = (title,body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note)=> title===note.title)
    console.log(duplicateNote)

    if (!duplicateNote) {
        notes.push({
            title:title,
            body:body
        })
        saveNotes(notes)
        console.log(chalk.green("Note added successfully"))
        
    }

    else{
        console.log(chalk.red("Title ", title, " already exists."))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    const dataRemoved = notes.filter((note) => note.title !== title)
    if (dataRemoved.length !== notes.length) {
        console.log(chalk.green('Successfully removed ', title))
        saveNotes(dataRemoved)
    }
    else(
        console.log(chalk.red(title, ' does not exist'))
    )
        
}

//saves data to notes.json file
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

//loads notes currently in the notes.json file
const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)

    } catch (e) {
        return []
    }

}

//returns list of all notes
const listNotes = () => {
    notes = loadNotes()
    notes.forEach(note => {
        console.log(chalk.green(note.title), ' ', chalk.blue(note.body))
    });

    return chalk.yellow('End of list!')
}

//return information of a provided note
const readNotes = (requested) =>{
    notes = loadNotes()
    const requestedNote = notes.find((note)=>requested===note.title)

    
    if(requestedNote){
        return chalk.green('Title: ' + requestedNote.title) + '\n' + 'Description: ' + requestedNote.body
        
    } else{
        return chalk.red('Note with title: "' + requested + '" does not exist.')
    }
}

//exports for referece from app.js
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNotes: readNotes
}
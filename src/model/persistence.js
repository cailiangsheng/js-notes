const Notes = require('./notes');
const NOTES_STORAGE_NAME = 'js-notes.notes';

module.exports = class PersistedNotes {
    constructor() {
        this.notes = new Notes();
        this.readNotes();
    }

    readNotes() {
        const json = localStorage.getItem(NOTES_STORAGE_NAME);
        const arr = json ? JSON.parse(json) : [];
        this.notes.initNotes(arr);
    }

    saveNotes() {
        localStorage.setItem(NOTES_STORAGE_NAME, JSON.stringify(this.notes.items));
    }

    deleteNote(note) {
        if (this.notes.removeNote(note)) {
            this.saveNotes();
        }
    }

    createNote(title) {
        this.notes.createNote(title);
        this.saveNotes();
    }

    updateNote(note) {
        this.notes.updateNote(note);
        this.saveNotes();
    }
}

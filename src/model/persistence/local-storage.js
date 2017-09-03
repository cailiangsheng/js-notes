import Notes from '../notes';

const NOTES_STORAGE_NAME = 'js-notes.notes';

export default class LocalStorageNotes {
    constructor() {
        this.notes = new Notes();
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

    readNotes(callback) {
        const json = localStorage.getItem(NOTES_STORAGE_NAME);
        const arr = json ? JSON.parse(json) : [];
        this.notes.initNotes(arr);
        callback && callback(false);
    }

    saveNotes() {
        localStorage.setItem(NOTES_STORAGE_NAME, JSON.stringify(this.notes.items));
    }
}

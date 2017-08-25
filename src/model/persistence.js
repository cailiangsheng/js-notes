const Notes = require('./notes');
const NOTES_STORAGE_NAME = 'js-notes.notes';

module.exports = PersistedNotes;

function PersistedNotes() {
    this.notes = new Notes();
    this.readNotes();
}

PersistedNotes.prototype.readNotes = function () {
    const json = localStorage.getItem(NOTES_STORAGE_NAME);
    const arr = json ? JSON.parse(json) : [];
    this.notes.initNotes(arr);
};

PersistedNotes.prototype.saveNotes = function () {
    localStorage.setItem(NOTES_STORAGE_NAME, JSON.stringify(this.notes.items));
};

PersistedNotes.prototype.deleteNote = function (note) {
    if (this.notes.removeNote(note)) {
        this.saveNotes();
    }
};

PersistedNotes.prototype.createNote = function (title) {
    this.notes.createNote(title);
    this.saveNotes();
};

PersistedNotes.prototype.updateNote = function (note) {
    this.notes.updateNote(note);
    this.saveNotes();
};

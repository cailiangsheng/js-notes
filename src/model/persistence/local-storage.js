var Notes = require('../notes');

var NOTES_STORAGE_NAME = 'js-notes.notes';

module.exports = LocalStorageNotes;

function LocalStorageNotes() {
    this.notes = new Notes();
}

LocalStorageNotes.prototype.deleteNote = function (note) {
    if (this.notes.removeNote(note)) {
        this.saveNotes();
    }
};

LocalStorageNotes.prototype.createNote = function (title) {
    this.notes.createNote(title);
    this.saveNotes();
};

LocalStorageNotes.prototype.updateNote = function (note) {
    this.notes.updateNote(note);
    this.saveNotes();
};

LocalStorageNotes.prototype.readNotes = function (callback) {
    var json = localStorage.getItem(NOTES_STORAGE_NAME);
    var arr = json ? JSON.parse(json) : [];
    this.notes.initNotes(arr);
    callback && callback(false);
};

LocalStorageNotes.prototype.saveNotes = function () {
    localStorage.setItem(NOTES_STORAGE_NAME, JSON.stringify(this.notes.items));
};

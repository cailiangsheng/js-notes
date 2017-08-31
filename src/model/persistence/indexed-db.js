var Notes = require('../notes');
var dexieUtil = require('./dexie-util');

module.exports = IndexedDBNotes;

function IndexedDBNotes() {
  this.notes = new Notes();
}

IndexedDBNotes.prototype.deleteNote = function (note) {
  if (this.notes.removeNote(note)) {
    dexieUtil.deleteNote(note.timestamp);
  }
};

IndexedDBNotes.prototype.createNote = function (title) {
  var note = this.notes.createNote(title);
  dexieUtil.saveNote(note);
};

IndexedDBNotes.prototype.updateNote = function (note) {
  dexieUtil.deleteNote(note.timestamp);
  this.notes.updateNote(note);
  dexieUtil.saveNote(note);
};

IndexedDBNotes.prototype.readNotes = function (callback) {
  var notes = this.notes;

  dexieUtil.loadNotes(function (value) {
    notes.initNotes(value);
    callback && callback(true);
  })
};

var Dexie = require('dexie');

var NOTES_STORAGE_NAME = 'js-notes.notes';

var db;

module.exports = {
  loadNotes: loadNotes,
  clearNotes: clearNotes,
  loadNote: loadNote,
  deleteNote: deleteNote,
  saveNote: saveNote
}

function getDB() {
  if (!db) {
    db = new Dexie(NOTES_STORAGE_NAME);
    db.version(1).stores({ notes: 'timestamp, title, content' });
  }

  return db;
}

function loadNotes(callback) {
  getDB()
    .notes
    .toArray()
    .then(function (value) {
      console.info('Successfully loaded the persisted notes:', value);
      callback && callback(value);
    })
    .catch(function (err) {
      console.error('Failed to load the persisted notes, error:', err);
      callback(err);
    });
}

function clearNotes(callback) {
  getDB()
    .notes
    .clear()
    .then(function () {
      console.info('Successfully cleared the persisted notes');
      callback && callback();
    })
    .catch(function (err) {
      console.error('Failed to clear the persisted notes');
      callback && callback(err);
    });
}

function loadNote(timestamp, callback) {
  getDB()
    .notes
    .where('timestamp').equals(timestamp)
    .toArray()
    .then(function (notes) {
      if (!notes.length) {
        console.info('Did not find persisted data for the note with timestamp:', timestamp);
        callback && callback(null, null);
      } else {
        console.info('Found the persisted note with timestamp:', timestamp, ', note:', notes[0]);
        callback && callback(null, notes[0]);
      }
    })
    .catch(function (err) {
      console.error('Failed to load the persisted note with timestamp:', timestamp, ', error:', err);
      callback && callback(err);
    });
}

function deleteNote(timestamp, callback) {
  getDB()
    .notes
    .where('timestamp').equals(timestamp)
    .delete()
    .then(function () {
      console.info('Successfully deleted the persisted note with timestamp:', timestamp);
      callback && callback();
    })
    .catch(function (err) {
      console.error('Failed to delete the persisted note with timestamp:', timestamp, ', error:', err);
      callback && callback(err);
    })
}

function saveNote(note, callback) {
  getDB()
    .notes
    .put({
      timestamp: note.timestamp,
      title: note.title,
      content: note.content
    })
    .then(function () {
      console.info('Successfully persisted a note:', note);
      callback && callback();
    })
    .catch(function (err) {
      console.error('Failed to persist a note:', note, ', error:', err);
      callback && callback(err);
    });
}

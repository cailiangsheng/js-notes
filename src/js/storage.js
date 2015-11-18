var notesStorage = angular.module('notesStorage', []);
var NOTES_STORAGE_NAME = 'js-notes.notes';

notesStorage.factory('storage', function () {
    return {
        readNotes: readNotes,
        saveNotes: saveNotes,
        fetchNotes: fetchNotes,
        deleteNote: deleteNote,
        createNote: createNote,
        saveNote: saveNote
    }

    function readNotes() {
        var notesJSON = localStorage.getItem(NOTES_STORAGE_NAME);
        return notesJSON ? JSON.parse(notesJSON) : [];
    }

    function saveNotes(savingNotes) {
        localStorage.setItem(NOTES_STORAGE_NAME, JSON.stringify(savingNotes))
    }

    function fetchNotes(searchingText) {
        var notes = readNotes();
        if (searchingText) {
            var searchedNotes = []
            _.forEach(notes, function (note) {
                if (note.title && note.title.indexOf(searchingText) >= 0 ||
                    note.content && note.content.indexOf(searchingText) >= 0 ||
                    note.datetime && note.datetime.indexOf(searchingText) >= 0) {
                    searchedNotes.push(note);
                }
            });
            return searchedNotes;
        }
        return notes;
    }

    function deleteNote(deletingNote) {
        var notes = readNotes();
        _.forEach(notes, function (note) {
            if (deletingNote.timestamp == note.timestamp) {
                notes = _.without(notes, note);
                saveNotes(notes);
                return notes;
            }
        });
        return notes;
    }

    function createNote(creatingNoteTitle) {
        var notes = readNotes();
        var timestamp = getTimestamp();
        var newNote = {
            title: creatingNoteTitle,
            content: "",
            timestamp: timestamp,
            datetime: getLocaleString(timestamp)
        };
        notes.unshift(newNote);
        saveNotes(notes);
        return notes;
    }

    function getTimestamp() {
        return new Date().getTime();
    }

    function getLocaleString(timestamp) {
        return new Date(timestamp).toLocaleString();
    }

    function saveNote(savingNote) {
        var notes = readNotes();
        _.forEach(notes, function (note) {
            if (note.timestamp == savingNote.timestamp) {
                note.title = savingNote.title;
                note.content = savingNote.content;
                note.timestamp = savingNote.timestamp = getTimestamp();
                note.datetime = savingNote.datetime = getLocaleString(savingNote.timestamp);
                saveNotes(notes);
                return notes;
            }
        });
        return notes;
    }
});

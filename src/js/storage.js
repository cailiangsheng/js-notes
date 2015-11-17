var notesStorage = angular.module('notesStorage', []);
var NOTES_STORAGE_NAME = 'js-notes.notes';

notesStorage.factory('storage', function () {
    return {
        readNotes: readNotes,
        saveNotes: saveNotes,
        searchNotes: searchNotes,
        deleteNote: deleteNote,
        createNote: createNote
    }

    function readNotes() {
        var notesJSON = localStorage.getItem(NOTES_STORAGE_NAME);
        return notesJSON ? JSON.parse(notesJSON) : [];
    }

    function saveNotes(savingNotes) {
        localStorage.setItem(NOTES_STORAGE_NAME, JSON.stringify(savingNotes))
    }

    function searchNotes(searchingText) {
        var notes = readNotes();
        if (searchingText) {
            var searchedNotes = []
            _.forEach(notes, function (note) {
                if (note.title.indexOf(searchingText) >= 0 ||
                    note.content.indexOf(searchingText) >= 0) {
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
        var newNote = {
            title: creatingNoteTitle || 'Untitled note',
            content: creatingNoteTitle + '\n',
            timestamp: new Date()
        };
        notes.unshift(newNote);
        saveNotes(notes);
        return notes;
    }
});
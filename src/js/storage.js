var notesStorage = angular.module('notesStorage', []);

notesStorage.factory('notes', function () {
    return {
        createNote: createNote
    };

    function createNote(title, content) {
        return {
            title: title || 'Untitled note',
            content: content,
            timestamp: new Date()
        }
    }
});

notesStorage.factory('storage', ['notes', function (notes) {
    return {
        readNotes: readNotes,
        saveNotes: saveNotes,
        deleteNote: deleteNote,
        createNote: createNote
    }

    function readNotes() {
        return [
            notes.createNote(),
            notes.createNote(),
            notes.createNote()
        ];
    }

    function saveNotes() {

    }

    function deleteNote(note) {
        console.log("deleting", note)
    }

    function createNote(noteTitle) {
        console.log("deleting", noteTitle)
    }
}]);
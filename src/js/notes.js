var notesApp = angular.module('notesApp', ['notesStorage']);

notesApp.controller('initNotes', ['$scope', 'storage', function ($scope, storage) {
    $scope.notes = storage.readNotes();

    $scope.fetchNotes = function () {
        var searchingText = $scope.inputText;
        $scope.notes = storage.fetchNotes(searchingText);
    };

    $scope.createNote = function () {
        var creatingNoteTitle = $scope.inputText || 'Untitled note';
        $scope.notes = storage.createNote(creatingNoteTitle);
        $scope.inputText = '';
    };

    $scope.deleteNote = function (deletingNote) {
        storage.deleteNote(deletingNote);
        $scope.fetchNotes();
    };

    $scope.saveNote = function (savingNote) {
        storage.saveNote(savingNote);
    }
}]);

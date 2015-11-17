var notesApp = angular.module('notesApp', ['notesStorage']);

notesApp.controller('initNotes', ['$scope', 'storage', function ($scope, storage) {
    $scope.notes = storage.readNotes();

    $scope.searchNotes = function () {
        var searchingText = $scope.inputText;
        $scope.notes = storage.searchNotes(searchingText);
        $scope.inputText = '';
        $scope.promptText = searchingText ? "Searched results for '" + searchingText + "'" : "";
    };

    $scope.createNote = function () {
        var creatingNoteTitle = $scope.inputText || 'Untitled note';
        $scope.notes = storage.createNote(creatingNoteTitle);
        $scope.inputText = '';
        $scope.promptText = '';
    };

    $scope.deleteNote = function (deletingNote) {
        $scope.notes = storage.deleteNote(deletingNote);
        $scope.inputText = '';
        $scope.promptText = '';
    };
}]);
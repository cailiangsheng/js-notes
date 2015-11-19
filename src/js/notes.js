var notesApp = angular.module('notesApp', ['notesStorage']);
var KEY_CODE_ENTER = 13

notesApp.controller('initNotes', ['$scope', 'storage', function ($scope, storage) {
    $scope.title = "Larry's Notes";
    $scope.notes = storage.readNotes();

    $scope.fetchNotes = function () {
        var searchingText = $scope.inputText;
        $scope.notes = storage.fetchNotes(searchingText);
    };

    $scope.createNote = function () {
        var creatingNoteTitle = $scope.inputText;
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

    $scope.onKeyDown = function (e) {
        if (e.keyCode == KEY_CODE_ENTER) {
            $scope.createNote();
        }
    }
}]);

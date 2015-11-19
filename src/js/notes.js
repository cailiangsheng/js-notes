var notesApp = angular.module('notesApp', ['notesStorage']);
var KEY_CODE_ENTER = 13;

notesApp.filter('toTextLines', ['$sce', function ($sce) {
    return function (text) {
        var lines = text.split("\n").join("<br>");
        return $sce.trustAsHtml(lines);
    }
}]);

notesApp.controller('initNotes', ['$scope', 'storage', function ($scope, storage) {
    $scope.title = "Larry's Notes";
    $scope.notes = storage.readNotes();

    $scope.getDateTime = function (note) {
        return new Date(note.timestamp).toLocaleString();
    };

    $scope.fetchNotes = function () {
        var searchingText = $scope.inputText;
        $scope.notes = storage.fetchNotes(searchingText);
    };

    $scope.createNote = function () {
        var creatingNoteTitle = $scope.inputText;
        $scope.notes = storage.createNote(creatingNoteTitle);
        $scope.inputText = '';
        $scope.fetchNotes();
    };

    $scope.deleteNote = function (deletingNote) {
        storage.deleteNote(deletingNote);
        $scope.fetchNotes();
    };

    $scope.saveNote = function (savingNote) {
        storage.saveNote(savingNote);
    };

    $scope.onKeyDown = function (e) {
        if (e.keyCode == KEY_CODE_ENTER) {
            $scope.createNote();
        }
    };
}]);

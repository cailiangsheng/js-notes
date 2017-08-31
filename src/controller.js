var PersistedNotes = require('./model/persistence');

var notesApp = angular.module('notesApp', []);
var KEY_CODE_ENTER = 13;

notesApp.controller('initNotes', ['$scope', function ($scope) {
    var persistence = new PersistedNotes();
    persistence.readNotes(showNotes);

    $scope.title = "Larry's Notes";
    $scope.showNotes = showNotes;

    function showNotes(isAsync) {
        $scope.notes = persistence.notes.findNotes($scope.inputText);

        if (isAsync) {
            $scope.$apply();
        }
    }

    $scope.createNote = function () {
        persistence.createNote($scope.inputText);
        $scope.inputText = '';
        showNotes();
    };

    $scope.deleteNote = function (note) {
        persistence.deleteNote(note);
        showNotes();
    };

    $scope.updateNote = function (note) {
        persistence.updateNote(note);
    };

    $scope.onKeyDown = function (e) {
        if (e.keyCode == KEY_CODE_ENTER) {
            $scope.createNote();
        }
    };
}]);

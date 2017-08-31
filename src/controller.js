const PersistedNotes = require('./model/persistence');
const KEY_CODE_ENTER = 13;

const notesApp = angular.module('notesApp', []);

notesApp.controller('initNotes', ['$scope', ($scope) => {
    const persistence = new PersistedNotes();
    persistence.readNotes(showNotes);

    $scope.title = "Larry's Notes";

    function showNotes(isAsync) {
        $scope.notes = persistence.notes.findNotes($scope.inputText);

        if (isAsync) {
            $scope.$apply();
        }
    };

    $scope.createNote = () => {
        persistence.createNote($scope.inputText);
        $scope.inputText = '';
        showNotes();
    };

    $scope.deleteNote = (note) => {
        persistence.deleteNote(note);
        showNotes();
    };

    $scope.updateNote = (note) => {
        persistence.updateNote(note);
    };

    $scope.onKeyDown = (e) => {
        if (e.keyCode == KEY_CODE_ENTER) {
            $scope.createNote();
        }
    };
}]);

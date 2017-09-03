import PersistedNotes from './model/persistence';

const KEY_CODE_ENTER = 13;

const notesApp = angular.module('notesApp', []);

notesApp.controller('initNotes', ['$scope', ($scope) => {
    const persistence = new PersistedNotes();
    $scope.title = "Larry's Notes";
    $scope.notes = persistence.notes.findNotes();

    $scope.fetchNotes = () => {
        $scope.notes = persistence.notes.findNotes($scope.inputText);
    };

    $scope.createNote = () => {
        persistence.createNote($scope.inputText);
        $scope.inputText = '';
        $scope.fetchNotes();
    };

    $scope.deleteNote = (note) => {
        persistence.deleteNote(note);
        $scope.fetchNotes();
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

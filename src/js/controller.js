var notesApp = angular.module('notesApp', []);
var KEY_CODE_ENTER = 13;

notesApp.filter('toTextLines', ['$sce', function ($sce) {
    return function (text) {
        if (!text) return text;

        var lines = text.split("\n").join("<br>");
        return $sce.trustAsHtml(lines);
    }
}]);

notesApp.controller('initNotes', ['$scope', function ($scope) {
    var persistence = new PersistedNotes();
    $scope.title = "Larry's Notes";
    $scope.notes = persistence.notes.findNotes();

    $scope.getDateTime = function (note) {
        return new Date(note.timestamp).toLocaleString();
    };

    $scope.fetchNotes = function () {
        $scope.notes = persistence.notes.findNotes($scope.inputText);
    };

    $scope.createNote = function () {
        persistence.createNote($scope.inputText);
        $scope.inputText = '';
        $scope.fetchNotes();
    };

    $scope.deleteNote = function (note) {
        persistence.deleteNote(note);
        $scope.fetchNotes();
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

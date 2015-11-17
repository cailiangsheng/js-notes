var notesApp = angular.module('notesApp', ['notesStorage']);

notesApp.controller('initNotes', ['$scope', 'storage', function ($scope, storage) {
    $scope.notes = storage.readNotes();
    $scope.selectedNoteId = 0;
    $scope.deleteNote = storage.deleteNote;
    $scope.createNote = storage.createNote;
    $scope.searchNote = function (searchText) {
        $scope.notes = storage.readNotes(searchText);
    };
}]);
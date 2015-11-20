var notesApp = angular.module('notesApp');

notesApp.filter('toTextLines', ['$sce', function ($sce) {
    return function (text) {
        if (!text) return text;

        var lines = text.split("\n").join("<br>");
        return $sce.trustAsHtml(lines);
    }
}]);

notesApp.filter('toDateTime', ['$sce', function ($sce) {
    return function (timestamp) {
        var today = new Date().toLocaleDateString();
        var day = new Date(timestamp);
        var date = day.toLocaleDateString();
        var time = day.toLocaleTimeString();
        var result = (today == date ? time : date);
        return $sce.trustAsHtml(result);
    }
}]);
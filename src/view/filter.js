const notesApp = angular.module('notesApp');

notesApp.filter('toTextLines', ['$sce', function ($sce) {
    return function (text) {
        if (!text) return text;

        const lines = text.split('\n').join('<br>');
        return $sce.trustAsHtml(lines);
    }
}]);

notesApp.filter('toDateTime', ['$sce', function ($sce) {
    return function (timestamp) {
        const today = new Date().toLocaleDateString();
        const day = new Date(timestamp);
        const date = day.toLocaleDateString();
        const time = day.toLocaleTimeString();
        const  result = (today == date ? time : date);
        return $sce.trustAsHtml(result);
    }
}]);
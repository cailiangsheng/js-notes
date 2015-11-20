
function Note(title, content, timestamp) {
    this.title = title;
    this.content = content;
    this.timestamp = timestamp || this.getTimestamp();
}

Note.prototype.getTimestamp = function () {
    return new Date().getTime();
};

Note.prototype.update = function (note) {
    if (note) {
        this.title = note.title;
        this.content = note.content;
        this.timestamp = this.getTimestamp();
    }
};

Note.prototype.match = function (text) {
    return this.title && this.title.indexOf(text) >= 0 ||
        this.content && this.content.indexOf(text) >= 0;
};
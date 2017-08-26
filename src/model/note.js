
module.exports = class Note {
    constructor(title, content, timestamp) {
        this.title = title || "";
        this.content = content || "";
        this.timestamp = timestamp || this.getTimestamp();
    }

    getTimestamp() {
        return new Date().getTime();
    }

    update(note) {
        if (note) {
            this.title = note.title;
            this.content = note.content;
            this.timestamp = this.getTimestamp();
        }
    }

    match(text) {
        return this.title && this.title.indexOf(text) >= 0 ||
            this.content && this.content.indexOf(text) >= 0;
    }
}

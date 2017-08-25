const Note = require('./note');

module.exports = Notes;

function Notes () {
    this.items = [];
}

Notes.prototype.clearNotes = function () {
    this.items.length = 0;
};

Notes.prototype.initNotes = function (arr) {
    this.clearNotes();
    for (let i = 0; i < arr.length; i++) {
        const obj = arr[i];
        const note = new Note(obj.title, obj.content, obj.timestamp);
        this.items.push(note);
    }
}

Notes.prototype.getNote = function (timestamp) {
    for (let i = 0; i < this.items.length; i++) {
        const note = this.items[i];
        if (note.timestamp == timestamp) {
            return note;
        }
    }
    return null;
};

Notes.prototype.addNote = function (note) {
    if (!note || this.items.indexOf(note) >= 0) return false;

    this.items.unshift(note);
    return true;
}

Notes.prototype.removeNote = function (note) {
    const i = this.items.indexOf(note);
    if (i >= 0) {
        this.items.splice(i, 1);
        return true;
    }
    return false;
};

Notes.prototype.createNote = function (title, content, timestamp) {
    const note = new Note(title, content, timestamp);
    this.addNote(note);
};

Notes.prototype.updateNote = function (sourceNote) {
    const note = this.getNote(sourceNote.timestamp);
    if (note) {
        note.update(sourceNote);
        return true;
    }
    return false;
};

Notes.prototype.findNotes = function (text) {
    if (text) {
        const foundNotes = [];
        for (let i = 0; i < this.items.length; i++) {
            const note = this.items[i];
            if (note.match(text)) {
                foundNotes.push(note);
            }
        }
        return foundNotes;
    }
    return this.items;
}

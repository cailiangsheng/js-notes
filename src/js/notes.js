
function Notes () {
    this.notes = [];
}

Notes.prototype.clearNotes = function () {
    this.notes.length = 0;
};

Notes.prototype.getNote = function (timestamp) {
    for (var i = 0; i < this.notes.length; i++) {
        var note = this.notes[i];
        if (note.timestamp == timestamp) {
            return note;
        }
    }
    return null;
};

Notes.prototype.addNote = function (note) {
    if (!note || this.notes.indexOf(note) >= 0) return false;

    this.notes.push(note);
    return true;
}

Notes.prototype.removeNote = function (note) {
    var i = this.notes.indexOf(note);
    if (i >= 0) {
        this.notes.splice(i, 1);
        return true;
    }
    return false;
};

Notes.prototype.createNote = function (title, content, timestamp) {
    var note = new Note(title, content, timestamp);
    this.addNote(note);
};

Notes.prototype.updateNote = function (sourceNote) {
    var note = this.getNote(sourceNote.timestamp);
    if (note) {
        note.update(sourceNote);
        return true;
    }
    return false;
};

Notes.prototype.findNotes = function (text) {
    if (text) {
        var foundNotes = [];
        for (var i = 0; i < this.notes.length; i++) {
            var note = this.notes[i];
            if (note.match(text)) {
                foundNotes.push(note);
            }
        }
        return foundNotes;
    }
    return this.notes;
}
import Note from './note';

export default class Notes {
    constructor() {
        this.items = [];
    }

    clearNotes() {
        this.items.length = 0;
    }

    initNotes(arr) {
        this.clearNotes();
        for (let i = 0; i < arr.length; i++) {
            const obj = arr[i];
            const note = new Note(obj.title, obj.content, obj.timestamp);
            this.items.push(note);
        }
    }

    getNote(timestamp) {
        for (let i = 0; i < this.items.length; i++) {
            const note = this.items[i];
            if (note.timestamp == timestamp) {
                return note;
            }
        }
        return null;
    }

    addNote(note) {
        if (!note || this.items.indexOf(note) >= 0) return false;

        this.items.unshift(note);
        return true;
    }

    removeNote(note) {
        const i = this.items.indexOf(note);
        if (i >= 0) {
            this.items.splice(i, 1);
            return true;
        }
        return false;
    }

    createNote(title, content, timestamp) {
        const note = new Note(title, content, timestamp);
        this.addNote(note);
        return note;
    }

    updateNote(sourceNote) {
        const note = this.getNote(sourceNote.timestamp);
        if (note) {
            note.update(sourceNote);
            return true;
        }
        return false;
    }

    findNotes(text) {
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
}

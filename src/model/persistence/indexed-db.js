import Notes from '../notes';
import dexieUtil from './dexie-util';

export default class IndexedDBNotes {
  constructor() {
    this.notes = new Notes();
  }

  deleteNote(note) {
    if (this.notes.removeNote(note)) {
      dexieUtil.deleteNote(note.timestamp);
    }
  }

  createNote(title) {
    const note = this.notes.createNote(title);
    dexieUtil.saveNote(note);
  }

  updateNote(note) {
    dexieUtil.deleteNote(note.timestamp);
    this.notes.updateNote(note);
    dexieUtil.saveNote(note);
  }

  readNotes(callback) {
    const notes = this.notes;

    dexieUtil.loadNotes(value => {
      notes.initNotes(value);
      callback && callback(true);
    })
  }

}

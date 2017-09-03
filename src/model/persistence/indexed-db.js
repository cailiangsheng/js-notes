import Notes from '../notes';
import { deleteNote, saveNote, loadNotes } from './dexie-util';

export default class IndexedDBNotes {
  constructor() {
    this.notes = new Notes();
  }

  deleteNote(note) {
    if (this.notes.removeNote(note)) {
      deleteNote(note.timestamp);
    }
  }

  createNote(title) {
    const note = this.notes.createNote(title);
    saveNote(note);
  }

  updateNote(note) {
    deleteNote(note.timestamp);
    this.notes.updateNote(note);
    saveNote(note);
  }

  readNotes(callback) {
    const notes = this.notes;

    loadNotes(value => {
      notes.initNotes(value);
      callback && callback(true);
    })
  }

}

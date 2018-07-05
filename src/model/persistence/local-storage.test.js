import Note from '../note';
import LocalStorageNotes from './local-storage';
import assert from 'assert';

describe('model.persistence.LocalStorageNotes', () => {
  let notes;

  before(() => {
    global.localStorage = new MockLocalStorage();
  })

  beforeEach(() => {
    localStorage.init({
      'js-notes.notes': '[{"title":"Title1","content":"Content1","timestamp":1},{"title":"Title2","content":"Content2","timestamp":2}]'
    });
    notes = new LocalStorageNotes();
  })

  it('can read the saved notes', (done) => {
    notes.readNotes(() => {
      assert.equal(notes.notes.items.length, 2);

      notes.notes.items.forEach((item, index) => {
        assert.deepEqual(
          item,
          {
            title: `Title${index + 1}`,
            content: `Content${index + 1}`,
            timestamp: index + 1
          }
        );
      });

      done();
    })
  })

  it('can delete and save notes', (done) => {
    notes.readNotes(() => {
      assert.equal(notes.notes.items.length, 2);

      // when
      const firstNote = notes.notes.items[0];
      notes.deleteNote(firstNote);

      // then
      assert.equal(notes.notes.items.length, 1);
      assert.equal(localStorage.storage['js-notes.notes'], '[{"title":"Title2","content":"Content2","timestamp":2}]');

      done();
    })
  })

  it('can create and save notes', (done) => {
    notes.readNotes(() => {
      assert.equal(notes.notes.items.length, 2);

      // when
      notes.createNote('Title3');

      // then
      assert.equal(notes.notes.items.length, 3);
      assert.equal(
        localStorage.storage['js-notes.notes'],
        `[{"title":"Title3","content":"","timestamp":${notes.notes.items[0].timestamp}},{"title":"Title1","content":"Content1","timestamp":1},{"title":"Title2","content":"Content2","timestamp":2}]`
      );

      done();
    })
  })

  it('can update and save notes', (done) => {
    notes.readNotes(() => {
      assert.equal(notes.notes.items.length, 2);

      // when
      const changedNote = new Note('NewTitle', 'NewContent', 2);
      notes.updateNote(changedNote);

      // then
      assert.equal(notes.notes.items.length, 2);
      assert.equal(
        localStorage.storage['js-notes.notes'],
        `[{"title":"Title1","content":"Content1","timestamp":1},{"title":"NewTitle","content":"NewContent","timestamp":${notes.notes.items[1].timestamp}}]`
      );

      done();
    })
  })

})

class MockLocalStorage {
  constructor() {
    this.init({});
  }

  init(storage) {
    this.storage = storage;
  }

  getItem(key) {
    return key ? this.storage[key] : undefined;
  }

  setItem(key, value) {
    if (key) {
      this.storage[key] = value;
    }
  }
}

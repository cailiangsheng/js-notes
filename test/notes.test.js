var Notes = require('../src/model/notes');
var expect = require('chai').expect;

describe('model.Notes', () => {

    it('can be created with empty array by default', () => {
        // when
        var notes = new Notes();

        // then
        expect(notes.items).to.be.a('Array');
        expect(notes.items.length).to.equal(0);
    })

    it('can be initialized with an array and cleared', () => {
        // when
        var notes = new Notes();
        var array = [
            {title: 'ABC', content: 'abc', timestamp: 123},
            {title: 'XYZ', content: 'xyz', timestamp: 789}
        ];
        notes.initNotes(array);

        // then
        expect(notes.items.length).to.equal(2);
        expect(notes.items[0].title).to.equal('ABC');
        expect(notes.items[1].content).to.equal('xyz');

        // when
        notes.clearNotes();

        // then
        expect(notes.items.length).to.equal(0);
    });
});

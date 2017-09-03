import Notes from '../src/model/notes';
import { expect } from 'chai';

describe("Notes model", () => {
    const notes = new Notes();

    it("is an empty array by default", () => {
        expect(notes.items).to.be.a("Array");
        expect(notes.items.length).to.equal(0);
    })

    it("can be initialized with an array", () => {
        const array = [
            {title: "ABC", content: "abc", timestamp: 123},
            {title: "XYZ", content: "xyz", timestamp: 789}
        ];
        notes.initNotes(array);

        expect(notes.items.length).to.equal(2);
        expect(notes.items[0].title).to.equal("ABC");
        expect(notes.items[1].content).to.equal("xyz");
    });

    it("can be cleared", () => {
        notes.clearNotes();

        expect(notes.items.length).to.equal(0);
    });
});

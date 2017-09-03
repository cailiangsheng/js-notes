import Note from '../src/model/note';
import { expect } from 'chai';

describe("Note model", () => {
    it("has default values", () => {
        const note = new Note();

        expect(note).to.be.ok;
        expect(note.title).to.equal("");
        expect(note.content).to.equal("");
        expect(note.timestamp).to.be.a("Number");
    });

    it("sets passed attributes", () => {
        const note = new Note("ABC", "abc");

        expect(note.title).to.equal("ABC");
        expect(note.content).to.equal("abc");
    });

    it("can be updated with other note", () => {
        const note1 = new Note("ABC", "abc");
        const note2 = new Note("XYZ", "xyz");
        note1.update(note2);

        expect(note1.title).to.equal("XYZ");
        expect(note2.content).to.equal("xyz");
    });

    it("can be matched with a keyword", () => {
        const note = new Note("ABC", "abc");

        expect(note.match("c")).to.be.true;
        expect(note.match("x")).to.be.false;
    });
});

var Note = require('../../src/model/note');
var expect = require('chai').expect;

describe("Note model", function () {
    it("has default values", function () {
        var note = new Note();

        expect(note).to.be.ok;
        expect(note.title).to.equal("");
        expect(note.content).to.equal("");
        expect(note.timestamp).to.be.a("Number");
    });

    it("sets passed attributes", function () {
        var note = new Note("ABC", "abc");

        expect(note.title).to.equal("ABC");
        expect(note.content).to.equal("abc");
    });

    it("can be updated with other note", function () {
        var note1 = new Note("ABC", "abc");
        var note2 = new Note("XYZ", "xyz");
        note1.update(note2);

        expect(note1.title).to.equal("XYZ");
        expect(note2.content).to.equal("xyz");
    });

    it("can be matched with a keyword", function () {
        var note = new Note("ABC", "abc");

        expect(note.match("c")).to.be.true;
        expect(note.match("x")).to.be.false;
    });
});

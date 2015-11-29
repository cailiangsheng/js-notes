var expect = chai.expect;

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
});
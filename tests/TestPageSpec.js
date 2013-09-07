describe("test page", function() {

    var testPageView, testPage;

    beforeEach(function() {
        testPageView = new TestPageView();
        testPage = new TestPage(testPageView);
        spyOn(testPageView, "inputWord");
        spyOn(testPageView, "wrongGuess");
    });

    it("tests words in sequence", function() {
        testPage.start(["lamp", "glass"]);
        expect(testPageView.inputWord.calls.length).toEqual(1);
        testPage.test("lamp");
        expect(testPageView.inputWord.calls.length).toEqual(2);
    });

    it("tells if wrong guess", function() {
        testPage.start(["lamp", "glass"]);
        expect(testPageView.inputWord.calls.length).toEqual(1);
        testPage.test("hat");
        expect(testPageView.inputWord.calls.length).toEqual(2);
        expect(testPageView.wrongGuess).toHaveBeenCalledWith("hat", "lamp");
    });

});

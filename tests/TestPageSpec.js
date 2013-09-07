describe("test page", function() {

    var testPageView, testPage, resultPage;

    beforeEach(function() {
        testPageView = new TestPageView();
        spyOn(testPageView, "inputWord");
        spyOn(testPageView, "wrongGuess");
        resultPage = new ResultPage();
        spyOn(resultPage, "start");
        testPage = new TestPage(testPageView, resultPage);
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

    it("notifies result page", function() {
        testPage.start(["lamp", "glass"]);
        testPage.test("hat");
        testPage.test("glass");
        expect(resultPage.start).toHaveBeenCalledWith(1);
    });

});

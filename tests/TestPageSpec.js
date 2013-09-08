describe("test page", function() {

    var view, testPage, resultPage;

    var settingsWithWords = function(words) {
        return {
            words: words,
            secondsPerWord: 6
        };
    };

    beforeEach(function() {
        view = new View();
        spyOn(view, "inputWord");
        spyOn(view, "wrongGuess");
        resultPage = new ResultPage();
        spyOn(resultPage, "start");
        testPage = new TestPage(view, resultPage);
    });

    it("tests words in sequence", function() {
        testPage.start(settingsWithWords(["lamp", "glass"]));
        expect(view.inputWord.calls.length).toEqual(1);
        testPage.test("lamp");
        expect(view.inputWord.calls.length).toEqual(2);
    });

    it("tells if wrong guess", function() {
        testPage.start(settingsWithWords(["lamp", "glass"]));
        expect(view.inputWord.calls.length).toEqual(1);
        testPage.test("hat");
        expect(view.inputWord.calls.length).toEqual(2);
        expect(view.wrongGuess).toHaveBeenCalledWith("hat", "lamp");
    });

    it("notifies result page", function() {
        var settings = settingsWithWords(["lamp", "glass"]);
        testPage.start(settings);
        testPage.test("hat");
        testPage.test("glass");
        expect(resultPage.start).toHaveBeenCalledWith(settings, 1);
    });

});

describe("result page", function() {

    var view, resultPage;

    beforeEach(function() {
        view = new View();
        spyOn(view, "displayResult");
        resultPage = new ResultPage(view);
    });

    it("displays result", function() {
        var settings = {
            words: ["house", "car", "ball", "candle"],
            secondsPerWord: 6
        };
        resultPage.start(settings, 1);
        expect(view.displayResult).toHaveBeenCalledWith("25% correct (1/4) at 6 s/word.");
    });

});

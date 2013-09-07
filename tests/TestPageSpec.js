describe("test page", function() {

    var testPageView, testPage;

    beforeEach(function() {
        testPageView = new TestPageView();
        testPage = new TestPage(testPageView);
        spyOn(testPageView, "inputWord");
    });

    it("tests words in sequence", function() {
        testPage.start(["lamp", "glass"]);
        expect(testPageView.inputWord.calls.length).toEqual(1);
        testPage.test("lamp");
        expect(testPageView.inputWord.calls.length).toEqual(2);
    });

});

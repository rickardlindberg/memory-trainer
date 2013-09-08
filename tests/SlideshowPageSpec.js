describe("slideshow page", function() {

    var view, slideshowPage, testPage;

    beforeEach(function() {
        view = new View();
        spyOn(view, "displayWord");
        spyOn(view, "fadeOutWord");
        testPage = new TestPage();
        spyOn(testPage, "start");
        slideshowPage = new SlideshowPage(view, testPage);
        jasmine.Clock.useMock();
        jasmine.Clock.reset();
    });

    it("shows first word when started", function() {
        slideshowPage.start({
            words: ["monkey", "fan", "flower"],
            secondsPerWord: 6
        });
        expect(view.displayWord).toHaveBeenCalledWith("monkey");
    });

    describe("switching to the next word", function() {

        it("switches after the configured number of seconds", function() {
            slideshowPage.start({
                words: ["monkey", "fan"],
                secondsPerWord: 6
            });
            jasmine.Clock.tick(5999);
            expect(view.displayWord).not.toHaveBeenCalledWith("fan");
            jasmine.Clock.tick(1);
            expect(view.displayWord).toHaveBeenCalledWith("fan");
        });

        it("switches fades out after half the time", function() {
            slideshowPage.start({
                words: ["monkey", "fan"],
                secondsPerWord: 6
            });
            jasmine.Clock.tick(2999);
            expect(view.fadeOutWord).not.toHaveBeenCalled();
            jasmine.Clock.tick(1);
            expect(view.fadeOutWord).toHaveBeenCalledWith(3000);
        });

    });

    it("leaves control to test page when last word shown", function() {
        slideshowPage.start({
            words: ["monkey", "fan", "flower"],
            secondsPerWord: 6
        });
        jasmine.Clock.tick(2 * 6000);
        expect(view.displayWord).toHaveBeenCalledWith("monkey");
        expect(view.displayWord).toHaveBeenCalledWith("fan");
        expect(view.displayWord).toHaveBeenCalledWith("flower");
        expect(testPage.start).not.toHaveBeenCalled();
        jasmine.Clock.tick(6000);
        expect(testPage.start).toHaveBeenCalledWith(["monkey", "fan", "flower"]);
    });

});

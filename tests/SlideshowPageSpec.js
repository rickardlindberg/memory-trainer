describe("slideshow page", function() {

    var slideshowView, slideshowPage, testPage;

    beforeEach(function() {
        slideshowView = new SlideshowView();
        spyOn(slideshowView, "displayWord");
        spyOn(slideshowView, "fadeOutWord");
        testPage = new TestPage();
        spyOn(testPage, "start");
        slideshowPage = new SlideshowPage(slideshowView, testPage);
        jasmine.Clock.useMock();
    });

    it("shows first word when started", function() {
        slideshowPage.start({
            words: ["monkey", "fan", "flower"],
            secondsPerWord: 6
        });
        expect(slideshowView.displayWord).toHaveBeenCalledWith("monkey");
    });

    describe("switching to the next word", function() {

        it("switches after the configured number of seconds", function() {
            slideshowPage.start({
                words: ["monkey", "fan"],
                secondsPerWord: 6
            });
            jasmine.Clock.tick(5999);
            expect(slideshowView.displayWord).not.toHaveBeenCalledWith("fan");
            jasmine.Clock.tick(1);
            expect(slideshowView.displayWord).toHaveBeenCalledWith("fan");
        });

        it("switches fades out after half the time", function() {
            slideshowPage.start({
                words: ["monkey", "fan"],
                secondsPerWord: 6
            });
            jasmine.Clock.tick(2999);
            expect(slideshowView.fadeOutWord).not.toHaveBeenCalled();
            jasmine.Clock.tick(1);
            expect(slideshowView.fadeOutWord).toHaveBeenCalledWith(3000);
        });

    });

    it("leaves control to test page when last word shown", function() {
        slideshowPage.start({
            words: ["monkey", "fan", "flower"],
            secondsPerWord: 6
        });
        jasmine.Clock.tick(2 * 6000);
        expect(slideshowView.displayWord).toHaveBeenCalledWith("monkey");
        expect(slideshowView.displayWord).toHaveBeenCalledWith("fan");
        expect(slideshowView.displayWord).toHaveBeenCalledWith("flower");
        expect(testPage.start).not.toHaveBeenCalled();
        jasmine.Clock.tick(6000);
        expect(testPage.start).toHaveBeenCalledWith(["monkey", "fan", "flower"]);
    });

});

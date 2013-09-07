describe("slideshow page", function() {

    var slideshowView, slideshowPage;

    beforeEach(function() {
        slideshowView = new SlideshowView();
        slideshowPage = new SlideshowPage(slideshowView);
    });

    it("shows first word when started", function() {
        spyOn(slideshowView, "displayWord");
        slideshowPage.start(["monkey", "fan", "flower"]);
        expect(slideshowView.displayWord).toHaveBeenCalledWith("monkey");
    });

    describe("switching to the next word", function() {

        beforeEach(function() {
            jasmine.Clock.useMock();
        });

        it("switches after the configured number of seconds", function() {
            spyOn(slideshowView, "displayWord");
            slideshowPage.start(["monkey", "fan"]);
            expect(slideshowView.displayWord).not.toHaveBeenCalledWith("fan");
            jasmine.Clock.tick(100);
            expect(slideshowView.displayWord).toHaveBeenCalledWith("fan");
        });

    });

});

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

});

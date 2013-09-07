describe("slideshow page", function () {

    it("shows first word when started", function () {
        var slideshowView = {
            displayWord: function () {}
        };
        spyOn(slideshowView, "displayWord");
        var slideshowPage = new SlideshowPage(slideshowView, ["monkey", "fan", "flower"]);
        slideshowPage.start();
        expect(slideshowView.displayWord).toHaveBeenCalledWith("monkey");
    });

});

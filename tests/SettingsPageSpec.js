describe("settings page", function() {

    var settingsPage, slideshowPage;

    beforeEach(function() {
        slideshowPage = new SlideshowPage();
        spyOn(slideshowPage, "start");
        settingsPage = new SettingsPage(slideshowPage);
    });

    it("starts the slideshow", function() {
        settingsPage.start();
        expect(slideshowPage.start).toHaveBeenCalled();
        var settings = slideshowPage.start.calls[0].args[0];
        expect(settings.secondsPerWord).toBe(6);
        expect(settings.words.length).toBe(20);
    });

});

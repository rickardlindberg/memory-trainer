function SlideshowPage(slideshowView) {

    this.start = function(settings) {
        slideshowView.displayWord(settings.words[0]);
        setTimeout(function() {
            slideshowView.fadeOutWord(500 * settings.secondsPerWord);
        }, 500 * settings.secondsPerWord);
        setTimeout(function() {
            slideshowView.displayWord(settings.words[1]);
        }, 1000 * settings.secondsPerWord);
    };

}

function SlideshowView() {

    this.displayWord = function(word) {
        $("#slideshow .word").html("<b>" + word + "</b>");
        $("#slideshow .word").fadeIn(0);
    };

    this.fadeOutWord = function(inMs) {
        $("#slideshow .word").fadeOut(inMs);
    };

}

$(document).ready(function() {
    var slideshowPage = new SlideshowPage(new SlideshowView());
    slideshowPage.start({
        words: ["apa", "korv"],
        secondsPerWord: 6
    });
});

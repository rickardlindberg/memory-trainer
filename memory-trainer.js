function SlideshowPage(slideshowView) {
    this.start = function(settings) {
        slideshowView.displayWord(settings.words[0]);
        setTimeout(function() {
            slideshowView.displayWord(settings.words[1]);
        }, 1000 * settings.secondsPerWord);
    };
}

function SlideshowView() {
    this.displayWord = function(word) {
        $("#slideshow .word").html("<b>" + word + "</b>");
    };
}

$(document).ready(function() {
    var slideshowPage = new SlideshowPage(new SlideshowView());
    slideshowPage.start({
        words: ["apa", "korv"],
        secondsPerWord: 6
    });
});

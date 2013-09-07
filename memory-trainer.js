function SlideshowPage(slideshowView) {
    this.start = function(words) {
        slideshowView.displayWord(words[0]);
    };
}

function SlideshowView() {
    this.displayWord = function(word) {
        $("#slideshow .word").html("<b>" + word + "</b>");
    };
}

$(document).ready(function() {
    var slideshowPage = new SlideshowPage(new SlideshowView());
    slideshowPage.start(["apa", "korv"]);
});

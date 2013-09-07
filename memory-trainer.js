function SlideshowPage(slideshowView, words) {
    this.start = function () {
        slideshowView.displayWord(words[0]);
    };
}

function SlideshowView() {
    this.displayWord = function(word) {
        $("#slideshow .word").html("<b>" + word + "</b>");
    };
}

$(document).ready(function () {
    var slideshowView = new SlideshowView();
    var slideshowPage = new SlideshowPage(slideshowView, ["apa", "korv"]);
    slideshowPage.start();
});

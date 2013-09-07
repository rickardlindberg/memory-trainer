function SlideshowPage(slideshowView, testPage) {

    var self = this;

    self.start = function(settings) {
        self.settings = settings;
        self.displayNextWord(settings.words);
    };

    self.displayNextWord = function(words) {
        if (words.length == 0) {
            testPage.start(self.settings.words);
        } else {
            slideshowView.displayWord(words[0]);
            setTimeout(function() {
                slideshowView.fadeOutWord(500 * self.settings.secondsPerWord);
            }, 500 * self.settings.secondsPerWord);
            setTimeout(function() {
                self.displayNextWord(words.slice(1), self.settings.secondsPerWord);
            }, 1000 * self.settings.secondsPerWord);
        }
    };

}

function TestPage() {

    this.start = function(words) {
        alert("woho");
    };

};

function SlideshowView() {

    this.displayWord = function(word) {
        $("#slideshow .word").html("<b>" + word + "</b>");
        $("#slideshow .word").fadeIn(0);
    };

    this.fadeOutWord = function(inMs) {
        $("#slideshow .word").fadeOut(inMs);
    };

}

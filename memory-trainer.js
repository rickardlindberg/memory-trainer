function SettingsPage(slideShowPage) {

    var dictionary = [
        "korv",
        "blomma",
        "kanin",
        "ägg",
        "nyckel",
        "båt",
        "sten",
        "kotte",
        "kylskåp",
        "nalle",
        "hjärta",
        "fönster",
        "kakelplatta",
        "handfat",
        "fotboll",
        "golfklubba",
        "vas",
        "glas",
        "glass",
        "träd",
        "löv",
        "ljusstake",
        "glödlampa",
        "tändsticka",
    ];

    var getRandomWords = function(from, count) {
        return _.shuffle(from).slice(0, count);
    };

    this.start = function() {
        slideShowPage.start({
            words: getRandomWords(dictionary.slice(0), 20),
            secondsPerWord: 6
        });
    };

};

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

function TestPage(testPageView, resultPage) {

    var self = this;

    self.start = function(words) {
        self.words = words;
        self.currentWord = -1;
        self.correctGuesses = 0;
        self.askForNext();
    };

    self.test = function(word) {
        if (self.words[self.currentWord] == word) {
            self.correctGuesses++;
        } else {
            testPageView.wrongGuess(word, self.words[self.currentWord]);
        }
        self.askForNext();
    };

    self.askForNext = function() {
        self.currentWord++;
        if (self.currentWord == self.words.length) {
            resultPage.start(self.correctGuesses);
        } else {
            testPageView.inputWord();
        }
    };

};

function ResultPage() {

    this.start = function(correctGuesses) {
        alert(correctGuesses);
    }

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

function TestPageView() {

    this.inputWord = function() {
        this.testPage.test(prompt("Next word:", ""));
    };

    this.wrongGuess = function(wrongGuess, rightAnswer) {
        alert("You guessed '" + wrongGuess + "' but was '" + rightAnswer + "'.");
    };

}

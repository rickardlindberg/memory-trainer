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

    this.start = function() {
        slideShowPage.start({
            words: _.sample(dictionary, 20),
            secondsPerWord: 6
        });
    };

};

function SlideshowPage(view, testPage) {

    var self = this;

    self.start = function(settings) {
        self.settings = settings;
        self.displayNextWord(settings.words);
    };

    self.displayNextWord = function(words) {
        if (words.length == 0) {
            testPage.start(self.settings);
        } else {
            view.displayWord(words[0]);
            setTimeout(function() {
                view.fadeOutWord(500 * self.settings.secondsPerWord);
            }, 500 * self.settings.secondsPerWord);
            setTimeout(function() {
                self.displayNextWord(words.slice(1), self.settings.secondsPerWord);
            }, 1000 * self.settings.secondsPerWord);
        }
    };

}

function TestPage(view, resultPage) {

    var self = this;

    self.start = function(settings) {
        self.settings = settings
        self.currentWord = -1;
        self.correctGuesses = 0;
        self.askForNext();
    };

    self.test = function(word) {
        if (self.settings.words[self.currentWord] == word) {
            self.correctGuesses++;
        } else {
            view.wrongGuess(word, self.settings.words[self.currentWord]);
        }
        self.askForNext();
    };

    self.askForNext = function() {
        self.currentWord++;
        if (self.currentWord == self.settings.words.length) {
            resultPage.start(self.settings, self.correctGuesses);
        } else {
            view.inputWord();
        }
    };

};

function ResultPage(view) {

    this.start = function(settings, correctGuesses) {
        var result = (correctGuesses/settings.words.length*100) + "% correct (" + correctGuesses + "/" + settings.words.length + ") at " + settings.secondsPerWord + " s/word.";
        view.displayResult(result);
    }

};

function View() {

    this.displayWord = function(word) {
        $("#slideshow .word").html("<b>" + word + "</b>");
        $("#slideshow .word").fadeIn(0);
    };

    this.fadeOutWord = function(inMs) {
        $("#slideshow .word").fadeOut(inMs);
    };

    this.inputWord = function() {
        this.testPage.test(prompt("Next word:", ""));
    };

    this.wrongGuess = function(wrongGuess, rightAnswer) {
        alert("You guessed '" + wrongGuess + "' but was '" + rightAnswer + "'.");
    };

    this.displayResult = function(result) {
        alert(result);
    };

}

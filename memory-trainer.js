function SettingsPage(slideShowPage) {

    var dictionary = [
        "ägg",
        "blomma",
        "fönster",
        "fot",
        "fotboll",
        "glas",
        "glass",
        "glödlampa",
        "golfklubba",
        "gris",
        "gunga",
        "handfat",
        "hjärta",
        "kakelplatta",
        "kanin",
        "kontakt",
        "korv",
        "kotte",
        "kylskåp",
        "ljusstake",
        "löv",
        "nalle",
        "öra",
        "paket",
        "sten",
        "tändsticka",
        "träd",
        "vas",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
    ];

    this.start = function() {
        slideShowPage.start({
            words: _.sample(dictionary, 30),
            secondsPerWord: 5
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

    var hideAll = function() {
        $("#slideshow").hide();
        $("#result").hide();
    };

    this.displayWord = function(word) {
        hideAll();
        $("#slideshow").show();
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
        hideAll();
        $("#result .resultText").html(result);
        $("#result").show();
    };

}

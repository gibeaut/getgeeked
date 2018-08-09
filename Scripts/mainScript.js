// Global Variables
var hints = [
  "Click the tick five times fast, and see if everything will be a blast.",
  "When things go wrong this will break.",
  "Other words that make a hint",
  "Hint and Hint and Hint and Hint",
  "Woo Hoo this is a hint",
  "Something is spelled wrong can you find it?",
  "Did you find the hint that rocks.",
  "Did you find the place with socks?",
  "Maybe you should try this hint?",
  "What about this one in a pinch."];
var totalHintsLeft = 10;

function addScroll() {
  $(window).scroll(function(e){
    var $el = $('.header-bar');
    var isPositionFixed = ($el.css('position') == 'fixed');
    if ($(this).scrollTop() > 200 && !isPositionFixed){
      $('.fixedElement').css({'position': 'fixed', 'top': '0px'});
    }
    if ($(this).scrollTop() < 200 && isPositionFixed)
    {
      $('.fixedElement').css({'position': 'static', 'top': '0px'});
    }
});
}

function StartGetGeeked(){
  console.log("Welcome to Get Geeked in Tech QA.");
  console.log("Type GetHint() to get a hint.")
}

function GetHint() {
var localhints = localStorage.getItem('hints');
if (localhints != "null") {
  console.log(localhints);
  hints = JSON.parse(localhints);
}
if (totalHintsLeft > 0) {
  console.log("Here is your hint!");
  var nextHint = Math.floor((Math.random() * totalHintsLeft));
  console.log(hints[nextHint]);
  hints.splice(nextHint, 1);
  totalHintsLeft--;
} else {
  console.log("You have no hints left.");
}
localStorage.setItem("hints", JSON.stringify(hints));
}

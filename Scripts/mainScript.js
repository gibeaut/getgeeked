// Global Variables
var hints = [
  "Click the tick five times fast, and see if everything will be a blast.",
  "Our Mission is ssstrong but something is wrong, if you click the mistake you can fix it.",
  "Hint 3",
  "Hint 4",
  "Hint 5",
  "Hint 6",
  "Hint 7",
  "Hint 8"];
var totalHints = 8;
var broken = true;
var lastClick = new Date($.now());
var totalClicks = 0;

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

function addListeners() {
  var $mission = $('#mission_fix');
  var $ticket = $('#ticket_fix');
  var $pop_up = $('.pop_up');
  if (broken)
  {
    $mission.text("Our Misssssion");
    $mission.on('click', function() { fixMission() });
    $ticket.on('click', function() { ticketClick() })
    $pop_up.on('click', function() { $(this).hide(); })
  }
}

function fixMission() {
  var $mission = $('#mission_fix');
  $mission.text("Our Mission");
    $('.asset_2').show();
}

function ticketClick() {
  var currentClick = new Date($.now());
  var clickDifference = currentClick - lastClick;
  lastClick = currentClick;
  if (clickDifference < 200) {
    totalClicks++;
    if (totalClicks >= 5){
      $('.asset_1').show();
      totalClicks = 0;
    }
    return false;
  }
}

function StartGetGeeked(){
  var start = localStorage.getItem('start_get_geeked');
  if (start && start != null && start != "false") {
    console.log("Welcome to Get Geeked in Tech QA.");
    console.log("Type GetHint() to get a hint.");
}
  localStorage.setItem("start_get_geeked", "false");

}

function ResetHints() {
  localStorage.setItem("hints", JSON.stringify(hints));
  localStorage.setItem("totalHintsLeft", totalHints);
}

function GetHint() {
var localhints = localStorage.getItem('hints');
var hintList;
var totalHintsLeft = localStorage.getItem('totalHintsLeft');;

if (localhints && localhints != "null") {
  hintList = JSON.parse(localhints);
} else {
  //This should only happen the first time;
  hintList = hints;
  totalHintsLeft = totalHints;
}
if (totalHintsLeft > 0) {
  console.log("Here is your hint!");
  var nextHint = Math.floor((Math.random() * totalHintsLeft));
  console.log(hintList[nextHint]);
  hintList.splice(nextHint, 1);
  totalHintsLeft--;
} else {
  console.log("You have no hints left. To reset your hints type ResetHints()");
}
localStorage.setItem("hints", JSON.stringify(hintList));
localStorage.setItem("totalHintsLeft", totalHintsLeft);
}

// Global Variables
var hints = [
    "Click the snacks really fast, and see if anything runs right past.",
    "Our Mission is ssstrong but something is wrong, if you click the mistake you can fix it.",
    "Our happiness is easy to see. You can count on it, easy as 1 2 3. Try pressing shift and the letter C.",
    "Tickets, tickets, get them here! Try using email without any fear!",
    "Look to the left, look to the right. Everybody now! Don't let your head spin too much on this one. But it's ok if everyone else's does.",
    "One FAQ is really a riddle, click on the question right in the middle.",
    "Did you find the bug that rocks?",
    "Did you find the place with socks?"
];
var totalHints = 8;
var lastClick = new Date($.now());
var totalClicks = 0;
var konamiCcode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
var lastKeyIndex = 0;
var allSpinning = true;

function getParameters() {
    var urlParams = new URLSearchParams(window.location.search);

    var isBroken = urlParams.get('broken');

    var sessionBroken = sessionStorage.getItem("isBroken");

    if (isBroken != null) {
        sessionStorage.setItem("isBroken", isBroken);
    } else if (sessionBroken == null) {
        sessionStorage.setItem("isBroken", "false");
    }
}

function addScroll() {
    $(window).scroll(function(e) {
        var $el = $('.header-bar');
        var isPositionFixed = ($el.css('position') == 'fixed');
        if ($(this).scrollTop() > 200 && !isPositionFixed) {
            $('.fixedElement').css({
                'position': 'fixed',
                'top': '0px'
            });
        }
        if ($(this).scrollTop() < 200 && isPositionFixed) {
            $('.fixedElement').css({
                'position': 'static',
                'top': '0px'
            });
        }
    });
}

function addListeners() {
    var $mission = $('#mission_fix');
    var $snacks = $('#snacks');
    var $footoverlay = $('#footoverlay');
    var $tickets = $('.ticket');
    var $headshot = $('.headshot');
    var $pop_up = $('.pop_up');
    var broken = sessionStorage.getItem("isBroken");
    var $fakeTicket = $('#fakeTicket');
    var $submit_button=$('.submit-button');

    var $question = $('#question');
    var $answer = $('#answer');
    var $answerButton = $('.answer-button');

    var $title_image=$('.title-image');

    //Turn off any existing ticket link
    $tickets.off('click');
    if (broken == "true") {
       // When broken is true Mission on Aboun page is misspelled
        $mission.text("Our Misssssion");
        $mission.on('click', function() {
            fixMission()
        });

        // Snacks keywork click
        $snacks.on('click', function() {
            snackClick()
        })
        $snacks.addClass('snacks');

        $footoverlay.on('click', function() {
            footClick()
        })

        // Ticket Button redirect on all pages
        $tickets.on('click', function() { window.location="Register.html"; });
        //Bug Pop-Up an each Page
        $pop_up.on('click', function() {
            $(this).hide();
        })

        $headshot.on('click', function(event) {
            headshotClick(event.target)
        })

        //Konami Code Listener
        $(document).on('keyup', function(event) {
            showAllBugs(event);
        })

        // Registartion form Check
        $fakeTicket.on('click', function() { checkForm(); })

        window.addEventListener("keypress", openModalKeyPress);
        window.addEventListener("click", windowOnClick);
        $submit_button.on('click', function() {checkNumberGuess();} );

        //Lady graphic rocks on hover
        $title_image.addClass("rocking")
        $title_image.on('click', function() {
          ladyClick()
        })

        //FAQ Question and Answer
        setQAChange($question, $answer);
        $question.on('click', function() {
            showQA();
        });
        $answer.on('click', function() {
            showQA();
        });
        $answerButton.on('click', function() {
            checkAnswer();
        });

    }
    else {
      // The ticket button directs to EventBright, unless broken
      $tickets.on('click', function() { window.location="https://www.eventbrite.com/e/get-geeked-in-tech-2018-tickets-49747531205"; });
    }
}

function fixMission() {
    var broken = sessionStorage.getItem("isBroken");
    if (broken == "true") {
        var $mission = $('#mission_fix');
        $mission.text("Our Mission");
        $('.asset_2').show();
    }
}

function snackClick() {
    var broken = sessionStorage.getItem("isBroken");
    if (broken == "true") {
        var currentClick = new Date($.now());
        var clickDifference = currentClick - lastClick;
        lastClick = currentClick;
        if (clickDifference < 200) {
            totalClicks++;
            if (totalClicks >= 5) {
                $('.asset_1').show();
                totalClicks = 0;
                var width = "+=" + $(document).width();
    $(".asset_1").animate({
    left: width
  }, 2000, function() {

        $('.asset_1A').show();
  });
            }
            return false;
        }
    }
}

function footClick() {
    var broken = sessionStorage.getItem("isBroken");
    if (broken == "true") {
        $('.asset_8').show();
    }
}

function ladyClick() {
  var broken = sessionStorage.getItem("isBroken");
  if (broken == "true") {
      $('.asset_5').show();
  }
}

function stopSpinning(element) {
    if ($(element).hasClass("spinning")) {
        $(element).removeClass("spinning");
    }
}

function headshotClick(element) {
    var broken = sessionStorage.getItem("isBroken");
    if (broken == "true") {
        $(element).addClass("spinning");
        setTimeout(function() { stopSpinning($(element)) }, 8000);
        var $headshot = $('.headshot');
        allSpinning = true;
        $headshot.each(function() {
            if (!$(this).hasClass("spinning")) {
                allSpinning = false;
                return false;
            }
        });
        if (allSpinning) {
            $('.asset_5').show();
        }
    }
}

function showAllBugs(e) {
    if (!e) {
        if (window.event) {
            e = window.event;
        } else {
            return;
        }
    }

    if (typeof(e.keyCode) == 'number') {
        e = e.keyCode;
    } else if (typeof(e.which) == 'number') {
        e = e.which;
    } else if (typeof(e.charCode) == 'number') {
        e = e.charCode;
    } else {
        return;
    }

    if (e == konamiCcode[lastKeyIndex]) {
        ++lastKeyIndex;
        if (lastKeyIndex == konamiCcode.length) {
            showBugs();
        }
    } else {
        lastKeyIndex = 0;
    }
}

function showBugs() {
    document.body.style.overflow = 'hidden';
    var bugs = new Array();
    _height = window.innerHeight;
    _width = window.innerWidth;
    for (i = 0; i < 50; ++i) {
        bugs.push(document.createElement('img'));
        bugs[i].setAttribute('class', 'all-bugs');
        bugs[i].setAttribute('src', './Images/Asset_' + ((i % 8) + 1) + '.png');
        _top = Math.floor(Math.random() * _height) - 100;
        _left = Math.floor(Math.random() * _width) - 100;
        bugs[i].setAttribute('style', 'position: fixed; z-index: 9998; top: ' + _top + 'px; left: ' + _left + 'px;');
        document.body.appendChild(bugs[i]);
    }
    $('.all-bugs').on('click', function() {
        $('.all-bugs').slideUp().remove();
    })
}


function StartGetGeeked() {

    var broken = sessionStorage.getItem("isBroken");
    if (broken == "true") {
        var start = sessionStorage.getItem('start_get_geeked');
        if (start != "false") {
            console.log("Welcome to Get Geeked in Tech QA.");
            console.log("Type GetHint() to get a hint.");
        }
        sessionStorage.setItem("start_get_geeked", "false");
    } else {
        console.log("To start the test activity go to /index.html?broken=true");
    }
}


function ResetHints() {
    sessionStorage.setItem("hints", JSON.stringify(hints));
    sessionStorage.setItem("totalHintsLeft", totalHints);
}

function GetHint() {
    var localhints = sessionStorage.getItem('hints');
    var hintList;
    var totalHintsLeft = sessionStorage.getItem('totalHintsLeft');;

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
        console.log("...but there may be a secret if you know the Konami Code!");
    }
    sessionStorage.setItem("hints", JSON.stringify(hintList));
    sessionStorage.setItem("totalHintsLeft", totalHintsLeft);
}

function checkForm() {
  var error = false;

  var $email = $('#email');
  var $emailError = $('#emailError');

  var $name = $('#name');
  var $nameError = $('#nameError');

  if ($name.val() == "") {
    $name.addClass('error');
    $nameError.show();
    error = true;
  } else {
    $name.removeClass('error');
    $nameError.hide();
  }
  if ($email.val() == "") {
    $email.addClass('error');
    $emailError.show();
    error = true;
  } else {
    $email.removeClass('error');
    $emailError.hide();
  }

  if (error) return;

  validateEmail($email.val());
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(email).toLowerCase())){
      $('.asset_4').show();
    }
}

function toggleModal() {
  var modal = document.querySelector(".modal");
  modal.classList.toggle("show-modal");

  var $input = $('#number-input');
  $input.val("");
  $input.removeClass("input-invalid")
}

function windowOnClick(event) {
  var modal = document.querySelector(".modal");
  if (event.target === modal) {
      toggleModal();
  }
}
function openModalKeyPress(event){
    if(event.key == "C"){
      toggleModal();
    }
}

function checkNumberGuess(){
  var $input = $('#number-input');
  if($input.val() == "5"){
    toggleModal();
    $('.asset_3').show();
  }
  else{
    $input.addClass("input-invalid")
  }
}

function setQAChange($question, $answer){
  $question.text("What did the 0 say to the 8?");
  $answer.text("Find the extra letters here and rearrange them to form the answer. There are somee thiings that willl turnn a zeero intto an eight, bbut only one ccan work here.");
}

function showQA(){
  $(".qa_broken").show();
}
function checkAnswer(){
    var $answerBox = $('.answer-box');
    var answer = $.trim($answerBox.val().toLowerCase());
    if (answer == 'nice belt') {
      $(".qa_broken").hide();
      $('.asset_6').show();
    }
    else {
      $answerBox.effect("shake", { times:3 }, 30);
      $answerBox.val("");
      $answerBox.attr("placeholder", "Try Again");
    }
}

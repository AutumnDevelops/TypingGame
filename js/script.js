$(document).ready(function() {

const $input = $("#textarea");
const $counter = $("#counter");
const $mistake_counter = $("#mistake_counter");
const $cps_counter = $("#cps_counter");
const $question_counter = $("#excercises");
const $total_seconds = $("#total_seconds");
const url = "https://api.quotable.io/random";

let $quote = $("#quote");
let seconds = 0;
let cps = 0;
let mistakes = 0;
let character_index = 0;
let question_number = 1;
let max_questions = 5;
let final_seconds = 0;

async function random_quote(){
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.content);
}

async function generate_quote(){
  seconds = 0;
  $question_counter.html(`${question_number}/${max_questions}`);

  $quote.text(await random_quote());

  let quote_array = $quote.text().split("");
  $quote.empty();
  $.each(quote_array, (index, characters) => {
    let $span = $("<span>").text(characters);
    $quote.append($span);
  });
  question_number++;
}

$input.on("input", function () {
  character_index++;
  let flag = true;
  let user_text = $input.val().split("");
  let all_spans = $quote.find("span");
  all_spans.each(function (index) {
    let $characters = $(this);

    if (user_text[index] == null) {
      $characters.removeClass("correct incorrect");
      flag = false;
    }else if ($characters.text() === user_text[index]) {
      $characters.addClass("correct").removeClass("incorrect");
    }else{
      $characters.removeClass("correct").addClass("incorrect");
      mistakes++;
      flag = false;
    }

    $mistake_counter.text(mistakes);
    cps = character_index - mistakes;
    $cps_counter.text(cps);
    localStorage.setItem("characters", cps);

    if (question_number >= 6) {
      return (window.location.href = "end.html");
}});

  if (flag) {
    generate_quote();
    $input.val("");
  }
});

final_seconds++;
setInterval(start_counting, 1000);

function start_counting() {
  final_seconds++;
  $total_seconds.text(final_seconds);
  localStorage.setItem("seconds", final_seconds);
}

let interval = setInterval(countdown, 1000);

function countdown() {
    if (seconds === 30){
      clearInterval(interval);
      seconds = 0;
      $input.val("");
      generate_quote();
    }else{
      seconds++;
      $counter.text(seconds);
}}

generate_quote();
})
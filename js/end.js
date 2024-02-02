$(document).ready(function() {

const characters = JSON.parse(localStorage.getItem("characters"));
const seconds = JSON.parse(localStorage.getItem("seconds"));
const $content_final = $("#content_final");

$content_final.html(`<p>You can type ${characters} characters in ${seconds} seconds!</p>`);
});
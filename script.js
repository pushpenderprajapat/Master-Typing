// =====================================
// Master Typing V3
// script.js - Part 1
// =====================================

// ---------- Elements ----------

const textDisplay = document.getElementById("textDisplay");
const typingInput = document.getElementById("typingInput");

const modeSelect = document.getElementById("modeSelect");
const levelSelect = document.getElementById("levelSelect");
const timeSelect = document.getElementById("timeSelect");

const wpmBox = document.getElementById("wpm");
const accuracyBox = document.getElementById("accuracy");
const mistakesBox = document.getElementById("mistakes");
const timerBox = document.getElementById("timer");

const restartBtn = document.getElementById("restartBtn");
const newTextBtn = document.getElementById("newText");

// ---------- Variables ----------

let currentText = "";
let timer = Number(timeSelect.value);

let started = false;
let mistakes = 0;
let totalTyped = 0;

let interval = null;

// =====================================
// Load Practice Text
// =====================================

function loadText(){

const mode = modeSelect.value;

if(mode === "levels"){

const level = Number(levelSelect.value);

if(level <= 11){

currentText = generateLetters(level);

}

else if(level === 12){

currentText =
words
.sort(()=>Math.random()-0.5)
.slice(0,25)
.join(" ");

}

else if(level === 13){

currentText =
words
.sort(()=>Math.random()-0.5)
.slice(0,35)
.join(" ");

}

else if(level === 14){

currentText =
words
.sort(()=>Math.random()-0.5)
.slice(0,45)
.join(" ");

}

else if(level === 15){

currentText =
paragraphs[
Math.floor(
Math.random()*paragraphs.length
)
];

}

else if(level === 16){

currentText =
paragraphs[
Math.floor(
Math.random()*paragraphs.length
)
];

}

else{

currentText =
quotes[
Math.floor(
Math.random()*quotes.length
)
];

}

}

else if(mode === "words"){

currentText =
words
.sort(()=>Math.random()-0.5)
.slice(0,40)
.join(" ");

}

else if(mode === "paragraph"){

currentText =
paragraphs[
Math.floor(
Math.random()*paragraphs.length)
];

}

displayText();

}

// =====================================
// Display Text
// =====================================

function displayText(){

textDisplay.innerHTML = "";

currentText.split("").forEach((letter,index)=>{

const span=document.createElement("span");

span.innerText=letter;

if(index===0){

span.classList.add("current");

}

textDisplay.appendChild(span);

});

typingInput.value="";

typingInput.focus();

mistakes=0;

totalTyped=0;

mistakesBox.innerText="0";

accuracyBox.innerText="100%";

wpmBox.innerText="0";

timerBox.innerText=timer;

}

loadText();
// =====================================
// script.js - Part 2
// Typing Engine
// =====================================

typingInput.addEventListener("input", () => {

if(!started){

started = true;

startTimer();

}

const chars = textDisplay.querySelectorAll("span");

const typed = typingInput.value.split("");

mistakes = 0;

chars.forEach((char,index)=>{

const value = typed[index];

char.classList.remove("correct");
char.classList.remove("incorrect");
char.classList.remove("current");

if(value == null){

if(index === typed.length){

char.classList.add("current");

}

}

else if(value === char.innerText){

char.classList.add("correct");

}

else{

char.classList.add("incorrect");

mistakes++;

}

});

totalTyped = typed.length;

mistakesBox.innerText = mistakes;

let correct = totalTyped - mistakes;

if(correct < 0){

correct = 0;

}

let accuracy = totalTyped === 0
? 100
: Math.round((correct / totalTyped) * 100);

accuracyBox.innerText = accuracy + "%";

let elapsed = Number(timeSelect.value) - timer;

if(elapsed <= 0){

elapsed = 1;

}

let wpm = Math.round(

(correct / 5) / (elapsed / 60)

);

if(!isFinite(wpm)){

wpm = 0;

}

wpmBox.innerText = wpm;

// Completed

if(typed.join("") === currentText){

typingInput.disabled = true;

clearInterval(interval);

showResult();

}

});

// =====================================
// Buttons
// =====================================

restartBtn.onclick = resetTest;

newTextBtn.onclick = () => {

resetTest();

loadText();

};

modeSelect.onchange = () => {

resetTest();

loadText();

};

levelSelect.onchange = () => {

resetTest();

loadText();

};

timeSelect.onchange = () => {

resetTest();

};
// =====================================
// script.js - Part 3
// =====================================

function startTimer(){

clearInterval(interval);

timer = Number(timeSelect.value);

timerBox.innerText = timer;

interval = setInterval(()=>{

timer--;

timerBox.innerText = timer;

if(timer <= 0){

clearInterval(interval);

typingInput.disabled = true;

showResult();

}

},1000);

}

function resetTest(){

clearInterval(interval);

started = false;

typingInput.disabled = false;

timer = Number(timeSelect.value);

timerBox.innerText = timer;

typingInput.value = "";

mistakes = 0;

totalTyped = 0;

mistakesBox.innerText = "0";

accuracyBox.innerText = "100%";

wpmBox.innerText = "0";

displayText();

}

window.onload = ()=>{

timer = Number(timeSelect.value);

timerBox.innerText = timer;

loadText();

typingInput.focus();

};

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

resetTest();

}

});

typingInput.addEventListener("click",()=>{

typingInput.focus();

});
// ===============================
// Result Popup
// ===============================

const resultPopup = document.getElementById("resultPopup");

const resultWpm = document.getElementById("resultWpm");

const resultAccuracy = document.getElementById("resultAccuracy");

const resultMistakes = document.getElementById("resultMistakes");

const tryAgainBtn = document.getElementById("tryAgainBtn");

function showResult(){

resultWpm.innerText = wpmBox.innerText;

resultAccuracy.innerText = accuracyBox.innerText;

resultMistakes.innerText = mistakesBox.innerText;
updateBestScores();
const currentLevel = Number(levelSelect.value);

const accuracy = Number(
accuracyBox.innerText.replace("%","")
);

if(accuracy >= 90){

unlockLevel(currentLevel + 1);

}
resultPopup.classList.remove("hidden");

}

tryAgainBtn.onclick = ()=>{

resultPopup.classList.add("hidden");

resetTest();

loadText();

};
function updateBestScores(){

const currentWpm = Number(wpmBox.innerText);

const currentAccuracy = Number(
accuracyBox.innerText.replace("%","")
);

saveBestWpm(currentWpm);

saveBestAccuracy(currentAccuracy);

document.getElementById("bestWpm").innerText =
getBestWpm();

document.getElementById("bestAccuracy").innerText =
getBestAccuracy() + "%";

}
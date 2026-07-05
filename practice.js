/* ===========================
   Master Typing Beta 0.8
   Part 1
=========================== */

// ---------- Elements ----------
console.log(window.location.pathname);
const lessonTitle = document.getElementById("lessonTitle");
const lessonName = document.getElementById("lessonName");
const lessonGoal = document.getElementById("lessonGoal");
const fingerGuide = document.getElementById("fingerGuide");

const practiceText = document.getElementById("practiceText");
const input = document.getElementById("typingInput");

const timerBox = document.getElementById("timer");
const wpmBox = document.getElementById("wpm");
const accuracyBox = document.getElementById("accuracy");
const mistakesBox = document.getElementById("mistakes");

// ---------- Mobile Safety ----------
console.log(input);
input.value = "";
input.autocomplete = "off";
input.autocorrect = "off";
input.autocapitalize = "off";
input.spellcheck = false;

// Prevent Enter key

input.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
        e.preventDefault();
    }

});

// ---------- Lesson ----------

const currentLessonId =
parseInt(localStorage.getItem("currentLesson")) || 1;

const lesson =
lessons.find(l => l.id === currentLessonId);

// ---------- Engine ----------

let chars = [];

let currentIndex = 0;

let mistakes = 0;

let correctChars = 0;

let typedCharacters = 0;

let timerStarted = false;

let timeLeft = lesson.time * 60;

let timerInterval = null;

let lessonFinished = false;

// keeps state of every character
// pending | correct | wrong

let charState = [];

// ---------- Load Lesson ----------

function loadLesson(){

    if(!lesson){

        practiceText.innerHTML =
        "<span style='color:red'>Lesson Not Found</span>";

        return;

    }

    lessonTitle.innerText =
    "📖 Lesson " + lesson.id;

    lessonName.innerText =
    lesson.title;

    lessonGoal.innerText =
    lesson.goal;

    fingerGuide.innerHTML =
    lesson.fingerGuide.replace(/\n/g,"<br>");

    chars =
    lesson.practiceText.trim().split("");

    charState =
    new Array(chars.length).fill("pending");

    renderText();

}

// ---------- Render ----------

function renderText(){

    practiceText.innerHTML = "";

    chars.forEach((char,index)=>{

        const span =
        document.createElement("span");

        span.innerText = char;

        if(charState[index]==="correct"){

            span.className="correct";

        }

        else if(charState[index]==="wrong"){

            span.className="wrong";

        }

        if(index===currentIndex){

            span.classList.add("current");

        }

        practiceText.appendChild(span);

    });

}

// ---------- Start ----------

loadLesson();

input.focus();
/* ===========================
   Typing Engine
=========================== */

input.addEventListener("input", handleTyping);

function handleTyping() {

    if (lessonFinished) return;

    if (!timerStarted) {
        timerStarted = true;
        startTimer();
    }

    const typed = input.value.replace(/\r/g, "");

    currentIndex = typed.length;

    correctChars = 0;
    mistakes = 0;

    // Reset character states
    charState.fill("pending");

    // Compare every typed character
    for (let i = 0; i < chars.length; i++) {

        if (i >= typed.length) {
            break;
        }

        if (typed[i] === chars[i]) {

            charState[i] = "correct";
            correctChars++;

        } else {

            charState[i] = "wrong";
            mistakes++;

        }

    }

    typedCharacters = typed.length;

    updateStats();

    renderText();

    // Auto-scroll current character
    const currentSpan =
        practiceText.children[currentIndex];

    if (currentSpan) {

        currentSpan.scrollIntoView({
            block: "nearest",
            inline: "center",
            behavior: "smooth"
        });

    }

    // Lesson Finished

    if (     currentIndex >= chars.length &&     mistakes === 0 ) {

        lessonFinished = true;

        clearInterval(timerInterval);

        finishLesson();

    }

}

/* ===========================
   Backspace Support
=========================== */

input.addEventListener("keydown", function(e){

    if(e.key==="Backspace"){

        setTimeout(function(){

            renderText();

            updateStats();

        },0);

    }

});

/* ===========================
   Statistics
=========================== */

function updateStats(){

    let accuracy = 100;

    if(typedCharacters>0){

        accuracy = Math.round(

            (correctChars / typedCharacters) * 100

        );

    }

    accuracyBox.innerText = accuracy + "%";

    mistakesBox.innerText = mistakes;

    const minutes = (900 - timeLeft) / 60;

    let wpm = 0;

    if(minutes>0){

        wpm = Math.round(

            Math.max(     0,     (correctChars / 5) / minutes )

        );

    }

    wpmBox.innerText = wpm;

}
/* ===========================
   Timer
=========================== */

function startTimer() {

    timerInterval = setInterval(function () {

        timeLeft--;

        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        timerBox.innerText =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            lessonFinished = true;

            finishLesson();

        }

    }, 1000);

}

/* ===========================
   Lesson Complete
=========================== */

function finishLesson() {

    let accuracy = 100;

    if (typedCharacters > 0) {

        accuracy = Math.round(

            (correctChars / typedCharacters) * 100

        );

    }

    let stars = "⭐";

    if (accuracy >= 100) {

        stars = "⭐⭐⭐";

    }
    else if (accuracy >= 95) {

        stars = "⭐⭐";

    }

    // Unlock next lesson

    if (typeof unlockLesson === "function") {

        unlockLesson(currentLessonId + 1);

    }

    // Result Modal

    document.getElementById("resultStars").innerText = stars;

    document.getElementById("resultWpm").innerText =
        wpmBox.innerText;

    document.getElementById("resultAccuracy").innerText =
        accuracy + "%";

    document.getElementById("resultMistakes").innerText =
        mistakes;
saveBestWpm(parseInt(wpmBox.innerText));
saveBestAccuracy(accuracy);
    document.getElementById("resultModal").style.display =
        "flex";

}

/* ===========================
   Buttons
=========================== */

document.getElementById("restartBtn").onclick = function () {

    input.value = "";
    location.reload();

};

document.getElementById("restartLessonBtn").onclick = function () {

    input.value = "";
    location.reload();

};
document.getElementById("exitBtn").onclick = function () {

    location.href = "lesson.html";

};

document.getElementById("backLessonBtn").onclick = function () {

    location.href = "lesson.html";

};

document.getElementById("nextLessonBtn").onclick = function () {

    const nextLesson = currentLessonId + 1;

if (nextLesson <= lessons.length) {
    localStorage.setItem("currentLesson", nextLesson);
}

location.href = "practice.html";

};
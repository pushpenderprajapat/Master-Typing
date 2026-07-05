// ==============================
// Master Typing
// lesson.js
// ==============================

const currentLessonId =
Number(localStorage.getItem("currentLesson")) || 1;

const lesson =
lessons.find(l => l.id === currentLessonId);

if (lesson) {

document.getElementById("lessonTitle").innerText =
`📖 Lesson ${lesson.id}`;

document.getElementById("lessonName").innerText =
lesson.title;

document.getElementById("lessonGoal").innerText =
lesson.goal;

document.getElementById("lessonKeys").innerText =
lesson.keys;

document.getElementById("lessonTip").innerText =
lesson.tip;

}

const startBtn = document.getElementById("startLesson");

if (startBtn) {
    startBtn.onclick = function () {
        location.href = "practice.html";
    };
}
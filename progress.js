// ==============================
// Master Typing V3
// progress.js
// ==============================

// Total Levels

const TOTAL_LEVELS = 22;

// Unlock Level

function unlockLevel(level){

const unlocked = getUnlockedLevels();

if(!unlocked.includes(level)){

unlocked.push(level);

localStorage.setItem(

"unlockedLevels",

JSON.stringify(unlocked)

);

}

}

// Get Unlocked Levels

function getUnlockedLevels(){

const saved = localStorage.getItem(

"unlockedLevels"

);

if(saved){

return JSON.parse(saved);

}

// First time

return [1];

}

// Check Locked

function isUnlocked(level){

return getUnlockedLevels().includes(level);

}
// ==============================
// Lock Learn Levels
// ==============================

window.addEventListener("load", () => {

const cards = document.querySelectorAll(".card");

cards.forEach((card,index)=>{

const level = index + 1;

if(level > 22) return;

if(!isUnlocked(level)){

card.style.opacity = "0.5";

card.style.pointerEvents = "none";

card.style.filter = "grayscale(100%)";

const title = card.querySelector("h2");

if(title){

title.innerHTML += " 🔒";

}

}

});

});
function unlockLesson(level){
    unlockLevel(level);
}
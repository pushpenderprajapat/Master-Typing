// ==============================
// Master Typing V3
// storage.js
// ==============================

function getBestWpm() {

    return Number(localStorage.getItem("bestWpm")) || 0;

}

function saveBestWpm(wpm) {

    if (wpm > getBestWpm()) {

        localStorage.setItem("bestWpm", wpm);

    }

}

function getBestAccuracy() {

    return Number(localStorage.getItem("bestAccuracy")) || 0;

}

function saveBestAccuracy(acc) {

    if (acc > getBestAccuracy()) {

        localStorage.setItem("bestAccuracy", acc);

    }

}
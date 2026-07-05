// =======================================
// Master Typing V3
// data.js
// =======================================

// -----------------------------
// Typing Levels
// -----------------------------

const levels = {

1:["f","j"],

2:["f","j","d","k"],

3:["f","j","d","k","s","l"],

4:["f","j","d","k","s","l","a",";"],

5:["a","s","d","f","g","h","j","k","l",";"],

6:["q","w","e","r","t","y","u","i","o","p"],

7:[
"q","w","e","r","t",
"y","u","i","o","p",
"f","j"
],

8:[
"q","w","e","r","t",
"y","u","i","o","p",
"a","s","d","f",
"j","k","l"
],

9:[
"z","x","c","v",
"b","n","m"
],

10:[
"a","s","d","f","g",
"h","j","k","l",";",
"z","x","c","v","b","n","m"
],

11:[
"q","w","e","r","t",
"y","u","i","o","p",
"a","s","d","f","g",
"h","j","k","l",";",
"z","x","c","v","b","n","m"
]

};

// -----------------------------
// Level Generator
// -----------------------------

function generateLetters(level,count=120){

const letters=levels[level];

let output=[];

for(let i=0;i<count;i++){

output.push(

letters[
Math.floor(
Math.random()*letters.length
)
]

);

}

return output.join(" ");

}
// -----------------------------
// Levels 12 - 22
// -----------------------------

levels[12] = [
"the","and","for","not","you",
"are","can","had","has","was",
"his","her","our","out","use",
"new","old","day","boy","man"
];

levels[13] = [
"apple","table","chair","water","mouse",
"green","black","white","paper","phone",
"house","light","earth","music","happy",
"river","cloud","smile","train","plant"
];

levels[14] = [
"computer","keyboard","practice","language","internet",
"software","hardware","accuracy","typing","education",
"student","science","progress","function","variable",
"document","browser","project","android","developer"
];

levels[15] = ["sentence"];

levels[16] = ["paragraph"];

levels[17] = ["quotes"];

levels[18] = ["mixed"];

levels[19] = ["custom"];

levels[20] = ["numbers"];

levels[21] = ["symbols"];

levels[22] = ["master"];

// -----------------------------
// Words
// -----------------------------

const words = [

"apple","banana","orange","grapes","keyboard",
"monitor","computer","internet","science","school",
"teacher","student","future","success","practice",
"typing","speed","accuracy","coding","project",
"mobile","android","javascript","browser","website",
"engineer","language","software","hardware","network",
"security","design","creative","energy","beautiful",
"window","document","element","screen","system"

];

// -----------------------------
// Paragraphs
// -----------------------------

const paragraphs = [

"Typing every day improves speed and accuracy. Focus on accuracy first and speed will improve naturally.",

"Consistent practice develops muscle memory. A few minutes every day is better than one long practice session every week.",

"Master Typing is designed to help beginners become confident touch typists through structured levels and regular practice."

];

// -----------------------------
// Quotes
// -----------------------------

const quotes = [

"Practice makes progress.",

"The expert in anything was once a beginner.",

"Success comes from consistency.",

"Discipline beats motivation.",

"Small improvements every day create big results."

];
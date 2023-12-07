
// declare empty array 

let myhigh = [""];


// parse localstorage so it's usable as array
myhigh = JSON.parse(localStorage.getItem("savedHighscores")) || [];


// ref to clear score button
let clearscore = document.getElementById("clear");


// sort array in descending order

myhigh.sort(function (a, b){

    return b.score - a.score;

});

// loop through array and add items in ordered list

for (i = 0; i < myhigh.length; i++) {
    
    let newNameSpan = document.createElement("li");
    newNameSpan.textContent =  myhigh[i].score + " " + myhigh[i].name;  
    highscores.appendChild(newNameSpan);
  
}

//  clear local storage 

clearscore.addEventListener("click", function () {
localStorage.clear();
});
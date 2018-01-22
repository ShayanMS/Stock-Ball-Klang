var gamerun = document.getElementById("gamerun");
var gamestart = document.getElementById("gamestart");
var canvas = document.getElementById("canvas");
var button_red = document.getElementById("button_red");
var button_blue = document.getElementById("button_blue");
var button_green = document.getElementById("button_green");
var button_orange = document.getElementById("button_orange");
var gameOverScreen = document.getElementById("gameOverScreen");
var totalNotesCounter = document.getElementById("totalNotesCounter");
var maxStreakCounter = document.getElementById("maxStreakCounter");
var totalPointsCounter = document.getElementById("totalPointsCounter");
var totalNotes;
var maxStreak;
var totalPoints;
var totalNotesPlayed;
var rightNotesPlayed;
var text;
canvas.style.opacity = 0.3;
toggle(gamerun);

function toggle(elem) {
    if (elem.style.display === "none") {
        elem.style.display = "block";
    } else {
        elem.style.display = "none";
    }
}

var playButton = document.getElementById("playButton");
var stopButton = document.getElementById("stopButton");
var rightButton = document.getElementById("rightNote");
var wrongButton = document.getElementById("wrongNote");
var starPowerButton = document.getElementById("starPower");

var noteStreakCounter = document.getElementById("noteStreakCounter");
var noteStreak;
var pointsCounter = document.getElementById("pointsCounter");
var points;
var multiplicator = document.getElementById("multiplicator");
var multi;
var starMulti;
var rightNotes = [];
var allNotes = [];
var aPressed = false;
var sPressed = false;
var dPressed = false;
var fPressed = false;
var runDelay;
var noteSpeed = 2300;
var noteIsFalling;
var isGameOn = false;
var isRedIn;
var	isBlueIn;
var	isGreenIn;
var	isOrangeIn;

playButton.addEventListener("click", function (e) {
    startSound();
    startGame();
});

stopButton.addEventListener("click", function (e) {
    stopSound();
    stopGame();
});

rightButton.addEventListener("click", function (e){
    rightNotePlayedSound();
    rightNotePlayedGame();
});

wrongButton.addEventListener("click", function(e){
    wrongNotePlayedSound();
    wrongNotePlayedGame();
})

starPowerButton.addEventListener("click", function(e){
    activateStarPowerSound();
    activateStarPowerGame();
})

function setGameReady() {
    noteStreak = 0;
    noteStreakCounter.innerHTML = noteStreak;
    points = 0;
    pointsCounter.innerHTML = points;
    multi = 1;
    multiplicator.src = "Images/multi_x1_small.png";
    rightNotes.length = 0;
    allNotes.length = 0;
    aPressed = false;
    sPressed = false;
    dPressed = false;
    fPressed = false;
    totalNotes = "";
    maxStreak = 0;
    totalPoints = 0;
    rightNotesPlayed = 0;
    totalNotesPlayed = 0;
    text = "";
}

function startGame() {
    setGameReady();
    canvas.style.opacity = 1;
    toggle(gamestart);
    toggle(gamerun);
    runGame();
    //readTextFile("Test.txt");
}

function stopGame() {
    canvas.style.opacity = 0.3;
    toggle(gamestart);
    toggle(gamerun);
    isGameOn = false;
    window.clearTimeout(runDelay);
    deleteAllNotes();
    showGameOverScreen();
}

function rightNotePlayedGame() {
    noteStreak++;
    rightNotesPlayed++;
    noteStreakCounter.innerHTML = noteStreak;
    points += 1 * multi;
    pointsCounter.innerHTML = points;
    if (noteStreak == 15) {
        multi = 4;
        multiplicator.src = "Images/multi_x4_small.png";
    } else if (noteStreak == 10) {
        multi = 3;
        multiplicator.src = "Images/multi_x3_small.png";
    } else if (noteStreak == 5) {
        multi = 2;
        multiplicator.src = "Images/multi_x2_small.png";
    }
}

function wrongNotePlayedGame() {
    if(maxStreak < noteStreak){
        maxStreak = noteStreak;
    }
    noteStreak = 0;
    noteStreakCounter.innerHTML = noteStreak;
    multi = 1;
    multiplicator.src = "Images/multi_x1_small.png";
    window.clearTimeout(starMulti);
}

function activateStarPowerGame() {
    multi = 8;
    multiplicator.src = "Images/multi_x8_small.png";
    starMulti = setTimeout(function() {
        multi = 4;
        multiplicator.src = "Images/multi_x4_small.png";
    }, 15000);
}

function runGame(){
	var entity;
	var margin;
	var name;
    var interval = 0;
    var counter = 0;
    var songDuration;
    var noteDuration = 11;
    isRedIn = false;
	isGreenIn = false;
	isBlueIn = false;
	isOrangeIn = false;
	isGameOn = true;
    noteIsFalling = false;
    songDuration = Math.floor(song.duration);
    
    function randomNote(){
        var r = Math.floor(Math.random() * 4);
        var i = Math.floor(Math.random() * 5) + 2;
        if(r == 0){
            margin = 43;
			entity = "fallingnoteRed";
			name = "R";
        } else if(r == 1){
            margin = 148;
			entity = "fallingnoteBlue";
			name = "B";
        } else if(r == 2){
            margin = 250;
			entity = "fallingnoteGreen";
			name = "G";
        } else if(r == 3){
            margin = 353;
			entity = "fallingnoteOrange";
			name = "O";
        }
        i *= 1000;
        i /= 2;
        interval += i;
        noteDuration += i / 1000;
    }

    runDelay = setTimeout(function(){
        while(noteDuration < songDuration){
            randomNote();
            runCreateNote(margin, entity, name, counter, interval);
            counter++;
        }
    }, 11000)

    // Register keypress events on the whole document to "catch" notes
    document.addEventListener('keydown', (e) => {
        if (isGameOn){
            if(e.keyCode == "65") {
                button_red.style.opacity = 1;
                aPressed = true;
                if (isRedIn){
                    rightNotePlayedSound();
                    rightNotePlayedGame();
                } else {
                    wrongNotePlayedSound();
                    wrongNotePlayedGame();
                }
            } else if(e.keyCode == "83") {
                button_blue.style.opacity = 1;
                sPressed = true;
                if (isBlueIn){
                    rightNotePlayedSound();
                    rightNotePlayedGame();
                } else {
                    wrongNotePlayedSound();
                    wrongNotePlayedGame();
                }
            } else if(e.keyCode == "68") {
                button_green.style.opacity = 1;
                dPressed = true;
                if (isGreenIn){
                    rightNotePlayedSound();
                    rightNotePlayedGame();
                } else {
                    wrongNotePlayedSound();
                    wrongNotePlayedGame();
                }
            } else if(e.keyCode == "70") {
                button_orange.style.opacity = 1;
                fPressed = true;
                if (isOrangeIn){
                    rightNotePlayedSound();
                    rightNotePlayedGame();
                } else {
                    wrongNotePlayedSound();
                    wrongNotePlayedGame();
                }
            }
        }
    });

    document.addEventListener('keyup', (e) => {
        if(e.keyCode == "65") {
            button_red.style.opacity = 0.65;
            aPressed = false;
        } else if(e.keyCode == "83") {
            button_blue.style.opacity = 0.65;
            sPressed = false;
        } else if(e.keyCode == "68") {
            button_green.style.opacity = 0.65;
            dPressed = false;
        } else if(e.keyCode == "70") {
            button_orange.style.opacity = 0.65;
            fPressed = false;
        }
    });
}

function runCreateNote(margin, entity, name, counter, interval){
	//create and drop note
    allNotes.push(setTimeout(function(){createNote(margin, entity, name, counter);}, interval));
    totalNotesPlayed++;
}

function deleteAllNotes(){
    for(var i = 0; i < allNotes.length; i++){
        window.clearTimeout(allNotes[i]);
    }
}

//Created note
function createNote(margin, entity, name, counter) {
	// set note properties
	var newNote = document.createElement("div");
	$(newNote).attr("class", entity);
	var tempId = name + "_note_" + counter;
	$(newNote).attr("id", tempId);	
	// set note location
	$(newNote).css({ marginLeft: margin + "px" });
	$(newNote).css({ position:"relative" });
	$(newNote).appendTo("#canvas");
	charFall(tempId, noteSpeed);
}

//Animates a note falling.
function charFall(id, fallingtime) {
	noteIsFalling = true;
	var noteBall = $("#" + id);
	noteBall.animate({
			top: (noteBall.parent().height() - noteBall.height()*2) + 'px'
		}, {
			duration: fallingtime,
			queue: false,
			easing: "linear",
			step: function() {
				checkStep(id);	
			},
			complete: function() {
				reachBottom(id);	
			}
	});
}

//check note location and turn booleans on/off accordingly
function checkStep(id){
	
	var noteBall = $("#" + id);
	var name = id.substring(0,1);

	if (name == "R"){
		if (isInRange(noteBall)){
			isRedIn = true;
            if (aPressed){
                noteBall.remove();
                rightNotes.push(id);
            }
            readTextFile("RedBallDetection.txt");
            if(text == "RedDetected"){
                noteBall.remove();
                rightNotes.push(id);
                rightNotePlayedSound();
                rightNotePlayedGame();
            }
		} else {
			isRedIn = false;
            /*readTextFile("BallDetection.txt");
            if(text == "null"){
                
            }
            else{
                wrongNotePlayedSound();
                wrongNotePlayedGame();
            }*/
		}
	}
	if (name == "B"){
		if (isInRange(noteBall)){
			isBlueIn = true;
            if (sPressed){
                noteBall.remove();
                rightNotes.push(id);
            }
            readTextFile("BlueBallDetection.txt");
            if(text == "BlueDetected"){
                noteBall.remove();
                rightNotes.push(id);
                rightNotePlayedSound();
                rightNotePlayedGame();
            }
		} else {
			isBlueIn = false;
		}
	}
	if (name == "G"){
		if (isInRange(noteBall)){
			isGreenIn = true;
            if (dPressed){
                noteBall.remove();
                rightNotes.push(id);
            }
            readTextFile("GreenBallDetection.txt");
            if(text == "GreenDetected"){
                noteBall.remove();
                rightNotes.push(id);
                rightNotePlayedSound();
                rightNotePlayedGame();
            }
		} else {
			isGreenIn = false;
		}
	}
	if (name = "O"){
		if (isInRange(noteBall)){
			isOrangeIn = true;
            if (fPressed){
                noteBall.remove();
                rightNotes.push(id);
            }
            readTextFile("YellowBallDetection.txt");
            if(text == "YellowDetected"){
                noteBall.remove();
                rightNotes.push(id);
                rightNotePlayedSound();
                rightNotePlayedGame();
            }
		} else {
			isOrangeIn = false;
		}
	}
}

function isInRange(noteBall){
	return noteBall.offset().top < 750 && noteBall.offset().top > 650;
}

//When a note hits the bottom, this function is called.
function reachBottom(id){
    if (rightNotes.includes(id)){
        var i = rightNotes.indexOf(id);
        if (i > -1) {
            rightNotes.splice(i, 1);
        }
    } else {
        wrongNotePlayedSound();
        wrongNotePlayedGame();
    }
	noteIsFalling = false;
	$("#" + id).remove();
}

function setGameOverScreen(){
    totalNotes = rightNotesPlayed + " of " + totalNotesPlayed;
    totalNotesCounter.innerHTML = totalNotes;
    maxStreakCounter.innerHTML = maxStreak;
    totalPoints = points;
    totalPointsCounter.innerHTML = totalPoints;
}

function showGameOverScreen(){
    setGameOverScreen();
    gameOverScreen.showModal();
}

function readTextFile(file)
{
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                text = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
}
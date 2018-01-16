// *TODO* HTML Elements
var songSelectButton = document.getElementById("songSelectButton");
var songSelection = document.getElementById("songSelection");
var songSelectLabel = document.getElementById("songSelectLabel");
var runningSongLabel = document.getElementById("runningSongLabel");

//// Sound class Elements
// variables
var wrongNoteCount = 0;
var rightNoteCount = 0;
var active = false;
var count_offDelay;
var songDelay;
var SONG_VOLUME = 0.6;

// *TODO* getting song list from HTML
var songSelect = document.getElementById("songSelect");

// song files as a select option list
var songList = ["Beastie Boys - No Sleep Till Brooklyn",
               "Jimi Hendrix - Purple Haze",
               "Lacuna Coil - Our Truth",
               "Linkin Park - What Ive Done",
               "Lostprophets - Rooftops",
               "Michael Jackson - Beat It",
               "Paramore - Misery Business",
               "Pat Benatar - Heartbreaker",
               "Survivor - Eye Of The Tiger",
               "System Of A Down - B.Y.O.B."];

for (var i = 0; i < songList.length; i++) {
    var opt = document.createElement('option');
    opt.value = "Songs/" + songList[i] + ".mp3";
    opt.innerHTML = songList[i];
    songSelect.appendChild(opt);
}

// loading song file
var song = new Audio();
var songSource = document.createElement("source");
songSource.type = "audio/mpeg";
songSource.src = songSelect.value;
song.appendChild(songSource);

// changeListener for song list to update song
songSelect.addEventListener("change", function (e) {
    songSource.src = songSelect.value;
    song.appendChild(songSource);
    song.load();
    var index = songSelect.selectedIndex;
    var value = songList[index];
    songSelectLabel.innerHTML = value;
    runningSongLabel.innerHTML = value;
})

// sound files
var count_off = new Audio();
var count_offSource = document.createElement("source");
count_offSource.type = "audio/wav";
count_offSource.src = "Sounds/count_off.wav";
count_off.appendChild(count_offSource);

var crowd_booing = new Audio();
var crowd_booingSource = document.createElement("source");
crowd_booingSource.type = "audio/mpeg";
crowd_booingSource.src = "Sounds/crowd/crowd_booing.mp3";
crowd_booing.appendChild(crowd_booingSource);

var crowd_cheering = new Audio();
var crowd_cheeringSource = document.createElement("source");
crowd_cheeringSource.type = "audio/mpeg";
crowd_cheeringSource.src = "Sounds/crowd/crowd_cheering.mp3";
crowd_cheering.appendChild(crowd_cheeringSource);

var crowd_clapping = new Audio();
var crowd_clappingSource = document.createElement("source");
crowd_clappingSource.type = "audio/mpeg";
crowd_clappingSource.src = "Sounds/crowd/crowd_clapping.mp3";
crowd_clapping.appendChild(crowd_clappingSource);

var missed_note_1 = new Audio();
var missed_note_1Source = document.createElement("source");
missed_note_1Source.type = "audio/wav";
missed_note_1Source.src = "Sounds/missed_notes/missed_note_1.wav";
missed_note_1.appendChild(missed_note_1Source);

var missed_note_2 = new Audio();
var missed_note_2Source = document.createElement("source");
missed_note_2Source.type = "audio/wav";
missed_note_2Source.src = "Sounds/missed_notes/missed_note_2.wav";
missed_note_2.appendChild(missed_note_2Source);

var missed_note_3 = new Audio();
var missed_note_3Source = document.createElement("source");
missed_note_3Source.type = "audio/wav";
missed_note_3Source.src = "Sounds/missed_notes/missed_note_3.wav";
missed_note_3.appendChild(missed_note_3Source);

var missed_note_4 = new Audio();
var missed_note_4Source = document.createElement("source");
missed_note_4Source.type = "audio/wav";
missed_note_4Source.src = "Sounds/missed_notes/missed_note_4.wav";
missed_note_4.appendChild(missed_note_4Source);

var missed_note_5 = new Audio();
var missed_note_5Source = document.createElement("source");
missed_note_5Source.type = "audio/wav";
missed_note_5Source.src = "Sounds/missed_notes/missed_note_5.wav";
missed_note_5.appendChild(missed_note_5Source);

var missed_note_6 = new Audio();
var missed_note_6Source = document.createElement("source");
missed_note_6Source.type = "audio/wav";
missed_note_6Source.src = "Sounds/missed_notes/missed_note_6.wav";
missed_note_6.appendChild(missed_note_6Source);

// filling an array with missed notes
var missed_notes = [missed_note_1, missed_note_2, missed_note_3, missed_note_4, missed_note_5, missed_note_6];

// HTML Elemet song selction dialog
songSelectButton.addEventListener("click", function (e) {
    songSelection.showModal();
});

// setting parameters ready
function setSoundReady() {
    crowd_cheering.volume = 1;
    song.volume = SONG_VOLUME;
    wrongNoteCount = 0;
    rightNoteCount = 0;
}

// starting sound
function startSound() {
    if (!active) {
        setSoundReady();
        active = true;
        crowd_cheering.play();
        delay(count_off, 6500, "count_offDelay");
        delay(song, 11000, "songDelay");
        crowdCheeringHandler();
        afterSongEnded();
    }
    
}

// stopping sound
function stopSound() {
    if (active) {
        if (count_off.currentTime > 0) {
            count_off.pause();
            count_off.currentTime = 0;
        } else {
            window.clearTimeout(count_offDelay);
        }
        
        if (song.currentTime > 0) {
            song.pause();
            song.currentTime = 0;
        } else {
            window.clearTimeout(songDelay);
        }
        
        if (crowd_booing.currentTime > 0) {
            crowd_booing.pause();
            crowd_booing.currentTime = 0;
        }
        
        if (crowd_clapping.currentTime > 0) {
            crowd_clapping.pause();
            crowd_clapping.currentTime = 0;
        }
        
        crowd_cheering.pause();
        crowd_cheering.currentTime = 0;
        active = false;
    }
}

// delay song and sound start
function delay(sound, time, name) {
    if (name === "count_offDelay") {
        count_offDelay = setTimeout(function () {
            sound.play();
        }, time);
    } else if (name === "songDelay") {
        songDelay = setTimeout(function () {
            sound.play();
        }, time);
    }
}

// lowering the volume of the cheering sound
function crowdCheeringHandler() {
    setTimeout(function () {
        crowd_cheering.volume = 0.9;
    }, 2500);
    setTimeout(function () {
        crowd_cheering.volume = 0.8;
    }, 3000);
    setTimeout(function () {
        crowd_cheering.volume = 0.7;
    }, 3500);
    setTimeout(function () {
        crowd_cheering.volume = 0.6;
    }, 4000);
    setTimeout(function () {
        crowd_cheering.volume = 0.5;
    }, 4500);
    setTimeout(function () {
        crowd_cheering.volume = 0.4;
    }, 5000);
    setTimeout(function () {
        crowd_cheering.volume = 0.3;
    }, 5500);
    setTimeout(function () {
        crowd_cheering.volume = 0.2;
    }, 6000);
}

// when right notes are played
function rightNotePlayedSound() {
    wrongNoteCount = 0;
    rightNoteCount++;
    song.volume = SONG_VOLUME;
    if (rightNoteCount >= 3) {
        crowd_cheering.volume = 0.2;
        crowd_booing.pause();
        crowd_booing.currentTime = 0;
    }
}

// when wrong notes are played
function wrongNotePlayedSound() {
    var random = Math.floor(Math.random() * 6);
    missed_notes[random].play();
    song.volume = 0;
    rightNoteCount = 0;
    wrongNoteCount++;
    if (wrongNoteCount >= 5) {
        crowd_cheering.volume = 0;
        crowd_booing.volume = 0.6;
        crowd_booing.loop = true;
        crowd_booing.play();
    }
}

// activating star power
function activateStarPowerSound() {
    crowd_cheering.volume = 0;
    crowd_clapping.play();
    setTimeout(function () {
        crowd_clapping.pause();
        crowd_clapping.currentTime = 0;
        crowd_cheering.volume = 0.2;
    }, 15000);
}

function afterSongEnded() {
    song.onended = function () {
        stopSound();
        stopGame();
    }
}
let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');
let message = document.getElementById('message');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if (answer.value === "" || attempt.value === ""){
        setHiddenFields();
    }

    if (validateInput(input.value) === true){
        attempt.value = (+attempt.value + 1).toString();
    }
    else {
        return;
    }

    let result = getResults(input.value);
    if (result === true){
        setMessage('You Win! :)');
        showAnswer(true);
        showReplay();
    } else if (result === false && +attempt.value >= 10){
        setMessage('You Lose! :(');
        showAnswer(false);
        showReplay();
    } else {
        setMessage("Incorrect, try again.");
    }
}

//implement new functions here
function setHiddenFields(){
    answer.value = (Math.floor(Math.random() * (10000 - 0))).toString().padStart(4, 0);
    attempt.value = "0";
}

function setMessage(msg){
    message.innerHTML = msg;
}

function validateInput(value){
    if (value.length === 4){
        return true;
    }
    else {
       message.innerHTML = "Guesses must be exactly 4 characters long."
        return false;
    }
}

function getResults(input){
    let resultsHTML = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">';
    let correctGuess = 0;
    for (let i = 0; i < input.length; i++){
        if (input[i] === answer.value[i]){
            correctGuess++;
            resultsHTML += '<span class="glyphicon glyphicon-ok"></span>';
        } else if (answer.value.includes(input[i], 0)){
            resultsHTML += '<span class="glyphicon glyphicon-transfer"></span>';
        } else {
            resultsHTML += '<span class="glyphicon glyphicon-remove"></span>';
        }
    }
    resultsHTML += '</div></div>';
    document.getElementById('results').innerHTML += resultsHTML;
    return correctGuess === 4;
}

function showAnswer(win){
    let code = document.getElementById('code');
    code.innerHTML = answer.value;
    if (win === true){
        code.className += " success";
    } else {
        code.className += " failure";
    }
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none';
    document.getElementById('replay-div').style.display = 'block';
}
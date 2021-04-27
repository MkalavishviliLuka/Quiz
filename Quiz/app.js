// Loads function on window load
// window.onload = sendApiRequest

// Select container div
var intro = document.querySelector('.intro');

// Gets select button
var choose = document.getElementById('choose')

// Quiz container div
var quizgame = document.getElementById('quiz')

// Category select
var cat = document.querySelector('.category-select');
var catval;

// Difficulty select
var dif = document.querySelector('.difficulty-select');

// Number select
var questionNumber = document.querySelector('.questionNumber');

// Margin number for transitioning intro 
var marginNumber = 0

// Gets all of the answer button
var answers = document.querySelectorAll('.answers');

// Calculates correct/incorrect answers
var answerNum = 0;

// Generates next question
var num = 0;

// Reloads the page (button appears after quiz is finished)
var tryagain = document.querySelector('#reload');

// Category, Difficulty and question divs
var categorydiv = document.querySelector('#category')
var difficultydiv = document.querySelector('#difficulty')
var questiondiv = document.querySelector('#question')


// Shows quiz after choosing type of the game
choose.addEventListener('click', function(){
    // Sets interval to gradually move quiz div
    setTimeout(() => {
        quizgame.style.marginTop = '0px'
    }, 850);
    // Sets interval to gradually move intro div
    var marginInterval = setInterval(() => {
        marginNumber-=200
        intro.style.marginLeft = marginNumber + 'px'
        if(marginNumber == -2400){
            intro.style.display = 'none'
            clearInterval(marginInterval)
        }
    }, 100);
    sendApiRequest()
})

// An asynchronous function to fetch data from the API
async function sendApiRequest() {
    var response = await fetch('https://opentdb.com/api.php?amount='+questionNumber.value+'&category='+cat.value+'&difficulty='+dif.value+'&type=multiple');
    var data = await response.json()
    useApiData(data)
}

// Function that uses recieved data from the API on load and after clicking the given answer.
function useApiData(data) {
    // First question/answer
    categorydiv.innerHTML = `Category: ${data.results[num].category}`
    difficultydiv.innerHTML = `Difficulty: ${data.results[num].difficulty}`
    questiondiv.innerHTML = data.results[num].question


    // Answers array
    var answersArr = [data.results[num].correct_answer, data.results[num].incorrect_answers[0], data.results[num].incorrect_answers[1], data.results[num].incorrect_answers[2]];
    let shuffledAnswers = arrayShuffle(answersArr)
    document.querySelector('#answer1').innerHTML = shuffledAnswers[0]
    document.querySelector('#answer2').innerHTML = shuffledAnswers[1]
    document.querySelector('#answer3').innerHTML = shuffledAnswers[2]
    document.querySelector('#answer4').innerHTML = shuffledAnswers[3]
    console.log(data.results[num].correct_answer);

    // Updates answers and questions after clicking the button
    answers.forEach(function(e){
        e.addEventListener('click', function(){
            if(e.innerHTML == data.results[num].correct_answer){
                e.style.backgroundColor = 'green'
                answerNum++
                num++
            }else if(e.innerHTML != data.results[num].correct_answer){
                e.style.backgroundColor = 'red'
                num++
            }
            setTimeout(() => {
                questiondiv.innerHTML = data.results[num].question
                answersArr = [data.results[num].correct_answer, data.results[num].incorrect_answers[0], data.results[num].incorrect_answers[1], data.results[num].incorrect_answers[2]];
                shuffledAnswers = arrayShuffle(answersArr)
                document.querySelector('#answer1').innerHTML = shuffledAnswers[0]
                document.querySelector('#answer2').innerHTML = shuffledAnswers[1]
                document.querySelector('#answer3').innerHTML = shuffledAnswers[2]
                document.querySelector('#answer4').innerHTML = shuffledAnswers[3]
                e.style.backgroundColor = 'rgb(75, 47, 233)'
                console.log(data.results[num].correct_answer);
            }, 1000);

            // Sets the limit of the questions (Ends the game if num is equal to given amount of questions)
            if (num == questionNumber.value) {
                setTimeout(() => {
                    alert('You have scored: ' + answerNum);
                    tryagain.style.display = 'inherit'
                }, 1000);
            }

            // Reloads the page on click
            tryagain.addEventListener('click', function(){
                location.reload()
            })
        })
    })
}

// Shuffles asnwers and spreads between answer buttons
let arrayShuffle = function(x){
    let newPos;
    let temp;
    for(let i = x.length-1; i>0; i--){
        newPos = Math.floor(Math.random() * (i+1))
        temp = x[i]
        x[i] = x[newPos]
        x[newPos] = temp 
    }
    return x
}

// McDonald&#039;s
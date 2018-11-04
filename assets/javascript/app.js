// First we have to set up a questions and answers array

var questionset = $("#quiz-area");
var time = 30;

// Questions - source: https://trivia.fyi/category/art-trivia/
var questions = [{
    question: "What happened to British street artist Banksy’s “Girl with Balloon” when it sold for $1.4 million at Sotheby’s auction house in 2018?",
    answers: ["It was sent on fire", "It shredded itself", "It was ripped apart", "nothing"],
    correctanswer: 1,
    image: "../assets/images/question1image.gif"
},
{
    question: "What is the most visited museum in Europe?",
    answers: ["Tate Modern, London, UK", "Centor de Arte Reina, Madrid, Spain", "Louvre, Paris, France", "The Uffizi Gallery, Florence, Italy"],
    correctanswer: 2,
    image: "../assets/images/question2image.gif"
},
{
    question: "The Van Gogh museum is located in what European capital city?",
    answers: ["Rome", "Barcelona", "Madrid", "Amsterdam"],
    correctanswer: 3,
    image: "../assets/images/question3image.gif"
},
{
    question: "Which artist is credited with developing linear perspective?",
    answers: ["Donatello", "Alberti", "Brunelleschi", "Mantegna"],
    correctanswer: 3,
    image: "../assets/images/question4image.gif"

}]
var intervalID;
var setIntervalID;
var setTimeoutID;
CorrectAnswers = 0;
IncorrectAnswers = 0;
Unanswered = 0;
var userguess = ""
var qCount = questions.length;
var pick;
var index;
var newArray=[];
var holder = []
var running = false;
// ArrayIndex = 0;


$(document).ready(function () {


    // here we need a function to initialize the game
    $("#resetbutton").hide();
    $("#startbutton").on("click",function() {
        $("#startbutton").hide();
        getQuestion();
        timer();
        for(var i=0; i<questions.length; i++){
            holder.push(questions[i]);
        }

    });

    // function displayQuestion() {
    //     clearInterval(setIntervalID);
    //     setIntervalID = setInterval(getQuestion, 30000);
    // }
    
    function timer(){
        if (!running){
            intervalID = setInterval(decrement,1000);
            running = true;
        }
    }

    function decrement(){
        $("#timer").html("<h4>Time Remaining:"+time+"</h4> seconds");
        time --;
        if (time === 0) {
            Unanswered++;
            stop();
            $("#quiz-area").html("<h4>Time is up! The correct answer is:"+pick.answers[pick.answer]+"</h2>");
            hidepicture();
        }
    }

    function stop () {
        running = false;
        clearInterval(intervalID);
    }
    // function timer(){
    //     time--;
    //     $("#timer").append("<h2>Time Remaining:"+time+"</h2> seconds");
    //     if (time === 0){
    //         stop();
    //     }}}

    function getQuestion() {
        index = Math.floor(Math.random()*questions.length);
        pick = questions[index];

            $("#quiz-area").html("<h4>"+pick.questions+"</h4>")
            for (var i=0; i < pick.answers.length;i++){
                var userguess = $("<div>");
                userguess.addClass("answerchoice");
                userguess.html(pick.answers[i]);
                userguess.attr("data-guessvalue",i);
                $("#quiz-area").append(userguess);
            }
        }

    $(".answerchoice").on("click",function(){
        userguess = parseINT($(this).attr("data-guessvalue"));
        if(userguess === pick.answer){
            stop();
            CorrectAnswers++;
            userguess="";
            $("#quiz-area").html("<h4>Correct!</h4>");
            hidepictue();
        }
        else {
            stop();
            IncorrectAnswers++;
            userguess="";
            $("#quiz-area").html("<h4>Wrong! The correct answer is:"+pick.answers[pick.correctanswer]+"</h4>");
            hidepictue();

        }
    })

    function hidepicture () {
        $("#quiz-area").append("<img src="+pick.image+">");
        newArray.push(pick);
        questions.splice(index,1);

        var hidepic = setTimeout(function(){
        $("quiz-area").empty();
        time=30;

        if ((IncorrectAnswers+CorrectAnswers+Unanswered) === qCount) {
            $("#quiz-area").empty();
            $("#quiz-area").html("<h4>All done! See results below: </h4>");
            $("#quiz-area").append("<h6>Correct" +CorrrectAnswers+"</h6>");
            $("#quiz-area").append("<h6>Incorrect:" +IncorrectAnswers+"</h6>");
            $("#quiz-area").append("<h6>Unanswered" +Unanswered+"</h6>");
            $("#resetbutton").show();
            CorrectAnswers = 0;
            IncorrectAnswers = 0;
            Unanswered = 0;
        }    
        else {
            timer();
            displayQuestion();
        }

        },3000);
    }

    $("#reset-button").on("click",function(){
        $("#reset-button").hide();
        $("#quiz-area").empty();
        for(var i=0; i < holder.length; i++){
            questions.push(questions[i]);
        }
        timer();
        getQuestion();
    })

    // function stop (){
    //     clearInterval(setIntervalID);
    // }
    



        // display questions
        // $("#quiz-area").append(questions.question,)




    
    // here we display the questions and answer choices


    // function initial() {
    //     $("#start-game").on("click", function () {







    //     })

    // }



    // here we need a function to reset the game

    // check correct answers and incorrect answers and sum them up

    // have a playgame function

    // call the initial function

    // call the game function

        });

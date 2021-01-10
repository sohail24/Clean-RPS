function rpsGame(yourChoice){
    // console.log(yourChoice);             //returnig the image whole syntax as this is used
    // console.log(yourChoice.id)              // returning the id associated with the clicked image
    var humanChoice = yourChoice.id;
    var botChoice = ['rock', 'paper', 'scissor'][Math.floor(Math.random()*3)];
    console.log("your choice : " + humanChoice);
    console.log("bot choice : " + botChoice);

    var resultDetail = getWinner(humanChoice,botChoice);      // you lost / you win /  tie 
    console.log(resultDetail);

    frontEndRPS(humanChoice,botChoice,resultDetail);
    frontEndModel();

}

function getWinner(humanChoice,botChoice){
    var dbScores = {
        'rock' :{ 'scissor':1, 'rock' : 0.5, 'paper':0},
        'paper' :{ 'rock':1, 'paper' : 0.5, 'scissor':0},
        'scissor' :{ 'paper':1, 'scissor' : 0.5, 'rock':0}
    }
    
    var humanScore = dbScores[humanChoice][botChoice];
    var botScore = dbScores[botChoice][humanChoice];

    if(humanScore > botScore){
        return {result:"You WON!!", color:"green"};
    }
    else if(humanScore === botScore){
        return {result:"It's a TIE!..", color:"yellow"};
    }
    else{
        return {result:"You LOST..", color:"red"};
    }
}

var scores = {
  'humanscore' : 0,
  'botscore': 0,
}

function frontEndRPS(humanChoice,botChoice,resultDetail){
    var imgDatabase = {
        'rock' : document.getElementById('rock').src,
        'paper' : document.getElementById('paper').src,
        'scissor' : document.getElementById('scissor').src,
    }

    // console.log(imgDatabase);
    var modelType = document.getElementsByClassName("modal-default");
    var resultMessage, resultDisplay,human = humanChoice,bot = botChoice;

    if(resultDetail['result'] === "You WON!!"){
        resultMessage = document.getElementById('result-message');
        resultDisplay = document.getElementById('result-display');

        document.getElementById("color-box").className = "modal-win ";

        resultMessage.innerHTML = "<p style='font-size:50px;'>You WON!!<p style='font-size:50px;'>";
        resultDisplay.innerHTML = "<img src='"+imgDatabase[human] + "'height='120px' width='150px'><p style='display:inline; font-size:80px;'> VS </p><img src='"+imgDatabase[bot] + "'height='120px' width='150px' >";

        scores['humanscore']++;
        humanScore = document.getElementById('human-score');
        humanScore.innerHTML = scores['humanscore'];

      }

    else if (resultDetail['result'] === "It's a TIE!.."){
      resultMessage = document.getElementById('result-message');
      resultDisplay = document.getElementById('result-display');

      document.getElementById("color-box").className = "modal-tie";

      resultMessage.innerHTML = "<p style='font-size:50px;'>It's a TIE!..</p>";
      resultDisplay.innerHTML = "<img src='"+imgDatabase[human] + "'height='120px' width='150px'><p style='display:inline; font-size:80px;'> VS </p><img src='"+imgDatabase[bot] + "'height='120px' width='150px' >";
      
      // scores['humanscore']++;
      // humanScore = document.getElementById('human-score');
      // humanScore.innerHTML = scores['humanscore'];

    }
    
    else if (resultDetail['result'] === "You LOST.."){
      resultMessage = document.getElementById('result-message');
      resultDisplay = document.getElementById('result-display');
      
      document.getElementById("color-box").className = "modal-loss";

      resultMessage.innerHTML = "<p style='font-size:50px;'>You LOST..!</>";
      resultDisplay.innerHTML = "<img src='"+imgDatabase[human] + "'height='120px' width='150px'><p style='display:inline; font-size:80px;'> VS </p><img src='"+imgDatabase[bot] + "'height='120px' width='150px' >";
      
      scores['botscore']++;
      botScore = document.getElementById('computer-score');
      botScore.innerHTML = scores['botscore'];
    }

    else{
      //something went wrong

    }

    console.log(scores);
}



function frontEndModel(){
       // Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
  modal.style.display = "block";

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
}

function restartGame(){
  
  if (confirm("Restart The Game?") == true) {
    scores["humanscore"] = 0;
    scores["botscore"] = 0;
    humanScore = document.getElementById('human-score');
    humanScore.innerHTML = scores['humanscore'];
  
    botScore = document.getElementById('computer-score');
    botScore.innerHTML = scores['botscore'];
  } 
}

function aboutDev(){
  resultMessage = document.getElementById('result-message');
  resultDisplay = document.getElementById('result-display');
  
  document.getElementById("color-box").className = "modal-default";

  resultMessage.innerHTML = "<h1>Hi, I am <span style='font-size: 45px; font-weight: 200;' >Sohail</span></h1><h2>A Designer, Full Stack Developer, AI/ML enthusiast & </h2> <h3>3rd Year Engineering Undergrad Student at University Of Pune (SPPU)</h3>";
  resultDisplay.innerHTML = "<p style='font-size: 50px;'>📚 🧑🏽‍🎓 💻</p>";
  frontEndModel();
}

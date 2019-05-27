const symbol = ["+","x"];
var operand1=null, operand2=null, result=null, operation, ansPos, rangeSel, score = 0, attribute, timeLeft = 60, id;

function preReq(){
    document.getElementById("option1").addEventListener("click", scoreCalculation);
    document.getElementById("option2").addEventListener("click", scoreCalculation);
    document.getElementById("option3").addEventListener("click", scoreCalculation);
    document.getElementById("option4").addEventListener("click", scoreCalculation);
    score = 0;
    timeLeft = 60;
    document.getElementById("score-section").innerHTML = "SCORE" + "<br>" + score;
    computation();
}

function computation(){
    console.log("Comp");
    operand1 = Math.floor(Math.random()*10 + 1);
    operand2 = Math.floor(Math.random()*10 + 1);
    operation = symbol[Math.floor(Math.random()*2)];
    switch(operation){
        case "+":{
            result = operand1+operand2;
            rangeSel = 20;
            break;
        }
        case "x":{
            result = operand1*operand2;
            rangeSel = 80;
            break;
        }
        default:
            return null;
    }
    displayQtns();
}

function displayQtns(){
    console.log("Dis");
    document.getElementById("qtn-text").innerHTML = operand1 + " " + operation + " " + operand2;
    displayOptns();
}

function displayOptns(){
    var optionVal = [];
    optionVal.push(result);
    
    ansPos = Math.floor(Math.random()*4 + 1);
    document.getElementById("option".concat(ansPos)).innerHTML = result;
    document.getElementById("option".concat(ansPos)).value = result;
    
    for(var i = 1; i <= 4; i++){
        var currentValue = Math.floor(Math.random()*rangeSel + 1);
        for(var j = 0; j < optionVal.length; j++){
            if(currentValue != optionVal[j])
                currentValue = currentValue;
            else
                currentValue = Math.floor(Math.random()*100 + 1);
        }
        
        if(i != ansPos){
            document.getElementById("option".concat(i)).innerHTML = currentValue;
            document.getElementById("option".concat(i)).value = currentValue;
            optionVal.push(currentValue);
        }
    }
}

function scoreCalculation(){
    var answer = this.value;
    attribute = this.getAttribute("id");
    if(answer == result){
        score++;
        document.getElementById("score-section").innerHTML = "SCORE" + "<br>" + score;
        document.getElementById(attribute).style.backgroundColor = "#487769";
        setTimeout(setBackground,1000);
        setTimeout(computation,1000);
    }
    else{
        document.getElementById(attribute).style.backgroundColor = "#8F3A2F";
        document.getElementById("option".concat(ansPos)).style.backgroundColor = "#487769";
        setTimeout(setBackground,1000);
        setTimeout(computation,1000);
    }
}

function setBackground(){
    document.getElementById(attribute).style.backgroundColor = "#3F292B";
    document.getElementById("option".concat(ansPos)).style.backgroundColor = "#3F292B";
}

function displayTime(){
    timeLeft--;
    if(timeLeft < 0){
        clearInterval(id);
        restart();
    }else{
        document.getElementById("timer-section").innerHTML = (timeLeft > 9 ? "" + timeLeft: "0" + timeLeft) + "s";
    }
}

function restart(){
    document.getElementById("qtn-section").style.display = "none";
    document.getElementById("option-section").style.display = "none";
    document.getElementById("reset-section").style.display = "none";
    document.getElementById("game-over-section").style.display = "block";
    document.getElementById("restart-text").innerHTML = "YOUR SCORE <br>" + score + "<br><br>";
    document.getElementById("restart-section").style.display = "inline-block";
    document.getElementById("restart-section").onclick = function(){
        window.location.reload();
    }
}

document.getElementById("start-section").addEventListener("click", preReq);
document.getElementById("start-section").onclick = function(){
    document.getElementById("reset-section").style.display = "inline-block";
    document.getElementById("start-section").style.display = "none";
    document.getElementById("timer-section").innerHTML = timeLeft +"s";
    clearInterval(id);
    id = setInterval(displayTime,1000);
}

document.getElementById("reset-section").addEventListener("click", preReq);
document.getElementById("reset-section").onclick = function(){
    document.getElementById("timer-section").innerHTML = timeLeft +"s";
    clearInterval(id);
    id = setInterval(displayTime,1000);
}



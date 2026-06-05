function eligibality(){
    var age = document.getElementById("age").value;
    if(age >= 18){
        document.getElementById("result").innerHTML = "You are eligible to vote.";
    } else {
        document.getElementById("result").innerHTML = "You are not eligible to vote.";
    }
}
function checkNumber(){
    var number = document.getElementById("num").value;

    if(number > 0){
        document.getElementById("numResult").innerHTML = "The number is positive.";
    } else if(number < 0){
        document.getElementById("numResult").innerHTML = "The number is negative.";
    } else {
        document.getElementById("numResult").innerHTML = "The number is zero.";
    }
}
function checkGreater(){
    var num1 = document.getElementById("num1").value;

    if(num1 > 2){
        document.getElementById("checkResult").innerHTML = "The number is greater than 2.";
    } else if(num1 < 2){
        document.getElementById("checkResult").innerHTML = "The number is less than 2.";
    } else {
        document.getElementById("checkResult").innerHTML = "The number is equal to 2.";
    }
}
function validateLogin(){
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if(username === "email@example.com" && password === "password123"){
        document.getElementById("loginResult").innerHTML = "Login successful!";
    } else {
        document.getElementById("loginResult").innerHTML = "Invalid username or password.";
    }
}
function devideByFive(){
    var number = document.getElementById("num3").value;
    var result = number / 5;
    document.getElementsByClassName("Answer")[0].innerHTML = "The result is: " + result;
}
function largeNum(){
    var num1 = document.getElementById("number1").value;
    var num2 = document.getElementById("number2").value;
    var num3 = document.getElementById("number3").value;

    if(num1 > num2 && num1 > num3){
        document.getElementById("largestResult").innerHTML = "The largest number is: " + num1;
    } else if(num2 > num1 && num2 > num3){
        document.getElementById("largestResult").innerHTML = "The largest number is: " + num2;
    } else if(num3 > num1 && num3 > num2){
        document.getElementById("largestResult").innerHTML = "The largest number is: " + num3;
    } else {
        document.getElementById("largestResult").innerHTML = "There is a tie for the largest number.";
    }
}
function checkPrime(){
    var value = document.getElementById("val").value;
    for(var i = 2; i < value; i++){
        if(value % i === 0){
            document.getElementById("primeResult").innerHTML = "The number is not prime.";
            return;
        }else{
            document.getElementById("primeResult").innerHTML = "The number is prime.";
        }
    }
}
function Billing(){
    var units = document.getElementById("units").value;

    if(units <= 100){
        var billAmount = units * 5;
    } else if(units > 100 && units <= 200){
        var billAmount = (100 * 5) + ((units - 100) * 7);
    } else {
        var billAmount = (100 * 5) + (100 * 7) + ((units - 200) * 10);
    }
    document.getElementById("billingResult").innerHTML = "The bill amount is: " + billAmount;
}
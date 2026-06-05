function p1(){
    var num = document.getElementById("num").value;
     for(var i=1; i<=num; i++){
        document.getElementById("result").innerHTML += i + " ";
     }
}

function names(){
    var nameList = ["Arya", "Priyanshu", "Parthiv", "Vraj", "Harshil"];
    var result = "";
    for(var i=0; i<nameList.length; i++){
        result += nameList[i] + "  ";
    }
    document.getElementById("namesResult").innerHTML = result;
}
function total_marks(){
    var marks = [85, 90, 78, 92, 88];
    var total = 0;
    for(var i=0; i<marks.length; i++){
        total += marks[i];
    }
    document.getElementById("tableMarks").innerHTML = "Total Marks: " + total;
}
function multi_table(){
    var num = document.getElementById("num1").value;
    var result = "";
    for(var i=1; i<=10; i++){
        result += num + " x " + i + " = " + (num * i) + "<br>";
    }
    document.getElementById("tableResult").innerHTML = result;
}
function factorial(){
    var num = document.getElementById("num2").value;
    var fact = 1;
    for(var i=1; i<=num; i++){
        fact *= i;
    }
    document.getElementById("factorialResult").innerHTML = "Factorial of " + num + " is: " + fact;
}
function fibonacci(){
    var num = document.getElementById("num3").value;
    var a = 0, b = 1, next;
    var result = "";
    for(var i=1; i<=num; i++){
        result += a + " ";
        next = a + b;
        a = b;
        b = next;
    }
    document.getElementById("fibonacciResult").innerHTML = "Fibonacci sequence: " + result;
}
function checkpin(){
    var pin = document.getElementById("val").value;
    var pin2 = document.getElementById("val2").value;
    if(pin === pin2){
        document.getElementById("displayPin").innerHTML = "Access Granted";
    } else {
        document.getElementById("displayPin").innerHTML = "Access Denied";
    }   
}
function evenNum(){
    var num = document.getElementById("num4").value;
    var result = "";
    for(var i=2; i<=num; i+=2){
        if(num % 2 == 0){
            result += i + " ";
        }
        else{
            alert("This is not even number: "+i);
        }

    }
    document.getElementById("even_numResult").innerHTML = "Even numbers: " + result;

    
}
function oddNum(){
    var num = document.getElementById("num5").value;
    var result = "";
    for(var i=1; i<=num; i+=2){
        if(num % 2 !== 0){
             result += i + " ";
        }else{
            alert("This is not an odd number: " + i);
        }
    }  
    document.getElementById("odd_numResult").innerHTML = "Odd numbers: " + result;
}
function total_bill() {
    const cart = [
        { "poteto": 200 },
        { "Dress": 1000 },
        { "Milk": 100 },
        { "cake": 500 },
    ];
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        let value = Object.values(cart[i])[0];
        total += value;
    }

    alert(  "Total Bill = " + total);
}

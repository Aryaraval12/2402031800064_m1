function book_now() {

    let name = document.getElementById("name").value;
    let tel = document.getElementById("phone").value;
    let ema = document.getElementById("email").value;
    let num = document.getElementById("number").value;

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phonePattern = /^[0-9]{10}$/;

    if (name.trim() === "") {
        alert("First complete Name portion");
        return;
    }

    if (!phonePattern.test(tel)) {
        alert("Enter valid Phone Number");
        return;
    }

    if (!emailPattern.test(ema)) {
        alert("Invalid Email format");
        return;
    }

    if (num < 1 || num > 10 || num.trim() === "") {
        alert("Please re-check person list...");
        return;
    }

    alert("Form submitted successfully!!!");

    console.log("Your name is " + name + 
                " Phone No is " + tel + 
                " Email is " + ema + 
                " and Number of person is " + num);
}

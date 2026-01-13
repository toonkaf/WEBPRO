/** File : validator.js **/

function validateForm() {    

    let fname = document.getElementById("FirstName").value;
    if (fname.length < 3 ) {
        alert("Firstname must be filled out and at least 3 characters");
        return false;
    }

    let lname = document.getElementById("LastName").value;
    if (lname.length < 2 ) {
        alert("Lastname must be filled out and at least 2 characters");
        return false;
    }

    let address = document.getElementById("Address").value;
    if (address.length < 10 ) {
        alert("Address must be filled out and at least 10 characters");
        return false;
    }

    let country = document.getElementById("Country").value; 
    if (country =="00" ) {
        alert("Country must be selected");
        return false;
    }

    alert("It's OK La");
}

/**
     - การตรวจสอบความยาวของตัวอักษร
     let str = new String( "This is string" );
     document.write("str.length is:" + str.length);
     // str.length is: 14
     - การหาตำแหน่งข้อความในชุดตัวอักษร
     let str = "Hello world, welcome to the universe.";
     let n = str.indexOf("welcome"); 
     // n = 13
*/
/* 
 * A function called whenever the radio buttons are switched
 * which changes requriements between states and provinces
 */
function subCountry() {
    // Switch which select is displayed and change its requirements
    if (document.getElementById("usa").checked){
        document.getElementById("state").style.display = 'block';
        document.getElementById("stateSelect").required = true;
        document.getElementById("province").style.display = 'none';
        document.getElementById("provSelect").required = false;
    }else{
        document.getElementById("province").style.display = 'block';
        document.getElementById("provSelect").required = true;
        document.getElementById("state").style.display = 'none';
        document.getElementById("stateSelect").requried = false;
    }
}
/*
 * A function which validates the inputs that have requirements
 * and submits the data if it is validated
 */
function validate() {
    // Whether the input has an input
    let error = false;
    // Collect the values that need to be validated
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;

    // The name must be at least three characters
    if (name.length < 3){
        error = true;
        // Show the error
        document.getElementById("nameErr").style.display = "block";
    }else{
        // Hide the error
        document.getElementById("nameErr").style.display = "none";
    }

    // Split the email up into its two main parts
    let local = email.substring(0,email.indexOf("@"));
    let domain = email.substring(email.indexOf("@")+1);
    // The size of the biggest domain
    let max = email.length - email.lastIndexOf(".") - 1;
    let subEmail = email;
    // Measure the size of each domain
    while (subEmail.includes(".")){
        subEmail = subEmail.substring(subEmail.indexOf(".")+1);
        max = Math.max(max,subEmail.indexOf("."));
    }
    // Make sure the size requirements are followed
    if (local.length > 64 || domain.length > 255 || max > 63 ||
        // A combination of any of these characters where the period doesn't start
        // or end and does not occur twice in a row
        !/^[a-zA-Z0-9!#$%'*+\-/=?^_`{|}~](\.?[a-zA-Z0-9!#$%'*+\-/=?^_`{|}~])*$/.test(local)
        // The first domain cannot be all numeric, and none can start or end with a hyphen, all dot-separated
        || !/^([a-zA-Z0-9]+\-[\-a-zA-Z0-9]*[a-zA-Z0-9]|[a-zA-Z0-9]*[a-zA-Z][a-zA-Z0-9]*)(\.[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?)*$/.test(domain)){
        error = true;
        // Show the error
        document.getElementById("emailErr").style.display = "block";
    }else{
        // Hide the error
        document.getElementById("emailErr").style.display = "none";
    }

    // XXX-XXX-XXXX
    if (/^\d{3}\-\d{3}\-\d{4}$/.test(phone)){
        // Hide the error
        document.getElementById("phoneErr").style.display = "none";
    }else{
        error = true;
        // Show the error
        document.getElementById("phoneErr").style.display = "block";
    }

    // If there's not an error, submit the data
    if (!error){
        // Collect the values that weren't collected before
        let country;
        let sub;
        if (document.getElementById("usa").checked){
            country = "US";
            sub = document.getElementById("stateSelect").value;
        }else{
            country = "Canada";
            sub = document.getElementById("provSelect").value;
        }
        let details = document.getElementById("details").value;

        // Replace the form with the results of the form
        document.getElementById("results").innerHTML
            = "<p>Thank you for submitting!</p>"
            + "<p>Name: " + name + "</p><p>Email: " + email + "</p>"
            + "<p>Phone number: " + phone.replaceAll('-','') + "</p>"
            + "<p>Location: " + sub + ", " + country + "</p>"
            + "<p>Additional details: " + details + "</p>";
        document.getElementById("form").style.display = "none";
    }
}
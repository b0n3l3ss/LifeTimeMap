//

const ageRegex = /^\d{4}$/;		// RegEx to validate Year of Birth
let cannotContinue = false;		// Flag to not let script continue if invalid 
								// information is inputed

//Buttons from HTML file
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

//Should be deleted later on as this const was only used for testing purposes
const jRootYoB = document.getElementById('tbuser');

//Should probably delete this at some point, only to print out if validation is good
const out1 = document.getElementById('output1');
const addPpl = document.getElementById('addPplInputs');
const numAddPpl = document.getElementById('sNumPeople');



//Checks the year entry is a valid year
function yearValidation(checkedInput){
	if (ageRegex.test(checkedInput.value)) {
		out1.innerHTML = "This is a valid birth year!";
	}
	else {
		cannotContinue = True;
		out1.innerHTML = "This is not a valid birth year, please try again and input a valid year of the form ####";
	}
}

//This function takes the input of the drop down menue in HTML and generates that
//many fields to add people to the life map
function generateInputsToAddPeople(numIterations) {

	addPpl.innerHTML = '';
	for(let i = numIterations; i > 0; i--) {
		addPpl.innerHTML += `<label for="${numIterations - i + 1}NameLabel">Name #${numIterations-i+1}: </label>`;
		addPpl.innerHTML += `<input type="text" id="${numIterations - i + 1}Name" name="${numIterations - i + 1}Name">`;
		addPpl.innerHTML += `<label for="${numIterations-i+1}YoBLabel">		Year of Birth #${numIterations-i+1}: </label>`;
		addPpl.innerHTML += `<input type="text" id="${numIterations - i + 1}Age" name="${numIterations - i + 1}Age"><br></br>`;
	}
}


//Event listners to run javascript functions

btn1.addEventListener('click', function() {
    yearValidation(jRootYoB);
});

//This event listner updates when the drop down menue has been updated
numAddPpl.addEventListener('change', function() {
	generateInputsToAddPeople(numAddPpl.value);
});

//EventListner to ensure that buttons were declared properly
document.addEventListener('DOMContentLoaded', function() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');

    if (btn1) {
        console.log('btn1 is defined and found in the HTML.');
    } else {
        console.log('btn1 is NOT found in the HTML.');
    }

    if (btn2) {
        console.log('btn2 is defined and found in the HTML.');
    } else {
        console.log('btn2 is NOT found in the HTML.');
    }
});


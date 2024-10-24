//

const ageRegex = /^\d{4}$/;		// RegEx to validate Year of Birth
let cannotContinue = false;		// Flag to not let script continue if invalid 
								// information is inputed
const newPeopleDict = new Map;	// Map containing the infomration of additional ppl

//Buttons from HTML file
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');

//root name and age
const jRootName = document.getElementById('rName');
const jRootYoB = document.getElementById('rAge');

//Should probably delete this at some point, only to print out if validation is good
const out1 = document.getElementById('output1');
const addPpl = document.getElementById('addPplInputs');
const numAddPpl = document.getElementById('sNumPeople');



//Checks the year entry is a valid year
function yearValidation(checkedInput){
	if (checkedInput == null) {
		cannotContinue = true;
		out1.innerHTML = "You must enter a valid birth year, please try again and input a valid year of the form ####";
	} else if (ageRegex.test(checkedInput.value)) {
		out1.innerHTML = "This is a valid birth year!";
	} else {
		cannotContinue = true;
		out1.innerHTML = "This is not a valid birth year, please try again and input a valid year of the form ####";
	}
}

//This function takes the input of the drop down menue in HTML and generates that
//many fields to add people to the life map
function generateInputsToAddPeople(numIterations) {

	addPpl.innerHTML = '';
	for(let i = 0; i < numIterations; i++) {
		addPpl.innerHTML += `<label for="${i}NameLabel">Name #${i+1}: </label>`;
		addPpl.innerHTML += `<input type="text" id="${i}Name" name="${i + 1}Name">`;
		addPpl.innerHTML += `<label for="${i}YoBLabel">		Year of Birth #${i + 1}: </label>`;
		addPpl.innerHTML += `<input type="text" id="${i}Age" name="${i + 1}Age"><br></br>`;
	}
}


//Event listners to run javascript functions

btn1.addEventListener('click', function() {
	
    yearValidation(jRootYoB);
	
	for(i = 0; i < numAddPpl.value; i++) {
		let eventName = document.getElementById(`${i}Name`);
		let eventAge = document.getElementById(`${i}Age`);
		//console.log(eventName.value);
		//console.log(eventAge.value);
		//console.log(i);
		newPeopleDict.set(i, [eventName.value, eventAge.value]);
	}
	//console.log(newPeopleDict);
	//console.log(newPeopleDict.get(0)[0]);
	//console.log(newPeopleDict.get(1)[1]);
	//console.log(newPeopleDict.get(2)[1]);
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
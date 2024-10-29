//

const ageRegex = /^\d{4}$/;		// RegEx to validate Year of Birth
let cannotContinue = false;		// Flag to not let script continue if invalid 
								// information is inputed
const newPeopleDict = new Map;	// Map containing the infomration of additional ppl
const eventDict = new Map;		// Map for containing life event information

//Buttons from HTML file
const btn1 = document.getElementById('verify1');
const btn2 = document.getElementById('verify2');

//Submit
const sub = document.getElementById('submit');

//root name and age
const jRootName = document.getElementById('rName');
const jRootYoB = document.getElementById('rAge');

//Entry box generation elements
const jYrError = document.getElementById('yrError');
const addPpl = document.getElementById('addPplInputs');
const numAddPpl = document.getElementById('sNumPeople');

const jAddEvents = document.getElementById('addEvents');
const jNumLifeEvents = document.getElementById('numLifeEvents');


//Checks the year entry is a valid year
function yearValidation(checkedInput){
	if (checkedInput == null) {
		cannotContinue = true;
		jYrError.innerHTML = "You must enter a valid birth year, please try again and input a valid year of the form ####";
	} else if (ageRegex.test(checkedInput.value)) {
		return;
	} else {
		cannotContinue = true;
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


//This function takes the input of the second drop down menue in HTML and generates that 
//many fields to add events to the life map
function generateInputsToAddEvents(numIterations) {
	jAddEvents.innerHTML = '';
	for (let i = 0; i < numIterations; ++i) {
		jAddEvents.innerHTML += `<label for="${i}EventLabel">Name #${i+1}: </label>`;
		jAddEvents.innerHTML += `<input type="text" id="${i}Event" name="${i + 1}Event">`;
		jAddEvents.innerHTML += `<label for="${i}YoELabel">		Year of Event #${i + 1}: </label>`;
		jAddEvents.innerHTML += `<input type="text" id="${i}YoE" name="${i + 1}YoE"><br></br>`;
	}
}


//Event listners to run javascript functions

btn1.addEventListener('click', function() {
	cannotContinue = false;
    yearValidation(jRootYoB);
	
	for(i = 0; i < numAddPpl.value; i++) {
		let eventName = document.getElementById(`${i}Name`);
		let eventAge = document.getElementById(`${i}Age`);
		let isValid = yearValidation(eventAge);
		newPeopleDict.set(i, [eventName.value, eventAge.value]);
	}
	for(i = 0; i < jNumLifeEvents.value; i++) {
		let eventName = document.getElementById(`${i}Event`);
		let eventAge = document.getElementById(`${i}YoE`);
		let isValid = yearValidation(eventAge);
		eventDict.set(i, [eventName.value, eventAge.value]);
	}


	//If we are allowed to continue, the submit button will allow us to generate the map
	if (!cannotContinue) {
		jYrError.innerHTML = "These are valid year entries!";
		sub.type = 'submit';
	}
	else{
		jYrError.innerHTML = "This is not a valid birth year, please try again and input a valid year of the form ####";
		sub.type = 'button';
	}
});


//This event listner updates when the drop down menue has been updated
numAddPpl.addEventListener('change', function() {
	generateInputsToAddPeople(numAddPpl.value);
});

//This event listner updates when the drop down menue has been updated
jNumLifeEvents.addEventListener('change', function() {
	generateInputsToAddEvents(jNumLifeEvents.value);
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

//new Chart(
//	type: 'line',
//	data: {
//		labels
//	}
//)
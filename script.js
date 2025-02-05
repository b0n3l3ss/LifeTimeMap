//Script for most backend work

const YoBRegEx = /^\d{4}$/;		// RegEx to validate Year of Birth
const ageRegEx = /^\d{1,2}$/;	// RegEx to validate event age
const numRegEx = /^\d{1}$/;		// RegEx to validate num of events and add people
let cannotContinue = false;		// Flag to not let script continue if invalid 
								// information is inputed
								// May not be needed


//Buttons from HTML file
const jsVerifyBtn = document.getElementById('verify1');  // The button that verifies and 

//root name and age
const jRootName = document.getElementById('rName');
const jRootYoB = document.getElementById('rAge');

//Entry box generation elements
const jYrError = document.getElementById('yrError');
const addPpl = document.getElementById('addPplInputs');		// Area to add new data entry boxes
const numAddPpl = document.getElementById('sNumPeople');	// The number of added people

const jAddEvents = document.getElementById('addEvents');
const jNumLifeEvents = document.getElementById('numLifeEvents');


//Checks the year entry is a valid year
function yearValidation(checkedInput){
	if (checkedInput == null) {
		cannotContinue = true;
		jYrError.innerHTML = "You must enter a valid birth year, please try again and input a valid year of the form ####";
		return false;
	} else if (YoBRegEx.test(checkedInput)) {
		return true;
	} else {
		cannotContinue = true;
		return false;
	}
}

//Checks the validity of age entered for life event
function ageValidation(checkInput) {
	if (checkInput == null) {
		cannotContinue = true;
		jYrError.innerHTML = "Invalid age for one of your events, must be of the form ##"
		return false;
	} else if (ageRegEx.test(checkInput.value)) {
		return true;
	} else {
		cannotContinue = true;
		return false;
	}
}

//Checks the validity of entered numbers for num events and num add people
function numValidation(checkInput) {
	if (checkInput == null) {
		cannotContinue = true;
		console.log("The input for one either the number of additional people or number of events is null");
		return false;
	} else if (numRegEx.test(checkInput)) {
		return true;
	} else {
		console.log("The number for the additional people or the number of events is null");
		cannotContinue = true;
		return false;
	}
}

//This function takes the input of the drop down menue in HTML and generates that
//many fields to add people to the life map
function generateInputsToAddPeople(numIterations) {

	addPpl.innerHTML = '';
	for(let i = 0; i < numIterations; i++) {
		addPpl.innerHTML += `<label for="${i}Name">Name #${i+1}: </label>`;
		addPpl.innerHTML += `<input type="text" id="${i}Name" name="${i + 1}Name">`;
		addPpl.innerHTML += `<label for="${i}Age">		Year of Birth #${i + 1}: </label>`;
		addPpl.innerHTML += `<input type="text" id="${i}Age" name="${i + 1}Age"><br></br>`;
	}
}


//This function takes the input of the second drop down menue in HTML and generates that 
//many fields to add events to the life map
function generateInputsToAddEvents(numIterations) {
	jAddEvents.innerHTML = '';
	for (let i = 0; i < numIterations; ++i) {
		jAddEvents.innerHTML += `<label for="${i}Event">Event #${i+1}: </label>`;
		jAddEvents.innerHTML += `<input type="text" id="${i}Event" name="${i + 1}Event">`;
		jAddEvents.innerHTML += `<label for="${i}YoE">		Your Age at Event #${i + 1}: </label>`;
		jAddEvents.innerHTML += `<input type="text" id="${i}YoE" name="${i + 1}YoE"><br></br>`;
	}
}


//This event listner updates when the drop down menue has been updated
numAddPpl.addEventListener('change', function() {
	generateInputsToAddPeople(numAddPpl.value);
});


//This event listner updates when the drop down menue has been updated
jNumLifeEvents.addEventListener('change', function() {
	generateInputsToAddEvents(jNumLifeEvents.value);
});


//Event listener to navigate from each page
document.addEventListener('DOMContentLoaded', function() {

	var DELIMITER = ',';
	var NEWLINE = '\n';
	var inputFile = document.getElementById('fileInput');
	var table = document.getElementById('table');

	if (!inputFile) {
		console.log("input file is null");
		return;
	}

	inputFile.addEventListener('change', function() {
		if (!!fileInput.files && fileInput.files.length > 0) {
			parseCSV(fileInput.files[0]);
		}
	});

		function parseCSV(file) {
		if (!file || !FileReader){
			console.log("file or FileReader not found");
			return;
		}

		var reader = new FileReader();

		reader.onload = function(e) {
			toTable(e.target.result);
		};

			reader.readAsText(file);
	}

	function toTable(text) {
		if (!text || !table) {
			console.log("Either text or table is not defined.");
			return;
		}

		while(!!table.lastElementChild) {
			table.removeChild(table.lastElementChild);
		}
			
		var rows = text.split(NEWLINE);
		var headers = rows.shift().trim().split(DELIMITER);
		var htr = document.createElement('tr');
		let numbers = rows[0].split(DELIMITER);
		
		//This block of code gives us the number of add people and life events
		let nAddPpl = Number(numbers[0]);
		let nEvents = Number(numbers[1]);
		
		// If both numbers are valid, push them to the right boxes
		if(numValidation(nAddPpl) && numValidation(nEvents)) {
			numAddPpl.value = nAddPpl;
			generateInputsToAddPeople(numAddPpl.value);
			jNumLifeEvents.value = nEvents;
			generateInputsToAddEvents(jNumLifeEvents.value);
			
			//Inputs data values into the generated boxes above
			for (let i = 2; i < 2 + nAddPpl; i++) { // Additional People
				let data = rows[i].split(DELIMITER);
				
				document.getElementById(`${i - 2}Name`).value = data[0]; //Sets Name
				document.getElementById(`${i - 2}Age`).value = Number(data[1]); //Sets Year of Birth
			}
			for (let i = 2 + nAddPpl; i < 2 + nAddPpl + nEvents; i++) { // Life Events
				let data = rows[i].split(DELIMITER);
				document.getElementById(`${i - 2 - nAddPpl}Event`).value = data[0];
				document.getElementById(`${i - 2 - nAddPpl}YoE`).value = Number(data[1]);
			}
		}
		
		//This block of code retrieves the root name and Year of Birth
		let root = rows[1].split(DELIMITER);
		let rName = root[0];
		let rYoB = Number(root[1]);
		
		if (yearValidation(rYoB)){
			jRootName.value = rName;
			jRootYoB.value = rYoB;
		}
	}
});

//Script for most 


const YoBRegEx = /^\d{4}$/;		// RegEx to validate Year of Birth
const ageRegEx = /^\d{2}$/;		//RegEx to validate event age
let cannotContinue = false;		// Flag to not let script continue if invalid 
								// information is inputed
const newPeopleDict = new Map;	// Map containing the infomration of additional ppl
const eventDict = new Map;		// Map for containing life event information

//Buttons from HTML file
const jsVerifyBtn = document.getElementById('verify1');
//const btn2 = document.getElementById('verify2');

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
		return false;
	} else if (YoBRegEx.test(checkedInput.value)) {
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
		jAddEvents.innerHTML += `<label for="${i}YoE">		Age #${i + 1}: </label>`;
		jAddEvents.innerHTML += `<input type="text" id="${i}YoE" name="${i + 1}YoE"><br></br>`;
	}
}


//Event listners to run javascript functions for index.html
if (window.location.pathname.endsWith('/')) {

	jsVerifyBtn.addEventListener('click', function() {
		cannotContinue = false;
		if (yearValidation(jRootYoB)) {
			localStorage.setItem("rootName", jRootName.value);
			localStorage.setItem("rootYoB", jRootYoB.value);
		}

		//Check to see if validation is running correctly
		console.log(`The root birth year is valid if 0, otherwise is 1: ${cannotContinue}`);

		//Store number of people into local storage
		localStorage.setItem("numPeople", numAddPpl.value);

		//Verify and add additional people information into local storage
		for(i = 0; i < numAddPpl.value; i++) {
			let eventName = document.getElementById(`${i}Name`);
			let eventAge = document.getElementById(`${i}Age`);

			//If the year is valid, then store data in local storage
			if (yearValidation(eventAge)) {
				localStorage.setItem(`${i}Name`, eventName.value);
				localStorage.setItem(`${i}Age`, eventAge.value);

			}
			newPeopleDict.set(i, [eventName.value, eventAge.value]);

			//This console log tells us if our additional birth years are valid
			console.log(`Birth year of person #${i} is: ${cannotContinue}`);
		}

		//Store number of life events in local storage
		localStorage.setItem("numLifeEvents", jNumLifeEvents.value);

		//Verify and store life event data into local storage
		for(i = 0; i < jNumLifeEvents.value; i++) {
			let eventName = document.getElementById(`${i}Event`);
			let eventAge = document.getElementById(`${i}YoE`);
		
			//If the year is valid, then store data in local storage
			if (ageValidation(eventAge)) {
				localStorage.setItem(`${i}eventName`, eventName.value);
				localStorage.setItem(`${i}eventAge`, eventAge.value);
			}
			eventDict.set(i, [eventName.value, eventAge.value]);

			//This console log tells us if our event years are valid
			console.log(`Event year #${i} is: ${cannotContinue}`);
		}


		//If we are allowed to continue, the submit button will allow us to generate the map
		if (!cannotContinue) {
			jYrError.innerHTML = "These are valid year entries!";
			sub.type = 'button';
		}
		else{
			jYrError.innerHTML = "This is not a valid birth year, please try again and input a valid year of the form ####";
			localStorage.clear;
			sub.type = 'submit';
		}
		console.log(sub.type);  // Right now, we are getting that the type of input is not a button, but submit (which is wrong)
	});

	//This event listner updates when the drop down menue has been updated
	numAddPpl.addEventListener('change', function() {
		generateInputsToAddPeople(numAddPpl.value);
	});

	//This event listner updates when the drop down menue has been updated
	jNumLifeEvents.addEventListener('change', function() {
		generateInputsToAddEvents(jNumLifeEvents.value);
	});
}

//Event listener to navigate from each page
document.addEventListener('DOMContentLoaded', function() {

	//Checking which html file we are on
	if (window.location.pathname.endsWith('/')){
		console.log('We are in index.html');
		sub.addEventListener('click', function () {
			navigate('index1.html');
		});



		console.log('This beginning function was run');
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
				console.log('The event listner was triggered and the csv is going to be parsed.');
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
			if (!text || !table)
				return;

			while(!!table.lastElementChild) {
				table.removeChild(table.lastElementChild);
			}
			
			var rows = text.split(NEWLINE);
			var headers = rows.shift().trim().split(DELIMITER);
			var htr = document.createElement('tr');

			headers.forEach(function (h) {
				var th = document.createElement('th');
				var ht = h.trim();

				if (!ht) {
					return;
				}
				th.textContent = ht;
				htr.appendChild(th)
			});

			table.appendChild(htr);

			var rtr;

			rows.forEach(function(r) {
				r = r.trim();

				if (!r)
					return;

				var cols = r.split(DELIMITER);

				if (cols.length === 0)
					return;
				
				rtr = document.createElement('tr');
				
				cols.forEach(function (c) {
					var td = document.createElement('td');
					var tc = c.trim();

					td.textContent = tc;
					rtr.appendChild(td);
				});

				table.appendChild(rtr);

			});
		}
	}
	else if (window.location.pathname.endsWith('index1.html')){
		console.log('We are in index1.hmtl');
		const returnButton = document.getElementById('returnHome');
		returnButton.addEventListener('click', function() {
			navigate('/');
		});
	}
	else {
		console.log('we are in neither index.html or in index1.html');
		console.log(window.location.pathname);
	}

	function navigate(target) {
		window.location.href = `${target}`;
		console.log('Navigation function is called');
	}

});
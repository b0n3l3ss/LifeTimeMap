//

const ageRegex = /^\d{4}$/;		// RegEx to validate Year of Birth
let cannotContinue = false;		// Flag to not let script continue if invalid 
								// information is inputed


const btn1 = document.getElementById('btn1');
const txt1 = document.getElementById('tbuser');
const out1 = document.getElementById('output1');
const addPpl = document.getElementById('addPplInputs');
const btn2 = document.getElementById('btn2');
const numAddPpl = document.getElementById('sNumPeople');

function fun1(){
	out1.innerHTML = txt1.value
}

function yearValidation(checkedInput){
	if (ageRegex.test(checkedInput.value)) {
		out1.innerHTML = "This is a valid birth year!";
	}
	else {
		cannotContinue = True;
		out1.innerHTML = "This is not a valid birth year, please try again and input a valid year of the form ####";
	}
}

function generateInputsToAddPeople(numIterations) {

	addPpl.innerHTML = '';
	for(let i = numIterations; i > 0; i--) {
		addPpl.innerHTML += '<label for="rootName">Name:</label>';
		addPpl.innerHTML += '<input type="text" id="rname" name="rname"><br><br>';
		addPpl.innerHTML += '<label for="rootYoB">Year of Birth:</label>';
		addPpl.innerHTML += '<input type="text" id="rage" name="rage"><br><br>';
	}
}

btn2.addEventListener('click', function() {
	generateInputsToAddPeople(numAddPpl.value);
});

btn1.addEventListener('click', function() {
    yearValidation(txt1);
});

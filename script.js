//

const ageRegex = /\d{4}/


const btn1 = document.getElementById('btn1');
const txt1 = document.getElementById('tbuser');
const out1 = document.getElementById('output1');
const output = document.querySelector("#output")
function fun1(){
	out1.innerHTML = txt1.value
}

function foo(checkedInput){
	const ok = ageRegex.exec(checkedInput.value)

	output.textContent = ok
		? 'This is a valid birth year ${ok[0]}'
		: 'The birth year entered is not valid!'
}

btn1.addEventListener('click', fun1);
bt1.addEventListener('click', foo)


//let d = new Date();
//document.body.innerHTML = "<p>Today's date is " + d + "</p>"

//function show() {
//	let d = new Date();
//	document.body.innerHTML = "<p>Today's date is " + d + "</p>"
//}


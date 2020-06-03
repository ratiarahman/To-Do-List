var date = document.getElementById("date");
var button = document.getElementById("add");
var button2 = document.getElementById("clear")
var input = document.getElementById("input");
var ul = document.querySelector("ul");
var li = document.querySelectorAll("li");
var itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

var options = { weekday:'long', month:'short', day:'numeric'};
var today = new Date();
date.innerHTML = today.toLocaleDateString("en-US", options);

function inputLength(){
	return input.value.length;
}

function createDeleteButton(){
	for (var i = 0; i < li.length; i++) {
		var butt =  document.createElement("i");
		butt.classList.add("fa","fa-trash");
		li[i].appendChild(butt);
	}
	
}

function deleteButton(e){
	var trash = document.querySelectorAll("i");
    for(var i = 0; i < trash.length; i++){
		trash[i].addEventListener("click", removeParent, false);
	}
}

function removeParent(evt) {
  // evt.target.removeEventListener("click", removeParent, false);
  evt.target.parentNode.remove();
}


function createList(text){
	var li = document.createElement("li");
	li.textContent = text;
	
	var butt =  document.createElement("i");
	butt.classList.add("fa","fa-trash");

	ul.appendChild(li);
	li.appendChild(butt);

	deleteButton();
	// butt.addEventListener("click", function(){
	// 	// localStorage.removeItem("text");
	// 	li.remove();
		
	// });

	// li.addEventListener("click", function(){
	// 	li.classList.toggle("done");
	// })

}



function createElement(){
		itemsArray.push(input.value);
		localStorage.setItem("items", JSON.stringify(itemsArray));
		// li.appendChild(document.createTextNode(input.value));
		createList(input.value);
		input.value = "";
		
}



console.log(itemsArray);


function click(){
	if (inputLength() > 0) {
		createElement();
	}
}

function keypress(e){
	if (inputLength() > 0 && e.keyCode === 13) { //key.which wil also work
		createElement();
	}
}

function done(e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("done");
    }
}

function clear(){
	// ul.remove();
	ul.innerHTML = "";
	localStorage.clear();
	// localStorage.reload();
	// while (ul.firstChild) {
 	// 	 ul.removeChild(ul.firstChild);
 	// }
 	// itemsArray = [];
}

localStorage.setItem("items", JSON.stringify(itemsArray));
var data = JSON.parse(localStorage.getItem("items"));

data.forEach(item => {
	createList(item);
	deleteButton(item);
})

ul.addEventListener("click", done);

button2.addEventListener("click", clear);

button.addEventListener("click", click);

input.addEventListener("keypress", keypress);


createDeleteButton();
deleteButton();







// var list = document.getElementsByTagName("li")[0];

// button.addEventListener("click", function(){
// 	list.style.textDecoration = "line-through";
// })
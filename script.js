var date = document.getElementsByClassName("date");
var button = document.getElementById("add");
var button2 = document.getElementById("clear")
var input = document.getElementById("input");
var ul = document.querySelector("ul");
var li = document.querySelectorAll("li");
var STORE, id;
// var itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];


//DATE
var serial = { weekday:'long', month:'short', day:'numeric'};
var today = new Date();
date[0].innerHTML = today.toLocaleDateString("en-US", serial);
// for(var i =0;i<date.length;i++){
// date[i].innerHTML = today.toLocaleDateString("en-US", serial);
// }

// var d = date[1].innerHTML = today.toLocaleDateString("en-US", serial);

//STORE DATA
var data = localStorage.getItem("TODO");



if(data){

	STORE = JSON.parse(data);
	id = STORE.length;
	load(STORE);

}else{

	STORE = [];
	id = 0;
}

//DATA TO SHOW
function load(array){
	array.forEach(item =>{
		createList(item.name, item.id, item.bin,item.date);
	});
}


function inputLength(){
	return input.value.length;
}

// function createDeleteButton(){
// 	for (var i = 0; i < li.length; i++) {
// 		var butt =  document.createElement("i");
// 		butt.classList.add("fa","fa-trash");
// 		li[i].appendChild(butt);
// 	}
	
// }

//DELETE
// function deleteButton(e){
// 	var trash = document.querySelectorAll("i");
//     for(var i = 0; i < trash.length; i++){
// 		trash[i].addEventListener("click", removeParent, false);
// 	}
	

// }

function removeParent(evt) {
	evt.parentNode.parentNode.removeChild(evt.parentNode);
  	// evt.target.parentNode.remove();
	STORE[evt.id].bin = true;
}

ul.addEventListener("click", function(event){
		let element = event.target;
		let elementJob = element.attributes.job.value;

		if(elementJob == "delete"){
			removeParent(element);
		}

		localStorage.setItem("TODO", JSON.stringify(STORE));
});

//CREATELIST
function createList(text,id,bin){
	if (bin) {
		return;
	}
	date[1].innerHTML = today.toLocaleDateString("en-US", serial);
	// <li class = "active-list">${date}</li>
	let item = `	
					<li>
						<p>${text}</p>
						<i class="fa fa-trash" job="delete" id="${id}"></i>
					</li>
				
				`;

	let position = "beforeend";
	ul.insertAdjacentHTML(position, item);

	// var li = document.createElement("li");
	// li.textContent = text;
	
	// var butt =  document.createElement("i");
	// butt.classList.add("fa","fa-trash");

	// ul.appendChild(li);
	// li.appendChild(butt);

	// deleteButton();
	// butt.addEventListener("click", function(){
	// 	// localStorage.removeItem("text");
	// 	li.remove();
		
	// });

	// li.addEventListener("click", function(){
	// 	li.classList.toggle("done");
	// })

}

// createList("haha", 1, true);


function createElement(){
		var text = input.value;
		
		
		createList(text,id,false);
		STORE.push(
			{
				name:text,
				id: id,
				bin: false,
			}
		);

		localStorage.setItem("TODO", JSON.stringify(STORE));
		id++;
		input.value = "";
		
}


//DATA TO SHOW
// data.forEach(item => {
// 	createList(item);
// 	deleteButton(item);
// })

// console.log(itemsArray);


function click(){
	if (inputLength() > 0 && input.value.trim() != "") {
		createElement();
	}
}

function keypress(e){
	if (inputLength() > 0 && input.value.trim() != "" && e.keyCode === 13) { //key.which wil also work
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
	date[1].innerHTML = "";
	// while (ul.firstChild) {
 // 		 ul.removeChild(ul.firstChild);
 // 	}
	localStorage.clear();
	// localStorage.reload();	
}





ul.addEventListener("click", done);

button2.addEventListener("click", clear);

button.addEventListener("click", click);

input.addEventListener("keypress", keypress);


// createDeleteButton();
// deleteButton();







// var list = document.getElementsByTagName("li")[0];

// button.addEventListener("click", function(){
// 	list.style.textDecoration = "line-through";
// })
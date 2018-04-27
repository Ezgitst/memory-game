 /*
for calculating the elapsed time
https://www.codingforums.com/javascript-programming/159873-displaying-elapsed-time.html

for the time intervals (how to set and clear them)
https://www.w3schools.com/jsref/met_win_clearinterval.asp

js modal that will be used the end of the game
https://www.w3schools.com/howto/howto_css_modals.asp
https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
 */


// Get the modal
// for the modal that will be displayed at the end of the game
let modal_div = document.getElementById('ending-modal');
let modal_content_div = modal_div.childNodes[3];
let close_modal = modal_content_div.childNodes[3];
let write_modal = modal_content_div.childNodes[5];


let	star = document.getElementsByClassName('fa fa-star');

let	final_star = document.getElementsByClassName('fa fa-star');


let class_old;
let class_new;

let start_index = 0;


let open_card_count = 0;


//to hide the modal 
close_modal.onclick = function(){

	modal_div.style.display = "none";
}

window.onclick = function(event){

	if(event.target == modal_div){
		modal_div.style.display = "none";
	}
}



let cards = Array.from(document.getElementsByClassName("card"));
let shuffle_cards = [];


let card_id = new Array();
let card_class = new Array();
let card_state = Array(16).fill(0);


let game_state = 0;


let ratio = 0;
let correct_move_count = 0;


let new_array = [];



document.body.onload = startPlaying(cards);


document.getElementById("time").innerHTML = "O mins 0 secs";


/*reset the star visibility to initial value*/
function resetStarVisibility(){
	document.getElementsByClassName('fa fa-star')[0].style.visibility = "visible";
	document.getElementsByClassName('fa fa-star')[1].style.visibility = "visible";
	document.getElementsByClassName('fa fa-star')[2].style.visibility = "visible";
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	/*
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

        console.log(randomIndex);

    }
	*/


	//console.log("array");

	for(let i=0; i<array.length; i++){

		new_array[i] = array[i];
		
	}

    return array;
}



//finds the number of correct selections
function correctMoveCount(cstate){

	let counter = 0;

	for(let i=0; i<cstate.length; i++){
		if(cstate[i] == 1){
			counter++;
		}
		else{
			//do nothing
		}
	}

	return counter / 2;
}



//start playing the game
function startPlaying(cards) {


	//INITALIZE THE GAME

	//reset the move count
	document.getElementsByClassName('moves')[0].innerText = 0;

	cards = Array.from(document.getElementsByClassName("card"));


	let order_cards = Array.from(document.getElementsByClassName("card"));


	//shuffle the cards
	shuffle_cards = shuffle(order_cards);  


	let my_array = [];


	//shuffle the cards inside this for loop
	/*
	move one right, if it is last element on the array then move to the first index 
	change the order of th cards
	*/
	for(let b=0; b<order_cards.length; b++){
		if(b === 0){
			new_array[0] = order_cards[15];
			my_array[0] = new_array[0].childNodes[1].classList[1];
		}
		else{
			new_array[b] = order_cards[b-1];
			my_array[b] = new_array[b].childNodes[1].classList[1];
		}
		
	}

	for (let i = 0; i < cards.length; i++){

		if(i === 0){
			class_old = cards[i].childNodes[1].classList[1];
			class_new = my_array[i];
		}
		else{
			class_old = cards[i].childNodes[1].classList[1];
			class_new = my_array[i];
		}


		if(class_old.localeCompare(class_new) == 0){
			//if the old class and new class are same then do nothing and remain the classes as it was
		}
		else{
			cards[i].childNodes[1].classList.add(class_new);
			cards[i].childNodes[1].classList.remove(class_old);
		}


    }


	//reset the values in the cards
    card_id = [];
    card_class = [];
	card_state.fill(0);


    // remove all exisiting classes from each card
    for (let i = 0; i<cards.length; i++){
        cards[i].classList.remove("show", "open", "match");
    }


}


/*function for increasing the move count
the value of the move count will be increased with every new card opening*/
function incrementMoveCount(){

	let move_element = document.getElementsByClassName('moves')[0];
	let old_move_count = move_element.textContent;

	/*
	if(parseInt(old_move_count) == 0){
		elapsedTime();
	}
	*/

	let new_move_count = parseInt(old_move_count) + 1;
	move_element.innerText = String(new_move_count);


	correct_move_count = correctMoveCount(card_state);
	ratio = ((correct_move_count * 100) / (new_move_count));


	if(ratio <= 33){
		star[0].style.visibility = "visible";
		star[1].style.visibility = "hidden";
		star[2].style.visibility = "hidden";
	}
	else if((ratio > 33) && (ratio <= 67)){
		star[0].style.visibility = "visible";
		star[1].style.visibility = "visible";
		star[2].style.visibility = "hidden";
	}
	else{
		star[0].style.visibility = "visible";
		star[1].style.visibility = "visible";
		star[2].style.visibility = "visible";
	}
}



document.getElementsByClassName("play-again-button")[0].onclick = function(){
	start_index = 0;
	resetStarVisibility();
	window.location.reload();
};


function gameState(){

	/*compare the number of state 1s with the total number of cards
	if they are equal to each other then it means that the game has finished*/

	let counter = 0;

	for(let i=0; i<card_state.length; i++){
		if(card_state[i] == 1){
			counter++;
		}
		else{
			//do nothing
		}
	}

	//1 indicates the end of the game
	if(counter == 16){
		return 1;
	}
	else{
		return 0;
	}
}


//call this function when the two cards are matched
function matchCards(card_list, cclass, cid) {

	/*change the class of the cards.
	remove the "open" class and add "match" class*/

	card_state[cid[0]] = 1;
	card_state[cid[1]] = 1;	



	setTimeout(function() {
  	//code to be executed after 500 miliseconds

		card_list[cid[0]].classList.remove("open");
		card_list[cid[1]].classList.remove("open");

		card_list[cid[0]].classList.add("match");
		card_list[cid[1]].classList.add("match");


	}, 500);
	//500


	setTimeout(function() {
  	//code to be executed after 500 miliseconds
	
  		card_list[cid[0]].classList.remove("correct");
		card_list[cid[1]].classList.remove("correct");


		cid.pop();
		cid.pop();

		card_class.pop();
		card_class.pop();

	}, 750);
	//1000

	open_card_count = 0;

	//at the end of the function check the state of the cards and decide whether to continue or end the game
	return gameState();
}


//close the unmatched cards
function closeCards(card_list, cclass, cid){

	/*remove the "show" and "open" classes*/

	card_state[cid[0]] = 0;
	card_state[cid[1]] = 0;	

	setTimeout(function() {
  	//code to be executed after 500 miliseconds
		card_list[cid[0]].classList.remove("show", "open");
		card_list[cid[1]].classList.remove("show", "open");

	}, 500);
	//500


	setTimeout(function() {
  	//code to be executed after 500 miliseconds
	
  		card_list[cid[0]].classList.remove("wrong");
		card_list[cid[1]].classList.remove("wrong");


		cid.pop();
		cid.pop();

		card_class.pop();
		card_class.pop();

	}, 750);
	//1000

	open_card_count = 0;

	return 0;

}

//call this function for comparing the two cards and decide whether to match or close them
function compareCards(card_list, cclass, cid){


	incrementMoveCount();

	//compare the two latest opened cards.

	
	if(cclass[0].localeCompare(cclass[1]) == 0){
		card_list[cid[0]].classList.add("correct");
		card_list[cid[1]].classList.add("correct");
		return matchCards(card_list, cclass, cid);
	}
	else{
		card_list[cid[0]].classList.add("wrong");
		card_list[cid[1]].classList.add("wrong");
		return closeCards(card_list, cclass, cid);
	}

}

function openCard(card_list, index) {

	//still processing the previous cards do nothing
	if(open_card_count === 2){
		console.log("STILL PROCESSING THE PREVIOUS COMPARISON, WAIT THE COMPARISON RESULT TO MOVE ON WITH THE NEXT SELECTION");
		//do nothing
	}

	else{

		open_card_count++;

		let card = card_list[index];

		if(parseInt(start_index) == 0){
			elapsedTime();
			start_index++;
		}


		card.classList.add("open", "show");

		card_state[index] = 1;
		card_class.push(card.childNodes[1].classList[1]);
		card_id.push(index);

		if(card_class.length == 2){
			return compareCards(card_list, card_class, card_id);
		}
	}


}


//main function that controls everything
function letsgo(card_list, index){

	return openCard(card_list, index);

}


let hour = 0;
let minute = 0;
let second = 0;

let total_seconds = 0;

let intermediate = 0;

let interval;


/*calculate the elapsed time*/
function elapsedTime(){

	interval = setInterval(function(){

		document.getElementById("time").innerHTML = minute + " mins " + second + " secs";
		total_seconds++;

		hour = Math.floor(total_seconds / 3600);
		intermediate = total_seconds % 3600;
		minute = Math.floor(intermediate / 60);
		second = intermediate % 60;

	}, 1000);

}


function starCount(){

	let start_count = 0;

	for(let i=0; i<3; i++){
		if(final_star[i].getAttribute("style").localeCompare("visibility: visible;") == 0){
			start_count++;
		}
	}

	return start_count;
}


document.getElementsByClassName('restart')[0].addEventListener('click', function(){

	start_index = 0;

	resetStarVisibility();
	startPlaying(cards);


	second = 0;
	minute = 0;
	hour = 0;

	total_seconds = 0;

	document.getElementById("time").innerHTML = "O mins 0 secs";
	clearInterval(interval);
	
});


//creating an event listener to open the cards when they are clicked
for(let i=0; i<cards.length; i++){
	//console.log(cards[i]);
	cards[i].addEventListener('click', function(){

		game_state = letsgo(cards, i);

		//end of the game
		if(game_state == 1){
			i = cards.length;

			clearInterval(interval)

			setTimeout(function() {
  				//code to be executed after 500 miliseconds

  				write_modal.innerHTML = "<br>Total game duration is "+ document.getElementById("time").textContent + "<br><br>";

  				let scount = starCount();

  				let node = document.createElement("P");
  				node.style.color = "#804000";
  				let textnode;

  				if(scount == 1){
  					textnode = document.createTextNode("Based on your star rating, your performance during the game is FAIR and your 'Star Rating' is 1."); 	
  				}
  				else if(scount == 2){
  					textnode = document.createTextNode("Based on your star rating, your performance during the game is GOOD and your 'Star Rating' is 2."); 	 	
  				}
  				else{
  					textnode = document.createTextNode("Based on your star rating, your performance during the game is EXCELLENT and your 'Star Rating' is 3."); 	
  				}       
				
				node.appendChild(textnode);                              
				write_modal.appendChild(node); 

				write_modal.appendChild(document.createElement("BR"));
				write_modal.appendChild(document.createElement("BR"));

				modal_div.style.display = "block";

			}, 2000);
		}
		else{
			//do nothing and continue
		}

	});
}





$.material.init();

//jquery init
$(document).ready(function() {

	console.log("it worked!");

//JSON call
	var cityOfIdeas;
	$.getJSON('./js/ideas.json', function(data) {
		cityOfIdeas = data.ideas;
		console.log(cityOfIdeas);
	});

//templates

	var postIdea = function(idea, ideaDescription, category) {
		$('ul#' + category).prepend(
			`<li class='postIt container jumbotron'>
				<h3>${idea}</h3>
				<p>${ideaDescription}</p>
				<span>idea tag 1</span>
				<span>Upvote</span> <span>Downvote</span> <span># of votes</span>
				<div class="defaultAvatar img-circle" style=""></div>
				<div style="display:none;">name</div>
				</li>`
			);
	};

//functions
	var myForm = {};
	$("#submitIdea").click(function() {
		myForm = {
			"idea": $("#input-idea-input").val(),
			"ideaDescription": $("#input-idea-description").val(),
			"category": $("#input-idea-category").val().toLowerCase()
		}
		postIdea(myForm.idea, myForm.ideaDescription, myForm.category);

		console.log(myForm, "success");
	});


//page initialization
	//populate JSON data

});
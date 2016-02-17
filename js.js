


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

//submitting an idea
	var myForm = {};
	$("#submitIdea").click(function() {
		myForm = {
			"idea": $("#input-idea-input").val(),
			"ideaDescription": $("#input-idea-description").val(),
			"category": $("#input-idea-category").val().toLowerCase()
		}
		postIdea(myForm.idea, myForm.ideaDescription, myForm.category);
		fs.writeFile("./js/idea.json", JSON.stringify(myForm), "utf8");
		cityOfIdeas[cityOfIdeas.length] = myForm;

		console.log(myForm, "success");
		//reset the form
		$(this).closest('form').find('input[type=text], textarea').val('');
		console.log('form reset');
		//close the submit field
		$('#add-my-idea').collapse('hide');
		console.log('idea field collapsed');

	});


//page initialization
	//populate JSON data




//forms
	//clear form


});
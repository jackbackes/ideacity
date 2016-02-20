


$.material.init();

//jquery calls
$(document).ready(function() {

		console.log("jQuery up and running on js.js");

	//JSON call
		var cityOfIdeas;
		$.getJSON('./private/ideas.json', function(data) {
			cityOfIdeas = data.ideas;
			console.log('printing JSON:');
			console.log(cityOfIdeas);
			console.log(cityOfIdeas.length);
			populateIdeas(cityOfIdeas);
		});


	//submitting an idea
		var myForm = {};
		$("#sendIdea").click(function(){
			submitIdea('./private/ideas.json','#ideaForm');
		});

});
//jquery closed

//defining functions

	//get all the ideas
	var populateIdeas = function(data) {
		var entries = data.length;
		for(var i = 0; i<entries; i++){
			thisIdea = data[i];
			postIdea(thisIdea.idea,thisIdea.ideaDescription,thisIdea.category, thisIdea.contributor);
		};
		console.log('done writing ideas');
	};

	//templates

	//adds post it to home page
	var postIdea = function(idea, ideaDescription, category, contributor) {
		$('ul#' + category).prepend(
			`<li class='postIt container jumbotron'>
				<h3>${idea}</h3>
				<div class="postItDescription"><p>${ideaDescription}</p></div>
				<span>${contributor}</span>
				`/*<span>idea tag 1</span>
				<span>Upvote</span> <span>Downvote</span> <span># of votes</span>
				<div class="defaultAvatar img-circle" style=""></div>
				<div style="display:none;">name</div>*/ +
				`</li>`
			);
	};

	var postIts = function(category, color) {
		`<ul class="postIts jumbotron ${color}" id="${category}">
		</ul>`
	}

	//calculate width of category box

	//sending idea to server
	var myJSON = function(id) {
		console.log('getting JSON from ' + id);
		try{console.log(JSON.stringify($(id)));}
		catch(err){
			var formJSON = {
				"idea": $("#input-idea-input").val(),
				"ideaDescription": $("#input-idea-description").val(),
				"category": $("#input-idea-category").val().toLowerCase(),
				"contributor": "userName".toLowerCase()
			}
			return JSON.stringify(formJSON);
		}
		return JSON.stringify($(id).serializeObject());
	};
		/*{				
			"idea": "lorem ipsum lorem ipsum",
			"ideaDescription": "lorem ipsum lorem ipsum",
			"ideaTags": [
				{
					"key": "tag 1"
				},
				{
					"key": "tag 2"
				}
			],
			"category": "educated",
			"contributor": "userName"
		};*/




	var requestIdea = function(ideaMethod, ideaData, ideaPath, id) {
		try{
			console.log('trying XML request: '+ideaMethod+','+ideaData+','+ideaPath+','+id);
			//create next XML Request
			var xhttp = new XMLHttpRequest();
			//open XML Request using specified method. synchronous.
			xhttp.open(ideaMethod,ideaPath,true);
			//set request header to JSON content type
			xhttp.setRequestHeader("Content-Type", "application/json");
			if(id === undefined || typeof ideaData === 'object'){
				var JSONdata = JSON.stringify(ideaData);				
			} else {
				var JSONdata = ideaData;
			}

			console.log('XML ' + ideaMethod + ' request opened.');
			console.log('Sending ' + JSONdata);

			//print the ready state (should be 4)
			console.log('readyState: ' +xhttp.readyState);
			xhttp.onReadyStateChange = function () {
				console.log('xhttp readyState has changed. Now ' + xhttp.readyState + '\n Status is ' + xhttp.status);
				if (xhttp.readyState == 4) {
					console.log('XML connection worked!');
					try{
						console.log(JSON.parse(xhttp.responseText));
						console.log('JSON Printed');
					}
					catch(err){
						console.log('Problem with JSON parse')
					};

				};
			};

	        xhttp.onreadystatechange = function() {
	            console.log('onreadystatechange');
	            if (xhttp.readyState == 4 && xhttp.status == 200) {
	                alert(xhttp.responseText);
	            }
	            else {
	                console.log('readyState=' + xhttp.readyState + ', status: ' + xhttp.status);
	            }
	        }

			xhttp.send(JSONdata);

		}
		catch(err) {
			console.log("whoops, it didn't work...")
		};
	};

	//submit an idea. needs the JSON path and the form ID
	var submitIdea = function(ideaPath, id) {
		console.log('submitting idea: '+ideaPath+','+id);
		myForm = {
			"idea": $("#input-idea-input").val(),
			"ideaDescription": $("#input-idea-description").val(),
			"category": $("#input-idea-category").val().toLowerCase()
		};
		//post the idea to page
		postIdea(myForm.idea, myForm.ideaDescription, myForm.category);
		//update cityOfIdeas JSON object
		//cityOfIdeas[cityOfIdeas.length] = myForm;
		//ideaData is now the JSON that matches the ID
		var ideaData = myJSON(id);
		console.log(id);
		console.log(myJSON(id));
		console.log(ideaData);
		console.log(myForm, "success");
		//reset the form by finding input fields associated with the form
		$(id).find('input[type=text], textarea').val('');
		console.log('form has been reset');
		//collapse the submit field
		$('#add-my-idea').collapse('hide');
		console.log('idea field collapsed');
		//send idea to server
		requestIdea('POST', ideaData, ideaPath, id);
	};



//forms
	//clear form


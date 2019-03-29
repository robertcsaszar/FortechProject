// When document obj is available //
document.addEventListener("DOMContentLoaded", onHtmlLoaded);

function onHtmlLoaded() {

	
	// Define Global Variables
	var currentIssueId;
	
	// Identify the overview element in DOM and add event listener on click with projectOverview function
	var overview = document.getElementById('overview').addEventListener("click", projectOverview);
	
	// Create the Project Overview function
	function projectOverview() {
		
		//////////////////////////////////////////////////
		//                Project Overview              //
		//////////////////////////////////////////////////
	  
	  // Hide few elements
	  document.getElementById("add-issue").style.display = "none";
	  document.getElementById("create-sprint").style.display = "none";
	  
	  // Indentify the Main Container in DOM	  
	  var mainContainer = document.getElementsByClassName("main")[0];
	  var overview = document.getElementById("overview");
	  
	  // Display the project info
	  // Project ID and Sprints
	  overview.innerHTML = "Current project #" + project.id + " with " + project.sprints.length + " sprint(s)";

	  // After we displayed the info about the project, we must be sure the main div is clean
	  // For this job we need an IF statement
	  // First identify the DOM elements
	  var clearOverview = document.getElementsByClassName("cleanOverview")[0];
	  var clearOverviewStatus = document.getElementsByClassName("cleanOverviewStatus")[0];
	  
	  
	  // Now create the IF statement
	  if (clearOverviewStatus !== undefined) { 			// If the Overview Status is not undefined
		  clearOverviewStatus.innerHTML = "";  			// The clearOverviewStatus div is empty
	  }
	  if (clearOverview === undefined) {				// If the Overview is undefined
		clearOverview = document.createElement('div');	// Create a new "div"
		clearOverview.className = "cleanOverview";		// Add the class name "cleanOverview"

		mainContainer.appendChild(overview);			// Now i will display the project info with the latest changes in the main div
		mainContainer.appendChild(clearOverview);		// Add the newly div created in the main div
	  }

	  clearOverview.innerHTML = "";

	  // Now we have a clean main div where we can display the latest info
	  // Creating a for to parse the project and retrieve all sprints
	  for (var i = 0; i < project.sprints.length; i++) {
		  	  
		  // Create a div for each sprint
		  var sprintDiv = document.createElement('div');
		  
		  // Add an ID for each div
		  // In this case the ID will be the Sprint ID
		  sprintDiv.id = project.sprints[i];
		  
		  // Add a class name for each div
		  // Like this we can edit the style for all sprints
		  sprintDiv.className = "flex-item";
		  
		  // Display the Sprints
		  sprintDiv.innerHTML = "<h3>Sprint #" + project.sprints[i] + "</h3>" + "<hr>";
		  clearOverview.appendChild(sprintDiv);

		  /////////////////////////////////////////////////////////////////	 
		  // Now we have all the Sprints                                 //
		  // The next step is too display all the info about each Sprint //
		  /////////////////////////////////////////////////////////////////
		  
		  // Display the total number of issues
		  // Retrieve all issues from issue list
		  // Check if the Issue Sprint ID is the same as Project Sprints ID
		  var issuesPerSprint = issues.filter(issue => issue.sprint === project.sprints[i]); 
		  
		  
		  // Prepare the HTML with the new data from the arrow function
		  sprintDiv.innerHTML += "<p>There are currently " + issuesPerSprint.length + " issues on this sprint, from which: </p>";

		  // We know how many issues do we have in each sprint
		  // But we dont want to see all of them
		  // Due do this we need to filter all the issues by status
		  var issuesPerStatus = issuesStatus.map(stat => countStatus(issuesPerSprint, stat.id));
		  
			
		  // Create new div for Status	
		  var div = document.createElement('div');
		  div.className = "sprint-elem";

		 // Add a new paragraph for each status
		  issuesPerStatus.forEach(elem => {
			div.innerHTML += "<p>" + elem.count + " " + elem.status + "</p>";
		  });
		  sprintDiv.appendChild(div);

		  // Create a new div to display the issues by type
		  // Features, Bugs, Tasks
		  var div2 = document.createElement('div');
		  
		  // Add the class name "sprint-elem"
		  div2.className = "sprint-elem";
		  
		  // Count how many issues are in each type
		  var x = issuesTypes.map(type => countType(issuesPerSprint, type));

		 // Add a new paragraph for each type
		  x.forEach(elem => {
			var str = elem.type.charAt(0).toLowerCase() + elem.type.slice(1);
			div2.innerHTML += "<p class='issue-types " + str + "'>" + elem.count + " " + elem.type + "</p>";
		  });
		  sprintDiv.appendChild(div2);
	  }
	}
	
	
	///////////////////////////////////////////////
	//                Sprints                    //
	// Now we have an overview for our project   //
	// Next step is to create a menu for Sprints //
	// In case we care more than 1 Sprint        //
	///////////////////////////////////////////////
	
	// Identify the Sprint Menu in DOM
	var selectSprint = document.getElementById("selectSprint");
	
	// Bind a function that creates a submenu for each Sprint
	selectSprint.addEventListener("click", function(){
		selectSprint.innerHTML = "Select Sprint";
		for (var i = 0; i < project.sprints.length; i++) {
		  var li = document.createElement('li');
		  var anchor = document.createElement('a');
		  anchor.id = "menuitem" + project.sprints[i];
		  anchor.className = "submenu";
		  anchor.innerHTML = project.sprints[i];
		  li.appendChild(anchor);

		  selectSprint.appendChild(li);
		}
		var submenuElems = document.getElementsByClassName("submenu");
		Array.prototype.map.call(submenuElems, (elem) => {
		  elem.style.display = "block";
		});

		selectSprint.addEventListener("click", callSprint, false);
	});

	 // Create a handle function for clicking on a sprint menu item
	function callSprint(e) {
	  e.preventDefault();
	  if (e.target.id !== "selectSprint") {
		showIssuesForSprint(e.target.id);
	  }
	}

	// Create an event handler on mouseleave
	selectSprint.addEventListener("mouseleave", function() {
	  selectSprint.innerHTML = "Select Sprint";
	});


	//////////////////////////////////////////////////////////////////////////////
	//								Filter Menu								    //
	// The next step is to create an event handler for filter menu             ///
	// The event handler will add in the filter menu all the available statuses///
	//////////////////////////////////////////////////////////////////////////////
	
	// Indentify the filter menu in DOM
	var showStatus = document.getElementById("filterIssue");
	
	// Bind a function that creates a submenu for each Status
	showStatus.addEventListener("click", function(){
		showStatus.innerHTML = "Filter";
		for (let i = 0; i < issuesStatus.length; i++) {
		  var li = document.createElement('li');
		  var anchor = document.createElement('a');
		  anchor.id = "menuitem" + issuesStatus[i].id;
		  anchor.className = "submenu";
		  anchor.innerHTML = issuesStatus[i].name;
		  li.appendChild(anchor);

		  showStatus.appendChild(li);
		}
		var submenuElems = document.getElementsByClassName("submenu");
		Array.prototype.map.call(submenuElems, (elem) => {
		  elem.style.display = "block";
		});

		showStatus.addEventListener("click", callFilter, false);
	});

	// Create a handle function for clicking on a filter menu item
	function callFilter(e) {
	  e.preventDefault();
	  if (e.target.id !== "filterIssue") { // make sure the submenu item is clicked
		filterByStatusFunc(e.target.id);
	  }
	}

	// Now create a function that will display the issue details according to the selected status
	function filterByStatusFunc(status) {
	
	  // Hide few elements
	  document.getElementById("add-issue").style.display = "none";
	  document.getElementById("create-sprint").style.display = "none";

	  // Identify the overview element in Dom
	  var overview = document.getElementById("overview");
	  
	  // Be sure to get the exact id when click on any status
	  var onlyId = status.replace('menuitem', '');

	  // Check the issue object and retrieve all the status ID's
	  // Now make sure when the user click on any status
	  // The response must be an ID that is exactly the same as the status ID's
	  // from issue object
	  var issuesForStatus = issues.filter(issue => issue.status == onlyId);
	  
	  // Check the issuesStatus object and retrieve all the ID's
	  // Now make sure when the user click on any status
	  // The response must be an id that is exactly the same as the ID's
	  // from issuesStatus object
	  var findStatusName = issuesStatus.find(el => el.id == onlyId);
	  

	 // Prepare the HTML with data for each status
	  overview.innerHTML = "There are currently " + issuesForStatus.length + " issues for status #" + onlyId + " " + findStatusName.name;
	  
	  // Identify the overview status element in DOM
	  var clearOverviewStatus = document.getElementsByClassName("cleanOverviewStatus")[0];
	  
	  // Clean the overview element and prepare it for the new issues to be displayed by status
	  document.getElementsByClassName("cleanOverview")[0].innerHTML = "";
	  
	  // Check if the containers exist, if not, create them
	  if (clearOverviewStatus === undefined) {
		
		// Create the Overview Status Container		
		var container = document.createElement('div');
		
		// Add class name "cleanOverviewStatus"
		container.className = "cleanOverviewStatus";
		
		// Indentify the main container
		var mainContainer = document.getElementsByClassName("main")[0];
		
		// Display the new container in the main element
		mainContainer.appendChild(container);
	  }
	  else {
		var container = clearOverviewStatus;
		container.innerHTML = "";
	  }

	  // Create a div for each issue and display few info
	  for (var i = 0; i < issuesForStatus.length; i++) {
		var div = document.createElement("div");
		var str = issuesForStatus[i].type.charAt(0).toLowerCase() + issuesForStatus[i].type.slice(1);
		div.className = "flex-item-sprint issue-types " + str;
		div.innerHTML = "<h3>#" + issuesForStatus[i].id + " with name: <strong>" + issuesForStatus[i].name + "</strong> part of sprint #" + issuesForStatus[i].sprint + " -- created by: #" + issuesForStatus[i].createdBy + "</h3><br><hr>";
		div.innerHTML += "<br><span>Details: " + issuesForStatus[i].description + "</span><br>";
		div.innerHTML += "<br><h3>Must be resolved by: #" + issuesForStatus[i].assignee + "</h3>";
		if (issuesForStatus[i].tasks.length > 0) {
		  div.innerHTML += "<br><h3>Current subtasks: </h3>";
		  issuesForStatus[i].tasks.forEach(el => div.innerHTML += "<br><p>#" + el + "</p>");
		}
		container.appendChild(div);
	  }
	}

	// Create an event handler on mouseleave
	showStatus.addEventListener("mouseleave", function() {
	  showStatus.innerHTML = "Filter";
	});


	////////////////////////////////////////////////////////
	//				Filter Issues by Sprint               //
	// The next step is to filter issues by sprint        //
	// Display the issues with all details                //
	// Let the user to update the issue, add subtasks and // 
	// move the issue in other sprints                    //
	//////////////////////////////////////////////////////// 
	
	// Create function that will filter the issues by sprint
	function showIssuesForSprint(sprintId) {
		
	  // Hide few elements	
	  document.getElementById("add-issue").style.display = "none";
	  document.getElementById("create-sprint").style.display = "none";
	  
	  // Indentify the Overview element in DOM
	  var overview = document.getElementById("overview");

	 // Make sure the function will display the correct issues
	  var onlyId = sprintId.replace('menuitem', '');
	  var issuesForSprint = issues.filter(issue => issue.sprint === onlyId);
	  
	  // Prepare the HTML with the issues for a specific Sprint
	  overview.innerHTML = "Current sprint #" + onlyId + " with a total of " + issuesForSprint.length + " issues";
	  
	  // Identify the Overview Status element in DOM
	  var clearOverviewStatus = document.getElementsByClassName("cleanOverviewStatus")[0];
	  
	  // Identify the Overview element in DOM
	  var clearOverview = document.getElementsByClassName("cleanOverview")[0];
	  
	  // Clear the overview page and prepare it to display the issues by sprint
	  clearOverview.innerHTML = "";
	  
	  // Check if the containers exist
	  if (clearOverviewStatus === undefined) {
		
		// Create a new element "div"
		var container = document.createElement('div');
		
		// Add class name "cleanOverviewStatus"
		container.className = "cleanOverviewStatus";
		
		// Identify the main element in DOM
		var mainContainer = document.getElementsByClassName("main")[0];
		
		// Display the new div
		mainContainer.appendChild(container);
	  }
	  else {
		var container = clearOverviewStatus;
		container.innerHTML = "";
	  }
	    // Create a new div for each status that contains all the issues and their info
		// According to their Sprints
		for (var i = 0; i < issuesStatus.length; i++) {
		  
		  // Create a new element "div"
		  var div = document.createElement("div");
		  
		  // Count how many issues are in the Sprint
		  var statusCount = countStatus(issuesForSprint, issuesStatus[i].id);
		  
		  // Prepare the HTML with the data
		  div.innerHTML = "<h3>" + statusCount.count + " " + issuesStatus[i].name + "</h3>";
		  
		  // Add class name "flex-item-sprint"
		  div.className = "flex-item-sprint";
		  
		  // Display the issues according to their Sprint
		  // Make sure the issues are displayed correctly for each status
		  var filterStatus = issuesForSprint.filter(elem => elem.status === issuesStatus[i].id);
		  
		  // Retrieve all the issues according to their status
		  filterStatus.map(elem => {
			var str = elem.type.charAt(0).toLowerCase() + elem.type.slice(1);
			
			// Create a new element "div"
			var issueDiv = document.createElement("div");
			
			// Add id for each div
			// In our case the ID will be the same as the Issue ID
			issueDiv.id = elem.id;
			
			// Add class name for each div
			// In this case the class name is "issue-types" + the issue type name (feature, task, bug)
			issueDiv.className = "issue-types " + str;
			
			// Prepare the HTML
			// Button that let the user to move the issue in other sprint
			issueDiv.innerHTML = "<div id='move" + elem.id + "'class='button'>➥</div>"; 
			
			// Pparagraph for each issue that contains Issue ID and Issue Name
			issueDiv.innerHTML += "<p>" + "#" + elem.id + " " + elem.name + "</p><hr>";
			
			// Description for each issue
			issueDiv.innerHTML += "<hr><h3>" + elem.description + "</h3><br><hr>";
			
			// Create in IF statement that check if the issue is Feature or Bug
			// If the statement is passed, the user can add subtasks
			if (elem.type === "Feature" || elem.type === "Bug") { 
			  issueDiv.innerHTML += "<div id='btn" + elem.id + "'class='button'>+</div>";
			}
			if (elem.tasks.length > 0) {
			  issueDiv.innerHTML += "<p id='issue-subtasks'>subtasks</p>";
			  for (var i = 0; i < elem.tasks.length; i++) {
				issueDiv.innerHTML += "<p>" + elem.tasks[i] + "</p>";
			  }
			}
			div.appendChild(issueDiv);
		  });
		  container.appendChild(div);
		}
		container.addEventListener("click", handleEvent, false);
	}
	
    /////////////////////////////////////////////////////////
    //                    Subtasks                         //
	/////////////////////////////////////////////////////////
	
	// Create a function that let the user to add subtasks //
	function handleEvent(e) {
	  
	  // Create an IF statement that check if the clicked element
	  // have class name button and id btn + issue id
	  if (e.target.className == "button" && e.target.id.includes('btn')) {
		  
		 // Remove the element id 
		currentIssueId = e.target.id.replace('btn', '');
		
		// Identify the Overview element in DOM
		var txt = document.getElementById("overview");
		
		// Identify the Overview Status element in DOM
		var overviewStatus = document.getElementsByClassName("cleanOverviewStatus")[0];
		
		// Search for "#' in the bug description
		var ind = txt.innerHTML.search('#');
		var id = txt.innerHTML.slice(ind+1, ind+6);

		// Make sure the issues are displayed correctly according to their sprint
		// The Sprint ID must be exactly the same as the selected issue
		var issuesSprint = issues.filter(el => el.sprint === id);
		
		// Retrieve all issues with type Task
		var tasks = issuesSprint.filter(el => el.type === "Task");

		// Identify the subtask element in DOM
		var subTask = document.getElementById("add-subtask");
		
		// Change style to block
		subTask.style.display = "block";
		
		// Identify the subtask form in Dom
		var subTaskForm = document.getElementById("subtask-form");
		
		// Hide the Overview Status on click "+"
		overviewStatus.style.display = "none";
		
		// Prepare the form to be populated
		subTaskForm.innerHTML = "";
		
		// Find the selected issue in the issue list
		// Make sure the current issue element ID is the same as Issue ID
		var currentIssue = issues.find(el => el.id === currentIssueId);
		
		// The next step is to check if the subtask already exist in the tasks list
		// For this we need to parse the tasks list and check if the same task id exist
		for (var i = 0; i < tasks.length; i++) {
			
			// Check if we have tasks
			var checkTask = currentIssue.tasks.find(el => el === tasks[i].id);
			
			// Create an IF statement that checks if the checkTask is undefined
			if (checkTask === undefined) {
			  
              // Create a new element "checkbox"			  
			  var taskCheckbox = document.createElement("input");
			  
			  // Add few attributes
			  taskCheckbox.setAttribute("type", "checkbox");
			  taskCheckbox.setAttribute("name", "subtask");
			  taskCheckbox.setAttribute("value", tasks[i].id);
			  
			  // Create a new element "label"
			  var label = document.createElement("label");
			  
			  // Add few attributes
			  label.setAttribute("for", "subtask");
			  label.innerHTML = tasks[i].id;
			  
			  // Add the new elements in Task Form
			  subTaskForm.appendChild(taskCheckbox);
			  subTaskForm.appendChild(label);
			}
		}
	  }
	  
	  
	  
	  
	  ////////////////////////////////////////////////////////////////////
	  //						Update / Details                        //
	  // Next the user must be able to see the issue details and update //
	  // When clicking an issue div                                     //
	  ////////////////////////////////////////////////////////////////////
	  
	  // Create an IF statement that checks if the clicked div have "issue-types" class name
	  if (e.target.className.includes('issue-types')) {
		  
		// Hide Overview Status  
		document.getElementsByClassName("cleanOverviewStatus")[0].style.display = "none";
		document.getElementById("update-issue").style.display = "block";
		
		// Current Issue ID must be the same as the clicked issue element id
		currentIssueId = e.target.id;
		
		// Make sure the ID's are the same
		var currentIssue = issues.find(el => el.id === currentIssueId);
		
		// Update the Issue Type & Name
		document.getElementById("selectTypeUpdate").value = currentIssue.type;
		document.getElementById("nameUpdate").value = currentIssue.name;
		
		// Identify the Assignee element in DOM
		var selectAs = document.getElementById("selectAssigneeUpdate");
		
		// Clear "selectAs"
		selectAs.innerHTML = "";
		
		// Get all users
		for (var i = 0; i < users.length; i++) {
		  var opt = document.createElement('option');
			opt.value = users[i].id;
			opt.innerHTML = users[i].id;
			selectAs.appendChild(opt);
		}
		
		// Save the users as value in the Assignee element
		selectAs.value = currentIssue.assignee;
		
		// Update Issue Description
		document.getElementById("descrUpdate").value = currentIssue.description;
		
		// Identify the Issue Status element in DOM
		var selectStatus = document.getElementById("selectStatusUpdate");
		
		// Clear "selectStatus"
		selectStatus.innerHTML = "";
		
		// Get all statuses
		for (var i = 0; i < issuesStatus.length; i++) {
		  var opt = document.createElement('option');
			opt.value = issuesStatus[i].name;
			opt.innerHTML = issuesStatus[i].name;
			selectStatus.appendChild(opt);
		}
		
		// Change the current status id with the new one
		var currentStatusId = currentIssue.status;
		
		// Make sure the Issue Status ID is correct
		var currentStatus = issuesStatus.find(el => el.id === currentStatusId);
		
		// Set the Issue Status name as value
		selectStatus.value = currentStatus.name;
		
		// Define comments
		var comms = [];
		
		// Get all the comments for the current issue
		for (var i = 0; i < currentIssue.comments.length; i++) {
		  var res = comments.find(el => el.id === currentIssue.comments[i]);
		  if (res !== undefined) {
			comms.push(res);
		  }
		}
		
		// Update the comments section
		document.getElementById("commUpdate").value = comms.join(";");
	  }
	  // Next step is to add a button that let the user to move an issue to another sprint
	  // Create an IF statement that checks if the clicked element have class "button" and id "move"
	  if (e.target.className == "button" && e.target.id.includes('move')) {
		  
		// Remove the id move from the element  
		currentIssueId = e.target.id.replace('move', '');
		
		// Identify the issue element id by the current issue id
		var issueDiv = document.getElementById(currentIssueId);
		
		// Identify the movie div in DOM
		var check = document.getElementsByClassName("move-issue-div")[0];
		
		// Create an IF statement that checks if the div exit
		if (check === undefined) {
			
		  // Create new element "div"	
		  var popupDiv = document.createElement('div');
		  
		  // Add class name "move-issue-div"
		  popupDiv.className = "move-issue-div";
		  
		  // Create new element "select"
		  var selection = document.createElement("select");
		  
		  // Add class name "moveIssue"
		  selection.id = "moveIssue";
		  
		  // Create new element "span"
		  var issueSpan = document.createElement("span");
		  
		  // Add text to the span element
		  // "move to sprint: "
		  issueSpan.innerHTML = "move to sprint: ";
		  
		  // Add span element in the move div
		  popupDiv.appendChild(issueSpan);
		  
		  // Get all Sprints
		  for (var i = 0; i < project.sprints.length; i++) {
			var opt = document.createElement('option');
			  opt.value = project.sprints[i];
			  opt.innerHTML = project.sprints[i];
			  selection.appendChild(opt);
		  }
		  popupDiv.appendChild(selection);
		  popupDiv.innerHTML += "<div id='changeSprnt" + currentIssueId + "'class='move-button'>move</div>";
		  issueDiv.appendChild(popupDiv);

		}
	  }
	  // Change the sprint for the current issue and its subtasks if it has any
	  if (e.target.className == "move-button") {
		var option = document.getElementById("moveIssue").value;
		var currIssueId = e.target.id.replace('changeSprnt', '');
		var currentIssue = issues.find(el => el.id === currIssueId);
		currentIssue.sprint = option;
		
		// Because the bugs/features issues contains only the id of a task
		// we must find all the corresponding subtasks of a bug/feature 
		// and then change their sprint
		// To do this, we need to create an IF statement to check if the issue
		// is Feature or Bug
		if ((currentIssue.type === "Feature" || currentIssue.type == "Bug") && currentIssue.tasks.length > 0) {
			
		  // Define Tasks	
		  var getTasks = [];
		  
		  // Get all current issue tasks
		  for (var i = 0; i < currentIssue.tasks.length; i++) {
			
		    // Check if the ID is correct
			var task = issues.find(el => el.id === currentIssue.tasks[i]);
			
			// IF statement that checks if the task exist in getTasks
			// If it doesn't push the new task in getTasks
			// If exist, get all tasks from getTasks and make sure the number of tasks
			// are the same as the currentIssue.tasks
			if (task !== undefined) {
			  getTasks.push(task);
			}
		  }
		  if (getTasks.length === currentIssue.tasks.length) {
			getTasks.forEach(el => el.sprint = option);
		  }
		}
		document.getElementsByClassName("move-issue-div")[0].outerHtml = "";
		showIssuesForSprint(option);
	  }
	}

	// Cancel button for the update option
	var cancelBtn = document.getElementById("cancelBtn").addEventListener("click", function(){
	  document.getElementById("update-issue").style.display = "none";
	  document.getElementsByClassName("cleanOverviewStatus")[0].style.display = "flex";
	  document.getElementById("overview").style.opacity = "0.9";
	});

	// Update button inside the update/details form
	var updateBtn = document.getElementById("updateBtn").addEventListener("click", function() {
	  var type = document.getElementById("selectTypeUpdate").value;
	  var name = document.getElementById("nameUpdate").value;
	  var assignee = document.getElementById("selectAssigneeUpdate").value;
	  var descr = document.getElementById("descrUpdate").value;
	  var status = document.getElementById("selectStatusUpdate").value;
	  
	  // Get status ID
	  var statusId = issuesStatus.find(el => el.name === status);
	  var comms = document.getElementById("commUpdate").value;
	  var comments = [];
	  
	  // Comments are only stored in issues as an id, so must modify the initial input (string)
	  if (comms.includes(";")) {
		var commnts = comms.split(";");
		for (var i = 0; i < commnts.length; i++) {
		  var comment = new Comment(commnts[i]);
		  comments.push(comment.id);
		}
	  }
	  else {
		var comment = new Comment(comms);
		comments.push(comment.id);
	  }
	  comments.forEach(el => { comments.push(el); });


	  var currentIssue = issues.find(el => el.id === currentIssueId);
	  currentIssue.type = type;
	  currentIssue.name = name;
	  currentIssue.assignee = assignee;
	  currentIssue.description = descr;
	  currentIssue.status = statusId.id;
	  currentIssue.comments = comments;

	// If Task, find its parents and change their status accordingly
	// Also, see if the parent is READY FOR TESTING aka all subtasks are RESOLVED
	  if (currentIssue.type === "Task" && currentIssue.status !== issuesStatus[0].id) {
		var issuesForSprint = issues.filter(el => el.sprint === currentIssue.sprint && el.tasks.length > 0);
		var parentsOfCurrTask = issuesForSprint.filter(el => el.tasks.includes(currentIssue.id));
		parentsOfCurrTask.forEach(el => el.status = currentIssue.status);

		if (currentIssue.status === issuesStatus[4].id)  { // RESOLVED (part that does the ready 4 testing thingy)
		  parentsOfCurrTask.forEach(el => {
			var getTasks = [];
			  for (var i = 0; i < el.tasks.length; i++) {
				var task = issues.find(elem => elem.id === el.tasks[i]);
				if (task !== undefined && task.status === issuesStatus[4].id) { // RESOLVED
				  getTasks.push(task);
				}
			  }
			  if (getTasks.length === el.tasks.length) { // all the subtasks are RESOLVED
				issuesStatus.push({id: 6, name: 'READY FOR TESTING'}); // add the new status
				el.status = issuesStatus[5].id; // and modify
			  }
		  });
		}
	  }
	  
	  // If the type is changed to TASK from Feature or Bug and the issue had subtasks,
	  // they must be dropped
	  if (currentIssue.type === "Task" && currentIssue.tasks.length > 0) {
		currentIssue.tasks = [];
	  }

	  currentIssue.updatedAt = new Date().toLocaleString(); // must change

	  document.getElementById("update-issue").style.display = "none";
	  document.getElementsByClassName("cleanOverviewStatus")[0].style.display = "flex";
	  
	  // when done, show everything
	  showIssuesForSprint(currentIssue.sprint);
	});

	// Add subtasks to a feature or bug issue
	  var subtaskBtn = document.getElementById("addSubTaskBtn").addEventListener("click", function() {
		  
		  // Identify the checkbox element
	  	  var values = getCheckboxes('subtask');
			
		  // Check the issue ID	
	  	  var subIssue = issues.find(el => el.id === currentIssueId);
	  	  values.forEach(el => subIssue.tasks.push(el));
	  	  subIssue.updatedAt = new Date().toLocaleString();
          
	  	  var issueDiv = document.getElementById(subIssue.id);
	  	  issueDiv.innerHTML = "<div id='move" + subIssue.id + "'class='button'>➥</div>";
	  	  issueDiv.innerHTML += "<p>" + "#" + subIssue.id + " " + subIssue.name + "</p>";
	  	  issueDiv.innerHTML += "<hr><h3>" + subIssue.description + "</h3><br><hr>";
	  	  issueDiv.innerHTML += "<div id='btn" + subIssue.id + "'class='button'>+</div>";
	  	  if (subIssue.tasks.length > 0) {
	  	    issueDiv.innerHTML += "<p id='issue-subtasks'>subtasks</p><hr>";
	  	    for (var i = 0; i < subIssue.tasks.length; i++) {
	  	  	issueDiv.innerHTML += "<p>" + subIssue.tasks[i] + "</p>";
	  	    }
	  	  }
	  	  document.getElementById("add-subtask").style.display = "none";
	  	  document.getElementsByClassName("cleanOverviewStatus")[0].style.display = "flex";
	  });


	//////////////////////////////////////////////////////////////////
	//                Create new Sprint & New Issue                 //
	//////////////////////////////////////////////////////////////////
	
	// Create new Issue
	var addIssue =  document.getElementById("addIssue");
	addIssue.addEventListener("click", displayAddIssueForm);

	function displayAddIssueForm() {
	  document.getElementById("create-sprint").style.display = "none";
	  document.getElementById("add-issue").style.display = "block";
	  document.getElementsByClassName("cleanOverview")[0].style.opacity = "0.1";
	  var cont = document.getElementsByClassName("cleanOverviewStatus")[0]
	  if (cont !== undefined) {
		cont.style.opacity = "0.1";
	  }

	// Show project's sprints as dropdown
	  var selectSprint = document.getElementById("selectSprint2");
	  selectSprint.innerHTML = "";
	  
	  for (var i = 0; i < project.sprints.length; i++) {
		var opt = document.createElement('option');
		  opt.value = project.sprints[i];
		  opt.innerHTML = project.sprints[i];
		  selectSprint.appendChild(opt);
	  }

	// Show the users as dropdown
	  var selectAs = document.getElementById("selectAssignee");
	  selectAs.innerHTML = "";
	  for (var i = 0; i < users.length; i++) {
		var opt = document.createElement('option');
		  opt.value = users[i].id;
		  opt.innerHTML = users[i].id;
		  selectAs.appendChild(opt);
	  }
	}

	// Add a new issue when clicking the add button inside the form
	var addIssueBtn = document.getElementById("addBtn");
	addIssueBtn.addEventListener("click", addAnIssueFunc);
	
	// Handler function for adding issue
	function addAnIssueFunc() {
	  var type = document.getElementById("selectType").value;
	  var name = document.getElementById("name").value;
	  var sprint = document.getElementById("selectSprint2").value;
	  var assignee = document.getElementById("selectAssignee").value;
	  var descr = document.getElementById("descr").value;
	  var comms = document.getElementById("comm").value;
	  var comments = [];
	  if (comms.includes(";")) {
		var commnts = comms.split(";");
		for (var i = 0; i < commnts.length; i++) {
		  var comment = new Comment(commnts[i]);
		  comments.push(comment.id);
		}
	  }
	  else {
		var comment = new Comment(comms);
		comments.push(comment.id);
	  }
	  comments.forEach(el => { comments.push(el); });

	  // Those fields have default values, can be empty
	  if (name === "") { name = undefined;}
	  if (descr === "") { descr = undefined;}

	  var issue = new Issue(type, name, sprint, newUser1.id, assignee, descr, comments);
	  issues.push(issue);

	  // Must clean everything when done
	  document.getElementById("addIssue").style.display = "none";
	  document.getElementsByClassName("cleanOverview")[0].style.opacity = "0.9";
	  document.getElementById("overview").style.opacity = "0.9";
	  var cont = document.getElementsByClassName("cleanOverviewStatus")[0]
	  if (cont !== undefined) {
		cont.style.opacity = "0.9";
	  }
	  
	  // Display the new issue
	  projectOverview();
	}
	

	// Create new Sprint
	var createSprint = document.getElementById("createSprint").addEventListener("click", function() {
	  document.getElementById("add-issue").style.display = "none";
	  document.getElementById("create-sprint").style.display = "block";
	  document.getElementsByClassName("cleanOverview")[0].style.opacity = "0.1";
	  var cont = document.getElementsByClassName("cleanOverviewStatus")[0]
	  if (cont !== undefined) {
		cont.style.opacity = "0.1";
	  }
	});

	var createSprntBtn = document.getElementById("createSprintBtn").addEventListener("click", function(){
	  var value = document.getElementById("sprintName").value;
	  var newSprint = new Sprint(value);
	  project.sprints.push(newSprint.id);

	  // Display the new Sprint with all details
	  document.getElementById("create-sprint").style.display = "none";
	  document.getElementsByClassName("cleanOverview")[0].style.opacity = "0.9";
	  var cont = document.getElementsByClassName("cleanOverviewStatus")[0]
	  if (cont !== undefined) {
		cont.style.opacity = "0.9";
	  }
	  
	  // Display the new sprint
	  projectOverview();
	});
	
	projectOverview()
}




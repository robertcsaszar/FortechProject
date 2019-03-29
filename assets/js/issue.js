function Issue(type, name = type + '-name', sprintId, userId, assigneeId, description = 'Created a new issue of type: ' + type, comments) {
   this.id = generateUniqueId(5);
   this.type = type; 
   this.name = name;
   this.sprint = sprintId; 
   this.createdBy = userId; 
   this.assignee = assigneeId; 
   this.description = description;
   this.status = issuesStatus[0].id;
   this.tasks = [];
   this.comments = comments;
   this.updatedAt = new Date().toLocaleString();
   this.createdAt = new Date().toLocaleString();
}

// Generates a random unique ID of a given length
function generateUniqueId(length) {
	 var timestamp = +new Date;

	 var _getRandomInt = function( min, max ) {
		   return Math.floor(Math.random() * (max - min + 1)) + min;
	 }

	 var ts = timestamp.toString();
	 var parts = ts.split("").reverse();
	 var id = "";

	 for (var i = 0; i < length; ++i) {
  		var index = _getRandomInt(0, parts.length - 1);
  		id += parts[index];
	 }

	 return id;

}

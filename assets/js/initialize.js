// Create new Project
var project = new Project();

// Create new Users
var newUser1 = new User("Robert");
var newUser2 = new User("Daniel");
var newUser3 = new User("Csaszar");
var newUser4 = new User("Ion");
var newUser5 = new User("Andreea");

// Push the new users in user list
users.push(newUser1,newUser2,newUser3,newUser4,newUser5);

// Create new Sprint
var sprint = new Sprint("Sprint");

// Push the new sprint id in project sprint list
project.sprints.push(sprint.id);

// Create new Issues
var issue1 = new Issue("Bug", "bugIssue1", sprint.id, newUser1.id, newUser2.id, "some description for a bug", []);
var issue2 = new Issue("Bug", "bugIssue2", sprint.id, newUser1.id, newUser3.id, "some description for a bug", []);
var issue3 = new Issue("Feature", "featureIssue1", sprint.id, newUser1.id, newUser4.id, "some description for a feature", []);
var issue4 = new Issue("Task", "taskIssue1", sprint.id, newUser1.id, newUser3.id, "some description for a task", []);
var issue5 = new Issue("Task", "taskIssue2", sprint.id, newUser1.id, newUser4.id, "some description for a task", []);

// Change the status for the new issues
issue1.status = issuesStatus[1].id;
issue2.status = issuesStatus[2].id;
issue3.status = issuesStatus[3].id;
issue4.status = issuesStatus[3].id;

// Push the new issues in the issue list
issues.push(issue1, issue2, issue3, issue4, issue5);


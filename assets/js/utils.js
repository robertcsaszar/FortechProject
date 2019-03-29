function User(name = 'user') {
  this.id = generateUniqueId(3);
  this.name = name;
}

function Comment(name) {
  this.id = generateUniqueId(3);
  this.name = name;
}

function Project() {
  this.id = generateUniqueId(3);
  this.sprints = []; 
}

function Sprint(name) {
  this.id = generateUniqueId(5);
  this.name = name;
}

function countType(issueArr, prop) {
  console.log(issueArr, prop);
  var filterProps = issueArr.filter(elem => elem.type === prop);
  return { type : prop,
    count : filterProps.length
  };
}

function countStatus(issueArr, prop) {
  console.log(issueArr, prop);
  var filterProps = issueArr.filter(elem => elem.status === prop);
  var findStatus = issuesStatus.find(elem => elem.id === prop);
  return { status : findStatus.name,
    count : filterProps.length
  };
}

function getCheckboxes(name) {
    var checkboxes = document.querySelectorAll('input[name="' + name + '"]:checked'), values = [];
    Array.prototype.forEach.call(checkboxes, function(el) {
        values.push(el.value);
    });
    return values;
}

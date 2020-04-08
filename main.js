
var api = "d4ea7d-98bc97-0ab0ba-0bbdc5-df5e18";

ListAllTodos();

function ListAllTodos(){
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var response = JSON.parse(this.responseText);
    console.log(response);
    console.log(response.length);
      for (var i=0; i<response.length; i++){
        createNewTodo(response[i]);
    }
  }
};

xhttp.open("GET", "https://cse204.work/todos", true);
xhttp.setRequestHeader("x-api-key", api);
xhttp.send();
}

function createNewTodo(response){

  var tick = document.createElement("input");
  tick.setAttribute("type", "checkbox");
  tick.style.position = "absolute";
  tick.style.top = "15px";
  tick.style.left = "5px";

  var textTODO = response.text;
  var idTODO = response.id;
  var todo = document.createElement("LI");
  todo.innerHTML = response.text;

  var remove = document.createElement("button");
  remove.innerHTML = "Delete Item";
  remove.style.position = "absolute";
  remove.style.top = "15px";
  remove.style.left = "30px";

  if (response.completed == true){
    tick.checked = true;
    todo.style.textDecoration = "line-through";
  }
  else if(response.completed == false){
    tick.check = false;
    todo.style.textDecoration = "none";
  }

  var element = document.getElementById("List");
  todo.setAttribute("id", idTODO);
  todo.setAttribute("text", textTODO);
  element.appendChild(todo);
  todo.appendChild(tick);
  todo.appendChild(remove);

  console.log(response.id);
  tick.addEventListener("click", function(event){putToDo(idTODO)});

  remove.addEventListener("click", function(event){deleteTODO(idTODO)});
}


document.getElementById("123").addEventListener("submit", addNewTodo);
//THIS IS WHERE I CALL CLICK FUNCTION AND IT ADDS THE TO DO TO THE SCREE
//document.getElementById("123").addEventListener("click", function(event){addNewTodo()});

function addNewTodo(e){
  console.log("alert");
  e.preventDefault();
  var data = {
    text: document.getElementById("input").value
  }
  var xhttp2 = new XMLHttpRequest();
  xhttp2.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var todo = JSON.parse(this.responseText);
      createNewTodo(todo);

    } else if (this.readyState == 4) {
      console.log(this.responseText);

    }
  };

  xhttp2.open("POST", "https://cse204.work/todos", true);

  xhttp2.setRequestHeader("Content-type", "application/json");
  xhttp2.setRequestHeader("x-api-key", api);
  xhttp2.send(JSON.stringify(data));

  document.getElementById("input").value = "";

}

function putToDo(id){
  var complete_id = id;
  var xhttp4 = new XMLHttpRequest();
  var data = {
    completed: true
  }
  xhttp4.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(document.getElementById(complete_id));
      document.getElementById(complete_id).style.textDecoration = "line-through";
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };
  xhttp4.open("PUT", "https://cse204.work/todos/" + complete_id, true);
  xhttp4.setRequestHeader("Content-type", "application/json");
  xhttp4.setRequestHeader("x-api-key", api);
  xhttp4.send(JSON.stringify(data));
}


function deleteTODO(id){
  var remove_id = id;
  var xhttp3 = new XMLHttpRequest();
  xhttp3.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById(remove_id).remove();
    } else if (this.readyState == 4) {
      console.log(this.responseText);
    }
  };
  xhttp3.open("DELETE", "https://cse204.work/todos/" + remove_id, true);
  xhttp3.setRequestHeader("Content-type", "application/json");
  xhttp3.setRequestHeader("x-api-key", api);
  xhttp3.send();
}

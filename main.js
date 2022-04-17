if (localStorage.getItem("numbers") == null) {
  localStorage.setItem("numbers", 0);
}
let newTask = document.getElementById("newTask");
let add = document.getElementById("add");
add.onclick = function () {
  let task = newTask.value;
  if (task !== "") {
    localStorage.setItem(localStorage.getItem("numbers"), task);
    let div = document.createElement("div");
    let attr = document.createAttribute("id");
    attr.value = localStorage.getItem("numbers");
    div.setAttributeNode(attr);

    let content = localStorage.getItem(localStorage.getItem("numbers"));
    div.append(content);

    let span = document.createElement("span");
    span.append("x");
    div.append(span);

    let tasks = document.getElementById("tasks");
    tasks.append(div);
    localStorage.setItem(
      "numbers",
      Number(localStorage.getItem("numbers")) + 1
    );
  }
  update();
};
function make() {
  for (let i = 0; i < localStorage.getItem("numbers"); i++) {
    if (localStorage.getItem(i) != null) {
      let div = document.createElement("div");
      let attr = document.createAttribute("id");
      attr.value = i;
      div.setAttributeNode(attr);

      let content = localStorage.getItem(i);
      div.append(content);

      let span = document.createElement("span");
      span.append("x");
      div.append(span);

      let tasks = document.getElementById("tasks");
      tasks.append(div);
    }
  }
  update();
}
make();

let modal = document.getElementById("modal");
function update() {
  let spans = document.querySelectorAll("span");
  for (let i = 0; i < spans.length; i++) {
    spans[i].onclick = function () {
      modal.style.transform = `translateY(0%)`;
      document.getElementById("ok").onclick = function () {
        let name = spans[i].parentElement.id;
        localStorage.removeItem(name);
        spans[i].parentElement.style.display = "none";
        modal.style.transform = `translateY(100%)`;
      };
      document.getElementById("cancel").onclick = function () {
        modal.style.transform = `translateY(100%)`;
      };
    };
  }
}
update();

let filter = document.getElementById("filter");
filter.onkeyup = function () {
  let content = filter.value;
  let tasks = document.getElementById("tasks");
  tasks.innerHTML = "";
  if (content == "") make();
  else {
    for (let i = 0; i < localStorage.getItem("numbers"); i++) {
      if (localStorage.getItem(i) != null) {
        let x = localStorage.getItem(i);
        if (x.includes(content)) {
          let div = document.createElement("div");
          let attr = document.createAttribute("id");
          attr.value = i;
          div.setAttributeNode(attr);

          let content = localStorage.getItem(i);
          div.append(content);

          let span = document.createElement("span");
          span.append("x");
          div.append(span);

          tasks.append(div);
        }
      }
    }
    update();
  }
};

document.getElementById("dark").onclick = function () {
  document.body.classList.toggle("dark");
  this.classList.toggle("fa-sun");
};

document.getElementById("clear").onclick = function () {
  if (document.getElementById("tasks").childElementCount != 0) {
    modal.style.transform = `translateY(0%)`;
    document.getElementById("ok").onclick = function () {
      let divs = document.getElementById("tasks").children;
      for (let i = 0; i < divs.length; i++) {
        localStorage.removeItem(divs[i].id);
        divs[i].style.display = "none";
      }
      modal.style.transform = `translateY(100%)`;
    };
    document.getElementById("cancel").onclick = function () {
      modal.style.transform = `translateY(100%)`;
    };
  }
};

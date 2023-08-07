const form = document.querySelector("#form");
const itemInput = document.querySelector(".item-input");
const itemList = document.querySelector(".item-list");
const clr = document.querySelector(".clear-btn");
const filter = document.querySelector(".filter-item");

//Functions
const addItem = (e) => {
  e.preventDefault();

  //Validate Input
  if (itemInput.value === "") {
    const alert = document.createElement("div");
    alert.className = "error-input";
    alert.innerText = "Please give some task.";
    alert.style.color = "red";
    form.after(alert);
    if (form.nextSibling) {
      setTimeout(function () {
        form.nextSibling.remove();
      }, 1000);
    }
    return;
  } else {
    const newItem = itemInput.value;

    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const div = document.createElement("div");

    li.className = "items";
    h3.className = "item-title";
    div.className = "action-btns";

    const cross = `<lord-icon
    src="https://cdn.lordicon.com/nhfyhmlt.json"
    trigger="hover"
    colors="primary:#121331"
    state="hover-3"
    style="width:35px;height:35px"
  ></lord-icon>`;

    const edit = `<lord-icon
  src="https://cdn.lordicon.com/wloilxuq.json"
  trigger="hover"
  colors="primary:#121331,secondary:#08a88a"
  state="hover-1"
  style="width:35px;height:35px"
></lord-icon>`;

    const btnOne = createButton("remove-item", cross);
    const btnTwo = createButton("edit-item", edit);

    h3.innerText = `${newItem}`;

    div.append(btnOne, btnTwo);
    li.append(h3, div);
    itemList.appendChild(li);

    checkUi();
    itemInput.value = "";
  }
};

const createButton = (classes, content) => {
  const btn = document.createElement("button");
  btn.className = classes;
  btn.innerHTML = content;
  return btn;
};

const removeItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    if (confirm("Are Your Sure")) {
      e.target.parentElement.parentElement.parentElement.remove();
    }
  }
  checkUi();
};

const removeList = (e) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUi();
};

const filterList = (e) => {
  const items = document.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.children[0].textContent.toLowerCase();
    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
};

const checkUi = () => {
  const items = document.querySelectorAll(".items");
  if (items.length === 0) {
    clr.parentElement.style.display = "none";
    filter.parentElement.style.display = "none";
  } else {
    clr.parentElement.style.display = "block";
    filter.parentElement.style.display = "block";
  }
};

//EventListners
form.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clr.addEventListener("click", removeList);
filter.addEventListener("input", filterList);

//Function On load
checkUi();

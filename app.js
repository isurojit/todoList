const form = document.querySelector("#form");
const itemInput = document.querySelector(".item-input");
const itemList = document.querySelector(".item-list");
const clr = document.querySelector(".clear-btn");
const filter = document.querySelector(".filter-item");
const submitBtn = document.querySelector(".btn-submit");
let isEditMode = false;

//Functions

const displayItems = () => {
  const itemsFromStorage = getItemfromStorage();
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
  });
  checkUi();
};

const onAdditemSubmit = (e) => {
  e.preventDefault();
  const newItem = itemInput.value;

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
  }

  //check for edit mode
  if (isEditMode) {
    const itemToEdit = itemList.querySelector(".edit-mode");

    removeItemFromStorage(itemToEdit.textContent);
    itemToEdit.classList.remove("edit-mode");
    itemToEdit.remove();
    isEditMode = false;
  }

  //Create item DOM ELe
  addItemToDOM(newItem);

  //Add item to local storage
  additemToStorage(newItem);

  checkUi();
  itemInput.value = "";
};

const addItemToDOM = (item) => {
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

  h3.innerText = `${item}`;

  div.append(btnOne, btnTwo);
  li.append(h3, div);
  itemList.appendChild(li);
};

const createButton = (classes, content) => {
  const btn = document.createElement("button");
  btn.className = classes;
  btn.innerHTML = content;
  return btn;
};

//Add items to local storgae
const additemToStorage = (item) => {
  const itemsFromStorage = getItemfromStorage();

  //Add new item to array
  itemsFromStorage.push(item);

  //Convert To JSON String and set to local storgae
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

//Get Items from local storage
const getItemfromStorage = () => {
  let itemsFromStorage;
  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }
  return itemsFromStorage;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement.parentElement);
  }
  if (e.target.parentElement.classList.contains("edit-item")) {
    setItemToEdit(e.target.parentElement.parentElement.parentElement);
  }
};

//Edit
const setItemToEdit = (item) => {
  isEditMode = true;

  itemList.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
  });
  item.classList.add("edit-mode");
  submitBtn.innerHTML = '<i class="fas fa-pencil-alt"></i>  Update Item';
  submitBtn.style.backgroundColor = "green";
  itemInput.value = item.textContent;
};

//Removes perticular item
const removeItem = (item) => {
  if (confirm("Are Your Sure")) {
    //Remove Item From DOM
    item.remove();

    //Remove Item From Storage
    removeItemFromStorage(item.textContent);

    checkUi();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemfromStorage();
  //Filter Out Items
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //reset to local storage
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
};

const removeList = (e) => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  //Clear from localstorage
  localStorage.removeItem("items");
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

  submitBtn.innerHTML = ' <i class="fas fa-plus"></i> Add Item';
  submitBtn.style.backgroundColor = "rgb(25, 25, 25)";
  isEditMode = false;
};

//initilaize app
const init = () => {
  //EventListners
  form.addEventListener("submit", onAdditemSubmit);
  itemList.addEventListener("click", onClickItem);
  clr.addEventListener("click", removeList);
  filter.addEventListener("input", filterList);
  document.addEventListener("DOMContentLoaded", displayItems);

  //Function On load
  checkUi();
};

init();

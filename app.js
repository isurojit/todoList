const form = document.querySelector("#form");
const userInput = document.querySelector(".item-input");
const filterInput = document.querySelector("#filter");
const lists = document.querySelector(".item-list");
const clearbtn = document.querySelector(".clear-btn");

//Genral Operations

//Functions

//Adding Function
function onSubmit(e) {
  e.preventDefault();
  if (userInput.value) {
    //Enabling List
    lists.style.display = "block";
    //creating Elements
    const li = document.createElement("li");
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const cross = document.createElement("span");
    const edit = document.createElement("span");

    //Assigning classes
    li.className = "items";
    div.className = "action-btns";
    h3.className = "item-title";
    cross.className = "remove-item";
    edit.className = "edit-item";

    //Inserting values
    h3.innerText = `${userInput.value}`;
    cross.innerHTML =
      '<lord-icon src="https://cdn.lordicon.com/nhfyhmlt.json" trigger="hover" colors="primary:#121331" state="hover-3" style="width:35px;height:35px"></lord-icon>';
    edit.innerHTML =
      '<lord-icon src="https://cdn.lordicon.com/wloilxuq.json" trigger="hover" colors="primary:#121331,secondary:#08a88a" state="hover-1" style="width:35px;height:35px"></lord-icon>';

    //Appending
    div.append(cross, edit);
    li.append(h3, div);
    lists.append(li);

    //Enbleing filter form
    filterInput.style.display = "block";
    clearbtn.parentElement.style.display = "block";
  }
}

//Remove Function
function onRemove(e) {
  e.preventDefault();
  e.target.parentElement.parentElement.parentElement.remove();
  //Disabling filter form
  filterInput.style.display = "none";
}

//Clear Function
function onClear(e) {
  e.preventDefault();
  lists.parentElement.remove();
  clearbtn.parentElement.style.display = "none";
  filterInput.style.display = "none";
}

//EventListners
lists.addEventListener("click", onRemove);
form.addEventListener("submit", onSubmit);
clearbtn.addEventListener("click", onClear);

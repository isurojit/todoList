const form = document.querySelector("#form");
const userInput = document.querySelector(".item-input");
const filterInput = document.querySelector("#filter");

//Genral Operations

//Functions
function onSubmit(e) {
  e.preventDefault();
  if (userInput.value) {
    //creating Elements
    const section = document.createElement("section");
    const ul = document.createElement("ul");
    const li = document.createElement("li");
    const div = document.createElement("div");
    const h3 = document.createElement("h3");
    const cross = document.createElement("span");
    const edit = document.createElement("span");

    //Assigning classes
    section.className = "items-section";
    ul.className = "item-list";
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
    ul.textContent = "Lists";

    //Appending
    div.append(cross, edit);
    li.append(h3, div);
    ul.append(li);
    section.append(ul);
    filterInput.after(section);

    //Enbleing filter form
    filterInput.style.display = "block";
  }
}

//EventListners
form.addEventListener("submit", onSubmit);

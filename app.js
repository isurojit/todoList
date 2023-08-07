const form = document.querySelector(".form");
const itemInput = document.querySelector(".item-input");
const itemList = document.querySelector(".item-list");

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
    return;
  } else {
    if (document.body.classList.contains("error-input")) {
      document.querySelector(".error-input").remove();
    }
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
    console.log(div);
  }
};

const createButton = (classes, content) => {
  const btn = document.createElement("button");
  btn.className = classes;
  btn.innerHTML = content;
  return btn;
};

//EventListners
form.addEventListener("submit", addItem);

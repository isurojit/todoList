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
    document.querySelector(".error-input").remove();
    console.log("sucess");
  }
};

//EventListners
form.addEventListener("submit", addItem);

let toolsCont = document.querySelector(".tools-cont");
let optionsCont = document.querySelector(".options-cont");
let optionsFlag = true;
let pencilToolCont = document.querySelector(".pencil-tool-cont");
let eraserToolCont = document.querySelector(".eraser-tool-cont");
let pencil = document.querySelector(".pencil");
let eraser = document.querySelector(".eraser");
let sticky = document.querySelector(".sticky");
let upload = document.querySelector(".upload");
let pencilFlag = false;
let eraserFlag = false;

// dark and light theme -- Get the toggle button element
const toggleBtn = document.getElementById("toggle-btn");
// Add event listener for click events
toggleBtn.addEventListener("click", function () {
  // Get the body element
  const body = document.body;
  // Toggle the dark mode class
  body.classList.toggle("dark-mode");
});

// hameburger menu open close
// true -> tools show, false -> hide tools
optionsCont.addEventListener("click", (e) => {
  optionsFlag = !optionsFlag;

  if (optionsFlag) openTools();
  else closeTools();
});

function openTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-times");
  iconElem.classList.add("fa-bars");
  toolsCont.style.display = "flex";
}
function closeTools() {
  let iconElem = optionsCont.children[0];
  iconElem.classList.remove("fa-bars");
  iconElem.classList.add("fa-times");
  toolsCont.style.display = "none";

  pencilToolCont.style.display = "none";
  eraserToolCont.style.display = "none";
}

// true -> show pencil tool, false -> hide pencil tool
pencil.addEventListener("click", (e) => {
  pencilFlag = !pencilFlag;

  if (pencilFlag) pencilToolCont.style.display = "block";
  else pencilToolCont.style.display = "none";
});

// true -> show eraser tool, false -> hide eraser tool
eraser.addEventListener("click", (e) => {
  eraserFlag = !eraserFlag;

  if (eraserFlag) eraserToolCont.style.display = "flex";
  else eraserToolCont.style.display = "none";
});

// Open file explorer - upload image into sticky notes
upload.addEventListener("click", (e) => {
  let input = document.createElement("input");
  input.setAttribute("type", "file");
  input.click();

  input.addEventListener("change", (e) => {
    let file = input.files[0];
    let url = URL.createObjectURL(file);

    let stickyTemplateHTML = `
        <div class="header-cont">
            <div class="minimize"></div>
            <div class="remove"></div>
        </div>
        <div class="note-cont">
            <img src="${url}"/>
        </div>
        `;
    createSticky(stickyTemplateHTML);
  });
});

//Sticky notes
sticky.addEventListener("click", (e) => {
  let stickyTemplateHTML = `
    <div class="header-cont">
        <div class="minimize"></div>
        <div class="remove"></div>
    </div>
    <div class="note-cont">
        <textarea spellcheck="false"></textarea>
    </div>
    `;

  createSticky(stickyTemplateHTML);
});

//sticky creation
function createSticky(stickyTemplateHTML) {
  let stickyCont = document.createElement("div");
  stickyCont.setAttribute("class", "sticky-cont");
  stickyCont.innerHTML = stickyTemplateHTML;
  document.body.appendChild(stickyCont);

  let minimize = stickyCont.querySelector(".minimize");
  let remove = stickyCont.querySelector(".remove");
  noteActions(minimize, remove, stickyCont);

  stickyCont.onmousedown = function (event) {
    dragAndDrop(stickyCont, event);
  };

  stickyCont.ondragstart = function () {
    return false;
  };
}

//remove and minimze of sticky notes
function noteActions(minimize, remove, stickyCont) {
  remove.addEventListener("click", (e) => {
    stickyCont.remove();
  });
  minimize.addEventListener("click", (e) => {
    let noteCont = stickyCont.querySelector(".note-cont");
    let display = getComputedStyle(noteCont).getPropertyValue("display");
    if (display === "none") noteCont.style.display = "block";
    else noteCont.style.display = "none";
  });
}

// drag and drop of the sticky notes - copied from google
function dragAndDrop(element, event) {
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;

  element.style.position = "absolute";
  element.style.zIndex = 1000;

  moveAt(event.pageX, event.pageY);

  // moves the sticky at (pageX, pageY) coordinates
  // taking initial shifts into account
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + "px";
    element.style.top = pageY - shiftY + "px";
  }

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // move the sticky on mousemove
  document.addEventListener("mousemove", onMouseMove);

  // drop the sticky, remove unneeded handlers
  element.onmouseup = function () {
    document.removeEventListener("mousemove", onMouseMove);
    element.onmouseup = null;
  };
}

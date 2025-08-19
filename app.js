let allExtensions = document.querySelector(".all-extensions");

async function dataExtract() {                 // function to extract data
  let jsonData = await fetch('data.json');
  let jsData = await jsonData.json();
  return jsData;
}

let extractedData = [];      // variable where the data extracted from the data.json file will be stored
dataExtract()
.then((data) => {
  extractedData = data;

  filterAllBtn.classList.add("active");    // since this is a promise that will run as soon as the page loads, we keep the logic for the all extension card to appear after page load here
  allExtensions.innerHTML = '';

  for (let i=0; i<extractedData.length; i++) {
    let logoUrl = extractedData[i].logo;
    let name = extractedData[i].name;
    let desc = extractedData[i].description;
    let isActive = extractedData[i].isActive;
    createExtensionCard(logoUrl, name, desc, i);
    
  }
})

function createExtensionCard (logoPath, name, description, i) {   // function to create the extension card
  let extensionCard = document.createElement("div");
  extensionCard.classList.add("extension-card");
  extensionCard.dataset.index = i;
  allExtensions.appendChild(extensionCard);

  let extensionIconInfo = document.createElement("div");
  extensionIconInfo.classList.add("extension-icon-info");
  extensionCard.appendChild(extensionIconInfo);

  let extensionIcon = document.createElement("img");
  extensionIcon.classList.add("extension-icon");
  extensionIcon.setAttribute('src', logoPath);
  extensionIconInfo.appendChild(extensionIcon);

  let extensionInfo = document.createElement("div");
  extensionInfo.classList.add("extension-info");
  extensionIconInfo.appendChild(extensionInfo);

  let extensionName = document.createElement("h3");
  extensionName.classList.add("extension-name");
  extensionName.textContent = `${name}`;
  extensionInfo.appendChild(extensionName);

  let extensionDesc = document.createElement("p");
  extensionDesc.classList.add("extension-desc");
  extensionDesc.textContent = `${description}`;
  extensionInfo.appendChild(extensionDesc);

  let extensionRemoveToggleBtns = document.createElement("div");
  extensionRemoveToggleBtns.classList.add("extension-remove-toggle-btns");
  extensionCard.appendChild(extensionRemoveToggleBtns);

  let removeBtn = document.createElement("button");              // remove button creation in the extension card
  removeBtn.textContent = "Remove";
  removeBtn.classList.add("remove-btn");
  extensionRemoveToggleBtns.appendChild(removeBtn);

  removeBtn.addEventListener("click", function() {       // functionality for the remove button in each extension card
    extensionCard.remove();
    extractedData.splice(i,1);
  })

  let toggleBtn = document.createElement("div");
  toggleBtn.classList.add("toggle-btn");
  extensionRemoveToggleBtns.appendChild(toggleBtn);

  let toggleThumb = document.createElement("div");
  toggleThumb.classList.add("toggle-thumb");
  toggleBtn.appendChild(toggleThumb);

  if(extractedData[i].isActive) {
    toggleBtn.classList.add("toggle-btn-on");
    toggleThumb.classList.add("toggle-thumb-on");
  } else {
    toggleBtn.classList.remove("toggle-btn-on");
    toggleThumb.classList.remove("toggle-thumb-on");
  }

  toggleBtn.addEventListener("click", function(){
      toggleBtn.classList.toggle("toggle-btn-on");
      toggleThumb.classList.toggle("toggle-thumb-on");
      extractedData[i].isActive = !extractedData[i].isActive
  })
}

let filterAllBtn = document.querySelector("#filterAllBtn");

filterAllBtn.addEventListener("click", async function() {         // logic for the "All filter button" click
  filterAllBtn.classList.add("active"); 
  filterActiveBtn.classList.remove("active");
  filterInactiveBtn.classList.remove("active");
  allExtensions.innerHTML = '';

  for (let i=0; i<extractedData.length; i++) {
    let logoUrl = extractedData[i].logo;
    let name = extractedData[i].name;
    let desc = extractedData[i].description;
    let isActive = extractedData[i].isActive;
    createExtensionCard(logoUrl, name, desc, i);
    
  }

})

window.addEventListener("DOMContentLoaded", async() => {
  filterAllBtn.classList.add("active");
  allExtensions.innerHTML = '';

  for (let i=0; i<extractedData.length; i++) {
    let logoUrl = extractedData[i].logo;
    let name = extractedData[i].name;
    let desc = extractedData[i].description;
    let isActive = extractedData[i].isActive;
    createExtensionCard(logoUrl, name, desc, i);
    
  }
})


let filterActiveBtn = document.querySelector("#filterActiveBtn");

filterActiveBtn.addEventListener("click", async function () {                  // logic for the "Active filter button" click
  filterActiveBtn.classList.add("active");
  filterAllBtn.classList.remove("active");
  filterInactiveBtn.classList.remove("active");
  allExtensions.innerHTML = '';

    for (let i=0; i<extractedData.length; i++) {
    let logoUrl = extractedData[i].logo;
    let name = extractedData[i].name;
    let desc = extractedData[i].description;
    let isActive = extractedData[i].isActive;
    if (isActive) {
      createExtensionCard(logoUrl, name, desc, i);
    }
    
  }
})


let filterInactiveBtn = document.querySelector("#filterInactiveBtn");

filterInactiveBtn.addEventListener("click", async function () {                      // logic for the "Inactive filter button" click
  filterInactiveBtn.classList.add("active");
  filterAllBtn.classList.remove("active");
  filterActiveBtn.classList.remove("active");
  allExtensions.innerHTML = '';

    for (let i=0; i<extractedData.length; i++) {
    let logoUrl = extractedData[i].logo;
    let name = extractedData[i].name;
    let desc = extractedData[i].description;
    let isActive = extractedData[i].isActive;
    if (!isActive) {
      createExtensionCard(logoUrl, name, desc, i);
    }
    
  }
})


let themeToggleBtn = document.querySelector("#theme-toggle-btn");
let themeToggleBtnIcon = document.querySelector("#theme-toggle-btn>img");
let headerLogo = document.querySelector(".header-area>img");
let body = document.querySelector("body");

themeToggleBtn.addEventListener("click", () => {                                           // logic for the "Theme toggle button" click
  
  body.classList.toggle("dark");

  if(body.classList.contains("dark")) {
    themeToggleBtnIcon.setAttribute("src", 'assets/images/icon-sun.svg');
    headerLogo.setAttribute("src", "assets/images/logo-white.png");
  } else {
    themeToggleBtnIcon.setAttribute("src", 'assets/images/icon-moon.svg');
    headerLogo.setAttribute("src", "assets/images/logo.svg");
  }

})
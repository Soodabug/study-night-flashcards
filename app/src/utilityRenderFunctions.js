// Create a general element with specified text
export const createElement = (elementType, text) => {
  const element = document.createElement(elementType);
  element.textContent = text;
  return element;
};

// Creates images with alt
export const createImage = (url, alt) => {
  const img = document.createElement("img");
  img.src = url;
  img.alt = alt;
  return img;
};

// Create a header element with specified text and data attribute
export const createHeader = (headerType, text, dataCy) => {
  const header = document.createElement(headerType);
  header.textContent = text;
  if (dataCy) header.setAttribute("data-cy", dataCy);
  return header;
};

// Create a button that toggles the visibility of the form
export const createToggleButton = (text, element) => {
  const button = document.createElement("button");
  button.type = "button"; // never submit the form by accident
  button.textContent = text;
  button.addEventListener("click", (e) => {
    e.preventDefault();
    element.classList.toggle("notVisible");
  });
  return button;
};

// Form Helper Functions
export const createLabel = (text, htmlFor) => {
  const label = document.createElement("label");
  label.textContent = text;
  label.setAttribute("for", htmlFor);
  return label;
};

export const createInput = (name) => {
  const input = document.createElement("input");
  input.name = name;
  input.id = name;
  return input;
};

export const createSubmitButton = (value) => {
  const submit = document.createElement("input");
  submit.type = "submit";
  submit.value = value;
  return submit;
};

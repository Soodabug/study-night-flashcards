// The about page.
import { createElement, createImage } from "./utilityRenderFunctions.js";

const aboutImage = new URL("../images/aboutImage.webp", import.meta.url).href;

const renderAboutPage = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const header = createElement("h2", "About Study Night");

  const what = createElement(
    "p",
    "Study Night is a small flashcards app. Put what you need to learn on cards, group the cards in sets, and go through them until they stick.",
  );
  const how = createElement(
    "p",
    "Click a card to see its other side. Shuffle when you start remembering the order instead of the answers.",
  );

  const text = document.createElement("div");
  text.append(header, what, how);

  const photo = document.createElement("figure");
  photo.className = "photo";
  photo.append(
    createImage(aboutImage, "Student with headphones studying at a laptop"),
  );

  const aboutContainer = document.createElement("div");
  aboutContainer.className = "about";
  // hook for the Cypress tests
  aboutContainer.setAttribute("data-cy", "about-page");
  aboutContainer.append(text, photo);

  main.append(aboutContainer);
};

export { renderAboutPage };

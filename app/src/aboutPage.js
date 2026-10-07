// This file renders the about page content

import aboutImage from "../images/aboutImage.webp";
import { createImage } from "./utilityRenderFunctions.js";

const renderAboutPage = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const aboutContainer = document.createElement("div");
  aboutContainer.className = "aboutContainer";

  // hook for the Cypress tests
  aboutContainer.setAttribute("data-cy", "about-page");

  const header = document.createElement("h2");
  header.textContent = "About Study Night";

  const paragraph = document.createElement("p");
  paragraph.textContent =
    "Study Night is designed to help learners create and review digital flashcards easily.";

  const image = createImage(
    aboutImage,
    "Student with headphones studying at a laptop",
  );

  aboutContainer.append(header, paragraph, image);
  main.append(aboutContainer);
};

export { renderAboutPage };

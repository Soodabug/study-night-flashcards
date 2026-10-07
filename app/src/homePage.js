// The home page: what the app is for and a button into the card sets.
import {
  createHeader,
  createElement,
  createImage,
} from "./utilityRenderFunctions.js";

// new URL(...) is the standard way to get the address of a file next to the code.
// (A plain "import image from ..." gave an object here, not an address, so the picture was broken.)
const homePageImage = new URL("../images/homePage.webp", import.meta.url).href;

const renderHomePage = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const header = createHeader(
    "h1",
    "Study tonight. Remember tomorrow.",
    "home_header",
  );

  const subHeading = createElement(
    "p",
    "Make a set, flip through the cards, shuffle, repeat. Your sets stay in this browser.",
  );
  subHeading.className = "homeSub";

  // Goes through the menu button, so the menu shows the right page as current.
  const start = createElement("button", "Open my card sets");
  start.type = "button";
  start.className = "pill";
  start.setAttribute("data-cy", "home-cta");
  start.addEventListener("click", () => {
    document.querySelector('[data-cy="nav-cardset"]').click();
  });

  const text = document.createElement("div");
  text.append(header, subHeading, start);

  const photo = document.createElement("figure");
  photo.className = "photo";
  photo.append(createImage(homePageImage, "Desk with laptops"));

  const homeContainer = document.createElement("div");
  homeContainer.className = "home";
  homeContainer.setAttribute("data-cy", "home-page");
  homeContainer.append(text, photo);

  main.append(homeContainer);
};

export { renderHomePage };

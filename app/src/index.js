import "@fontsource-variable/syne";
import "@fontsource-variable/dm-sans";
import { renderHomePage } from "./homePage.js";
import { renderAboutPage } from "./aboutPage.js";
import { renderCardSetsPage } from "./cardSetsPage.js";

// Menu button (by its data-cy) -> the page it opens.
const pages = {
  "nav-home": renderHomePage,
  "nav-about": renderAboutPage,
  "nav-cardset": renderCardSetsPage,
};

const menuButton = (name) => document.querySelector(`[data-cy="${name}"]`);

// Opens a page and marks its menu button as the current one.
function open(name) {
  for (const other of Object.keys(pages)) {
    menuButton(other)?.removeAttribute("aria-current");
  }
  menuButton(name)?.setAttribute("aria-current", "page");
  pages[name]();
}

document.addEventListener("DOMContentLoaded", () => {
  for (const name of Object.keys(pages)) {
    menuButton(name)?.addEventListener("click", () => open(name));
  }
  open("nav-home");
});

import { renderHomePage } from "./homePage.js";
import { renderAboutPage } from "./aboutPage.js";
import { renderCardSetsPage } from "./cardSetsPage.js";

const pick = (dataCy, id) =>
  document.querySelector(`[data-cy="${dataCy}"]`) ||
  document.getElementById(id);

function wireNavigation() {
  const homeEl = pick("nav-home", "homePage");
  const aboutEl = pick("nav-about", "aboutPage");
  const cardEl = pick("nav-cardset", "cardSetPage");

  homeEl?.addEventListener("click", (e) => {
    e.preventDefault?.();
    renderHomePage();
  });
  aboutEl?.addEventListener("click", (e) => {
    e.preventDefault?.();
    renderAboutPage();
  });
  cardEl?.addEventListener("click", (e) => {
    e.preventDefault?.();
    renderCardSetsPage();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  wireNavigation();
  renderHomePage();
});

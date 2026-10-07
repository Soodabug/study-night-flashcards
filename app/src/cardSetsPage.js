// The library: every study set as a tile, and the form to make a new set.
import { cardSets } from "../data/data.js";
import { renderFlashCards } from "./cardsPage.js";
import { createSetForm } from "./createSet.js";
import { createHeader, createToggleButton } from "./utilityRenderFunctions.js";

export const renderCardSetsPage = () => {
  const container = document.createElement("div");
  container.setAttribute("data-cy", "card-sets-page");

  const pageHeader = createHeader("h2", "Your study sets", "study-set-header");

  const form = createSetForm(cardSets);

  const toggleFormButton = createToggleButton("New set", form);
  toggleFormButton.className = "pill";
  toggleFormButton.setAttribute("data-cy", "toggle_form");

  const head = document.createElement("div");
  head.className = "pageHead";
  head.append(pageHeader, toggleFormButton);

  container.append(head, form, createCardSets());

  const main = document.querySelector("main");
  main.innerHTML = "";
  main.append(container);
};

// One tile. Clicking it opens the cards of that set.
const createSetTile = (set) => {
  const title = document.createElement("span");
  title.className = "setTitle";
  title.textContent = set.title;

  const count = document.createElement("span");
  count.className = "setCount";
  count.textContent = `Terms: ${set.cards.length}`;

  const tile = document.createElement("button");
  tile.type = "button";
  tile.className = "setCard";
  tile.setAttribute("data-cy", set.id);
  tile.append(title, count);
  tile.addEventListener("click", () => renderFlashCards(set.cards));

  const item = document.createElement("li");
  item.append(tile);
  return item;
};

const createCardSets = () => {
  const list = document.createElement("ul");
  list.className = "setGrid";
  list.append(...cardSets.map(createSetTile));
  return list;
};

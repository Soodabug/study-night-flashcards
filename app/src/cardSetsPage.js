import { cardSets } from "../data/data.js";
import { renderFlashCards } from "./cardsPage.js";
import { createSetForm } from "./createSet.js";
import { createHeader, createToggleButton } from "./utilityRenderFunctions.js";

export const renderCardSetsPage = () => {
  const container = document.createElement("div");
  container.className = "cardPageContainer";
  container.setAttribute("data-cy", "card-sets-page");

  const pageHeader = createHeader(
    "h2",
    "Study Set Library",
    "study-set-header",
  );

  const sets = createCardSets();
  const form = createSetForm(cardSets);

  const toggleFormButton = createToggleButton("Add New Set", form);
  toggleFormButton.setAttribute("data-cy", "toggle_form");

  container.append(pageHeader, sets, toggleFormButton, form);

  const main = document.querySelector("main");
  main.innerHTML = "";
  main.append(container);
};

const createSetPreviewCard = (set, setContainer) => {
  const setCard = document.createElement("ul");
  setCard.className = "cardSets";
  setCard.setAttribute("data-cy", set.id);

  const liTitle = document.createElement("li");
  liTitle.textContent = set.title;

  const liNumberOfTerms = document.createElement("li");
  liNumberOfTerms.textContent = `Terms: ${set.cards.length}`;

  setCard.addEventListener("click", () => {
    document.querySelector("main").innerHTML = "";
    renderFlashCards(set.cards);
  });

  setCard.append(liTitle, liNumberOfTerms);
  setContainer.append(setCard);
};

const createCardSets = () => {
  const setContainer = document.createElement("ul");
  setContainer.className = "setContainer";
  cardSets.forEach((set) => createSetPreviewCard(set, setContainer));
  return setContainer;
};

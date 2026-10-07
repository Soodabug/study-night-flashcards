// The cards of one study set, one card at a time: flip, previous/next,
// shuffle, and the form to add a card.
import { renderCardForm } from "./createCard.js";
import { renderCardSetsPage } from "./cardSetsPage.js";
import { shuffle } from "./shuffle.js";
import { createToggleButton } from "./utilityRenderFunctions.js";

// One side of a flashcard ("term" is the front, "description" the back).
const renderSide = (text, className) => {
  const p = document.createElement("p");
  p.textContent = text;

  const div = document.createElement("div");
  div.className = className;
  div.setAttribute("data-cy", `card-${className}`);
  div.append(p);
  return div;
};

const generateFlashCard = (card) => {
  // The inner element is the one that turns around (see main.css).
  const innerCard = document.createElement("div");
  innerCard.className = "innerCard";
  innerCard.append(
    renderSide(card.term, "term"),
    renderSide(card.description, "description"),
  );

  const cardContainer = document.createElement("div");
  cardContainer.className = "cardContainer";
  cardContainer.setAttribute("data-cy", "flashcard");
  cardContainer.append(innerCard);

  // A click, Enter or Space flips the card, so it works with a mouse,
  // on a touch screen and with the keyboard.
  cardContainer.tabIndex = 0;
  cardContainer.setAttribute("role", "button");
  cardContainer.setAttribute("aria-label", "Flip card");
  const flip = () => cardContainer.classList.toggle("flipped");
  cardContainer.addEventListener("click", flip);
  cardContainer.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      flip();
    }
  });

  return cardContainer;
};

const createButton = (text, dataCy, onClick, className = "pill light") => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = text;
  btn.className = className;
  btn.setAttribute("data-cy", dataCy);
  btn.addEventListener("click", onClick);
  return btn;
};

// Shows the card at `index` of the set (an array of cards).
const renderFlashCards = (set, index = 0) => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const container = document.createElement("div");
  container.className = "cardPage";

  const back = createButton(
    "All sets",
    "back-to-sets",
    renderCardSetsPage,
    "backLink",
  );
  const top = document.createElement("div");
  top.className = "cardPageTop";
  top.append(back);
  container.append(top);

  if (set.length !== 0) {
    const counter = document.createElement("p");
    counter.className = "counter";
    counter.setAttribute("data-cy", "card-counter");
    counter.textContent = `${index + 1} / ${set.length}`;
    top.append(counter);

    const hint = document.createElement("p");
    hint.className = "flipHint";
    hint.textContent = "Click the card to see the other side";

    // Previous on the first card goes to the last one, Next on the last to the first.
    const previousBtn = createButton("Previous", "card-previous", () => {
      renderFlashCards(set, index > 0 ? index - 1 : set.length - 1);
    });
    const nextBtn = createButton("Next", "card-next", () => {
      renderFlashCards(set, index < set.length - 1 ? index + 1 : 0);
    });

    const cardNav = document.createElement("div");
    cardNav.className = "cardNav";
    cardNav.append(previousBtn, nextBtn);

    container.append(generateFlashCard(set[index]), hint, cardNav);
  } else {
    const empty = document.createElement("p");
    empty.className = "emptySet";
    empty.textContent = "This set has no cards yet. Add the first one below.";
    container.append(empty);
  }

  const form = renderCardForm(set);
  form.className = "panel notVisible";

  const addCardBtn = createToggleButton("Add new card", form);
  addCardBtn.className = "pill";
  addCardBtn.setAttribute("data-cy", "toggle_form");

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  if (set.length > 1) {
    toolbar.append(
      createButton("Shuffle cards", "shuffle", () => shuffleCards(set), "pill"),
    );
  }
  toolbar.append(addCardBtn);

  container.append(toolbar, form);
  main.append(container);
};

// Shuffles the set itself instead of showing a shuffled copy.
// With a copy, a card added after shuffling went into the copy and was lost.
const shuffleCards = (set) => {
  const shuffledCards = shuffle(set);
  set.splice(0, set.length, ...shuffledCards);
  renderFlashCards(set);
};

export { renderSide, generateFlashCard, renderFlashCards };

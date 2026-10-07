// The first sample set is "Web Dev Flash Cards"; its first card is "HTML".
const openFirstSet = () => {
  cy.visit("/");
  cy.get('[data-cy="nav-cardset"]').click();
  cy.get('[data-cy="1"]').click();
};

const addCard = (term, description) => {
  cy.get('[data-cy="toggle_form"]').click();
  if (term) cy.get('[data-cy="card-term-input"]').type(term);
  if (description)
    cy.get('[data-cy="card-description-input"]').type(description);
  cy.get('[data-cy="card-submit"]').click();
};

describe("Cards", () => {
  beforeEach(openFirstSet);

  it("shows the first card of the set", () => {
    cy.get('[data-cy="card-term"]').should("contain", "HTML");
  });

  it("flips the card on click and back on a second click", () => {
    cy.get('[data-cy="flashcard"]').click();
    cy.get('[data-cy="flashcard"]').should("have.class", "flipped");

    cy.get('[data-cy="flashcard"]').click();
    cy.get('[data-cy="flashcard"]').should("not.have.class", "flipped");
  });

  it("flips the card with the keyboard", () => {
    cy.get('[data-cy="flashcard"]').focus();
    cy.get('[data-cy="flashcard"]').type("{enter}");
    cy.get('[data-cy="flashcard"]').should("have.class", "flipped");
  });

  it("goes to the next card and wraps around with Previous", () => {
    cy.get('[data-cy="card-next"]').click();
    cy.get('[data-cy="card-term"]').should("contain", "CSS");

    cy.get('[data-cy="card-previous"]').click();
    cy.get('[data-cy="card-term"]').should("contain", "HTML");

    // Previous on the first card jumps to the last one.
    cy.get('[data-cy="card-previous"]').click();
    cy.get('[data-cy="card-term"]').should("not.contain", "HTML");
  });

  it("shows an error when the card form is empty", () => {
    addCard("", "");
    cy.get('[data-cy="form-error"]').should(
      "contain",
      "TERM AND DESCRIPTION CANNOT BE EMPTY",
    );
  });

  it("shows an error when only the description is missing", () => {
    addCard("Flexbox", "");
    cy.get('[data-cy="form-error"]').should(
      "contain",
      "DESCRIPTION CANNOT BE EMPTY",
    );
  });

  it("treats spaces as empty", () => {
    addCard("   ", "   ");
    cy.get('[data-cy="form-error"]').should("be.visible");
  });

  it("adds a card and shows it", () => {
    addCard("Flexbox", "One-dimensional layout");
    cy.get('[data-cy="card-term"]').should("contain", "Flexbox");
    cy.get('[data-cy="card-description"]').should(
      "contain",
      "One-dimensional layout",
    );
  });

  it("keeps a card that was added after shuffling", () => {
    cy.get('[data-cy="shuffle"]').click();
    addCard("Grid", "Two-dimensional layout");

    cy.get('[data-cy="nav-cardset"]').click();
    cy.get('[data-cy="1"]').click();

    // Walk through the whole set: the new card has to be in it.
    const seen = [];
    const collect = (remaining) => {
      cy.get('[data-cy="card-term"]')
        .invoke("text")
        .then((text) => {
          seen.push(text);
          if (remaining > 0) {
            cy.get('[data-cy="card-next"]').click();
            collect(remaining - 1);
          }
        });
    };
    collect(30);
    cy.then(() => expect(seen).to.include("Grid"));
  });
});

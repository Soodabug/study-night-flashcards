describe("Saved in the browser", () => {
  it("keeps a new set after a reload", () => {
    cy.visit("/");
    cy.get('[data-cy="nav-cardset"]').click();
    cy.get('[data-cy="toggle_form"]').click();
    cy.get('[data-cy="create-set-name"]').type("Biology");
    cy.get('[data-cy="create-set-submit"]').click();
    cy.get('[data-cy="card-sets-page"]').should("contain", "Biology");

    cy.reload();
    cy.get('[data-cy="nav-cardset"]').click();
    cy.get('[data-cy="card-sets-page"]').should("contain", "Biology");
  });

  it("keeps a new card after a reload", () => {
    cy.visit("/");
    cy.get('[data-cy="nav-cardset"]').click();

    cy.get('[data-cy="1"]')
      .invoke("text")
      .then((before) => {
        const count = Number(before.match(/Terms: (\d+)/)[1]);

        cy.get('[data-cy="1"]').click();
        cy.get('[data-cy="toggle_form"]').click();
        cy.get('[data-cy="card-term-input"]').type("DOM");
        cy.get('[data-cy="card-description-input"]').type(
          "Document Object Model",
        );
        cy.get('[data-cy="card-submit"]').click();

        cy.reload();
        cy.get('[data-cy="nav-cardset"]').click();
        cy.get('[data-cy="1"]').should("contain", `Terms: ${count + 1}`);
      });
  });

  it("starts with the sample sets when nothing is saved", () => {
    cy.visit("/");
    cy.get('[data-cy="nav-cardset"]').click();
    cy.get('[data-cy="card-sets-page"]').should(
      "contain",
      "Web Dev Flash Cards",
    );
  });
});

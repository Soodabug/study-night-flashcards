describe("Forms", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.get('[data-cy="nav-cardset"]').click();
    cy.get('[data-cy="toggle_form"]').click();
    cy.get('[data-cy="set_form"]').should("be.visible");
  });

  it("Create Set - empty input shows error", () => {
    cy.get('[data-cy="create-set-submit"]').click();
    cy.get('[data-cy="error-message"]').should("be.visible");
  });

  it("Create Set - valid input shows success", () => {
    cy.get('[data-cy="create-set-name"]').type("New Set");
    cy.get('[data-cy="create-set-submit"]').click();
    cy.get('[data-cy="toast-success"]').should("contain", "Set created");
  });
});

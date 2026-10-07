describe("Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates to Card Set page", () => {
    cy.get('[data-cy="nav-cardset"]').click();
    cy.get('[data-cy="card-sets-page"]').should("exist");
  });

  it("navigates to About page", () => {
    cy.get('[data-cy="nav-about"]').click();
    cy.get('[data-cy="about-page"]').should("exist");
  });

  it("navigates to Home page", () => {
    cy.get('[data-cy="nav-home"]').click();
    cy.get('[data-cy="home-page"]').should("exist");
  });
});

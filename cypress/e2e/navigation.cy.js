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

  // A picture that failed to load has no natural size.
  const pictureLoaded = (page) =>
    cy
      .get(`[data-cy="${page}"] img`)
      .should("be.visible")
      .and(($img) => expect($img[0].naturalWidth).to.be.greaterThan(0));

  it("shows the picture on the Home page", () => {
    pictureLoaded("home-page");
  });

  it("shows the picture on the About page", () => {
    cy.get('[data-cy="nav-about"]').click();
    pictureLoaded("about-page");
  });

  it("marks the current page in the menu", () => {
    cy.get('[data-cy="nav-home"]').should("have.attr", "aria-current", "page");

    cy.get('[data-cy="nav-about"]').click();
    cy.get('[data-cy="nav-about"]').should("have.attr", "aria-current", "page");
    cy.get('[data-cy="nav-home"]').should("not.have.attr", "aria-current");
  });

  it("opens the card sets from the button on the Home page", () => {
    cy.get('[data-cy="home-cta"]').click();
    cy.get('[data-cy="card-sets-page"]').should("exist");
    cy.get('[data-cy="nav-cardset"]').should(
      "have.attr",
      "aria-current",
      "page",
    );
  });

  it("navigates to Home page", () => {
    cy.get('[data-cy="nav-home"]').click();
    cy.get('[data-cy="home-page"]').should("exist");
  });
});

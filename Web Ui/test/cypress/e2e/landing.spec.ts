describe("Landing page", () => {
  it("is publicly accessible and exposes the authentication flow", () => {
    cy.visit("/");

    cy.contains("Todo para crear software").should("be.visible");
    cy.contains("button", "Comienza ahora").scrollIntoView().should("be.visible").click();
    cy.location("pathname").should("eq", "/login");
  });
});


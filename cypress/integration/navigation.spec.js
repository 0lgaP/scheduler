describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it('shoult navigate to Tuesday', () => {
    cy.visit("/");
    cy.get('ul > :nth-child(2)')
      .click()
      .should('have.class','day-list__item--selected')
  });

});
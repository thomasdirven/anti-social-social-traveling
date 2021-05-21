describe("show all trips on successful login", function () {
  beforeEach(function () {
    cy.login();
  });

  it("mock all trips get", function () {
    cy.server({ delay: 1000 });
    cy.route({
      method: "GET",
      url: "/api/trips",
      status: 200,
      response: "fixture:trips.json",
    });

    cy.visit("/");
    cy.get("[data-cy=tripCard]").should("have.length", 9);
  });

  it('on error should show error message', function() {
    cy.server();
    cy.route({
      method: 'GET',
      url: '/api/trips',
      status: 500,
      response: 'ERROR'
    });
    cy.visit('/');
    cy.get('[data-cy=appError]').should('be.visible');
});
});

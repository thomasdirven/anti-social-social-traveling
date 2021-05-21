describe("show my trips when accessing route MyTrips", function () {
  beforeEach(function () {
    cy.login();
  });

  it("mock myTrips get", function () {
    cy.server({ delay: 1000 });
    cy.route({
      method: "GET",
      url: "/api/trips/mytrips",
      status: 200,
      response: "fixture:myTripsThomas.json",
    });

    cy.visit("/trip/mytrips");
    cy.get("[data-cy=tripCard]").should("have.length", 5);
  });
});

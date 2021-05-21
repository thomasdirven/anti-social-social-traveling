describe('is site running', function() {
    it('our app runs', function() {
        cy.visit('/');
        cy.get('mat-card-header').should('be.visible');
    })
})
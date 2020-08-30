/// <reference types="cypress" />

Given(/^que o site não possui registros$/, () => {
	cy.server();

    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fixture:webtable-get-empty'
    }).as('getNewtable');
});

When(/^acessar a listagem$/, () => {
	cy.visit('WebTable.html');
});

Then(/^devo visualizar a listagem vazia$/, () => {
	cy.get('div[role=row]').should('have.length', 1);
});

Given(/^que o site possui apenas um registro$/, () => {
	cy.server();

    cy.route({
        method: 'GET',
        url: '**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fixture:webtable-get-only-one-user' // funciona com fx ou fixture (fx == abreviação de fixture)
    }).as('getNewtable');
});

Then(/^devo visualizar apenas um registro$/, () => {
	const user = {
        id: '5f41cf365d0e6510fa042567',
        firstName: 'Felipe',
        lastName: 'Machado',
        gender: 'Male',
        email: 'fgmachado0@gmail.com',
        phone: '51984947780'
    }

    cy.get('div[role=row] div[role=gridcell]').eq(0).find('div').as('gridCellEmail');
    cy.get('div[role=row] div[role=gridcell]').eq(1).find('div').as('gridCellFirstName');
    cy.get('div[role=row] div[role=gridcell]').eq(2).find('div').as('gridCellGender');
    cy.get('div[role=row] div[role=gridcell]').eq(3).find('div').as('gridCellLastName');
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone');

    cy.get('@gridCellEmail').should('contain.text', user.email);
    cy.get('@gridCellFirstName').should('contain.text', user.firstName);
    cy.get('@gridCellGender').should('contain.text', user.gender);
    cy.get('@gridCellLastName').should('contain.text', user.lastName);
    cy.get('@gridCellPhone').should('contain.text', user.phone);
});

/// <reference types="cypress" />

import Chance from 'chance';

context('Cadastro', () => {
    it('Cadastro de usuário no site', () => {
        // Rotas
        registrarRotas();

        // Acessando a página de cadastro
        cy.visit('Register.html');

        // Preenchendo os campos
        preencherCadastro();
       
        // Submeter formulário
        cy.get('button#submitbtn').click();

        // Esperando retorno das requisições
        cy.wait('@postNewtable').then(res => {
            expect(res.status).to.eq(200);
        });

        cy.wait('@postUsertable').then(res => {
            expect(res.status).to.eq(200);
        });

        cy.wait('@getNewtable').then(res => {
            expect(res.status).to.eq(200);
        });

        cy.url().should('contain', 'WebTable.html');
    });
});

function registrarRotas() {
    cy.server();

    cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('postNewtable');
    cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**').as('postUsertable');
    cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**').as('getNewtable');
}

function preencherCadastro() {
    let chance = new Chance();

    const usuario = {
        firstName: chance.first(),
        lastName: chance.last(),
        email: chance.email(),
        phone: chance.phone({ formatted: false }),
        gender: 'FeMale',
        hobbies: [
            'Movies'
        ]
    }

    // textbox
    cy.get('input[ng-model=FirstName]').type(usuario.firstName);
    cy.get('input[ng-model=LastName]').type(usuario.lastName);
    cy.get('input[ng-model=EmailAdress]').type(usuario.email);
    cy.get('input[ng-model=Phone]').type(usuario.phone);

    // checkbox e radio buttons
    cy.get('input[value=' + usuario.gender + ']').check();
    usuario.hobbies.forEach(hobbie => cy.get('input[type=checkbox]').check(hobbie));

    // select e select2
    cy.get('select#Skills').select('Engineering');
    cy.get('select#countries').select('Argentina');
    cy.get('select#country').select('Australia', { force: true });
    cy.get('select#yearbox').select('1986');
    cy.get('select[ng-model=monthbox').select('June');
    cy.get('select#daybox').select('21');

    cy.get('input#firstpassword').type('AlunoTeste123');
    cy.get('input#secondpassword').type('AlunoTeste123');

    // upload de arquivos
    cy.get('input#imagesrc').attachFile('photo.png');
}
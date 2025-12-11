describe('Бургер конструктор тесты', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', {
      fixture: 'ingredients.json'
    }).as('ingredients');

    cy.intercept('GET', '**/auth/user', {
      fixture: 'user.json'
    }).as('user');

    cy.intercept('POST', '**/orders', {
      fixture: 'order.json'
    }).as('order');

    window.localStorage.setItem('accessToken', 'mock-access');
    window.localStorage.setItem('refreshToken', 'mock-refresh');

    cy.visit('/');
    cy.wait('@ingredients');
  });

  it('Добавление ингредиентов в конструктор', () => {
    cy.contains('[data-test=ingredient-card]', 'Булка R2-D3')
      .parent()
      .find('.common_button')
      .click();

    cy.contains('[data-test=ingredient-card]', 'Соус Space')
      .parent()
      .find('.common_button')
      .click();

    cy.get('[data-test=constructor-element]').should('have.length.at.least', 2);
  });

  it('Открытие страницы ингредиента', () => {
    cy.get('[data-test=ingredient-card]').first().click();

    cy.url().should('include', '/ingredients/');

    cy.get('[data-test=ingredient-details]').should('exist');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    cy.get('[data-test=ingredient-card]').first().click();

    cy.get('[data-test=modal]').should('exist');

    cy.get('[data-test=modal-close]').click();
    cy.get('[data-test=modal]').should('not.exist');

    cy.get('[data-test=ingredient-card]').eq(1).click();

    cy.get('[data-test=modal-overlay]').click({ force: true });
    cy.get('[data-test=modal]').should('not.exist');
  });

  it('Оформление заказа', () => {
    cy.contains('[data-test=ingredient-card]', 'Булка R2-D3')
      .parent()
      .find('.common_button')
      .click();

    cy.contains('[data-test=ingredient-card]', 'Соус Space')
      .parent()
      .find('.common_button')
      .click();

    cy.contains('[data-test=ingredient-card]', 'Мясо')
      .parent()
      .find('.common_button')
      .click();

    cy.get('[data-test=order-button]').click();

    cy.wait('@order');

    cy.get('[data-test=modal]').should('exist');

    cy.get('[data-test=order-number]').should('contain', '987654');

    cy.get('[data-test=modal-close]').click();
    cy.get('[data-test=modal]').should('not.exist');

    cy.get('[data-test=constructor-element]').should('have.length', 0);
  });
});

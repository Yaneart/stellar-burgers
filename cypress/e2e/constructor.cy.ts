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

    cy.setCookie('accessToken', 'mock-access');
    cy.setCookie('refreshToken', 'mock-refresh');

    cy.visit('/');
    cy.wait('@ingredients');
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    cy.clearCookie('refreshToken');
    cy.clearLocalStorage();
  });

  it('Добавление ингредиентов в конструктор', () => {
    // Только через .common_button получилось :(
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

  it('Открытие ингредиента и проверка содержимого', () => {
    cy.get('[data-test=ingredient-card]').first().click();

    cy.url().should('include', '/ingredients/');

    cy.get('[data-test=modal]').should('exist');
    cy.get('[data-test=ingredient-details]').should('exist');

    cy.get('[data-test=ingredient-image]')
      .should('exist')
      .and('have.attr', 'src')
      .and('include', 'bun-large.png');

    cy.get('[data-test=ingredient-name]').should('contain', 'Булка R2-D3');

    cy.get('[data-test=ingredient-calories]').should('contain', '450');

    cy.get('[data-test=ingredient-proteins]').should('contain', '80');

    cy.get('[data-test=ingredient-fat]').should('contain', '20');

    cy.get('[data-test=ingredient-carbohydrates]').should('contain', '40');

    cy.contains('Калории, ккал').should('exist');
    cy.contains('Белки, г').should('exist');
    cy.contains('Жиры, г').should('exist');
    cy.contains('Углеводы, г').should('exist');
  });

  it('Открытие и закрытие модального окна ингредиента', () => {
    cy.get('[data-test=ingredient-card]').first().click();

    cy.get('[data-test=modal]').should('exist');

    cy.get('[data-test=modal-close]').click();
    cy.get('[data-test=modal]').should('not.exist');

    cy.get('[data-test=ingredient-card]').eq(1).click();

    cy.get('[data-test=modal-overlay]').click({ force: true });
    cy.get('[data-test=modal]').should('not.exist');

    cy.get('[data-test=ingredient-card]').eq(2).click();
    cy.get('body').type('{esc}');
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

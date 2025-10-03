const API_URL = Cypress.env('BURGER_API_URL');

Cypress.on('uncaught:exception', () => {
  return false;
});

beforeEach(() => {
  window.localStorage.setItem('refreshToken', 'refreshToken');
  cy.setCookie('accessToken', 'accessToken');
  cy.fixture('ingredients.json')
    .then((ingredients) => {
      cy.intercept(
        {
          method: 'GET',
          url: `${API_URL}/ingredients`
        },
        ingredients
      );
    })
    .as('getIngredients');
  cy.visit('/');
  cy.wait('@getIngredients');

  cy.fixture('user.json').then((user) => {
    cy.intercept(
      {
        method: 'GET',
        url: `${API_URL}/auth/user`
      },
      user
    ).as('getUser');
  });
});

afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});

describe('test', () => {
  it('server localhost:4000', () => {});

  it('Добавление ингредиентов', () => {
    cy.get('[data-cy=bun-0]' + ' button').as('bun');
    cy.get('[data-cy=ingredient-0]' + ' button').as('ingredient');

    cy.get('[data-cy=no-bun-top]').contains('Выберите булки');
    cy.get('[data-cy=no-ingredients]').contains('Выберите начинку');
    cy.get('[data-cy=no-bun-bottom]').contains('Выберите булки');

    cy.get('@bun').click();
    cy.get('@ingredient').click({ multiple: true });

    cy.get(`[data-cy=burger-constructor]`).contains('булка');
    cy.get(`[data-cy=ingredient-item]`);
  });

  it('Открытие закрытие модального окна', () => {
    cy.get('[data-cy=bun-0]').click({ multiple: true });
    cy.get('[data-cy=bun-0]').then((item) => {
      const nameModal = item.find('p').eq(1).text();
      cy.get('h3').eq(4).should('have.text', nameModal);
    });
    cy.get('[data-cy=close-modal]').click();
  });

  it('Создание нового заказа', () => {
    cy.get('[data-cy=bun-0]' + ` button`).as('bun');
    cy.get('[data-cy=ingredient-0]' + ` button`).as('ingredient');

    cy.get('@bun').click();
    cy.get('@ingredient').click({ multiple: true });

    cy.fixture('addNewOrder.json').then((newOrder) => {
      cy.intercept(
        {
          method: 'POST',
          url: `${API_URL}/orders`
        },
        newOrder
      ).as('addNewOrder');
    });

    cy.get('[data-cy=new-order]' + ' button').click();
    cy.wait('@addNewOrder').then((order) => {
      const orderNumber = order.response?.body.order.number;
      cy.get('[data-cy=new-order]').contains(orderNumber);
    });

    cy.get('[data-cy=close-modal]').click();

    cy.get('[data-cy=no-bun-top]').contains('Выберите булки');
    cy.get('[data-cy=no-ingredients]').contains('Выберите начинку');
    cy.get('[data-cy=no-bun-bottom]').contains('Выберите булки');
  });
});

const API_URL = Cypress.env('BURGER_API_URL');
const BUN_0 = '[data-cy=bun-0]';
const INGREDIENT_0 = '[data-cy=ingredient-0]';
const NO_BUN_TOP = '[data-cy=no-bun-top]';
const NO_BUN_BOTTOM = '[data-cy=no-bun-bottom]';
const NO_INGREDIENTS = '[data-cy=no-ingredients]';
const NEW_ORDER = '[data-cy=new-order]';
const CLOSE_MODAL = '[data-cy=close-modal]';
const BURGER_CONSTRUCTOR = `[data-cy=burger-constructor]`;
const BUN_0_BUTTON = '[data-cy=bun-0] button';
const INGREDIENT_0_BUTTON = '[data-cy=ingredient-0] button';
const NEW_ORDER_BUTTON = '[data-cy=new-order] button';
const INGREDIENT_ITEM = `[data-cy=ingredient-item]`;

Cypress.on('uncaught:exception', () => {
  return false;
});

beforeEach(() => {
  window.localStorage.setItem('refreshToken', 'refreshToken');
  cy.setCookie('accessToken', 'accessToken');
  cy.fixture('ingredients.json')
    .then((ingredients) => {
      cy.intercept('GET', `api/ingredients`, ingredients);
    })
    .as('getIngredients');

  cy.visit('/');
  cy.wait('@getIngredients');

  cy.fixture('user.json')
    .then((user) => {
      cy.intercept('GET', `api/auth/user`, user);
    })
    .as('getUser');
});

afterEach(() => {
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});

describe('test', () => {
  it('server localhost:4000', () => {});

  it('Добавление ингредиентов', () => {
    cy.get(BUN_0_BUTTON).as('bun');
    cy.get(INGREDIENT_0_BUTTON).as('ingredient');

    cy.get(NO_BUN_TOP).contains('Выберите булки');
    cy.get(NO_INGREDIENTS).contains('Выберите начинку');
    cy.get(NO_BUN_BOTTOM).contains('Выберите булки');

    cy.get('@bun').click();
    cy.get('@ingredient').click({ multiple: true });

    cy.get(BURGER_CONSTRUCTOR).contains('булка');
    cy.get(INGREDIENT_ITEM);
  });

  it('Открытие закрытие модального окна', () => {
    cy.get(BUN_0).click({ multiple: true });
    cy.get(BUN_0).then((item) => {
      const nameModal = item.find('p').eq(1).text();
      cy.get('h3').eq(4).should('have.text', nameModal);
    });
    cy.get(CLOSE_MODAL).click();
  });

  it('Создание нового заказа', () => {
    cy.get(BUN_0_BUTTON).as('bun');
    cy.get(INGREDIENT_0_BUTTON).as('ingredient');

    cy.get('@bun').click();
    cy.get('@ingredient').click({ multiple: true });

    cy.fixture('addNewOrder.json')
      .then((newOrder) => {
        cy.intercept('POST', `api/orders`, newOrder).as('addNewOrder');
      })
      .as('addNewOrder');

    cy.get(NEW_ORDER_BUTTON).click();
    cy.wait('@addNewOrder').then((order) => {
      const orderNumber = order.response?.body.order.number;
      cy.get(NEW_ORDER).contains(orderNumber);
    });

    cy.get(CLOSE_MODAL).click();

    cy.get(NO_BUN_TOP).contains('Выберите булки');
    cy.get(NO_INGREDIENTS).contains('Выберите начинку');
    cy.get(NO_BUN_BOTTOM).contains('Выберите булки');
  });
});

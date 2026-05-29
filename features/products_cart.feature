@regression @cart @products
Feature: Product and cart management
  As a shopper
  I want to search and add products to cart
  So that I can prepare my purchase

  Background:
    Given the user opens the automation exercise home page

  Scenario: Search product with a valid keyword
    When the user opens products page
    And searches for product keyword "Blue Top"
    Then relevant searched products should be shown for "Blue Top"

  Scenario: Search product with non-existent keyword
    When the user opens products page
    And searches for product keyword "NotARealProduct123"
    Then no products should be returned

  Scenario: Add product to cart
    When the user opens products page
    And adds the first listed product to cart
    And opens cart page
    Then the cart should contain products

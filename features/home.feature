@smoke @regression
Feature: Home page and newsletter subscription
  As a user
  I want to access the home page and subscribe to updates
  So that I can stay informed

  Background:
    Given the user opens the automation exercise home page

  Scenario: Validate home page loads successfully
    Then the home page should be displayed

  Scenario: Subscribe to newsletter from footer
    When the user subscribes with a unique email address
    Then a subscription success message should be shown

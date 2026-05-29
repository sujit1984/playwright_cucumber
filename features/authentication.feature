@regression @auth
Feature: Authentication and account lifecycle
  As a visitor
  I want to register and login
  So that I can access account-specific features

  Background:
    Given the user opens the automation exercise home page

  Scenario: Register a new account and delete it
    When the user registers with valid details
    Then the user should be logged in
    And the user deletes the account

  Scenario: Login with invalid credentials should fail
    When the user navigates to signup login page
    And the user logs in with invalid credentials
    Then an authentication error should be displayed

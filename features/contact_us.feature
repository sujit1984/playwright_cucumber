@regression @contact
Feature: Contact us form flow
  As a user
  I want to contact support
  So that I can share issues or feedback

  Background:
    Given the user opens the automation exercise home page

  Scenario: Submit contact us form with attachment
    When the user opens contact us page
    And submits the contact form with valid data
    Then a contact form success message should be shown

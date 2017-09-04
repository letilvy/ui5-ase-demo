Feature: Worklist - First Gherkin

  Background:
    Given I start my app

  Scenario: Should see the table with all Posts
	When on the worklist page: i look at the screen
	Then on the worklist page: the title should display the total amount of items
	
  Scenario: Should see the table with all Posts
	When on the worklist page: i search for Bike Rack
	Then on the worklist page: the table has one item
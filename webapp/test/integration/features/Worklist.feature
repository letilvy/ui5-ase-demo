Feature: Worklist

  Background:
    Given I start my app

  Scenario: Should see the table with amount of items
	When on the worklist page: I look at the screen
	Then on the worklist page: the title should display the total amount of items

  Scenario: Should see the table with all Posts
	When on the worklist page: I press on more data
	Then on the worklist page: the table should have all entries
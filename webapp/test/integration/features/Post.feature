Feature: Post

  Background:
    Given I start my app

  Scenario Outline: Should see the post page when click on an entry of the list and back to worklist page by click back button
	When on the worklist page: I press on the item with the name "<POST_NAME>"
	Then on the post page: the title should display the name "<POST_NAME>"

	When on the post page: I press the back button
	Then on the worklist page: I should see the table
	
	When on the browser: I press on the forward button
	Then on the post page: the title should display the name "<POST_NAME>"
	
	When on the post page: I press on the tab "statistics"
	Then on the post page: I should see the view counter
	
	Examples:
    | POST_NAME    |
    | Jeans        |
    | Screwdrivers |
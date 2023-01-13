# Exercise: Gherkin

### User Story 1: Worklist
Test worklist page display via gherkin

### Acceptance Criteria
AC1: given I start my app, when I look at the screen, then the title should display the total amount of items

AC2: given I start my app, when I press on more data, then the table should display all entries
### Mockup
![image](https://github.com/letilvy/ui5-ase-demo/blob/gherkin/mockup/morebutton.png)

### User Story 2: Navigation
Test all navigations of app via gherkin

### Acceptance Criteria
AC1: given I start my app, when I press on the item with the name "<POST_NAME>", then app should navigate to post detail page and title should display the name "<POST_NAME>".

AC2: given I navigate to post detail page, when I press the back button, then I should navigate back to worklist page and see the table.

AC3: given I naviagte back from post detail page, when I press on the forward button of browser, then app should navigate to post detail page and title should display the name "<POST_NAME>".

AC4: given I open the post detail page, when I press on the tab "Statistics", then I should see the view counter.
### Mockup
![image](https://github.com/letilvy/ui5-ase-demo/blob/gherkin/mockup/navigation.png)
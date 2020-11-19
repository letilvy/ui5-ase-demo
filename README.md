BackstopJS automates visual regression testing of your web UI by comparing DOM screenshots over time. The following chart shows the test workflow of BackstopJS.

![alt tag](https://github.com/letilvy/image-source/blob/main/BackstopJS_workflow.png)
 
Before changing the code, reference screenshots will be created. These screenshots record the origin UI appearance. After code change, when test is triggered, new screenshots will be created and compared with reference screenshots. Each test case has two screenshots. One for reference and the other for test. If degree of difference between these two screenshots is larger than the threshold, case will be failed. Test report highlights this difference as follow:
 
A successful test case looks like:
    
Run BackstopJS Regression Test of SAP for Me
Currently, test cases for welcome and home page have been created to cover features of SAP for Me Beta. BackstopJS test folder locates in shell/webapp/test/visual/ of forme-frontend code. All configuration and test cases are maintained in file 'backstop.json'.
A BackstopJS test case goes simply like:
  
For the meaning of each property here, you can find in the github link Using BackstopJS.
To run the regression test, you can follow these steps:

 Step 1. Install BackstopJS
$ npm install -g backstopjs
Note: make sure you have the “write” authorization on the “node_modules” folder (on Mac, the folder path is /usr/local/lib/node_modules). Or you may encounter the puppeteer installation error.

Step 2. Start forme-frontend locally
$ gulp dev

Step 3. Open 'backstop.json', find and replace all url to your local url/dev url
 
In step 2, forme-frontend may be started on a special port which is different from the one configured in the 'backstop.json'. So purpose of this step is to make sure test will be run on the right UI.

Step 4. Create reference screenshots before your code change. 
Run following command in folder shell/webapp/test/visual/:
$ backstop reference
This will create a reference folder with all the reference screenshots.

Step 5. After you have some code change in local, before you submit your code, run the following command to trigger the test. 
$ backstop test
After the test finish, a report file will be open automatically with all the comparison listed like:
 
You can check the report to see if there is any regression issue which is brought by your code change.
You can also refer to BackstopJS Github repository if you want to create new test case which make your change regression free.
Since each BackstopJS test case has to restart the app then do the check, the performance of all test scenarios running is not so good. In case you only want to run part of the scenarios, you can pass a --filter=<scenarioLabelRegex> argument to just run scenarios matching your scenario label. For example, if you want to run only welcome page relative scenarios, you can use following command:
$ backstop test --filter=WelcomePage

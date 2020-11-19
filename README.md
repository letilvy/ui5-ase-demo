BackstopJS automates UI regression testing of your web UI by comparing DOM screenshots over time. The following chart shows the test workflow of BackstopJS.

![alt tag](https://github.com/letilvy/image-source/blob/main/BackstopJS_workflow.png)
 
Before changing the code, reference screenshots will be created. These screenshots record the origin UI appearance. After code change, when test is triggered, new screenshots will be created and compared with reference screenshots. Each test case has two screenshots. One for reference and the other for test. If degree of difference between these two screenshots is larger than the threshold, case will be failed. Test report highlights this difference.
 
To run the regression test, you can follow these steps:

### Step 1. Install BackstopJS
$ npm install -g backstopjs

Note: make sure you have the “write” authorization on the “node_modules” folder (on Mac, the folder path is /usr/local/lib/node_modules). Or you may encounter the puppeteer installation error.

### Step 2. Start application locally
$ http-server -p 1919

Open your application by the browser using http://localhost:1919/ui5-ase-demo/webapp/test/mockServer.html

### Step 3. Open 'backstop.json', find and replace all url to your local url
 

### Step 4. Create reference screenshots before your code change. 
Run following command in folder webapp/test/ui/:

$ backstop reference

This will create a reference folder with all the reference screenshots.

### Step 5. After you have some code change in local, before you submit your code, run the following command to trigger the test. 
$ backstop test

After the test finish, a report file will be open automatically with all the comparison listed.
 
You can check the report to see if there is any regression issue which is brought by your code change.

You can also refer to BackstopJS Github repository if you want to create new test case which make your change regression free.

Since each BackstopJS test case has to restart the app then do the check, the performance of all test scenarios running is not so good. In case you only want to run part of the scenarios, you can pass a --filter=<scenarioLabelRegex> argument to just run scenarios matching your scenario label. For example, if you want to run only welcome page relative scenarios, you can use following command:
 
$ backstop test --filter=Worklist

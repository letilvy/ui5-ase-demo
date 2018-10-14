# Exercise: OPA5 
### 1. Simple Navigation
Please write some OPA5 test cases to cover the single post navigation function 

e.g. 

When you click on post 'Car Tires, 22 Inch', then the detail page of this post should display
![image](https://user-images.githubusercontent.com/23159761/42684666-5f4184ba-86c3-11e8-87cf-522dc1b835aa.png)
![image](https://user-images.githubusercontent.com/23159761/42684688-698db9ca-86c3-11e8-90a9-639572ad9e65.png)


     
     
### 2. Start APP from the page of given hash value 
Please write some OPA5 test cases to:

     1. start your APP from Component( Opa5.iStartMyUIComponent )
    
     2. start your APP with one of detailed post page dispalyed directly

Hint:

     1. iStartMyAppInAFrame() -> iStartMyUIComponent
     
     2. make sure that test framework can find UIComponent of this appication
     
     3. mockserver should be ready before start to run test cases
     
     4. if not able to load mock data, maybe you should specify one of configuration parameter: 
     
          data-sap-ui-bindingSyntax = 'complex'


 

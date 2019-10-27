# ui5asedemo - Formatter
Demo App for UI5 ASE Training

# Part 1 - Simple Formatter in TDD:

1. Formats [value state](https://sapui5.hana.ondemand.com/#/api/sap.ui.core.ValueState) of price: 

   when price < 50, show Success state.
   
   when 50 <= price < 250, show None state.
   
   when 250 <= price < 2000, show Warning state.
   
   others, show Error state.
2. Formats value of price with 2 numbers of digits after the decimal point.
   
   
 # (Optional)Part 2 - Date Formatter:
 Formats a date into something readable
 
 1. today - a time format
 
 2. yesterday - Yesterday
 
 3. day of the current week - eg: Wednesday
 
 4. older dates - date formatted with the locale
 
 PS: you can make use of [sap.ui.core.format.DateFormat](https://sapui5.hana.ondemand.com/#/api/sap.ui.core.format.DateFormat/overview)
 

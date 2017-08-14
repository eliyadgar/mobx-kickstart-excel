# mobx-kickstart-excel

We're going to create a simplified spreadsheet, using React & MobX.
The spreadsheet will have a 10x10 table UI, and the user can input values in each cell, just like in excel.

## Getting started
- Fork this repository
- Run ```yarn && yarn run start```
- Open ```http://localhost:3000/```

## Requirements
- Create the app's store. The store should hold the app's data & state, as well as the API to interact with the data.
- Selecting a cell should display the selected cell's raw data in the formula input (simple value or formula)
- Changing the formula should be reflected in the UI (relevant cells should be updated)
- A cell's raw value can either be a simple number value (e.g. ```5```, ```2.3```) or a formula
  - Formulas begin with ```=```
  - Formulas can have mathematical computations (e.g. ```=8 + 5```)
  - Calculations can reference other cell's value (e.g. ```=A1 * 3```)
- Components should only render when their render's ouput changes!

## Some tips
- You can use the evil [eval](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/eval) function to evaluate formulas. ```eval``` takes any javascript expression and evaluates it (e.g. ```eval('2 * 5') // === 10```)
- Use [mobx-dev-tools](https://github.com/mobxjs/mobx-react-devtools) to see which of your components render and track changes in your store

### Bonus
- Auto Save 
  - Store the spreadsheet's data to localStorage when, reload the app with the stored data

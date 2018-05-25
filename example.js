const { 
  createRecipe,
  concat,
  hardCode,
  custom,
  directMap,
} = require('./index.js');

const fullName = concat('fname', 'lname');
const job = hardCode('Chef and legend');
const siblings = directMap('siblings.names');
const street = hardCode('Les Champs-Élysées');

const cook = createRecipe({
  fullName,
  job,
  siblings,
  address: {
    street,
  }
});

const myFreshCake = cook({
  fname: 'Julia',
  lname: 'Childs',
  siblings: {
    count: 4,
    names: ['Jack', 'Joe', 'John', 'Jerry']
  }
});

console.log(myFreshCake)
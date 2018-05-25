# kitchenette
kitchenette is a small, functional library for transforming JSON objects from one schema to another. 


# Installation
```
npm install kitchenette
```

# Getting Started

The key tenet of kitchenette is transformation by function. Take a look:

```
// We want to transform this object:

const oldObject = {
  first_name: 'Anthony',
  last_name: 'Somos',
  address: {
    primary: '100 Main Street',
    unit: '#6',
  }
} 

// Into this object:

const newObject = {
  full_name: 'Anthony Somos',
  full_address: '100 Main Street, #6",
  job: 'developer',
}
```
Give `kitchenette` the recipe for this transformation. Here's how you would do it:
```
const {
  createRecipe,
  concat,
  hardCode,
} = require('kitchenette');

const myTransformer = createRecipe({
  full_name: concat('first_name', 'last_name'),
  full_address: concat('address.primary', 'address.unit'),
  job: hardCode('developer'),
});

const newObject = myTransformer(oldObject)

console.log(newObject) 

//outputs: { full_name: 'Anthony Somos', ... }
```
Two things to notice here:
1. **Your recipe has the same shape as your final object**! This makes it easier to reason about your recipe. It also gives you the ability to completely separate your shape from your functions. The above example could also look like this:
```
// My values
const full_name = concat('first_name', 'last_name'),
const full_address = concat('address.primary', 'address.unit'),
const job = hardCode('developer'),

// My shape
const myTransformer = createRecipe({
  full_name,
  full_address,
  job,
});
```
2. **You can only create the values of your new object with a function.** This functional flavour makes your code more testable, easier to understand, and encourages reusability. But don't worry, we give you an extensible API with some helpers so that creating your values and your own functions is easy as pie.

So go and get cooking!

# API
## `createRecipe(recipe)`
Creates your object transformer from a recipe.
### Arguments:
**recipe *(object)*** The recipe which describes the object you are trying to create.
### Returns:
transformer *(function)* A function which takes your source object as an argument and transforms into your final object.

## `hardCode(value)`
Hard-codes a value for key being created.
### Arguments:
**value *(string)*** A value to be hardcoded as the value for the key.
### Example:
```
// In recipe:
name: hardCode('John Doe'), ...

// In final object:
name: 'John Doe', ...
```
## `directMap(path)`
Takes the value found at the path and applies to the key in the new object.
### Arguments:
**path *(string)*** The path to the value in the source object that you set as your value.
### Example:
```
// In source object:
{ firstName: 'John', ... }

// In recipe:
{ name: directMap('firstName'), ... }

// In final object:
{ name: 'John Doe', ... }
```

## `concat(...paths)`
Concatenates values into a string. Separates with a space.
### Arguments:
**paths *(string)*** The paths to the values in the source object that you want to be concatenated.
### Example:
```
// In source object:
{ firstName: 'John',
  otherNames: {
  lastName: 'Does', ... }

// In recipe:
{ name: concat('firstName', 'otherNames.lastName'), ... }

// In final object:
{ name: 'John Doe', ... }
```

## `custom(func, ...paths)`
Takes a custom function and at transformation time, feeds it the values found at your specified paths as arguments. The output is set as the value.
### Arguments:
**func *(function)*** Your custom function, that takes the values found at your paths as arguments, and outputs a value. You are responsible for dealing with corner cases such as `undefined` values.

**paths *(string)*** The paths to the values in the source object that you want to be concatenated.
### Example:
```
// My function
const addFrosting = (aName) => `${aName} with some frosting on top`

// In source object:
{ firstName: 'John', ... }

// In recipe:
{ name: custom(addFrosting, 'firstName'), ... }

// In final object:
{ name: 'John with some frosting on top', ... }
```

<!-- ### Thanks
Thanks to the folks at [Lodash](https://lodash.com/docs/4.17.10) for their work. A lot of code did not need to be written because of you guys. -->


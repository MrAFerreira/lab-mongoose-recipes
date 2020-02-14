const mongoose = require('mongoose');
const Recipe = require('./models/Recipe.model'); // Import of the model Recipe from './models/Recipe.model.js'
const data = require('./data'); // Import of the data from './data.json'

const MONGODB_URI = 'mongodb://localhost/recipeApp';

// Connection to the database "recipeApp"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connections[0].name}"`);
    return self.connection.dropDatabase();
  })
  // Run your code here, after you have insured that the connection was made
  .then(() => {
    return Recipe.create({
      title: 'Copycat Recipe',
      level: 'Amateur Chef',
      ingredients: [
        '1/2 cup rice vinegar',
        '5 tablespoons honey',
        '1/3 cup soy sauce (such as Silver Swan®)',
        '1/4 cup Asian (toasted) sesame oil',
        '3 tablespoons Asian chili garlic sauce',
        '3 tablespoons minced garlic',
        'salt to taste',
        '8 skinless, boneless chicken thighs'
      ],
      cuisine: 'Asian',
      dishType: 'Dish',
      image: 'https://images.media-allrecipes.com/userphotos/720x405/815964.jpg',
      duration: 40,
      creator: 'Chef LePapu'
    });
  })
  .then(recipeDoc => {
    console.log(recipeDoc.title);
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(multiRecipeDoc => {
    multiRecipeDoc.forEach(element => {
      console.log(element.title);
    });
  })
  .then(() => {
    return Recipe.findOneAndUpdate({ title: 'Rigatoni alla Genovese' }, { duration: 100 });
  })
  .then(() => {
    console.log('Successfully updated!');
  })
  .then(() => {
    return Recipe.findOneAndDelete({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Successfully deleted!');
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

const express = require('express');
const bodyParser = require('body-parser');
const knexConfig = require('./db/knexfile');
//initialize knex
const knex = require('knex')(knexConfig[process.env.NODE_ENV])

const app = express();
const port = 3000;
app.use(bodyParser.json());

//get users
app.get('/user', (req, res) => {
  knex('users')
  .select({
    userid: 'userid',
    name: 'name',
    email: 'email',
    pwd: 'pwd'
  })
  .then((users) => {
    return res.json(users);
  })
  .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.'});
  })
})

//after clearing the table
app.get('/del_all', (req, res) => {
  knex('users').del()
  .then((users) => {
    return res.json(users);
  })
  .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.'});
  })
})

//post users
app.post('/user', (req, res) => {
  const userid = req.body.userid ? req.body.userid : '';
  const name = req.body.name ? req.body.name : '';
  const email = req.body.email ? req.body.email : '';
  const pwd = req.body.pwd ? req.body.pwd : '';

  if (!name || !userid || !email || !pwd) {
    return res.json({success: false, message: 'Required details are missing!'});
  }

  //call back function
  knex('users')
    .insert({userid, name, email, pwd})
    .then((userid) => {
      //get user by id
      knex('users')
        .select({
          userid: 'userid',
          name: 'name',
          email: 'email',
          pwd: 'pwd'
        })
        .where({userid})
        .then((user) => {
          return res.json(user[0]);
        })
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
    });
})

//get recipes
app.get('/recipe', (req, res) => {
  knex('recipes')
  .select({
    userid: 'userid',
    recipe: 'recipe',
    skey: 'skey',
    created_date: 'created_date',
    timestamp: 'timestamp',
    is_del: 'is_del'
  })
  .then((recipes) => {
    return res.json(recipes);
  })
  .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.'});
  })
})

//post to recipes
app.post('/recipe', (req, res) => {
  const userid = req.body.userid ? req.body.userid : '';
  const recipe = req.body.recipe ? req.body.recipe : '';
  const skey = req.body.skey ? req.body.skey : '';
  const created_date = req.body.created_date ? req.body.created_date : '';
  const timestamp = req.body.timestamp ? req.body.timestamp: '';
  const is_del = req.body.is_del ? req.body.is_del: '';

  if (!userid || !recipe || !skey || !created_date || !timestamp || !is_del) {
    return res.json({success: false, message: 'Required details are missing!'});
  }

  //call back function
  knex('users')
    .insert({userid, recipe, skey, created_date, timestamp, is_del})
    .then((userid) => {
      //get user by id
      knex('users')
        .select({
          userid: 'userid',
          recipe: 'recipe',
          skey: 'skey',
          created_date: 'created_date',
          timestamp: 'timestamp',
          is_del: 'is_del'
        })
        .where({userid})
        .then((recipe) => {
          return res.json(recipe[0]);
        })
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
    });
})

//get last_accessed
app.get('/last_accessed', (req, res) => {
  knex('last_accessed')
  .select({
    userid: 'userid',
    timetamp: 'timetamp',
  })
  .then((last_accessed) => {
    return res.json(last_accessed);
  })
  .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.'});
  })
})

//post last_accessed
app.post('/user', (req, res) => {
  const userid = req.body.userid ? req.body.userid : '';
  const timestamp = req.body.timestamp ? req.body.timestamp : '';

  if (!userid || !timestamp) {
    return res.json({success: false, message: 'Required details are missing!'});
  }

  //call back function
  knex('users')
    .insert({userid, timestamp})
    .then((userid) => {
      //get user by id
      knex('recipes')
        .select({
          userid: 'userid',
          timestamp: 'timestamp'
        })
        .where({userid})
        .then((user) => {
          return res.json(user[0]);
        })
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.'});
    });
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

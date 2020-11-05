require('dotenv').config();
module.exports = {
  'development': {
    'username': process.env.DB_USER,
    'password': process.env.DB_PASS,
    'database': process.env.travel_db,
    'host': process.env.DB_HOST,
<<<<<<< HEAD
    'port': process.env.DB_PORT,
    'dialect': 'mysql'
  },
  'production': {
    'use_env_variable': 'JAWSDB_URL',
    'dialect': 'mysql'
  }
};
=======
    'port': process.env.localhost,

    //change
>>>>>>> 3372aace22f4a9d4eb663e22d8c7343222e0ee51

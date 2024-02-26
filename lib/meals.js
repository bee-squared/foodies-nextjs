/*
  with better-sqlite3, the below functions do the following
    - 'all' is used when you are fetching all the data in the sql command
    - 'run' is used when you are adding or changing data
    - 'get' returns a single row of data
*/

import sql from 'better-sqlite3';

const db = sql('meals.db');

export async function getMeals() {
  return db.prepare('SELECT * FROM meals').all();
}
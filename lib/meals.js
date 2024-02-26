/*
  with better-sqlite3, the below functions do the following
    - 'all' is used when you are fetching all the data in the sql command
    - 'run' is used when you are adding or changing data
    - 'get' returns a single row of data
*/

import sql from "better-sqlite3";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 3000)); // This is here if I want to force the loader, so I can see a slow fetch in progress
  throw new Error("Loading meals failed"); // Force an error to get thrown, so we can see how the error.js file gets displayed to the user
  return db.prepare("SELECT * FROM meals").all();
}

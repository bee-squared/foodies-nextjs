/*
  with better-sqlite3, the below functions do the following
    - 'all' is used when you are fetching all the data in the sql command
    - 'run' is used when you are adding or changing data
    - 'get' returns a single row of data
*/
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";
import fs from "node:fs";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000)); // This is here if I want to force the loader, so I can see a slow fetch in progress (and the only reason we would need an async reference in the function)
  // throw new Error("Loading meals failed"); // Force an error to get thrown, so we can see how the error.js file gets displayed to the user
  return db.prepare("SELECT * FROM meals").all();
}

export function getMeal(slug) {
  // using the ? (which is a dynamic field) instead of `slug` (which is insecure and opens you up to sql injection)
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }); // makes the content lowercase
  meal.instructions = xss(meal.instructions); // sanitizes the content and cleans it
  const extension = meal.image.name.split(".").pop();
  const fileName = `${meal.slug}.${extension}`;

  console.log("FIRST MEAL <><><><> ", extension, fileName);
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await meal.image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed", error);
    }
  });

  meal.image = `/images/${fileName}`; // no need to add public to the url since it's already the root when files are requested from the server

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )`,
  ).run(meal);
}

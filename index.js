import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "World",
  password: "Muscleblaze@123",
  port: 5432,
});
db.connect();
// let countries = [];
// db.query("SELECT * FROM public.visited_countries", (err, res) => {
//   if (err) console.error("Connection error", err.stack);
//   countries = res.rows;
// });
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM public.visited_countries")
  let country_code=[]
  result.rows.forEach((element)=>{
    country_code.push(element.country_code)
  })
  console.log(country_code)
  res.render("index.ejs", {
    total: result.rows.length,
    countries: country_code,
  });
  //Write your code here.
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

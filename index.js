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

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.post("/add" , async(req,res)=>{
  let country_code=[]
  // if ()
  // console.log(req.body)
  const result = await db.query("SELECT * FROM public.countries");
  // console.log(result.rows)
  result.rows.forEach((element)=>{
    if(element.country_name.toLowerCase() === req.body.country.toLowerCase()){
      country_code.push(element.country_code)
    }
  })
  if(country_code.length !=0){
    console.log("country code =",country_code)
    const checker = await db.query("SELECT country_code FROM public.visited_countries WHERE country_code = $1",country_code)
    // console.log("checker = ",checker.rows[0])
  
    if (checker.rows.length !=0){
      console.log("country already travelled")
    }else{
      db.query("INSERT INTO public.visited_countries(country_code) VALUES ($1);",country_code)
    }
    
  
    res.redirect("/")
  }else{
    console.log("invalid countryName")
    res.redirect("/")
  }

  
})

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM public.visited_countries")
  let country_code=[]
  result.rows.forEach((element)=>{
    country_code.push(element.country_code)
  })
  // console.log(country_code)
  res.render("index.ejs", {
    total: result.rows.length,
    countries: country_code,
  });
  //Write your code here.
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

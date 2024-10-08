const express = require("express");
const app = express();
const { neon } = require("@neondatabase/serverless");
const bodyParser = require("body-parser");
const path = require("path");

// const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
app.use(bodyParser.urlencoded({ extended: true }));
const sql = neon(
  `postgresql://potfoliodb_owner:VhuHpO1qA4aG@ep-icy-river-a5yhzrad-pooler.us-east-2.aws.neon.tech/potfoliodb?sslmode=require`
);

// use the express-static middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// define the first route
app.get("/", async (req, res) => {
  const edu = await sql`SELECT * FROM Education`;
  const work = await sql`SELECT * FROM Work`;

  try {
    const skill = await sql`SELECT * FROM skill`;
    res.setHeader("Content-Type", "text/html");
    res.render("index.ejs", { edu: edu, work: work, skill: skill });
    console.log(edu);
  } catch (err) {
    console.error(err);
  }
});

// start the server listening for requests
app.listen(process.env.PORT || 3000, () => console.log("Server is running..."));

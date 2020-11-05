const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const PORT = 4328;
const router = express.Router();
const request = require("request");

let axios = require("axios");
const { response } = require("express");

app.use(express.static(path.join(__dirname, "components")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Content-Length, X-Requested-With"
  );
  next();
});
// mongoose.set('debug', true)
mongoose.connect("mongodb://localhost/fullexg", { useNewUrlParser: true });

const Schema = mongoose.Schema;
const personSchema = new Schema({
  // _id: false,
  id: String,
  name: String,
  picture: String,
  headline: String,
  lastexperience: String,
  location: String,
  eduName: String,
  eduPdate: String,
  languages: Array,
  pcg: String,
});

const peoplecollection = mongoose.model(
  "peopleCollections",
  personSchema,
  "peopleCollections"
);

let nPerson;
app.get("/bios/:userName", function (req, res) {
  let userName = req.params.userName;
  request(`https://torre.bio/api/bios/${userName}`, async function (
    error,
    result,
    data
  ) {
    let parsData = await JSON.parse(data);
    let person = parsData.person;
    nPerson = new peoplecollection({
      id: person.id,
      name: person.name,
      picture: person.pictureThumbnail,
      headline: person.professionalHeadline,
      lastexperience:
        parsData.experiences[0].category +
        "  -  " +
        parsData.experiences[0].name,
      location: person.location.name,
      eduName: parsData.education[0].name,
      eduPdate:
        parsData.education[0].toMonth +
        " of year " +
        parsData.education[0].toYear,
      languages: parsData.languages,
      pcg:
        parsData.professionalCultureGenomeResults.groups[0].text +
        " , " +
        parsData.professionalCultureGenomeResults.groups[1].text,
    });
    res.send(nPerson);
  });
});

app.post("/jobs", async function (req, res) {
  let query = req.body.data;
  let offset = query.offset;
  let size = query.size;
  let aggregate = query.aggregate;

  // axios.post('https://search.torre.co/opportunities/_search/?', null, {
  // params: {offset,size,aggregate}}).then(response =>
  //   console.log(JSON.stringify(response.data))
  // )
  // .catch(error =>
  //   console.log(error)
  // )
  // res.send(response.data)
  var request = require("request");
  var options = {
    method: "POST",
    url:
      "https://search.torre.co/opportunities/_search/?&offset=0&size=1&aggregate=false",
    headers: {},
  };
  request(options, async function (error, response) {
    if (error)
      throw new Error(error);
    console.log(response.body);
    return res.send(response.body)
  });
});

app.listen(PORT, function () {
  console.log("run");
});

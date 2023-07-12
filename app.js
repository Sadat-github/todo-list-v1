const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));

var todoInputs = ["Buy Food", "Cook Food", "Eat Food"];
let workInputs = [];
let officeInputs = [];
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get("/", (req, res) => {
  var today = new Date();
  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  const day = today.toLocaleDateString("en-US", options);
  //en-US
  //bn-BD

  res.render('lists', {
    listTitle: day,
    newItems: todoInputs
  });

});

app.post("/", (req, res) => {
  var todoInput = req.body.input;
  console.log(req.body);
  if (req.body.list === "Work") {
    workInputs.push(todoInput);
    res.redirect("/work");
  } else if (req.body.list === "Office") {
    officeInputs.push(todoInput);
    res.redirect("/office");
  }
  else {
    todoInputs.push(todoInput);
    res.redirect("/");
  }

});

app.get("/work", (req, res) => {
  res.render('lists', {
    listTitle: "Work List",
    newItems: workInputs
  });
});

app.get("/office",(req,res)=>{
  res.render('lists',{listTitle: "Office Task", newItems: officeInputs});
});

app.get("/about",(req,res)=>{
  res.render('about');
}
);

app.listen(process.env.PORT || 3000, () => console.log("Server is running on port 3000!"));

var express = require('express');
var app = express();
var cors = require('cors');
var mongodb = require('mongodb');
var httpserver = require('http').createServer(app);
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));

var MongoClient = mongodb.MongoClient;
var userExist = false;
var proexist = false;
var userarray = [];
var usershopingexist=false;
var usershopingcardarray=[];
var ts;
var productarray=[];
MongoClient.connect('mongodb://localhost:27017/MyShopFP', function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log('Connection established');
    pruductcollection = db.collection('products');
    pruductcollection.find().toArray(function (err, data) {
      productarray = data;
    });
    categoorycollection =  db.collection('categors');
    ///////////
    userLogCollection = db.collection('userLog');
    userLogCollection.find().toArray(function (err, data) {
      userarray = data;
    });
    /////////
    doneusercollection = db.collection('userdoneorder');
    ///////////
    usershopingcardLogCollection = db.collection('usershopingcart');
    usershopingcardLogCollection.find().toArray(function (err, data) {
      usershopingcardarray = data;
    });
    ///////////
  }
});
/////////////////////////////insert admin or user/////////////////////////////////////
app.post('/insertuser', function (req, res) {
  console.log(req.body);
  try {
    for (var i = 0; i < userarray.length; i++) {
      if (req.body.name == userarray[i].name) {
        userExist = true;
      }
    }
    if (userExist) {
      res.send({ Status: "user exist" });
      console.log("user exist");
      userExist = true;
      res.end();
    }
    if (userExist == false) {
      userLogCollection.insert({
        id: req.body.id,
        name: req.body.name,
        email: req.body.email,
        isadmin: "false"
      }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('Data Inserted');
          userLogCollection.find().toArray(function (err, data) {
            userarray = data;
          });
        }
      });
    }
    userExist = false;
  }
  catch (err) {
    console.log(err)
  }
});
////////////////////////insert new product/////////////////////
app.post('/insertnaewproduct', function (req, res) {
  console.log(req);
  try {
    for (var i = 0; i < productarray.length; i++) {
      if (req.body.name == productarray[i].name || req.body.id == productarray[i].id) {
        proexist = true;
      }
    }
    if (proexist == true) {
      res.send({ Status: "product exist" });
      console.log("prodct exist");
      res.end();
    }
    if (proexist == false) {

      pruductcollection.insert({

        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        imgurl: req.body.imgurl,
        about:req.body.about
      }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          pruductcollection.find().toArray(function (err, data) {
            productarray = data;
          });
          console.log('product Inserted');
        }
      });

    }
    proexist = false;

  }
  catch (err) {
    console.log(err)
  }
});
////////////////////delet product///////////
app.get('/deleteproduct/:idd', function (req, res) {
  try {
    pruductcollection.find().toArray(function (err, data) {
      for (var i = 0; i < data.length; i++) {
        if (req.params.idd == data[i].id) {
          ts = data[i];
        }
      }
      pruductcollection.remove({ _id: ts._id });
    });

  }
  catch (err) {
    console.log(err)
  }

});
//////////////////getproducts//////////////
app.get('/getallproducts', function (req, res) {
  try {
    pruductcollection.find().toArray(function (err, data) {
      res.send(data);
    });


  }
  catch (err) {
    console.log(err)
  }
});
/////////////////find porduct by name////////////
app.get('/getproductbyname/:name', function (req, res) {
  try {
    pruductcollection.find().toArray(function (err, data) {
      for (var i = 0; i < data.length; i++) {
        if (req.params.name == data[i].name) {
          res.send(data[i]);
          res.end();
        }
      }

    });
          
        }
  catch (err) {
    console.log(err)
  }
});
//////////////////////get all categories////////////
app.get('/getcategories', function (req, res) {
  try {
    categoorycollection.find().toArray(function (err, data) {
      res.send(data);
    });
  }
  catch (err) {
    console.log(err)
  }
});
/////////////////updateproduct///////////////////////
app.post('/updateproduct', function (req, res) {
  try {
    pruductcollection.find().toArray(function (err, data) {

    });
    pruductcollection.update(
      {
        id: req.body.id
      },
      {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        imgurl: req.body.imgurl,
        about:req.body.about
      }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('product updated');
        }
      });
  }
  catch (err) {
    console.log(err)
  }
});
//////////////////////////////////get all shoping card///////////
app.get('/getallshopingcard', function (req, res) {
  try {
    usershopingcardLogCollection.find().toArray(function (err, data) {
      res.send(data);
    });
  }
  catch (err) {
    console.log(err)
  }
});
////////////////////////////////deletusershopingcard/////////
app.get('/cleareusercard/:username', function (req, res) {
  try {
    usershopingcardLogCollection.find().toArray(function (err, data) {
      for (var i = 0; i < data.length; i++) {
        if (req.params.username == data[i].username) {
          usershopingcardLogCollection.remove({username: req.params.username});
        }
      }
      res.end();
     // usershopingcardcollection.remove({ _id: ts._id });
    });

  }
  catch (err) {
    console.log(err)
  }

});
////////////////////////////////insert or update user shoping card//////////

app.post('/insertorupdateusershopingcard', function (req, res) {
  try {
    for (var i = 0; i < usershopingcardarray.length; i++) {
      if (usershopingcardarray[i].username == req.body.username
        && usershopingcardarray[i].name == req.body.name) {
          console.log("found it");
        usershopingexist = true;
      }
    }
    if (usershopingexist == false) {
      usershopingcardLogCollection.insert(
        {
          username: req.body.username,
          id: req.body.id,
          name: req.body.name,
          productquantay:req.body.productquantay,
          price: req.body.price,
          category: req.body.category,
          imgurl: req.body.imgurl
        },
        { upsert: true }
        , function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log('product inserted in shoping');
            usershopingcardLogCollection.find().toArray(function (err, data) {
              usershopingcardarray = data;
            });
            res.end();
          }
        });
    }
    if (usershopingexist) {
      usershopingcardLogCollection.update(
        {
          name: req.body.name
        },
        {
          username: req.body.username,
          id: req.body.id,
          name: req.body.name,
          productquantay:req.body.productquantay,
          price: req.body.price,
          category: req.body.category,
          imgurl: req.body.imgurl
        },
        { upsert: true }
        , function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log('product updated in shoping');
            res.end();
          }
        });
    }
    usershopingexist=false;

  }
  catch (err) {
    console.log(err)
  }
});
///////////////////////////////////////////////////
app.post('/checkifisadmin', function (req, res) {
  try {
    userLogCollection.find().toArray(function (err, data) {
      for (var i = 0; i < data.length; i++) {
        if (req.body.name == data[i].name) {
          res.send(data[i].isadmin);
        }
      }
    });
  }
  catch (err) {
    console.log(err)
  }
});
//////////////////////insert Done User/////////
app.post('/insertdonuser', function (req, res) {
  console.log(req);
  try {
      doneusercollection.insert({
        username:req.body.username,
        name:req.body.name,
        phonenumber:req.body.phonenumber,
        adrress:req.body.adrress,
        city:req.body.city,
        proid:req.body.proid ,
        proname:req.body.proname,
        productquantay:req.body.productquantay,
         price:req.body.price,
        proimgurl:req.body.proimgurl
      
      }, function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log('product Inserted');
        }
      });
  }
  catch (err) {
    console.log(err)
  }
});
////////////////////////gel all done user/////////
app.get('/getallsdoneuser', function (req, res) {
  try {
    doneusercollection.find().toArray(function (err, data) {
      res.send(data);
    });
  }
  catch (err) {
    console.log(err)
  }
});
//////////////////////////////////////////////////////////////////  
var server = httpserver.listen(5000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
});
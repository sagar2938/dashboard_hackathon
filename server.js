var express = require('express');
var app = express();
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('dashboard', ["pmd_db","pmd_database"]);
app.use(express.static(__dirname + '/public'));
// viewed at http://localhost:8080
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});


app.get('/report/pmd', function (req, res) {
  console.log('I received a GET request');



  db.pmd_database.find(function (err, docs) {
    if(err){
      res.status(400);
      res.send(err);
      console.log(err);
    }else{
      console.log(docs[0]);
    }

    res.json(docs);
  });
});

app.get('/report/pmd/timestamps',function(req,res){
  db.pmd_database.find({},{"pmd._attributes.timestamp":1},function(err,timestamps){
    if(err){
      console.log("some error occured while fetching timestamps from db")
      res.status(400);
      res.send("some error occured");
    }else{
      res.send(timestamps);
    }
  })
});

app.get('/report/pmd/fileCount/timestamp/:timestamp',function(req,res){
  db.pmd_database.find({"pmd._attributes.timestamp":req.params.timestamp},{"pmd.file._attributes.name":1},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      console.log(files);
      var result={fileCount:files[0].pmd.file.length};
      res.send(result);
    }
  })
});
app.get('/report/pmd/fileList/timestamp/:timestamp',function(req,res){
  db.pmd_database.find({"pmd._attributes.timestamp":req.params.timestamp},{"pmd.file._attributes.name":1},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log(req.params.timestamp);
      console.log(req.url);
      console.log("successsssssssssssss");
      console.log(files);
      //var result={fileCount:files[0].pmd.file.length};

      if(files.length>0){
      res.send(files[0].pmd.file);
    }else{
      res.send([])
    }
    }
  })
});

app.get('/report/pmd/violations/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd._attributes.timestamp":req.params.timestamp},function(err,data){
    if(err){
      console.log(err);
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      console.log(data);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      for(var j=0;j<data.length;j++){
        for(var i=0;i<data[j].pmd.file.length;i++){
          voilations=voilations+data[j].pmd.file[i].violation.length;
        }
      }

      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{ "$group" :{"_id": "$pmd.file.violation.rule","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      console.log(data);
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }

      res.send(result);
    }
  })
});

app.get('/report/pmd/violations/file/:file/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd.file._attributes.name":req.params.file,"pmd._attributes.timestamp":req.params.timestamp},function(err,files){
    if(err){
      res.status(400);
      console.log(err);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var noViolation=0;
      /*for(var i=0;i<violations[0].pmd.file.length;i++){
        noViolation=noViolation+violations[0].pmd.file[i].violation.length;
      }
      for(var i=0;i<files[0].pmd.file.length;i++){
        if(files[0].pmd.file[i]._attributes.name===req.params.file){
          noViolation=noViolation+files[0].pmd.file[i].violation.length;
        }

      }
      var result={numOfViolations:noViolation};

      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file._attributes.name":req.params.file}},{ "$group" :{"_id": "$pmd.file._attributes.name","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
    }else{
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }

      res.send(result);
    }
  });
});

app.get('/report/pmd/violationslist/file/:file/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd.file._attributes.name":req.params.file,"pmd._attributes.timestamp":req.params.timestamp},function(err,violations){
    if(err){
      res.status(400);
      console.log(err);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      /*var noViolation=0;
      for(var i=0;i<violations[0].pmd.file.length;i++){
        noViolation=noViolation+violations[0].pmd.file[i].violation.length;
      }
      //var result={numOfViolations:noViolation};
      console.log(req.url);
      if(violations.length>0){
        console.log("sdfafaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        //console.log(violations[0].pmd.file);
        res.send(violations[0].pmd.file[0].violation);
      }else{
        console.log(req.url);
        console.log(violations);
        res.send([]);
      }

    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file._attributes.name":req.params.file}},{ "$group" :{"_id": "$pmd.file.violation"}}],function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      res.send(data);
    }
  })
});



app.get('/report/pmd/priorities/',function(req,res){
  db.pmd_database.distinct("pmd.file.violation._attributes.priority",function(err,priorities){
    if(err){
      res.status(400);
      console.log("some error occured while fetching priorities from db")
      res.send("some error occured");
    }else{
      res.send(priorities);
    }
  })
});

app.get('/report/pmd/rules/',function(req,res){
  db.pmd_database.distinct("pmd.file.violation._attributes.rule",function(err,rules){
    if(err){
      res.status(400);
      console.log("some error occured while fetching rules from db")
      res.send("some error occured");
    }else{
      res.send(rules);
    }
  })
});

app.get('/report/pmd/ruleset/',function(req,res){
  db.pmd_database.distinct("pmd.file.violation._attributes.ruleset",function(err,ruleset){
    if(err){
      res.status(400);
      console.log("some error occured while fetching ruleset from db")
      res.send("some error occured");
    }else{
      res.send(ruleset);
    }
  })
});

app.get('/report/pmd/package/',function(req,res){
  db.pmd_database.distinct("pmd.file.violation._attributes.package",function(err,packages){
    if(err){
      res.status(400);
      console.log("some error occured while fetching package from db")
      res.send("some error occured");
    }else{
      res.send(packages);
    }
  })
});

app.get('/report/pmd/class/',function(req,res){
  db.pmd_database.distinct("pmd.file.violation._attributes.class",function(err,classes){
    if(err){
      res.status(400);
      console.log("some error occured while fetching class from db")
      res.send("some error occured");
    }else{
      res.send(classes);
    }
  })
});

app.get('/report/pmd/text/',function(req,res){
  db.pmd_database.distinct("pmd.file.violation._text",function(err,text){
    if(err){
      res.status(400);
      console.log("some error occured while fetching text from db")
      res.send("some error occured");
    }else{
      res.send(text);
    }
  })
});

app.get('/report/pmd/priority/:priority/timestamp/:timestamp',function(req,res){
  console.log({"pmd.file.violation._attributes.priority":req.params.priority,"pmd._attributes.timestamp":req.params.timestamp});
  /*db.pmd_database.find({"pmd.file.violation._attributes.priority":req.params.priority,"pmd._attributes.timestamp":req.params.timestamp},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      //res.send(files[0].pmd.file);
      var voilations=0;
      /*for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;
      }

      for(var i=0;i<files[0].pmd.file.length;i++){
        for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
            if(files[0].pmd.file[i].violation[j]._attributes.priority===req.params.priority){
              voilations=voilations+1;
            }
        }
      }
      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file.violation._attributes.priority":req.params.priority}},{ "$group" :{"_id": "$pmd.file.violation._attributes.priority","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }

      res.send(result);
    }
  });
});
app.get('/report/pmd/priority/:priority/file/:file/timestamp/:timestamp',function(req,res){
  //db.pmd_database.find({"pmd.file.violation._attributes.priority":req.params.priority,"pmd._attributes.timestamp":req.params.timestamp,"pmd.file._attributes.name":file},function(err,files){
  /*db.pmd_database.find({"pmd._attributes.timestamp":req.params.timestamp},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      console.log(files);
  //    res.send(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      /*for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;
      }
      for(var i=0;i<files[0].pmd.file.length;i++){
        if(files[0].pmd.file[i]._attributes.name===req.params.file){
          for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
              if(files[0].pmd.file[i].violation[j]._attributes.priority===req.params.priority){
                voilations=voilations+1;
              }
          }
        }

      }

      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file._attributes.name":req.params.file}},{"$match":{"pmd.file.violation._attributes.priority":req.params.priority}},{ "$group" :{"_id": "$pmd.file.violation._attributes.priority","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }

      res.send(result);
    }
  })
});

app.get('/report/pmd/timestamp/violation',function(req,res){
  db.pmd_database.find({},function(err,data){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      for(var j=0;j<data.length;j++){
        for(var i=0;i<files[j].pmd.file.length;i++){
          voilations=voilations+files[j].pmd.file[i].violation.length;
        }
      }

      var result={numOfViolations:voilations};
      res.send(result);
    }
  })
});

app.get('/report/pmd/timestamp/files',function(req,res){
  db.pmd_database.find({},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var fileCount=0;
      for(var j=0;j<files.length;j++){
        fileCount=fileCount+files[j].pmd.file.length;
      }

      var result={numOffiles:fileCount};
      res.send(result);
    }
  })
});



app.get('/report/pmd/rule/:rule/timestamp/:timestamp',function(req,res){
  //db.pmd_database.find({"pmd.file.violation._attributes.rule":req.params.priority,"pmd._attributes.timestamp":req.params.timestamp},function(err,files){
  /*db.pmd_database.find({"pmd.file.violation._attributes.rule":req.params.rule,"pmd._attributes.timestamp":req.params.timestamp},function(err,files){
    if(err){
      console.log(files);
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      console.log(files);
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      /*for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;
      }
      for(var i=0;i<files[0].pmd.file.length;i++){
        for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
            if(files[0].pmd.file[i].violation[j]._attributes.rule===req.params.rule){
              voilations=voilations+1;
            }
        }
      }
      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file.violation._attributes.rule":req.params.rule}},{ "$group" :{"_id": "$pmd.file.violation._attributes.rule","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }

      res.send(result);
    }
  })
});

app.get('/report/pmd/rule/:rule/file/:file/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd.file.violation._attributes.rule":req.params.rule,"pmd._attributes.timestamp":req.params.timestamp,"pmd.file._attributes.name":req.params.file},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      /*for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;
      }
      for(var i=0;i<files[0].pmd.file.length;i++){
        if(files[0].pmd.file[i]._attributes.name===req.params.file){
          for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
              if(files[0].pmd.file[i].violation[j]._attributes.rule===req.params.rule){
                voilations=voilations+1;
              }
          }
        }

      }
      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file._attributes.name":req.params.file}},{"$match":{"pmd.file.violation._attributes.rule":req.params.rule}},{ "$group" :{"_id": "$pmd.file.violation._attributes.rule","count" : {"$sum": 1}}}],function(err,data){
   if(err){
     console.log(err);
     res.send(err);
   }else{
     console.log("sdaffffffffffffff");
     console.log(data);
     console.log(data);
     if(data.length>0){
       var result={numOfViolations:data[0].count};
     }else{
       var result={numOfViolations:0};
     }

     res.send(result);
   }
 })
});


app.get('/report/pmd/ruleset/:ruleset/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd.file.violation._attributes.ruleset":req.params.ruleset,"pmd._attributes.timestamp":req.params.timestamp},function(err,files){*/
  /*db.pmd_database.find({"pmd._attributes.timestamp":req.params.timestamp},function(err,files){
    if(err){
      console.log(err);
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      console.log(files);
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      /*for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;

      }
      for(var i=0;i<files[0].pmd.file.length;i++){
        for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
            if(files[0].pmd.file[i].violation[j]._attributes.ruleset===req.params.ruleset){
              voilations=voilations+1;
            }
        }
      }
      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file.violation._attributes.ruleset":req.params.ruleset}},{ "$group" :{"_id": "$pmd.file.violation._attributes.ruleset","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }


      res.send(result);
    }
  });
});

app.get('/report/pmd/ruleset/:ruleset/file/:file/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd.file.violation._attributes.ruleset":req.params.ruleset,"pmd._attributes.timestamp":req.params.timestamp,"pmd.file._attributes.name":req.params.file},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      /*for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;
      }
      for(var i=0;i<files[0].pmd.file.length;i++){
        if(files[0].pmd.file[i]._attributes.name===req.params.file){
          for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
              if(files[0].pmd.file[i].violation[j]._attributes.ruleset===req.params.ruleset){
                voilations=voilations+1;
              }
          }
        }

      }
      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file._attributes.name":req.params.file}},{"$match":{"pmd.file.violation._attributes.ruleset":req.params.ruleset}},{ "$group" :{"_id": "$pmd.file.violation._attributes.ruleset","count" : {"$sum": 1}}}],function(err,data){
   if(err){
     console.log(err);
     res.send(err);
   }else{
     console.log(data);
     if(data.length>0){
       var result={numOfViolations:data[0].count};
     }else{
       var result={numOfViolations:0};
     }

     res.send(result);
   }
 })
});

app.get('/report/pmd/class/:class/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd.file.violation._attributes.class":req.params.class,"pmd._attributes.timestamp":req.params.timestamp},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      /*for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;
      }
      for(var i=0;i<files[0].pmd.file.length;i++){
        for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
            if(files[0].pmd.file[i].violation[j]._attributes.class===req.params.class){
              voilations=voilations+1;
            }
        }
      }
      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file.violation._attributes.class":req.params.class}},{ "$group" :{"_id": "$pmd.file.violation._attributes.class","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }

      res.send(result);
    }
  });
});

app.get('/report/pmd/class/:class/file/:file/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd.file.violation._attributes.class":req.params.class,"pmd._attributes.timestamp":req.params.timestamp,"pmd.file._attributes.name":req.params.file},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
    /*  for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;
      }
      for(var i=0;i<files[0].pmd.file.length;i++){
        if(files[0].pmd.file[i]._attributes.name===req.params.file){
          for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
              if(files[0].pmd.file[i].violation[j]._attributes.class===req.params.class){
                voilations=voilations+1;
              }
          }
        }

      }
      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file._attributes.name":req.params.file}},{"$match":{"pmd.file.violation._attributes.class":req.params.class}},{ "$group" :{"_id": "$pmd.file.violation._attributes.class","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }

      res.send(result);
    }
  })
});


app.get('/report/pmd/package/:package/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd.file.violation._attributes.package":req.params.package},function(err,files){
    if(err){
      console.log(err);
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      /*for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;
      }
      console.log(files)
      for(var i=0;i<files[0].pmd.file.length;i++){
        for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
            if(files[0].pmd.file[i].violation[j]._attributes.package===req.params.package){
              voilations=voilations+1;
            }
        }
      }
      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file.violation._attributes.package":req.params.package}},{ "$group" :{"_id": "$pmd.file.violation._attributes.package","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }

      res.send(result);
    }
  });
});

app.get('/report/pmd/package/:package/file/:file/timestamp/:timestamp',function(req,res){
  /*db.pmd_database.find({"pmd.file.violation._attributes.package":req.params.package,"pmd._attributes.timestamp":req.params.timestamp,"pmd.file._attributes.name":req.params.file},function(err,files){
    if(err){
      res.status(400);
      console.log("some error occured while fetching file count from db")
      res.send("some error occured");
    }else{
      console.log("successsssssssssssss");
      //console.log(files);
      //var result={fileCount:files[0].pmd.file.length};
      var voilations=0;
      /*for(var i=0;i<files[0].pmd.file.length;i++){
        voilations=voilations+files[0].pmd.file[i].violation.length;
      }
      console.log(files[0]);
      for(var i=0;i<files[0].pmd.file.length;i++){
        if(files[0].pmd.file[i]._attributes.name===req.params.file){
          for(var j=0;j<files[0].pmd.file[i].violation.length;j++){
              if(files[0].pmd.file[i].violation[j]._attributes.package===req.params.package){
                voilations=voilations+1;
              }
          }
        }

      }
      var result={numOfViolations:voilations};
      res.send(result);
    }
  })*/
  db.pmd_database.aggregate ([{ "$unwind" : "$pmd.file"},{ "$unwind" : "$pmd.file.violation"},{"$match":{"pmd._attributes.timestamp":req.params.timestamp}},{"$match":{"pmd.file._attributes.name":req.params.file}},{"$match":{"pmd.file.violation._attributes.package":req.params.package}},{ "$group" :{"_id": "$pmd.file.violation._attributes.package","count" : {"$sum": 1}}}],function(err,data){
    if(err){
      console.log(err);
      res.send(err);
    }else{
      console.log(data);
      if(data.length>0){
        var result={numOfViolations:data[0].count};
      }else{
        var result={numOfViolations:0};
      }

      res.send(result);
    }
  })
});




app.listen(8080,function(){
  console.log("listening at 8080");
});

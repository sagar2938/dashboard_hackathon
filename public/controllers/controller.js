var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {
    console.log("Hello World from controller");

http.get()

var refresh = function() {
  $http.get('report/pmd').success(function(response) {
    console.log("I got the data I requested");
    $scope.errorList = response;
    var points=[];
    var points2=[];
    var points3=[];
    var time_files=[];
    var time_voilations=[];
    var time_rules_list=[];
    var time_ruleset_list=[];
    var time_priority_list=[];
    var time_class_list=[];
    var time_package_list=[];
    var time_error_list=[];
  for(var i=0;i<response.length;i++){
      var obj={
        y:response[i].pmd.file.length,
        indexLabel:response[i].pmd._attributes.timestamp
      };
      var violoatiosTotal=0;
      for(var j=0;j<response[i].pmd.file.length;j++){
        var name=response[i].pmd.file[j]._attributes.name.split("\\");
        //console.log(response[i].pmd.file[j]._attributes.name.split("\\"))
        var obj2={

          y:response[i].pmd.file[j].violation.length,
          data:response[i].pmd.file[j]._attributes.name,
          violations:response[i].pmd.file[j].violation
          //indexLabel:name[name.length-1]
        };
        for(var k=0;k<response[i].pmd.file[j].violation.length;k++){
          var found=0;
          var found2=0;
          for(var l=0;l<time_rules_list.length;l++){
            if(time_rules_list[l].name==response[i].pmd.file[j].violation[k]._attributes.rule){
              found=1;
              time_rules_list[l].count=time_rules_list[l].count+1;
            }
          }
          if(found==0){
            console.log("#######################################################");
            var ruleDetails={
              name:response[i].pmd.file[j].violation[k]._attributes.rule,
              count:0
            };
            time_rules_list.push(ruleDetails);
          }
          for(var m=0;m<time_ruleset_list.length;m++){
            if(time_ruleset_list[m].name==response[i].pmd.file[j].violation[k]._attributes.ruleset){
              found2=1;
              time_ruleset_list[m].count=time_ruleset_list[m].count+1;
            }
          }
          if(found2==0){
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
            var rulesetDetails={
              name:response[i].pmd.file[j].violation[k]._attributes.ruleset,
              count:0
            };
            time_ruleset_list.push(rulesetDetails);
          }
          var found3=0;
          for(var m=0;m<time_priority_list.length;m++){
            if(time_priority_list[m].name==response[i].pmd.file[j].violation[k]._attributes.priority){
              found3=1;
              time_priority_list[m].count=time_priority_list[m].count+1;
            }
          }
          if(found3==0){
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
            var priorityDet={
              name:response[i].pmd.file[j].violation[k]._attributes.priority,
              count:0
            };
            time_priority_list.push(priorityDet);
          }
          var found4=0;
          for(var m=0;m<time_package_list.length;m++){
            if(time_package_list[m].name==response[i].pmd.file[j].violation[k]._attributes.package){
              found4=1;
              time_package_list[m].count=time_package_list[m].count+1;
            }
          }
          if(found4==0){
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
            var priorityDet={
              name:response[i].pmd.file[j].violation[k]._attributes.package,
              count:0
            };
            time_package_list.push(priorityDet);
          }
          var found5=0;
          for(var m=0;m<time_class_list.length;m++){
            if(time_class_list[m].name==response[i].pmd.file[j].violation[k]._attributes.class){
              found4=1;
              time_class_list[m].count=time_class_list[m].count+1;
            }
          }
          if(found5==0){
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
            var priorityDet={
              name:response[i].pmd.file[j].violation[k]._attributes.class,
              count:0
            };
            time_class_list.push(priorityDet);
          }

        /*  var found6=0;
          for(var m=0;m<time_error_list.length;m++){
            if((time_error_list[m].name==response[i].pmd.file[j].violation[k]._text)){
              found6=1;
              time_error_list[m].y=time_error_list[m].y+1;
            }
          }
          if(found6==0){
            var priorityDet={
               name:response[i].pmd.file[j].violation[k]._text,
              label: response[i].pmd._attributes.timestamp,
              y: 0
            }
            console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1");
            var priorityDet={
              name:response[i].pmd.file[j].violation[k]._text,
              count:0
            };
            time_error_list.push(priorityDet);
          }*/
          console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
          console.log(time_error_list);
          console.log(time_package_list);
          console.log(time_class_list);
          console.log(time_priority_list);


        }
        violoatiosTotal=response[i].pmd.file[j].violation.length+violoatiosTotal;
        points2.push(obj2);
      }
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      console.log(time_rules_list);
      console.log(time_ruleset_list);
      //console.log(points2);
      var timeArray=response[i].pmd._attributes.timestamp.split("T")[0].split("-");
      console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
      console.log(timeArray);
      var obj3={
        y:violoatiosTotal,
        x:/*response[i].pmd._attributes.timestamp*/ new Date(parseInt(timeArray[0]),parseInt(timeArray[1]), parseInt(timeArray[2])),
        //label:i//new Date(parseInt(timeArray[0]),parseInt(timeArray[1]), parseInt(timeArray[2])),

      }
      points3.push(obj3);
    //points3.push(obj);
      points.push(obj);
      console.log("length-------------------------------------->  "+points3.length);
    }
    $scope.time_rules_list=time_rules_list;
    $scope.time_ruleset_list=time_ruleset_list;
    $scope.time_priority_list=time_priority_list;
    $scope.time_class_list=time_class_list;
    $scope.time_package_list=time_package_list;
    $scope.time_error_list=time_error_list;
    $scope.points3=points3;

    var chart0 = new CanvasJS.Chart("chartContainer1",
      {
        theme: "theme2",
        title:{
          text: "Gaming Consoles Sold in 2012"
        },
        data: [
        {
          type: "pie",
          showInLegend: true,
          toolTipContent: "{y} - #percent %",
          yValueFormatString: "#0.#,,. Million",
          legendText: "{indexLabel}",
          dataPoints: time_error_list
        }
        ]
      });

      chart0.render();
      var chart5 = new CanvasJS.Chart("chartContainer5", {
      				title: {
      					text: "Basic Column Chart"
      				},
      				data: [{
      					type: "column",
      					dataPoints:time_error_list /*[
      						 { label: "1", y: 230, indexLabel: "Lowest" },
      						  { label: "20", y: 710, indexLabel: "Highest" },
      						  { label: "30", y: 380 },
      						  { label: "40", y: 567 },
      						  { label: "50", y: 280 },
      						  { label: "60", y: 507 },
      						  { label: "70", y: 680 },
      						  { label: "80", y: 287 },
      						  { label: "900", y: 460 },
      						  { label: "100", y: 509 }
      					]*/
      				}]
      			});
      			chart5.render();

/*  var chart3 = new CanvasJS.Chart("chartContainer3",
   {
     title:{
     text: "Line Chart with Different Color in a Section"
     },
     data: [
     {
       type: "line",
       dataPoints: points3
     }
     ]
   });

   chart3.render();*/

      var chart2 = new CanvasJS.Chart("chartContainer2",
        {
          theme: "theme2",
          title:{
            text: "Gaming Consoles Sold in 2012"
          },
          data: [
          {
            type: "pie",
            //showInLegend: false,
            toolTipContent: "{y} - #percent %--{data}",
            yValueFormatString: "#. {name}",
            //legendText: "{indexLabel}",
            click:function(e){
              console.log(e);
//    alert(  e.dataSeries.type+ ", dataPoint { x:" + e.dataPoint.x + ", y: "+ e.dataPoint.y + " }" );
check(e);
   } ,
            dataPoints: time_error_list
          }
          ]
        });
        chart2.render();


    $scope.contact = "";
  });
};
var displayErrors=function(){
  console.log("yoooooooooooooooooooooooooooooooooooooooooooooooooooo");
  if($scope.time_error_list.length===0){
    console.log("helllnooooooooooooooooooooooooooooooooooooooooooooo");
    //$scope.time_error_list=[]
    console.log($scope.errorList.length);
    for(var i=0;i<$scope.errorList.length;i++){
      console.log($scope.errorList[i].pmd.file.length);
      for(var j=0;j<$scope.errorList[i].pmd.file.length;j++ ){
        console.log($scope.errorList[i].pmd.file[j].violation.length);
        for(var k=0;k<$scope.errorList[i].pmd.file[j].violation.length;k++){
          console.log("shittttttttttttttttttttttttttttttt");
          var found6=0;
          for(var m=0;m<$scope.time_error_list.length;m++){
            console.log("holly mollyyyyyyyyyyyyyyyyyyyyyyyyyyyyy");
            if(($scope.time_error_list[m].name==$scope.errorList[i].pmd.file[j].violation[k]._text)){
              console.log("what an asssssssssssssssssssssssss");
              found6=1;
              $scope.time_error_list[m].y=$scope.time_error_list[m].y+1;
            }
          }
          console.log("found   "+found6);
          if(found6===0){
            console.log("not foundddddddddddddddddddddd");
            var priorityDet={
               name:$scope.errorList[i].pmd.file[j].violation[k]._text,
              label: $scope.errorList[i].pmd._attributes.timestamp,
              y: 0
            }
            //console.log(priorityDet);
            $scope.time_error_list.push(priorityDet);
        }
      }
    }
  }
  console.log("#######################################");
  console.log($scope.time_error_list);
  }
}
$scope.displayErrors=displayErrors;
var check=function(e){
  console.log("yooooooooooooooooooooo");
  console.log(e);
  console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");

}
$scope.check=check;
refresh();

$scope.addContact = function() {
  console.log($scope.contact);
  $http.post('/contactlist', $scope.contact).success(function(response) {
    console.log(response);
    refresh();
  });
};

$scope.remove = function(id) {
  console.log(id);
  $http.delete('/contactlist/' + id).success(function(response) {
    refresh();
  });
};

$scope.edit = function(id) {
  console.log(id);
  $http.get('/contactlist/' + id).success(function(response) {
    $scope.contact = response;
  });
};

$scope.update = function() {
  console.log($scope.contact._id);
  $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
    refresh();
  })
};

$scope.deselect = function() {
  $scope.contact = "";
}

}]);﻿

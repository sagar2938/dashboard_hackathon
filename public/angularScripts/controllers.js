var controllers=angular.module("controllers",[]);

controllers.controller("home",function($scope,$location){
  console.log("###################");

  var showReports=function(view){
    console.log(view);
    if(view==='reports'){
      $location.path('/reports');
    }else{
      $location.path('/portfolio');
    }
  }
  $scope.showReports=showReports;
});

controllers.controller("reports",function($scope,$location){
  console.log("$$$$$$$$$$$$$$");
  var showReports=function(view){
    console.log(view);
    if(view==='pmd'){
      $location.path('/report/pmd');
    }else{
      $location.path('/report/jmeter');
    }
  }
  $scope.showReports=showReports;
});
controllers.controller("portfolio",function($scope,$http,$window){
  if($scope.show){

  }else{
    $scope.show="pmd";
  }
  var scrollView=function(show){
    $scope.show=show;
    console.log("jfasdlkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
    console.log(show);
    $window.scrollTo(0,0);
  }
  $scope.scrollView=scrollView;
  $scope.check="checkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk";
  var timestamps;
  $http.get('/report/pmd/timestamps').then(function(response) {
    console.log("successs");
    //console.log(response);
    timestamps=response.data;
    $scope.timestamps=timestamps;
  });
  $http.get('/report/pmd/priorities/').then(function(response){

    $scope.priorityList=response.data;
  })
  $http.get('/report/pmd/rules/').then(function(response){

    $scope.ruleList=response.data;
  })
  $http.get('/report/pmd/ruleset/').then(function(response){

    $scope.rulesetList=response.data;
  })
  $http.get('/report/pmd/package/').then(function(response){

    $scope.packageList=response.data;
  })
  $http.get('/report/pmd/class/').then(function(response){
    $scope.classList=response.data;
  })

  var getFiles_timestamp=function(timestamp_selected){
    if(timestamp_selected){
      $scope.stage=1;
      console.log("asfadssss");
      console.log(timestamp_selected);
      $http.get('/report/pmd/fileList/timestamp/'+timestamp_selected).then(function(response) {
        console.log("successs");
        //console.log(response);
        //fileList=response.data;
        $scope.fileList=response.data;

      });

    }else{
    }

  }
  var display_barChart=function(pointsArray){
    var barChart = new CanvasJS.Chart("barChartContainer", {
            title: {
              text: $scope.stage?($scope.stage===1?"files":""):"timestamp"
            },
            data: [{
              type: "column",
              dataPoints:pointsArray /*[
                 { label: "1", y: 230, indexLabel: "Lowest" },
                  { label: "20d", y: 710, indexLabel: "Highest" },
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
          barChart.render();
  }
var display_voilation_details=function(violation){
  $scope.stage=3;
  console.log("suckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  console.log(violation);
  if(violation){
    $scope.violation_details=JSON.parse(violation);
    $scope.violation_show=true;
    console.log("screwyooooooooooooooooooooooooooooooooooooooooooooouuuuuuuuuuuuuu");
    console.log($scope.violation_details);
  }
}
$scope.display_voilation_details=display_voilation_details;
  var renderBarChart=function(graphType){
    console.log("yayyyyyyyyyyyyyyyyyyy");
    console.log(graphType)
    if(graphType==="files"){
      if($scope.stage){
        console.log("defauletttttttttttttttttttttttttttt");
        if($scope.stage===1){

        }
      }else{
        console.log("yoooooooooooooooooooooooooooooooooooooo");
        var arrayDetails=[];
        for(var i=0;i<$scope.timestamps.length;i++){
          console.log(i);
          var timestamp=timestamps[i];
            $http.get('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
              console.log("called");
              console.log("successs");
              console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log(response.data);
              var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.length };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.timestamps.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }
      }
    }
    if(graphType==="violations"){
      if($scope.stage){
        console.log("defauletttttttttttttttttttttttttttt");
        /*if($scope.stage===1 || $scope.stage===2){
          console.log("fuckeddddddddddddddddddddddddddddd");
          var arrayDetails=[];
          for(var i=0;i<$scope.timestamps.length;i++){
            console.log(i);
            var timestamp=timestamps[i];
              $http.get('/report/pmd/violations/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
                console.log("called");
                console.log("successs");
                console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
                //console.log(response);
                //fileList=response.data;
                //$scope.fileList=response.data;
                console.log("SDFASDJFLSADJFLJSADLFJ");
                console.log(response.data.numOfViolations);
                console.log($scope.timestamps[arrayDetails.length])
                var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations };
                console.log(obj);
                arrayDetails.push(obj);
                if(arrayDetails.length===$scope.timestamps.length){
                  console.log("time for action");
                  console.log(arrayDetails);
                  display_barChart(arrayDetails);
                  render_piechart(arrayDetails);
                }
              });
          }
        }*/
        if($scope.stage){
          console.log("fuckeddddddddddddddddddddddddddddd harddddddddddddddddddd");
          var arrayDetails=[];
          for(var i=0;i<$scope.fileList.length;i++){
            console.log()
            console.log(i);
            var timestamp=timestamps[i];

              $http.get("/report/pmd/violations/file/"+$scope.fileList[i]._attributes.name+"/timestamp/"+$scope.timestamp_selected).then(function(response) {
                console.log("called");
                console.log("successs");
                //console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
                //console.log(response);
                //fileList=response.data;
                //$scope.fileList=response.data;
                console.log("SDFASDJFLSADJFLJSADLFJ");
                console.log(response.data.numOfViolations);
                console.log($scope.fileList[arrayDetails.length])
                var obj={ label:$scope.fileList[arrayDetails.length]._attributes.name , y: response.data.numOfViolations };
                console.log(obj);
                arrayDetails.push(obj);
                if(arrayDetails.length===$scope.fileList.length){
                  console.log("time for action");
                  console.log(arrayDetails);
                  display_barChart(arrayDetails);
                  render_piechart(arrayDetails);
                }
              });
          }
        }
      }else{
        console.log("fuckeddddddddddddddddddddddddddddd");
        var arrayDetails=[];
        for(var i=0;i<$scope.timestamps.length;i++){
          console.log(i);
          var timestamp=timestamps[i];
            $http.get('/report/pmd/violations/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
              console.log("called");
              console.log("successs");
              console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log("SDFASDJFLSADJFLJSADLFJ");
              console.log(response.data.numOfViolations);
              console.log($scope.timestamps[arrayDetails.length])
              var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.timestamps.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }
      }
    }
    if(graphType==="rule"){
      if($scope.stage){
        console.log("defauletttttttttttttttttttttttttttt");
      }else{
        console.log("fuckeddddddddddddddddddddddddddddd");
        var arrayDetails=[];
        for(var i=0;i<$scope.timestamps.length;i++){
          console.log(i);
          var timestamp=timestamps[i];
            $http.get('/report/pmd/rule/'+$scope.rule_selected+'/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
              console.log("called");
              console.log("successs");
              console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log("SDFASDJFLSADJFLJSADLFJ");
              console.log(response.data.numOfViolations);
              console.log($scope.timestamps[arrayDetails.length])
              var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.timestamps.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }
      }
    }
    if(graphType==="ruleset"){
      if($scope.stage){
        console.log("defauletttttttttttttttttttttttttttt");
      }else{
        console.log("fuckeddddddddddddddddddddddddddddd");
        var arrayDetails=[];
        for(var i=0;i<$scope.timestamps.length;i++){
          console.log(i);
          var timestamp=timestamps[i];
            $http.get('/report/pmd/ruleset/"+$scope.ruleset_selected+"/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
              console.log("called");
              console.log("successs");
              console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log("SDFASDJFLSADJFLJSADLFJ");
              console.log(response.data.numOfViolations);
              console.log($scope.timestamps[arrayDetails.length])
              var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.timestamps.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }
      }
    }
  }
var generate_stage1_graph=function(url,selected){
  ///report/pmd/ruleset/:ruleset
  if(selected){
    if($scope.stage){
      if($scope.stage===1){
        var routeUrl=url+"file/@/timestamp/";
        var routeArray=routeUrl.split("@");
        console.log(routeArray);

        console.log("fuckeddddddddddddddddddddddddddddd harddddddddddddddddddd");
        var arrayDetails=[];
        for(var i=0;i<$scope.fileList.length;i++){
          console.log()
          var url_final=routeArray[0]+$scope.fileList[i]._attributes.name+routeArray[1]+$scope.timestamp_selected;
          console.log(i);
          var timestamp=timestamps[i];
          console.log(url_final);
            $http.get(url_final).then(function(response) {
              console.log("called");
              console.log("successs");
              //console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log("SDFASDJFLSADJFLJSADLFJ");
              console.log(response.data.numOfViolations);
              console.log($scope.fileList[arrayDetails.length])
              var obj={ label:$scope.fileList[arrayDetails.length]._attributes.name , y: response.data.numOfViolations };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.fileList.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }

      }
    }else{
      var routeUrl=url+"timestamp/";
      console.log("fuckeddddddddddddddddddddddddddddd");
      var arrayDetails=[];
      for(var i=0;i<$scope.timestamps.length;i++){
        console.log(i);
        var timestamp=timestamps[i];
        console.log(routeUrl+timestamp.pmd._attributes.timestamp);
          $http.get(routeUrl+timestamp.pmd._attributes.timestamp).then(function(response) {
            console.log("called");
            console.log("successs");
            console.log(routeUrl+timestamp.pmd._attributes.timestamp);
            //console.log(response);
            //fileList=response.data;
            //$scope.fileList=response.data;
            console.log("SDFASDJFLSADJFLJSADLFJ");
            console.log(response.data.numOfViolations);
            console.log($scope.timestamps[arrayDetails.length])
            var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations };
            console.log(obj);
            arrayDetails.push(obj);
            if(arrayDetails.length===$scope.timestamps.length){
              console.log("time for action");
              console.log(arrayDetails);
              display_barChart(arrayDetails);
              render_piechart(arrayDetails);
            }
          });
      }

    }
  }else{

  }


}
$scope.generate_stage1_graph=generate_stage1_graph;
$scope.renderBarChart=renderBarChart;
  var getVoilations_file=function(file_selected){
    if(file_selected){
      $scope.stage=2;
      console.log("asfadssss");
      console.log(file_selected);
      console.log("url");;
      console.log('/report/pmd/violationslist/file/'+file_selected+'/timestamp/'+$scope.timestamp_selected);
      $http.get('/report/pmd/violationslist/file/'+file_selected+'/timestamp/'+$scope.timestamp_selected).then(function(response) {
        console.log("successs");
        //console.log(response);
        //fileList=response.data;
        console.log(response.data);
        if(response.data.length>0){
          $scope.violationsList=response.data;
          console.log($scope.violationsList);
        }else{
        }


      });

    }
  }
  $scope.getVoilations_file=getVoilations_file;
  $scope.getFiles_timestamp=getFiles_timestamp;
});

controllers.controller("pmdController",function($scope,$http){
  $scope.graphDisplay=1;
  var check= function(graphDisplay){
    console.log("********************************************************8");
    console.log(graphDisplay);
  }
  $scope.check=check;
  var timestamps;
  $http.get('/report/pmd/timestamps').then(function(response) {
    console.log("successs");
    //console.log(response);
    timestamps=response.data;
    $scope.timestamps=timestamps;
    renderBarChart('files')
  });
  $http.get('/report/pmd/priorities/').then(function(response){

    $scope.priorityList=response.data;
  })
  $http.get('/report/pmd/rules/').then(function(response){

    $scope.ruleList=response.data;
  })
  $http.get('/report/pmd/ruleset/').then(function(response){

    $scope.rulesetList=response.data;
  })
  $http.get('/report/pmd/package/').then(function(response){

    $scope.packageList=response.data;
  })
  $http.get('/report/pmd/class/').then(function(response){
    $scope.classList=response.data;
  })

  var getFiles_timestamp=function(timestamp_selected){
    if(timestamp_selected){
      $scope.stage=1;
      console.log("asfadssss");
      console.log(timestamp_selected);
      $http.get('/report/pmd/fileList/timestamp/'+timestamp_selected).then(function(response) {
        console.log("successs");
        //console.log(response);
        //fileList=response.data;
        $scope.fileList=response.data;

      });

    }else{
    }

  }
  var display_barChart=function(pointsArray){
    var barChart = new CanvasJS.Chart("barChartContainer", {
            title: {
              text: $scope.stage?($scope.stage===1?"files":""):"timestamp"
            },
            data: [{
              type: "column",
              dataPoints:pointsArray /*[
                 { label: "1", y: 230, indexLabel: "Lowest" },
                  { label: "20d", y: 710, indexLabel: "Highest" },
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
          barChart.render();
  }
  var render_piechart=function(pointsArray){
    var chart2 = new CanvasJS.Chart("chartContainer2",
        {
          theme: "theme2",
          title:{
            //text: $scope.stage?($scope.stage===1?"files":""):"timestamp"
          },
          data: [
          {
            type: "pie",
            //showInLegend: false,
           toolTipContent: "{y}--{name} - #percent %--{data}",
            yValueFormatString: "#. ",
            //legendText: "{indexLabel}",

            dataPoints: pointsArray
          }
        ]

        });
        chart2.render();
  }
var display_voilation_details=function(violation){
  $scope.stage=3;
  console.log("suckkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk");
  console.log(violation);
  if(violation){
    $scope.violation_details=JSON.parse(violation);
    $scope.violation_show=true;
    console.log("screwyooooooooooooooooooooooooooooooooooooooooooooouuuuuuuuuuuuuu");
    console.log($scope.violation_details);
  }
}
$scope.display_voilation_details=display_voilation_details;
  var renderBarChart=function(graphType){
    console.log("yayyyyyyyyyyyyyyyyyyy");
    console.log(graphType)
    if(graphType==="files"){
      if($scope.stage){
        console.log("defauletttttttttttttttttttttttttttt");
        if($scope.stage===1){

        }
      }else{
        console.log("yoooooooooooooooooooooooooooooooooooooo");
        var arrayDetails=[];
        for(var i=0;i<$scope.timestamps.length;i++){
          console.log(i);
          var timestamp=timestamps[i];
            $http.get('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
              console.log("called");
              console.log("successs");
              console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log(response.data);

              var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.length,name:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.timestamps.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }
      }
    }
    if(graphType==="violations"){
      if($scope.stage){
        console.log("defauletttttttttttttttttttttttttttt");
        if($scope.stage===1){
          console.log("fuckeddddddddddddddddddddddddddddd");
          var arrayDetails=[];
          for(var i=0;i<$scope.timestamps.length;i++){
            console.log(i);
            var timestamp=timestamps[i];
              $http.get('/report/pmd/violations/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
                console.log("called");
                console.log("successs");
                console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
                //console.log(response);
                //fileList=response.data;
                //$scope.fileList=response.data;
                console.log("SDFASDJFLSADJFLJSADLFJ");
                console.log(response.data.numOfViolations);
                console.log($scope.timestamps[arrayDetails.length])
                var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations,name:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp };
                console.log(obj);
                arrayDetails.push(obj);
                if(arrayDetails.length===$scope.timestamps.length){
                  console.log("time for action");
                  console.log(arrayDetails);
                  display_barChart(arrayDetails);
                  render_piechart(arrayDetails);
                }
              });
          }
        }
        if($scope.stage===2){
          console.log("fuckeddddddddddddddddddddddddddddd harddddddddddddddddddd");
          var arrayDetails=[];
          for(var i=0;i<$scope.fileList.length;i++){
            console.log()
            console.log(i);
            var timestamp=timestamps[i];

              $http.get("/report/pmd/violations/file/"+$scope.fileList[i]._attributes.name+"/timestamp/"+$scope.timestamp_selected).then(function(response) {
                console.log("called");
                console.log("successs");
                //console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
                //console.log(response);
                //fileList=response.data;
                //$scope.fileList=response.data;
                console.log("SDFASDJFLSADJFLJSADLFJ");
                console.log(response.data.numOfViolations);
                console.log($scope.fileList[arrayDetails.length])
                var obj={ label:$scope.fileList[arrayDetails.length]._attributes.name , y: response.data.numOfViolations,name: $scope.fileList[arrayDetails.length]._attributes.name};
                console.log(obj);
                arrayDetails.push(obj);
                if(arrayDetails.length===$scope.fileList.length){
                  console.log("time for action");
                  console.log(arrayDetails);
                  display_barChart(arrayDetails);
                  render_piechart(arrayDetails);
                }
              });
          }
        }
      }else{
        console.log("fuckeddddddddddddddddddddddddddddd");
        var arrayDetails=[];
        for(var i=0;i<$scope.timestamps.length;i++){
          console.log(i);
          var timestamp=timestamps[i];
            $http.get('/report/pmd/violations/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
              console.log("called");
              console.log("successs");
              console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log("SDFASDJFLSADJFLJSADLFJ");
              console.log(response.data.numOfViolations);
              console.log($scope.timestamps[arrayDetails.length])
              var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations,name:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.timestamps.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }
      }
    }
    if(graphType==="rule"){
      if($scope.stage){
        console.log("defauletttttttttttttttttttttttttttt");
      }else{
        console.log("fuckeddddddddddddddddddddddddddddd");
        var arrayDetails=[];
        for(var i=0;i<$scope.timestamps.length;i++){
          console.log(i);
          var timestamp=timestamps[i];
            $http.get('/report/pmd/rule/'+$scope.rule_selected+'/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
              console.log("called");
              console.log("successs");
              console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log("SDFASDJFLSADJFLJSADLFJ");
              console.log(response.data.numOfViolations);
              console.log($scope.timestamps[arrayDetails.length])
              var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations,name:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.timestamps.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }
      }
    }
    if(graphType==="ruleset"){
      if($scope.stage){
        console.log("defauletttttttttttttttttttttttttttt");
      }else{
        console.log("fuckeddddddddddddddddddddddddddddd");
        var arrayDetails=[];
        for(var i=0;i<$scope.timestamps.length;i++){
          console.log(i);
          var timestamp=timestamps[i];
            $http.get('/report/pmd/ruleset/"+$scope.ruleset_selected+"/timestamp/'+timestamp.pmd._attributes.timestamp).then(function(response) {
              console.log("called");
              console.log("successs");
              console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log("SDFASDJFLSADJFLJSADLFJ");
              console.log(response.data.numOfViolations);
              console.log($scope.timestamps[arrayDetails.length])
              var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations,name:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.timestamps.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }
      }
    }
  }
var generate_stage1_graph=function(url,selected){
  ///report/pmd/ruleset/:ruleset
  if(selected){
    if($scope.stage){
      if($scope.stage===1){
        var routeUrl=url+"file/@/timestamp/";
        var routeArray=routeUrl.split("@");
        console.log(routeArray);

        console.log("fuckeddddddddddddddddddddddddddddd harddddddddddddddddddd");
        var arrayDetails=[];
        for(var i=0;i<$scope.fileList.length;i++){
          console.log()
          var url_final=routeArray[0]+$scope.fileList[i]._attributes.name+routeArray[1]+$scope.timestamp_selected;
          console.log(i);
          var timestamp=timestamps[i];
          console.log(url_final);
            $http.get(url_final).then(function(response) {
              console.log("called");
              console.log("successs");
              //console.log('/report/pmd/fileList/timestamp/'+timestamp.pmd._attributes.timestamp);
              //console.log(response);
              //fileList=response.data;
              //$scope.fileList=response.data;
              console.log("SDFASDJFLSADJFLJSADLFJ");
              console.log(response.data.numOfViolations);
              console.log($scope.fileList[arrayDetails.length])
              var obj={ label:$scope.fileList[arrayDetails.length]._attributes.name , y: response.data.numOfViolations ,name:$scope.fileList[arrayDetails.length]._attributes.name };
              console.log(obj);
              arrayDetails.push(obj);
              if(arrayDetails.length===$scope.fileList.length){
                console.log("time for action");
                console.log(arrayDetails);
                display_barChart(arrayDetails);
                render_piechart(arrayDetails);
              }
            });
        }

      }
    }else{
      var routeUrl=url+"timestamp/";
      console.log("fuckeddddddddddddddddddddddddddddd");
      var arrayDetails=[];
      for(var i=0;i<$scope.timestamps.length;i++){
        console.log(i);
        var timestamp=timestamps[i];
        console.log(routeUrl+timestamp.pmd._attributes.timestamp);
          $http.get(routeUrl+timestamp.pmd._attributes.timestamp).then(function(response) {
            console.log("called");
            console.log("successs");
            console.log(routeUrl+timestamp.pmd._attributes.timestamp);
            //console.log(response);
            //fileList=response.data;
            //$scope.fileList=response.data;
            console.log("SDFASDJFLSADJFLJSADLFJ");
            console.log(response.data.numOfViolations);
            console.log($scope.timestamps[arrayDetails.length])
            var obj={ label:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp , y: response.data.numOfViolations ,name:$scope.timestamps[arrayDetails.length].pmd._attributes.timestamp};
            console.log(obj);
            arrayDetails.push(obj);
            if(arrayDetails.length===$scope.timestamps.length){
              console.log("time for action");
              console.log(arrayDetails);
              display_barChart(arrayDetails);
              render_piechart(arrayDetails);
            }
          });
      }

    }
  }else{

  }


}
$scope.generate_stage1_graph=generate_stage1_graph;
$scope.renderBarChart=renderBarChart;
  var getVoilations_file=function(file_selected){
    if(file_selected){
      $scope.stage=2;
      console.log("asfadssss");
      console.log(file_selected);
      console.log("url");;
      console.log('/report/pmd/violationslist/file/'+file_selected+'/timestamp/'+$scope.timestamp_selected);
      $http.get('/report/pmd/violationslist/file/'+file_selected+'/timestamp/'+$scope.timestamp_selected).then(function(response) {
        console.log("successs");
        //console.log(response);
        //fileList=response.data;
        console.log(response.data);
        if(response.data.length>0){
          $scope.violationsList=response.data;
          console.log($scope.violationsList);
        }else{
        }


      });

    }
  }
  $scope.getVoilations_file=getVoilations_file;
  $scope.getFiles_timestamp=getFiles_timestamp;
});

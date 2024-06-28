angular.module("myapp").controller("lifeCtrl",['$scope','$interval','Config','$routeParams','Util','$http','$rootScope','ETWeb3',function($scope,$interval,Config,$routeParams,Util,$http,$rootScope,ETWeb3){
  var that=this;
  that.Config=Config;
  refreshLife();
  that.talks=new Array();

  $scope.$on("sendtransaction.",function(event,data){
    refreshLife();
  });  

  function refreshLife(){
    ETWeb3.getLifeDetail([$routeParams["id"]]).then(function(ret) {
      var life=ETWeb3.decode("getLifeDetail",ret);
      that.thisLife=JSON.parse(life[0]);
      that.userAvatar=that.thisLife._avatar;
      console.log(that.thisLife);
      that['talks']=that.thisLife._talks;
      for(i=0;i<that.talks.length;i++){
        if(that.talks[i].avatar=="") that.talks[i].avatar="bfe90a3698dfbfe4ba2952abb591aad9754a4afaa1baac3f63ab48d52789a319";
      }
      that.objects=that.thisLife._objects;

      
          var stopEvent1 = $interval(function(){      
          for(i=0;i<that.objects.length;i++){
            that.objects[i].producted=((new Date().getTime()/1000-that.objects[i].timestamp)*that.objects[i].powertokenproduce);  
          }
          $scope.$on("$destroy", function() {
                                  if(angular.isDefined(stopEvent1))  
                                    {  
                                      $interval.cancel(stopEvent1);  
                                      stopEvent1 = undefined;  
                                    };
                                });
          },1000);
        


      $scope.$apply();
    });
       
  };

  that.setObject1=function(){
    that.userobjects=$scope.$parent.yb.objects;
  }

  that.setObject2=function(){
    ETWeb3.setToLife([that.thisLife.id,that.selectedobject]);
  }

  that.saveGameState=function(lifeid){
    ETWeb3.saveGameData([lifeid]);
  }

  that.buyObject=function(lifeid,objid){
    console.log(lifeid)
    console.log(objid);
    ETWeb3.buyObject([lifeid,objid]);
  }

  that.lifeBuy=function(id,price){
    ETWeb3.buyPhoto([id],price-1+1);
  };

  that.talkOnLife=function(id){
    var temp=that.talkInput;
    if(temp!=null && temp!=""){
      ETWeb3.setTalktolife([id,temp]);
    }else{
      alert("内容不能为空");
    }
  };
}]);
angular.module("myapp").controller('listCtrl',['ETWeb3','$scope','Config','$location','$routeParams','Util','$http','$rootScope','SharedState',function(ETWeb3,$scope,Config,$location,$routeParams,Util,$http,$rootScope,SharedState){
  var that=this;
  that.Config=Config;
  that.showloading=true;
  that.activeTab=1;

  if($location.url().lastIndexOf("/user")==0) that.panel=0;  
  if($location.url().lastIndexOf("/index")==0) that.panel=2;
  if($location.url().lastIndexOf("/user/")==0) { 
    that.panel=3;
    
    window.localStorage.forward=$routeParams['id'];
  }
    
  that.lifees=[];
  that.fwdlifees=[];
  that.favlifees=[];
  that.userid=$routeParams['id'];
  if(that.panel==0) that.userid=window.localStorage.address;
  that.isguest=window.localStorage.guest;
  that.localaddress=window.localStorage.address;

  refreshLifees();

  $scope.$on("sendtransaction.",function(event,data){
    that.showloading=false;
    that.isguest=window.localStorage.guest;
    $scope.$apply();
    refreshLifees();
  });

  $scope.$on("endcall",function(event,data){
    that.showloading=false;
    that.isguest=window.localStorage.guest;
    $scope.$applyAsync();
  });

  $scope.$on("begin transaction",function(event,data){
    that.showloading=true;
    $scope.$applyAsync();
  });

  function refreshLifees(){
    if(that.panel==2) 
      ETWeb3.getLifees([]).then((ret)=>{ 
      var ids=ETWeb3.decode("getLifees",ret);
      console.log(ids);
      console.log(that)
      that.lifees=JSON.parse(ids[0]);
      $scope.$apply();
    });
    else{
      var params;
      if($routeParams.id===undefined){
        params=[window.localStorage.address];
      }else{
        params=[$routeParams['id']];
      }
      ETWeb3.getLifeesByOwner(params).then((ret)=>{
        var temp=ETWeb3.decode("getLifeesByOwner",ret);
        console.log(JSON.parse(temp[0]))
        that.lifees=JSON.parse(temp[0]).lifees; 
        that.fwdlifees=JSON.parse(temp[0]).fwdlifees;
        if($routeParams.id===undefined) that.favlifees=JSON.parse(temp[0]).favlifees;
        that.userid=JSON.parse(temp[0])._owner;
        that.userAvatar=JSON.parse(temp[0])._avatar;   
        console.log(that.userAvatar);
        if(that.userAvatar===undefined) that.userAvatar="bd1b33fa3ce5ccbeb34e5ff677d0db192925e1a7fedfa96bc3538bc2eee3ad79";
        if(that.userAvatar=="") that.userAvatar="bfe90a3698dfbfe4ba2952abb591aad9754a4afaa1baac3f63ab48d52789a319";   
        $scope.$apply();
      });
    }
  };

  that.activelifees=function(){
    //console.log(SharedState.get("activeTab"));
    that.activeTab=SharedState.get("activeTab");    
    //console.log(that.activeTab);
    //console.log(that.panel);

    //if(that.activeTab===undefined) return that.lifees;
    if(that.activeTab==1) return that.lifees;
    if(that.activeTab==2) return that.fwdlifees;
    if(that.activeTab==3) return that.favlifees;
  }

  that.lifeBuy=function(id,price){
    if(confirm("你的xDai地址中的余额够吗")){
      ETWeb3.buyPhoto([id],price-1+1);
    }
  };

  that.setForwardFee=function(id){
    that.operateid=id;
  };

  that.setForwardFee2=function(){
    if(that.inputpinfee!="" && that.inputpinfee!=null){
      ETWeb3.setForwardFee([that.operateid,ETWeb3.web3.utils.toWei(that.inputpinfee,'ether')],ETWeb3.web3.utils.toWei(that.inputpinfee,'ether'));
    }
  };

  that.setPrice=function(id){
    that.operateid=id;
  };

  that.setPrice2=function(){
    if(that.inputpricefee!="" && that.inputpricefee!=null){
      ETWeb3.setPrice([that.operateid,ETWeb3.web3.utils.toWei(that.inputpricefee,'ether')]);
    };
  };

  that.deleteLife=function(id){
    ETWeb3.deleteLife([id]);
  };

  that.setBalance=function(id){
    ETWeb3.setBalance([id,$routeParams["id"]]);
  };

  that.uploadfile=function(file){
    if(that.nameInput!="" && that.nameInput!=undefined) {
      Util.uploadFile(file,1024,"big",true,that.nameInput); 
    }else{ 
      alert("please input nickname");
    }
  };
}]);
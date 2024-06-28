myapp.controller('indexCtrl',['ETWeb3','$interval','$scope','$location','$http','Util','Config',function(ETWeb3,$interval,$scope,$location,$http,Util,Config){
  var that=this;
  that.Config=Config;
  that.txStatus="创世区块链应用，一个新世界";
  that.showloading=false;
  that.cards="";    
  angular.element(document.getElementById('flashscreen')).empty();
  loadUser();
  
  $scope.$on('setAvatar',function(event,data){
    loadUser();
  });

  $scope.$on('begin transaction',function(event,data){
    that.txStatus=data;
    that.showloading=true;
    $scope.$applyAsync();  
  })

  $scope.$on('withdrawFirst',function(event,data){
    ETWeb3.web3.eth.accounts.wallet.clear();
    ETWeb3.web3.eth.accounts.wallet.add(window.localStorage['priv']);  
    alert("got it");
    that.cards="";
  });

  $scope.$on('setTalktolife',function(event,data){
    alert("got it");
    $location.url("/life/"+data[0]);
  })

  $scope.$on("setBalance",function(event,data){
    alert("got it");
    loadUser();
  })

  $scope.$on("upload photo",function(event,data){
    that.txStatus=data.txStatus;
    var setasavatar=false;
    var setpublic=false;
    var setprice=false;
    var setvipvalue=0;
    var nameInput="";

    if(that.setasavatar==undefined || that.setasavatar==false) setasavatar=false; else setasavatar=true;
    if(that.setpublic==undefined || that.setpublic==false) setpublic=false; else setpublic=true;
    if(that.setprice==undefined || that.setprice==false) setprice=false; else setprice=true;

    if(data.avatar) setasavatar=true;
    if(data.name!="") nameInput=data.name; else nameInput=that.nameInput;
    console.log(data);
    if(setpublic) setvipvalue=Config.baseunit*1000;
    console.log(setvipvalue);
    console.log([nameInput,setasavatar,setprice]);
    ETWeb3.createLife([nameInput,data.smallpath,data.bigpath,setasavatar,setprice],setvipvalue,function(){});
  });
  
  $scope.$on("sendtransaction",function(event,data){
    that.txStatus=data;
    $scope.$apply();
  });

  $scope.$on("endcall",function(event,data){
    that.showloading=false;
    that.txStatus=data;
    that.ethAddress=window.localStorage.address;
    that.ethAddressPrivkey=window.localStorage.priv;
    $scope.$apply();
  });

  $scope.$on("sendtransaction.",function(event,data){
    that.showloading=false;
    that.txStatus=data;
    loadUser();
    $scope.$apply();
  })

  function loadUser(){
      ETWeb3.getUser([window.localStorage.address]).then((ret)=>{
        var user=ETWeb3.decode("getUser",ret);
        console.log(user);
        that.ethBalance=user._balance2;
        that.userAvatar=user._avatar;
        if(that.userAvatar=="") that.userAvatar="bfe90a3698dfbfe4ba2952abb591aad9754a4afaa1baac3f63ab48d52789a319";
        that.etBalance=user._balance;
        that.cards=user._cards;
        that.usertoken=JSON.parse(user._objects).token-1+1;
        that.objects=JSON.parse(user._objects).objects;
        if(user._name=="Guest"){
          window.localStorage.guest=true;
        }else{
          window.localStorage.guest=false;
        }   
        $scope.$apply();
      });
  }

  that.showObject=function(objectid){
    for(i=0;i<that.objects.length;i++){
      if(that.objects[i].objectid==objectid) that.selectedobject=that.objects[i];
    }
    console.log(objectid);
    console.log(that.objects);
    console.log(that.selectedobject);
  }

  that.setNewPrice=function(){
    ETWeb3.setobjectprice([that.selectedobject.objectid,that.newprice-1+1])
  }

  that.sellselectedObject=function(){
    ETWeb3.sellObject([that.selectedobject.objectid]);
  }

  that.goto=function(url){
    $location.url(url)      
  };
  
  that.getFirst=function(){    
    ETWeb3.web3.eth.accounts.wallet.clear();
    ETWeb3.web3.eth.accounts.wallet.add(that.cards);
    ETWeb3.sendCode(ETWeb3.web3,ETWeb3.web3.eth.accounts.wallet[0].address,Config.etAddress,"withdrawFirst",[{"name": "_user", "type": "address"} ],[window.localStorage.address]); 
  }

  that.withdraw=function(){
    if(confirm("你要取现到自己的xDai钱包吗？")){
      ETWeb3.withdrawBalance([]);
    }
  };

  that.login=function(){
      if(that.password!="" && that.password!=undefined){
      if(confirm("请注意，更换地址后，新地址将覆盖旧地址，如果你还需要使用旧地址，请注意把旧地址私钥记录在安全的地方，我们不传输也不保存你的任何地址信息"))
    {
      if(ETWeb3.login(that.password)){
      loadUser();
      //$rootScope.$broadcast("setAvatar");
    }else{
      alert("这个私钥不对");
    }
  }}else{
    alert("您的输入有误")
  }};

  that.uploadfile=function(file){
    if(that.nameInput!="" && that.nameInput!=undefined) {
      Util.uploadFile(file,1024,"big"); 
    }else{ 
      alert("please input text");
    }
  };

}]);

angular.bootstrap(document.body, ["myapp"]);  
//remixd -s c:\lius\2 https://remix.ethereum.org
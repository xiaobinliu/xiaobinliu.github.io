myapp.service("ETWeb3",['Config','$interval','$rootScope','Util','$http',function(Config,$interval,$rootScope,Util,$http){
 var web3js;
 var ret={};
  for(i in Config.etContractAbi){
    if(Config.etContractAbi[i].type=="function"){
      if(Config.etContractAbi[i].stateMutability.indexOf("payable")>=0){
        ret[Config.etContractAbi[i].name]=(function()
        {var name=Config.etContractAbi[i].name,inputs=Config.etContractAbi[i].inputs; 
          return function(args,payvalue,then){
            console.log(args);
            console.log(payvalue);
            return sendCode(web3js,window.localStorage.address,Config.etAddress,name,inputs,args,payvalue,then);
        };})();
      }else{
        ret[Config.etContractAbi[i].name]=(function()
        {var name=Config.etContractAbi[i].name,inputs=Config.etContractAbi[i].inputs;
          return function(args){
            return callCode(web3js,window.localStorage.address,Config.etAddress,name,inputs,args);
          };
        })();
      };
    };
  };

refreshweb3();
    if(window.localStorage.priv==undefined){
        var temp1=web3js.eth.accounts.create();
        window.localStorage.setItem("priv",temp1.privateKey);
        window.localStorage.setItem("address",temp1.address);
      };
      web3js.eth.accounts.wallet.add(localStorage.priv);

var stopEvent = $interval(function(){      
  console.log("interval") ;
     web3js.eth.net.isListening().then((ret)=>{
    if(ret) {console.log(ret);
    $rootScope.$broadcast("setAvatar");}
     else refreshweb3();      
  }).catch((err)=>refreshweb3());
                       //$scope.$on("$destroy", function() {
                         //     if(angular.isDefined(stopEvent))  
                           //   {  
                             //     $interval.cancel(stopEvent);  
                               //   stopEvent = undefined;  
                              //}  ;
                        //})
                    //}
                    },60000);

function refreshweb3(){
    //web3js=new Web3(new Web3.providers.WebsocketProvider(Config.web3URL));
    
    web3js=new Web3(new Web3.providers.HttpProvider(Config.web3URL));
    
    console.log(web3js);
    $rootScope.$broadcast("setAvatar");
}
  
  function findAbi(name){
    for(i in Config.etContractAbi){
      if(Config.etContractAbi[i].name==name) return Config.etContractAbi[i].outputs; 
    };
    return [];
  };
  function sendCode(web3,fromaccount,contractaddr,name,inputs,inputValue,payValue,then){
    console.log(web3);
    console.log(fromaccount);
    console.log(contractaddr);
    console.log(name);
    console.log(inputs);
    console.log(inputValue);
    console.log(payValue);
    console.log(then);
    $rootScope.$broadcast("begin transaction","正在写入智能合约");
      web3.eth.getTransactionCount(fromaccount).then(res=>{        
        var ret=web3.eth.sendTransaction({from:fromaccount,nonce: '0x'+ res.toString(16),gasPrice: Config.gasPrice,gas: Config.gasLimit,to: contractaddr,value: payValue,data: web3.eth.abi.encodeFunctionCall({name:name,type:"function",inputs:inputs},inputValue)},(err,hash)=>{
              if(!err) $rootScope.$broadcast("sendtransaction","写入智能合约中");
              if(err) $rootScope.$broadcast("sendtransaction","智能合约告知交易出错");  
            });   
        ret.on('transactionHash',function(hash){ $rootScope.$broadcast("sendtransaction","智能合约告知交易已提交");})
           .on('confirmation',function(number,receipt){  
                    if(number==1) {
                        $rootScope.$broadcast("sendtransaction.","创世区块链应用，一个新世界");
                        
                        if(name=="setTalktolife") $rootScope.$broadcast("setTalktolife",inputValue);
                        if(name=="withdrawFirst") $rootScope.$broadcast("withdrawFirst","智能合约告知交易已提交");
                        if(name=="setBalance") $rootScope.$broadcast("setBalance","智能合约告知交易已提交");
                    }
              })
           .on('receipt', function(receipt) {  $rootScope.$broadcast("sendtransaction","智能合约告知交易已提交"); })
           .on('error',function(error,receipt){ $rootScope.$broadcast("sendtransaction.","智能合约告知交易出错"); })
           .then(then);
        return(ret); });
    };    
  function callCode(web3,fromaccount,contractaddr,name,inputs,inputValue){
      $rootScope.$broadcast("begin transaction","正在查询智能合约");
        return(
            web3.eth.call({
            from:fromaccount,to: contractaddr,
            data:web3.eth.abi.encodeFunctionCall({name:name,type:'function',inputs: inputs},inputValue)}, function(err, result) {
                 $rootScope.$broadcast("endcall","创世区块链应用，一个新世界");
               }));        
    };  

      ret['web3']=web3js;
      ret['sendCode']=sendCode;
      ret['login']=function(password){
        web3js.eth.accounts.wallet.clear();
        try{
          web3js.eth.accounts.wallet.add(password);
        }catch(e){
          return(false);
        }
        if(web3js.utils.isAddress(web3js.eth.accounts.wallet[0].address)){
          window.localStorage.setItem("priv",password);
          window.localStorage.setItem("address",web3js.eth.accounts.wallet[0].address);
          return(true);
        }else{
          web3js.eth.accounts.wallet.clear();
          web3js.eth.accounts.wallet.add(window.localStorage['priv']);  
          return (false);
        }
      };
      ret['decode']=function(outputs,res){
         var out=findAbi(outputs); 
         return web3js.eth.abi.decodeParameters(out,res);
      };
    return(ret);
}]);

myapp.service('Util',['$q','$location', '$http','Config','$rootScope',function($q,$location,$http,Config,$rootScope) {
var photopath={};
  var uploadFile=function(file,intsize,txtsize,avatar=false,name=""){
    $rootScope.$broadcast("begin transaction","正在上传图片");
    console.log(avatar);
        resizeFile(file,intsize,intsize).then(function(blob_data) {
          //var fd = new FormData();
          //fd.append("useravatar", blob_data.blob);
          $http.post(Config.ipfsAPI,blob_data.blob,{headers: {'Content-Type': undefined},transformRequest: angular.identity}).then(function(data) {
            photopath[txtsize]=data.data;//data.data.Hash
            if(intsize==100) 
              $rootScope.$broadcast("upload photo",{"name":name,"avatar":avatar,"txStatus":"Photo uploaded!","bigpath":photopath['big'],"smallpath":photopath['small']}); 
            else 
              uploadFile(file,100,"small",avatar,name);
          });
        });
      };
  function tobytes6(str){
    var ret='0x';
    for(var i=0;i<str.length;i++){ 
      var b=str.charCodeAt(i); 
      ret=ret+b.toString(16);
    };
    return ret;
  };
  var dataURItoBlob = function(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
      byteString = atob(dataURI.split(',')[1]);
    else
      byteString = unescape(dataURI.split(',')[1]);
    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ia], {
      type: mimeString
    });
  };

  var preImage=function(url,callback){
       var img = new Image();
       img.src = url;
      if (img.complete) {
           callback.call(img);
          return;
       }
       img.onload = function () {
           callback.call(img);
       };
  }

  var resizeFile = function(file) {
    var MAX_WIDTH1 = arguments[1]?arguments[1]:100;
    var MAX_HEIGHT1 = arguments[2]?arguments[2]:100;
    var deferred = $q.defer();
    try {
      var reader = new FileReader();
      reader.onload = function(e) {
        preImage(e.target.result,function(){
          var MAX_WIDTH = MAX_WIDTH1;
          var MAX_HEIGHT = MAX_HEIGHT1;
          var width = this.width;
          var height = this.height;
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          var canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(this,0, 0,this.width,this.height,0,0,width,height);
          var dataURL = canvas.toDataURL('image/jpeg');
          var blob = dataURItoBlob(dataURL);
          deferred.resolve({'data':dataURL,'blob':blob});
        });
        //ctx.drawImage(img, 0, 0, width, height);
        //change the dataUrl to blob data for uploading to server
      };
      reader.readAsDataURL(file);
    } catch (e) {
      deferred.resolve(e);
    }
    return deferred.promise;
  };
  return {
    uploadFile: uploadFile,
    basePath:function(){
      return($location.url().substring(0,$location.url().indexOf("/")));
    }
  };
}]);
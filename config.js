var myapp=angular.module("myapp",['ngRoute','mobile-angular-ui']);

myapp.service("Config",['$location',function($location){
  return {
    ipfsURL:'https://swarm-gateways.net/bzz-raw:/',
    //ipfsURL:https://ipfs.infura.io/ipfs",
    ipfsAPI:'https://swarm-gateways.net/bzz-raw:/',
    //ipfsAPI:"https://ipfs.infura.io:5001/api/v0",
    web3URL:'https://rpc.gnosischain.com',
    //'https://rpc.xdaichain.com',
    //web3URL:'https://xdai.poanetwork.dev',
    //web3URL:'https://dai.poa.network/',
    //web3URL:'wss://rpc.xdaichain.com/wss',
    //web3URL: wss://rinkeby.infura.io/ws/v3/478de24dd4ac43f69e7e9c56f09f69d4",
    //web3URL: "https://rinkeby.infura.io/v3/478de24dd4ac43f69e7e9c56f09f69d4", 
    //web3URL: "http://127.0.0.1:7545",
    gasLimit:600000,gasPrice:'1000000000',baseunit:1000000000000000,
    etAddress:"0xd3Afe35932391f50942ffb826848A12355865AeB",
    //0x1765815DC65665c5797929a774a03dDD9c32a2fb",
    //etAddress:"0x0248dc9Ac57F9e5F1Df5cEBE75e42cbBF8665A51",
    //etAddress:"0xCd03b2600d9D3e1AB7170b653DEbd63430C8d64b",
    //etAddress:"0xEfaaff8E038480053724A1E303b31Def235DabD9",
    //etdata xdai etmain"0x4373E07E8525Dfde5488A1b074ad12fE5B4953B8",
    //"0xD7912b2b781aEfa768c967CfAA89017226215A50",
    //"0x63C55e8DCf759dE69eE1C7AaC214a0780E92D86B",
    //"0x86927F7C64B72e343Eb538F38E54E2E55a764dAf",
    //etMain,,,,latest etData on rinkeby"0x8A78329C4Ab0504bDDBC04888F824b7Fae985BF8",
    //"0xE5e39EA84b750601346f60A19D50e04241c6887a":
    //"0x0d22A21B9449Dc0c6AC5b7d0880AB9b5F0E5a369":
    etContractAbi:[
                {"constant": false, "inputs": [{"name": "_user", "type": "address"} ], 
                 "name": "withdrawFirst", //d2074f30
                 "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"},
                 {"constant": false, "inputs": [{"name": "_lifeId", "type": "uint256"}, {"name": "_useraddr", "type": "address"} ], 
                "name": "setBalance", //92118222
                "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"},    
                { "inputs": [{"name": "_lifeId", "type": "uint256"}, {"name": "_text", "type": "string"} ], 
                  "name": "setTalktolife", //0cca8dfc
                  "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, 
                {"inputs": [], 
                "name": "withdrawBalance", //5fd8c710
                "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"},
                {"inputs": [{"name": "_lifeid", "type": "uint256"} ], 
                "name": "deleteLife", //882a605a
                "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"},
                {"inputs": [{"name": "_lifeId", "type": "uint256"}, {"name": "_fee", "type": "uint256"} ], 
                "name": "setForwardFee", //1b2da465
                "outputs": [], "payable": true, "stateMutability": "payable", "type": "function"}, 
                {"inputs": [{"name": "_lifeId", "type": "uint256"}, {"name": "_fee", "type": "uint256"} ], 
                "name": "setPrice", //f7d97577
                "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"},
                {"inputs": [{"name": "_lifeId", "type": "uint256"} ], 
                "name": "buyPhoto", //b2bf5826
                "outputs": [], "payable": true, "stateMutability": "payable", "type": "function"},
                {"inputs": [{"name": "_name", "type": "string"},{"name":"_url","type":"string"},{"name":"_url2","type":"string"},{"name":"_setasavatar","type":"bool"},{"name":"_price","type":"bool"} ], 
                "name": "createLife", //f717784e
                "outputs": [{"name": "_lifeid", "type": "uint256"} ], "payable": false, "stateMutability": "nonpayable", "type": "function"},
                {"inputs": [{"name": "_user2", "type": "address"}], 
                "name": "getLifeesByOwner", //ea5b0143
                "outputs": [{"name": "_lifees", "type": "string"} ], "payable": false, "stateMutability": "view", "type": "function"},
                {"inputs": [],
                "name": "getLifees",//740fe676
                "outputs": [{"name": "_lifees","type": "string"}],"payable": false,"stateMutability": "view","type": "function"},
                {"inputs": [{"name": "_user", "type": "address"} ], 
                "name": "getUser", //6f77926b
                "outputs": [{"name": "_name", "type": "string"}, {"name": "_avatar", "type": "string"}, {"name": "_cards", "type": "string"}, {"name": "_balance", "type": "uint256"},{"name":"_balance2","type":"uint256"},{"name": "_objects","type": "string"} ], "payable": false, "stateMutability": "view", "type": "function"},
                {"inputs": [{"name": "_lifeId", "type": "uint256"} ], 
                "name": "getLifeDetail", //11ba181a
                "outputs": [{"name":"_lifedetail","type":"string"} ], "payable": false, "stateMutability": "view", "type": "function"},

{"inputs": [{"name": "_lifeId", "type": "uint256"}, {"name": "_objid", "type": "uint256"} ], 
 "name": "buyObject", //0x2fa8321c
 "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, 
{"inputs": [{"name": "_objid", "type": "uint256"} ], 
 "name": "sellObject",//0x540a1fd5
 "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, 
{"inputs": [{"name": "_lifeId", "type": "uint256"}, {"name": "_objid", "type": "uint256"} ],  
  "name": "setToLife", //0x779f923c
  "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, 
{"inputs": [{"name": "_objid", "type": "uint256"}, {"name": "_price", "type": "uint256"} ], 
"name": "setobjectprice", //0x847f95fc
"outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}, {"constant": false, "inputs": [{"name": "_lifeId", "type": "uint256"} ], "name": "saveGameData", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function"}
              ]
            };
}]); 
/*
0xB69882B8729888d114DDB7e8cc9E1a56DBfFE90d etgetlife
0x291B03006c7722f9315B5566F2ba7fD6B44c3bD1 etgameapp
0x61c5780e546490a5E63fE5c35D38d345CE18c415 etgetlife2
0xd20823bB079eA4B22c6696837eA1bdc01c6cb9CA etmain
0xd3Afe35932391f50942ffb826848A12355865AeB etdata

 */
//main ['0xe9173b7f']
//getlife  ["0x740fe676","0x60ef1ef6","0xc5d8c48d"]
//life2  ["0x13db1d6e","0x11ba181a"]
//gameapp,["0x6f77926b","0x2fa8321c","0x73cc2094","0xf3853591","0x540a1fd5","0x779f923c","0x847f95fc"]
myapp.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider){
    $routeProvider.when("/user/:id",{
      templateUrl:"/list.html",
      controller:"listCtrl",
      controllerAs:"yb"
      });   
    $routeProvider.when("/index",{
      templateUrl:"/list.html",
      controller:"listCtrl",
      controllerAs:"yb"
    });   
    $routeProvider.when("/user",{
      templateUrl:"/list.html",
      controller:"listCtrl",
      controllerAs:"yb"
    });
    $routeProvider.when("/life/:id",{
      templateUrl:"/life.html",
      controller:"lifeCtrl"    ,
        controllerAs:"yb" 
    });    
    $routeProvider.when("/welcome",{
      templateUrl:`/welcome.html`,
      controllerAs:"yb",
      controller:"indexCtrl"
    });
    $routeProvider.otherwise({
        redirectTo: '/index'
    });
    $locationProvider.html5Mode({enabled:true,requireBase:false});
}]);
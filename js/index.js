$(function() {
    $('#side-menu').metisMenu();
});

window.onload = function() {
  ModelViewController.isLogin = false;
  setInterval(PassportPipeline.statusMessage("Folio Updated!"), 9999);
}
$(document).ready(function(){
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){ 
        let coins = ['etnx','etnxp','ltnx','gldx','crfi'];
        var passport = PassportPipeline.get_passport_local("passport_active"); 
        let code = parseInt(PassportPipeline.loadCode());
        PassportPipeline.loadParams();
        PassportPipeline.setMethod('getaddr');
        PassportPipeline.passportParams.method = 'getaddr';
        let method = PassportPipeline.passportParams.method;
        var x;
        ModelViewController.fillData();
            const myPromises = function(){
                var promise = new Promise(function(resolve, reject) {             
                    console.log(passport);
                    let etnx_api = PassportPipeline.getPassportApi('etnx');
                    let etnxp_api = PassportPipeline.getPassportApi('etnxp');
                    let ltnx_api = PassportPipeline.getPassportApi('ltnx');
                    let gldx_api = PassportPipeline.getPassportApi('gldx');
                    let crfi_api = PassportPipeline.getPassportApi('crfi');  
                    let passport_api = PassportPipeline.getPassportApi('all');
                    var passport_index = {
                        uid_etnx: passport.uid_etnx ? parseInt(passport.uid_etnx) : '0x.2',
                        etnxp_uuid: passport.uid_etnxp ? parseInt(passport.uid_etnxp) : '0x.3',
                        ltnx_uuid: passport.uid_ltnx ? parseInt(passport.uid_ltnx) : '0x.4',
                        gldx_uuid: passport.uid_gldx ? parseInt(passport.uid_gldx) : '0x.5',
                        crfi_uuid: passport.uid_crfi ? parseInt(passport.uid_crfi) : '0x.6',
                        uid: passport.uid ? parseInt(passport.uid) : '0x.7',
                        code: passport.code ? parseInt(passport.code) : '0x.8',
                        email: PassportPipeline.passportParams.email,
                        password: PassportPipeline.passportParams.password,
                        coinAPIurl: [etnx_api, etnxp_api, ltnx_api, gldx_api, crfi_api],
                        method: 'getaddr'
                    };
                    PassportPipeline.set_passport_local(passport_index,"passport_index");  
                    var passportIndex = PassportPipeline.get_passport_local("passport_index");                
                    if(passport.uid_etnx != '0x.2') {
                        let operation = 'poll';
                        ModelViewController.fillData();
                        ModelViewController.initLevel = 0;
                        ModelViewController.coinState = 0;
                        PassportPipeline.startCryptoEngine(operation, passport_index);
                        resolve(passport_index);
                    } else {
                        reject(passport_index);
                    };
                });                
                promise.then(function (passport_index) {
                    console.log("UUID log: "+passport_index.uid);
                    console.log("CODE log: "+passport_index.code);
                    console.log("email log: "+passport_index.email);
                    console.log("password log: "+passport_index.password);
                    console.log("coinAPIurl log: "+passport_index.coinAPIurl);
                    console.log("method log: "+passport_index.method);
                    console.log(passport_index);
                    sessionStorage.setItem("fromLogin", false);
                    // set a key to authenticate crystalID 
                    PassportPipeline.setUUkey('crfi');
                    }).catch(function (passport_index) {
                        console.log('Err: '+passport_index);
                    });
            };
            setInterval(myPromises, 15000);
    } else {
        var passportIndex = PassportPipeline.get_passport_local("passport_index");
        let coins = ['etnx','etnxp','ltnx','gldx','crfi'];
        var passport = PassportPipeline.get_passport_local("passport_active"); 
        let code = parseInt(PassportPipeline.loadCode());
        PassportPipeline.loadParams();
        PassportPipeline.setMethod('getaddr');
        PassportPipeline.passportParams.method = 'getaddr';
        let method = PassportPipeline.passportParams.method;
        var x;
        ModelViewController.fillData();
            const myPromises = function(){
                var promise = new Promise(function(resolve, reject) {             
                    console.log(passport);
                    let etnx_api = PassportPipeline.getPassportApi('etnx');
                    let etnxp_api = PassportPipeline.getPassportApi('etnxp');
                    let ltnx_api = PassportPipeline.getPassportApi('ltnx');
                    let gldx_api = PassportPipeline.getPassportApi('gldx');
                    let crfi_api = PassportPipeline.getPassportApi('crfi');  
                    let passport_api = PassportPipeline.getPassportApi('all');  
                    var passport_index = {
                        uid_etnx: passport.etnx_uid ? parseInt(passport.etnx_uid) : '0x.2',
                        etnxp_uuid: passport.etnxp_uid ? parseInt(passport.etnxp_uid) : '0x.3',
                        ltnx_uuid: passport.ltnx_uid ? parseInt(passport.ltnx_uid) : '0x.4',
                        gldx_uuid: passport.gldX_uid ? parseInt(passport.gldX_uid) : '0x.5',
                        crfi_uuid: passport.crfi_uid ? parseInt(passport.crfi_uid) : '0x.6',
                        uid: passport.uid ? parseInt(passport.uid) : '0x.7',
                        code: passport.code ? parseInt(passport.code) : '0x.8',
                        email: PassportPipeline.passportParams.email,
                        password: PassportPipeline.passportParams.password,
                        coinAPIurl: [etnx_api, etnxp_api, ltnx_api, gldx_api, crfi_api],
                        method: 'getaddr'
                    };
                    PassportPipeline.set_passport_local(passport_index,"passport_index");  
                    var passportIndex = PassportPipeline.get_passport_local("passport_index");                
                    if(passport.uid_etnx != '0x.2') {
                        let operation = 'poll';
                        ModelViewController.fillData();
                        ModelViewController.initLevel = 0;
                        ModelViewController.coinState = 0;
                        PassportPipeline.startCryptoEngine(operation, passport_index);
                        resolve(passport_index);
                    } else {
                        reject(passport_index);
                    };
                });                
                promise.then(function (passport_index) {
                    ModelViewController.fillData();
                    console.log("UUID log: "+passport_index.uid);
                    console.log("X UUID log: "+passport_index.etnx_uid);
                    console.log("XP UUID log: "+passport_index.etnxp_uid);
                    console.log("LTNX UUID log: "+passport_index.ltnx_uid);
                    console.log("GLDX UUID log: "+passport_index.gldx_uid);
                    console.log("CRFI UUID log: "+passport_index.crfi_uid);
                    console.log("CODE log: "+passport_index.code);
                    console.log("email log: "+passport_index.email);
                    console.log("password log: "+passport_index.password);
                    console.log("coinAPIurl log: "+passport_index.coinAPIurl);
                    console.log("method log: "+passport_index.method);
                    console.log(passport_index);
                    }).catch(function (passport_index) {
                        console.log('Err: '+passport_index);
                    });
            };
        ModelViewController.fillData();
        setInterval(myPromises, 15000);
        };
});
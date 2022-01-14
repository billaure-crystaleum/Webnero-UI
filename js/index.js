$(function() {
    $('#side-menu').metisMenu();
});

window.onload = function() {
  ModelViewController.isLogin = false;
    
    $(".etnx-bal").css("display", "none");
    $(".etnxp-bal").css("display", "none");
    $(".ltnx-bal").css("display", "none");
    $(".gldx-bal").css("display", "none");
    $(".crfi-bal").css("display", "none");
    $(".etnx-lds-facebook").css("display", "block");
    $(".etnx-lds-ellipsis").css("display", "block");
    $(".etnxp-lds-facebook").css("display", "block");
    $(".etnxp-lds-ellipsis").css("display", "block");
    $(".ltnx-lds-facebook").css("display", "block");
    $(".ltnx-lds-ellipsis").css("display", "block");
    $(".gldx-lds-facebook").css("display", "block");
    $(".gldx-lds-ellipsis").css("display", "block");
    $(".crfi-lds-facebook").css("display", "block");
    $(".crfi-lds-ellipsis").css("display", "block");
     
  setInterval(PassportPipeline.statusMessage("Folio Updated!"), 9999);
}
$(document).ready(function(){
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){ 
        const coins = ['etnx','etnxp','ltnx','gldx','crfi'];
        const code = parseInt(PassportPipeline.loadCode());
        PassportPipeline.loadParams();
        PassportPipeline.setMethod('getaddr');
        PassportPipeline.passportParams.method = 'getaddr';
        const method = PassportPipeline.passportParams.method;
        var x;
        ModelViewController.fillData();
            const myPromises = function(passport = PassportPipeline.get_passport_local("passport_active")){
                const promise = new Promise(function(resolve, reject) {
                    let passport = PassportPipeline.get_passport_local("passport_active");        
                    console.log(passport);
                    const etnx_api = PassportPipeline.getPassportApi('etnx');
                    const etnxp_api = PassportPipeline.getPassportApi('etnxp');
                    const ltnx_api = PassportPipeline.getPassportApi('ltnx');
                    const gldx_api = PassportPipeline.getPassportApi('gldx');
                    const crfi_api = PassportPipeline.getPassportApi('crfi');
                    const passport_api = PassportPipeline.getPassportApi('all');
                    const passport_index = {
                        uid_etnx: parseInt(PassportPipeline.getCoinUUID('etnx')),
                        uid_etnxp: parseInt(PassportPipeline.getCoinUUID('etnxp')),
                        uid_ltnx: parseInt(PassportPipeline.getCoinUUID('ltnx')),
                        uid_gldx: parseInt(PassportPipeline.getCoinUUID('gldx')),
                        uid_crfi: parseInt(PassportPipeline.getCoinUUID('crfi')),
                        etnx_uid: parseInt(PassportPipeline.getCoinUUID('etnx')),
                        etnxp_uid: parseInt(PassportPipeline.getCoinUUID('etnxp')),
                        ltnx_uid: parseInt(PassportPipeline.getCoinUUID('ltnx')),
                        gldx_uid: parseInt(PassportPipeline.getCoinUUID('gldx')),
                        crfi_uid: parseInt(PassportPipeline.getCoinUUID('crfi')),
                        email: sessionStorage.getItem('email').toString(),
                        password: sessionStorage.getItem('password').toString(),
                        code: parseInt(sessionStorage.getItem('code')),
                        coinsAPIurl: [etnx_api, etnxp_api, ltnx_api, gldx_api, crfi_api, passport_api],
                        coinAPIurl: passport_api.toString(),
                        url: passport_api.toString(),
                        operation: 'poll',
                        method: 'getaddr'
                    };
                    PassportPipeline.set_passport_local(passport_index,"passport_index");  
                    var passportIndex = PassportPipeline.get_passport_local("passport_index");                
                    if(passport_index.uid_etnx != null && passport_index.uid_etnxp != null && passport_index.uid_ltnx != null && passport_index.uid_gldx != null && passport_index.uid_crfi != null) {
                        ModelViewController.fillData();
                        ModelViewController.initLevel = 0;
                        ModelViewController.coinState = 0;
                        resolve(passport_index);
                    } else {
                        reject(passport_index);
                    };
                });                
                promise.then(function (passport_index) {
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
                    sessionStorage.setItem("fromLogin", false);
                    PassportPipeline.startCryptoEngine(passport_index.operation.toString(), passport_index);
                    // set a key to authenticate crystalID 
                    PassportPipeline.setUUkey('crfi');
                    }).catch(function (passport_index) {
                        console.log('Err: '+passport_index);
                    });
            };
            // setInterval(myPromises, 15000);
        myPromises(PassportPipeline.get_passport_local("passport_local"));
    } else {
        var passportIndex = PassportPipeline.get_passport_local("passport_index");
        const coins = ['etnx','etnxp','ltnx','gldx','crfi'];
        const passport = PassportPipeline.get_passport_local("passport_active"); 
        const passportA = passport; 
        const code = parseInt(PassportPipeline.loadCode());
        PassportPipeline.loadParams();
        PassportPipeline.setMethod('getaddr');
        PassportPipeline.passportParams.method = 'getaddr';
        var method = PassportPipeline.passportParams.method;
        var x;
        ModelViewController.fillData();
        const myPromises = function(passport = PassportPipeline.get_passport_local("passport_active")){
            const promise = new Promise(function(resolve, reject) { 
                let passport = PassportPipeline.get_passport_local("passport_active");        
                console.log(passport);
                const etnx_api = PassportPipeline.getPassportApi('etnx');
                const etnxp_api = PassportPipeline.getPassportApi('etnxp');
                const ltnx_api = PassportPipeline.getPassportApi('ltnx');
                const gldx_api = PassportPipeline.getPassportApi('gldx');
                const crfi_api = PassportPipeline.getPassportApi('crfi');
                const passport_api = PassportPipeline.getPassportApi('all');
                const passport_index = {
                        uid_etnx: parseInt(PassportPipeline.getCoinUUID('etnx')),
                        uid_etnxp: parseInt(PassportPipeline.getCoinUUID('etnxp')),
                        uid_ltnx: parseInt(PassportPipeline.getCoinUUID('ltnx')),
                        uid_gldx: parseInt(PassportPipeline.getCoinUUID('gldx')),
                        uid_crfi: parseInt(PassportPipeline.getCoinUUID('crfi')),
                        etnx_uid: parseInt(PassportPipeline.getCoinUUID('etnx')),
                        etnxp_uid: parseInt(PassportPipeline.getCoinUUID('etnxp')),
                        ltnx_uid: parseInt(PassportPipeline.getCoinUUID('ltnx')),
                        gldx_uid: parseInt(PassportPipeline.getCoinUUID('gldx')),
                        crfi_uid: parseInt(PassportPipeline.getCoinUUID('crfi')),
                        email: sessionStorage.getItem('email').toString(),
                        password: sessionStorage.getItem('password').toString(),
                        code: parseInt(sessionStorage.getItem('code')),
                        coinsAPIurl: [etnx_api, etnxp_api, ltnx_api, gldx_api, crfi_api, passport_api],
                        coinAPIurl: passport_api.toString(),
                        url: passport_api.toString(),
                        operation: 'poll',
                        method: 'getaddr'
                    };
                PassportPipeline.set_passport_local(passport_index,"passport_index");  
                var passportIndex = PassportPipeline.get_passport_local("passport_index");                
                if(passport_index.uid_etnx != null && passport_index.uid_etnxp != null && passport_index.uid_ltnx != null && passport_index.uid_gldx != null && passport_index.uid_crfi != null) {
                    let operation = 'poll';
                    ModelViewController.fillData();
                    ModelViewController.initLevel = 0;
                    ModelViewController.coinState = 0;
                    resolve(passport_index);
                } else {
                    reject(passport_index);
                };
            });                
            promise.then(function (passport_index) {
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
                sessionStorage.setItem("fromLogin", false);
                PassportPipeline.startCryptoEngine(passport_index.operation.toString(), passport_index);
                // set a key to authenticate crystalID 
                PassportPipeline.setUUkey('crfi');
                }).catch(function (passport_index) {
                    console.log('Err: '+passport_index);
                });
        };
        // setInterval(myPromises, 10000);
        myPromises(PassportPipeline.get_passport_local("passport_local"));
        };
});

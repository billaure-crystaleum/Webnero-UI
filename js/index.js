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
                    if(!passport){ 
                        passport = PassportPipeline.get_passport_local("passport_active");
                    }          
                    console.log(passport);
                    const etnx_api = PassportPipeline.getPassportApi('etnx');
                    const etnxp_api = PassportPipeline.getPassportApi('etnxp');
                    const ltnx_api = PassportPipeline.getPassportApi('ltnx');
                    const gldx_api = PassportPipeline.getPassportApi('gldx');
                    const crfi_api = PassportPipeline.getPassportApi('crfi');
                    const passport_api = PassportPipeline.getPassportApi('all');
                    const passport_index = {
                        uid_etnx: parseInt(passport.uid_etnx),
                        uid_etnxp: parseInt(passport.uid_etnxp),
                        uid_ltnx: parseInt(passport.uid_ltnx),
                        uid_gldx: parseInt(passport.uid_gldx),
                        uid_crfi: parseInt(passport.uid_crfi),
                        etnx_uid: parseInt(passport.etnx_uid),
                        etnxp_uid: parseInt(passport.etnxp_uid),
                        ltnx_uid: parseInt(passport.ltnx_uid),
                        gldx_uid: parseInt(passport.gldx_uid),
                        crfi_uid: parseInt(passport.crfi_uid),
                        email: PassportPipeline.passportParams.email,
                        password: PassportPipeline.passportParams.password,
                        code: parseInt(passport.code),
                        coinAPIurl: [etnx_api, etnxp_api, ltnx_api, gldx_api, crfi_api, passport_api],
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
                    PassportPipeline.startCryptoEngine(operation, passport_index);
                    // set a key to authenticate crystalID 
                    PassportPipeline.setUUkey('crfi');
                    }).catch(function (passport_index) {
                        console.log('Err: '+passport_index);
                    });
            };
            setInterval(myPromises, 15000);
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
                if(!passport){ 
                    passport = PassportPipeline.get_passport_local("passport_active");
                }          
                console.log(passport);
                const etnx_api = PassportPipeline.getPassportApi('etnx');
                const etnxp_api = PassportPipeline.getPassportApi('etnxp');
                const ltnx_api = PassportPipeline.getPassportApi('ltnx');
                const gldx_api = PassportPipeline.getPassportApi('gldx');
                const crfi_api = PassportPipeline.getPassportApi('crfi');
                const passport_api = PassportPipeline.getPassportApi('all');
                const passport_index = {
                    uid_etnx: parseInt(passport.uid_etnx),
                    uid_etnxp: parseInt(passport.uid_etnxp),
                    uid_ltnx: parseInt(passport.uid_ltnx),
                    uid_gldx: parseInt(passport.uid_gldx),
                    uid_crfi: parseInt(passport.uid_crfi),
                    etnx_uid: parseInt(passport.etnx_uid),
                    etnxp_uid: parseInt(passport.etnxp_uid),
                    ltnx_uid: parseInt(passport.ltnx_uid),
                    gldx_uid: parseInt(passport.gldx_uid),
                    crfi_uid: parseInt(passport.crfi_uid),
                    email: PassportPipeline.passportParams.email,
                    password: PassportPipeline.passportParams.password,
                    code: parseInt(passport.code),
                    coinAPIurl: [etnx_api, etnxp_api, ltnx_api, gldx_api, crfi_api, passport_api],
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
                PassportPipeline.startCryptoEngine(operation, passport_index);
                // set a key to authenticate crystalID 
                PassportPipeline.setUUkey('crfi');
                }).catch(function (passport_index) {
                    console.log('Err: '+passport_index);
                });
        };
        setInterval(myPromises, 10000);
        };
});
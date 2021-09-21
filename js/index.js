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
          

        var promise = new Promise(function(resolve, reject) {
            var x;
            var passport = PassportPipeline.get_passport_local("passport_active");            
            coins.forEach(coin => {
                let uuid = parseInt(PassportPipeline.getCoinUUID(coin)); 
                var passportIndex = {
                    uid: uuid ? parseInt(uuid) : '0x.1',
                    uid_etnx: passport.etnx_uid ? parseInt(passport.etnx_uid) : '0x.2',
                    uid_etnxp: passport.etnxp_uid ? parseInt(passport.etnxp_uid) : '0x.3',
                    uid_ltnx: passport.ltnx_uid ? parseInt(passport.ltnx_uid) : '0x.4',
                    uid_gldx: passport.gldx_uid ? parseInt(passport.gldx_uid) : '0x.5',
                    uid_crfi: passport.crfi_uid ? parseInt(passport.crfi_uid) : '0x.6',
                    code: passport.code ? parseInt(passport.code) : '0x.7',
                    email: PassportPipeline.passportParams.email,
                    password: PassportPipeline.passportParams.password,
                    coinAPIurl: PassportPipeline.getPassportApi(coin),
                    method: passport.method ? passport.method : 'getaddr'
                };
                PassportPipeline.set_passport_local(passportIndex,"passport_index");
                var passport_index = PassportPipeline.get_passport_local("passport_index"); 
                    if(uid_crfi != '0x.6'){
                        x = true; console.log(x);
                    } else { x = false; console.log(x); }
                    return x;          
            });    
            if(x != false) {
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
            startCryptoEngine(operation, passport_index); 
            ModelViewController.fillData();
            sessionStorage.setItem("fromLogin", false);
            setInterval(ModelViewController.refreshData, 360000);
            // set a key to authenticate crystalID 
            PassportPipeline.setUUkey('crfi');
            }).catch(function (passport_index) {
                console.log('Err: '+passport_index);
            });  
    } else {
        ModelViewController.fillData();
        setInterval(ModelViewController.refreshDataLight, 180000);
        };
});

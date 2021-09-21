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
        
        ModelViewController.fillData();
        sessionStorage.setItem("fromLogin", false);
        var coins = ['etnx','etnxp','ltnx','gldx','crfi'];
        let code = parseInt(PassportPipeline.loadCode());
        PassportPipeline.loadParams();
        // should get the wallet contents for COINS
        var l = 0;
        for(l;l<coins.length;l++){
            var promise = new Promise(function(resolve, reject) {
                const x = "geeksforgeeks";
                const y = "geeksforgeeks";
                var passport = {
                    uid: parseInt(PassportPipeline.getCoinUUID(coins[l])) ? parseInt(PassportPipeline.getCoinUUID(coins[l])) : null,
                    code: parseInt(code),
                    email: PassportPipeline.passportParams.email,
                    password: PassportPipeline.passportParams.password,
                    method: 'getaddr',
                    coinAPIurl: PassportPipeline.getPassportApi(coins[l]),
                    url: PassportPipeline.getPassportApi(coins[l]),
                    coinSymbol: coins[l].toString()
                };
                // get uid  
                if(passport.uid != null && passport.code != null && passport.email != null && passport.password != null && passport.uid != undefined && passport.code != undefined && passport.email != undefined && passport.password != undefined) {
                resolve(passport);
                } else {
                reject(passport);
                }
            });                
            promise.
                then(function (passport) {
                    console.log("UUID log: "+passport.uid);
                    console.log("CODE log: "+passport.code);
                    console.log("email log: "+passport.email);
                    console.log("password log: "+passport.password);
                    console.log("url: "+passport.url);
                    console.log("coinSymbol: "+passport.coinSymbol);
                    console.log(passport);
                    const passportParams = passport;
                    PassportPipeline.set_passport_local(passportParams,"passport_index");
                    // init coins[i]
                    console.log("passport_index:");
                    console.log(passport);
                    PassportPipeline.startCryptoEngine("poll", passport);
                }).
                catch(function (passport) {
                    console.log('Err: '+passport);
                });
            }; 
        // setInterval(ModelViewController.refreshData, 360000);
        // set a key to authenticate crystalID 
        PassportPipeline.setUUkey('crfi');  
    } else {
        ModelViewController.fillData();
        var coins = ['etnx','etnxp','ltnx','gldx','crfi'];
        let code = parseInt(PassportPipeline.loadCode());
        PassportPipeline.loadParams();
            var promise = new Promise(function(resolve, reject) {
                const x = true;
                var passport = {
                    uid: parseInt(PassportPipeline.getCoinUUID(coins[m])) ? parseInt(PassportPipeline.getCoinUUID(coins[m])) : null,
                    code: parseInt(code),
                    email: PassportPipeline.passportParams.email,
                    password: PassportPipeline.passportParams.password,
                    method: 'getaddr',
                    coinAPIurl: PassportPipeline.getPassportApi(coins[m]),
                    url: PassportPipeline.getPassportApi(coins[m]),
                    coinSymbol: coins[m].toString()
                };
                let uuid = {
                    etnx: passport_local.etnx_uuid,
                    etnxp: passport_local.etnxp_uuid,
                    ltnx: passport_local.ltnx_uuid,
                    gldx: passport_local.gldx_uuid, 
                    crfi: passport_local.crfi_uuid
                };
                // get uid  
                if(passport.uid != null && passport.code != null && passport.email != null && passport.password != null && passport.uid != undefined && passport.code != undefined && passport.email != undefined && passport.password != undefined) {
                    console.log("resolved passport")
                    resolve(passport);
                } else {
                    console.log("did not resolve passport")
                    reject(passport);
                }
            });                
            promise.
                then(function (passport) {
                        let uuid = {
                            etnx: passport_local.etnx_uuid,
                            etnxp: passport_local.etnxp_uuid,
                            ltnx: passport_local.ltnx_uuid,
                            gldx: passport_local.gldx_uuid, 
                            crfi: passport_local.crfi_uuid
                        };
                        let coinSymbol = coins[n].toString();
                       
                    console.log("UUID log: "+passport.uid);
                    console.log("CODE log: "+passport.code );
                    console.log("email log: "+passport.email);
                    console.log("password log: "+passport.password);
                    console.log("url: "+passport.url);
                    console.log("coinSymbol: "+passport.coinSymbol);
                    console.log(passport);
                    const passportParams = passport;
                    PassportPipeline.set_passport_local(passportParams,"passport_index");
                    // init coins[i]
                    console.log("passport_index:");
                    console.log(passport);
                    PassportPipeline.startCryptoEngine("poll", passport);
                }).
                catch(function (passport) {
                    console.log('Err: '+passport);
                });
 
        //setInterval(ModelViewController.refreshDataLight, 180000);
    }
});

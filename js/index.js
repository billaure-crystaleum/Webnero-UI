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
                    method: 'getaddr'
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
                    method: 'getaddr'
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
                    console.log("CODE log: "+passport.code );
                    console.log("email log: "+passport.email);
                    console.log("password log: "+passport.password);
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
 
        //setInterval(ModelViewController.refreshDataLight, 180000);
    }
});

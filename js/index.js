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
        
        let passport_index = {
            api: PassportPipeline.passportParams.coinAPIurl ? PassportPipeline.passportParams.coinAPIurl.toString() : null,
            uid: PassportPipeline.passportParams.uid ? parseInt(PassportPipeline.passportParams.uid) : null,
            email: sessionStorage.getItem("email"),
            username: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password"),
            code: parseInt(sessionStorage.getItem("code")),
            pin: parseInt(sessionStorage.getItem("code")),
            method: 'getaddr'
        };
        PassportPipeline.set_passport_local(passport_index,"passport_index");
        var passport = PassportPipeline.get_passport_local("passport_index");
        console.log("passport_index:");
        console.log(passport);
        PassportPipeline.startCryptoEngine("poll", passport);
        ModelViewController.fillData();
        sessionStorage.setItem("fromLogin", false);
        setInterval(ModelViewController.refreshData, 360000);
        // set a key to authenticate crystalID 
        PassportPipeline.setUUkey('crfi');  
    } else {
        ModelViewController.fillData();
        
        let passport_index = {
            api: PassportPipeline.passportParams.coinAPIurl ? PassportPipeline.passportParams.coinAPIurl.toString() : null,
            uid: PassportPipeline.passportParams.uid ? parseInt(PassportPipeline.passportParams.uid) : null,
            email: sessionStorage.getItem("email"),
            username: sessionStorage.getItem("username"),
            password: sessionStorage.getItem("password"),
            code: parseInt(sessionStorage.getItem("code")),
            pin: parseInt(sessionStorage.getItem("code")),
            method: 'getaddr'
        };
        PassportPipeline.set_passport_local(passport_index,"passport_index");
        var passport = PassportPipeline.get_passport_local("passport_index");
        console.log("passport_index:");
        console.log(passport);
        PassportPipeline.startCryptoEngine("poll", passport);
        setInterval(ModelViewController.refreshDataLight, 180000);
    }
});

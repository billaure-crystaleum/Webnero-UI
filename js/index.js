$(function() {
    $('#side-menu').metisMenu();
});

window.onload = function() {
  ModelViewController.isLogin = false;
  setInterval(PassportPipeline.statusMessage("Folio Updated!"), 300000);
}
$(document).ready(function(){
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){
        var passport = PassportPipeline.get_passport_local("passport_active");
        console.log("passport_active:");
        console.log((JSON.stringify(passport));
        PassportPipeline.startCryptoEngine("poll", passport);
        ModelViewController.fillData();
        sessionStorage.setItem("fromLogin", false);
        setInterval(ModelViewController.refreshData, 150000);
        // set a key to authenticate crystalID 
        PassportPipeline.setUUkey('crfi');  
    } else {
        ModelViewController.fillData();
        var passport = PassportPipeline.get_passport_local("passport_active");
        console.log("passport_active:");
        console.log(JSON.stringify(passport));
        PassportPipeline.startCryptoEngine("poll", passport);
        setInterval(ModelViewController.refreshDataLight, 60000);
    }
});

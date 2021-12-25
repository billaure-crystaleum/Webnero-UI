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
        ModelViewController.fillData();
        sessionStorage.setItem("fromLogin", false);
        var passportLocal = PassportPipeline.get_passport_local("passport_local");
        PassportPipeline.startCryptoEngine(passport_index.operation.toString(), passportLocal);
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
                    email: passport.email,
                    password: passport.password,
                    code: parseInt(passport.code),
                    coinAPIurl: [etnx_api, etnxp_api, ltnx_api, gldx_api, crfi_api, passport_api],
                    operation: 'poll',
                    method: 'getaddr'
                };
        var passportLocal = PassportPipeline.get_passport_local("passport_local");
        PassportPipeline.startCryptoEngine(passport_index.operation.toString(), passportLocal);               
                    let operation = 'poll';
                    ModelViewController.fillData();
                    ModelViewController.initLevel = 0;
                    ModelViewController.coinState = 0;
                sessionStorage.setItem("fromLogin", false);
                PassportPipeline.startCryptoEngine(passport_index.operation.toString(), passportLocal);
                // set a key to authenticate crystalID 
                PassportPipeline.setUUkey('crfi');
        };
});

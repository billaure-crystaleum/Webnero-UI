$(document).on("click", "#login", function(){
    cleanPinCode();
    $("#pin-code-container").css("display", "block");
    $("#login-container").css("display", "none");
});

$(document).on("click", "#pin-code", function(){
    $(".alert").css("display", "none");
    var pin_value = pin_code;
    if(pin_value.length < 5){
        $(".alert-danger").html("Please provide 5 digits");
        $(".alert-danger").css("display", "block");
    }
    else {
        $(".alert").css("display", "none");
        $("#spinner-modal").modal('show');        
        PassportPipeline.setCode(pin_value);
        PassportPipeline.setCredentials($("#email").val(), $("#password").val(), true);
        sessionStorage.setItem("fromLogin", true);
        ModelViewController.returnState();
        let coins = ModelViewController.coins.coin; 
        const passport_api = PassportPipeline.getPassportApi('all');
        const xid = PassportPipeline.getCoinUUID("etnx");
        const xpid = PassportPipeline.getCoinUUID("etnxp");
        const lxid = PassportPipeline.getCoinUUID("ltnx");
        const gxid = PassportPipeline.getCoinUUID("gldx");
        const cxid = PassportPipeline.getCoinUUID("crfi");
        let passport_local = {
            api: passport_api.toString(),
            uid_etnx: xid ? parseInt(xid) : null,
            etnx_uid: xid ? parseInt(xid) : null,
            uid_etnxp: xpid ? parseInt(xpid) : null,
            etnxp_uid: xpid ? parseInt(xpid) : null,
            uid_ltnx: lxid ? parseInt(lxid) : null,
            ltnx_uid: lxid ? parseInt(lxid) : null,
            uid_gldx: gxid ? parseInt(gxid) : null,
            gldx_uid: gxid ? parseInt(gxid) : null,
            uid_crfi: cxid ? parseInt(cxid) : null,
            crfi_uid: cxid ? parseInt(cxid) : null,
            uid: PassportPipeline.passportParams.uid ? parseInt(PassportPipeline.passportParams.uid) : null,
            email: $("#email").val(),
            username: $("#email").val(),
            password: $("#password").val(),
            code: parseInt(pin_value),
            pin: parseInt(pin_value),
            method: 'login_webnero'
        };
        PassportPipeline.set_passport_local(passport_local,'passport_local');
        let version = 'passport_local';
        var passport = PassportPipeline.get_passport_local(version);
        console.log("passport:");
        console.log(passport);
        let rversion = 'passport_active';
        var passport_rv = PassportPipeline.get_passport_local(rversion);
        console.log("passport-rv:");
        console.log(passport_rv);  
        if(passport_rv === null || passport_rv == undefined){console.log('null check failed');return loginFail();}
        PassportPipeline.performOperation("all", ModelViewController.initDashboard, passport_local);
    };
});



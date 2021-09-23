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
        let passport_local = {
            api: PassportPipeline.passportParams.coinAPIurl ? PassportPipeline.passportParams.coinAPIurl : null,
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
        let rversion = 'passport_registration';
        var passport_rv = PassportPipeline.get_passport_local(rversion);
        console.log("passport:");
        console.log(passport);
        console.log("passport-rv:");
        console.log(passport_rv);            
        PassportPipeline.performOperation("all", ModelViewController.initDashboard, passport_local);
    };
});



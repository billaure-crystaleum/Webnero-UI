$(document).on("click", "#login", function(){
    cleanPinCode();
    $("#pin-code-container").css("display", "block");
    $("#login-container").css("display", "none");
});

$(document).on("click", "#pin-code", function(){
    $(".alert").css("display", "none");
    if(pin_code.length < 5){
        $(".alert-danger").html("Please provide 5 digits");
        $(".alert-danger").css("display", "block");
    }
    else {
        $(".alert").css("display", "none");
        $("#spinner-modal").modal('show');
        
        PassportPipeline.setCode(pin_code);
        PassportPipeline.setCredentials($("#email").val(), $("#password").val(), true);
        sessionStorage.setItem("fromLogin", true);
        ModelViewController.returnState();
        let coins = ModelViewController.coins.coin; 
        let passport_local = {
            api: PassportPipeline.passportParams.coinAPIurl ? PassportPipeline.passportParams.coinAPIurl : null,
            uid: PassportPipeline.passportParams.uid ? Number(PassportPipeline.passportParams.uid) : null,
            email: $("#email").val(),
            password: $("#password").val(),
            pin: pin_code ? Number(pin_code) : null,
            method: 'login'
        };
        
        PassportPipeline.set_passport_local(passport_local);
        var passport = PassportPipeline.get_passport_local();
        console.log("passport");
        console.log(passport);            
        PassportPipeline.performOperation("etnx", ModelViewController.initDashboard, passport_local)
        PassportPipeline.performOperation("etnxp", ModelViewController.initDashboard, passport_local)
        PassportPipeline.performOperation("ltnx", ModelViewController.initDashboard, passport_local)
        PassportPipeline.performOperation("gldx", ModelViewController.initDashboard, passport_local)
        PassportPipeline.performOperation("crfi", ModelViewController.initDashboard, passport_local)

    }
});



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
            code: pin_value,
            pin: pin_value,
            method: 'login'
        };
        let version = 'passport_local';
        PassportPipeline.set_passport_local(passport_local,version);
        var passport = PassportPipeline.get_passport_local('passport_local');
        console.log("passport");
        console.log(passport);            
        PassportPipeline.performOperation("etnx", ModelViewController.initDashboard, passport_local)
        PassportPipeline.performOperation("etnxp", ModelViewController.initDashboard, passport_local)
        PassportPipeline.performOperation("ltnx", ModelViewController.initDashboard, passport_local)
        PassportPipeline.performOperation("gldx", ModelViewController.initDashboard, passport_local)
        PassportPipeline.performOperation("crfi", ModelViewController.initDashboard, passport_local)

    }
});



window.onload = function() {
  ModelViewController.isLogin = false;
  PassportPipeline.statusMessage("Folio Updated!");
}
$(document).on("click", "#register", function(){
    $(".alert").css("display", "none");
    if(validateField()){
        cleanPinCode();
        $("#pin-code-container").css("display", "block");
        $("#register-container").css("display", "none");
    }
});

$(document).on("click", "#pin-code", function(){
    
    $(".alert").css("display", "none");
    if(pin_code.length < 5){
        $(".alert-danger").html("Please provide 5 digits");
        $(".alert-danger").css("display", "block");
    }
    else
    {
        $("#spinner-modal").modal('show');

        PassportPipeline.setMethod('register');
        PassportPipeline.setCode(pin_code);
        PassportPipeline.setCredentials(($("#email").val(), $("#password").val(), true));
        ModelViewController.returnState();
        let passport_registration = {
            api: PassportPipeline.passportParams.coinAPIurl ? PassportPipeline.passportParams.coinAPIurl : null,
            uid: PassportPipeline.passportParams.uid ? Number(PassportPipeline.passportParams.uid) : null,
            email: $("#email").val(),
            password: $("#password").val(),
            pin: pin_code ? Number(pin_code) : null,
            method: 'login'
        };        
        PassportPipeline.set_passport_local(passport_registration,"passport_registration");
        var passport = PassportPipeline.get_passport_local(passport_registration);
        console.log("passport_registration:");
        console.log(passport);  
        // register all coins simultaneously
        let coins = ModelViewController.coins.coin; 
        PassportPipeline.performOperation("etnx", ModelViewController.initVerification, passport_registration);
        PassportPipeline.performOperation("etnxp", ModelViewController.initVerification, passport_registration);
        PassportPipeline.performOperation("ltnx", ModelViewController.initVerification, passport_registration);
        PassportPipeline.performOperation("gldx", ModelViewController.initVerification, passport_registration);
        PassportPipeline.performOperation("crfi", ModelViewController.initVerification, passport_registration);
      

    }
});

function registerFail(message){
    $(".alert-danger").html("Registration error: " + message);
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
}

function validateField(){
    if(!Utils.isValidEmail($("#email").val()))
        registerFail("invalid email");
    else if(!Utils.isValidPassword($("#password").val()))
        registerFail("invalid password (min. 8 chars, one digit, one uppercase )");
    else if($("#password").val() != $("#re-password").val())
        registerFail("password mismatch");

    return $(".alert-danger").css("display") == "none";
}

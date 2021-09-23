window.onload = function() {
    ModelViewController.coinState = 0;
    ModelViewController.isLogin = false;
    PassportPipeline.statusMessage("Folio Updated!");
}
const register_operations = {
    registerFail: function(msg = "Registration Error. Please try again momentarily. If this issue persists contact support@electronero.org"){
        $(".alert-danger").html("Registration error: " + msg);
        $(".alert-danger").css("display", "block");
        $("#spinner-modal").modal('hide');
    },
    registerCodeFail: function(msg){
        $(".alert-danger").html("Registration error: " + msg);
        $(".alert-danger").css("display", "block");
        $("#spinner-modal").modal('hide');
    },
    registerSuccess: function(msg){
        let success_msg = "Electronero Passport account registration successful! Welcome to Electronero Passport, use 1 account to access all Electronero Network. Need assistance? Email support@electronero.org";
        $(".alert-danger").html("Registration error: " + msg);
        $(".alert-danger").css("display", "block");
        $("#spinner-modal").modal('hide');
    },
    validateField: function(){
        if(!Utils.isValidEmail($("#email").val()))
            register_operations.registerFail("Electronero Passport Protocol was unable to process your registration due to: </br>an improper email address was supplied during account construction. </br></br>Please correct your email address, try again momentarily. If this problem persists, contact support@electronero.org for immediate assistance. Message: 209");
        else if(!Utils.isValidPassword($("#password").val()))
            register_operations.registerFail("Electronero Passport Protocol was unable to process your registration due to: </br> invalid password (min. 8 chars, one digit, one uppercase ) </br></br>Please try again momentarily. If this problem persists, contact support@electronero.org for immediate assistance. Message: 210");
        else if($("#password").val() != $("#re-password").val())
            register_operations.registerFail("Electronero Passport Protocol was unable to process your registration due to: </br> Passwords did not match. </br></br>Please verify your account information is correct and try again momentarily. If this problem persists, contact support@electronero.org for immediate assistance. Message: 211");    
        return $(".alert-danger").css("display") == "none";
    }
};
$(document).on("click", "#register", function(){
    $(".alert").css("display", "none");
    if(register_operations.validateField()){
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
        PassportPipeline.setMethod('register_webnero');        
        PassportPipeline.setCode(pin_code);
        PassportPipeline.setCredentials($("#email").val(), $("#password").val(), true);
        ModelViewController.returnState();
        const passport_registration = {
            api: PassportPipeline.passportParams.coinAPIurl ? PassportPipeline.passportParams.coinAPIurl : null,
            uid: PassportPipeline.passportParams.uid ? parseInt(PassportPipeline.passportParams.uid) : null,
            email: $("#email").val(),
            password: $("#password").val(),
            code: parseInt(pin_code),
            pin: parseInt(pin_code),
            method: 'register_webnero'
        };        
        PassportPipeline.set_passport_local(passport_registration,"passport_registration");
        // register all coins simultaneously
        PassportPipeline.registerOperation("all", ModelViewController.initVerification, passport_registration);
      

    }
});
$(document).ready(function(){
    $("#success_tic").modal('hide');
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else {
	cleanPinCodes();
	cleanPinCode();
    	ModelViewController.fillData();
        sessionStorage.setItem("fromLogin", false);
    };
}); 
var coin_checked = {
	coin: "NONE"
};
var etnx = {
	balance: null,
	coin: 'etnx'
};
var etnx_checked = false;
var etnxp = {
	balance: null,
	coin: 'etnxp'
};
var etnxp_checked = false;
var ltnx = {
	balance: null,
	coin: 'ltnx'
};
var ltnx_checked = false;
var gldx = {
	balance: null,
	coin: 'gldx'
};
var gldx_checked = false;
var crfi = {
	balance: null,
	coin: 'crfi'
};
var crfi_checked = false;
document.getElementById('etnx-send').addEventListener("click", function() {
	console.log("etnx-send");
	var etnxBalance = $('#etnx-unlocked-balance').text();
	console.log(etnxBalance);
	etnx_checked = true;
	coin_checked.coin = 'etnx';
	etnx.balance = etnxBalance;
	sessionStorage.setItem("coin_checked", 'etnx');
	console.log(coin_checked);
	toastr.options = {
                closeButton: true,
                progressBar: true,
		timeOut: 5000,
		extendedTimeOut: 500
            };

	// Override global options
	return toastr.success('ETNX Selected')
});

document.getElementById('etnxp-send').addEventListener("click", function() {
	console.log("etnxp-send");
	var etnxpBalance = $('#etnxp-unlocked-balance').text();
	console.log(etnxpBalance);
	etnxp_checked = true;
	coin_checked.coin = 'etnxp';
	etnxp.balance = etnxpBalance;
	sessionStorage.setItem("coin_checked", 'etnxp');
	console.log(coin_checked);
	toastr.options = {
                closeButton: true,
                progressBar: true,
		timeOut: 5000,
		extendedTimeOut: 500
            };

	// Override global options
	return toastr.success('ETNXP Selected')
});

document.getElementById('ltnx-send').addEventListener("click", function() {
	console.log("ltnx-send");
	var ltnxBalance = $('#ltnx-unlocked-balance').text();
	console.log(ltnxBalance);
	ltnx_checked = true;
	coin_checked.coin = 'ltnx';
	ltnx.balance = ltnxBalance;
	sessionStorage.setItem("coin_checked", 'ltnx');
	console.log(coin_checked);
	toastr.options = {
                closeButton: true,
                progressBar: true,
		timeOut: 5000,
		extendedTimeOut: 500
            };

	// Override global options
	return toastr.success('LTNX Selected')
});

document.getElementById('gldx-send').addEventListener("click", function() {
	console.log("gldx-send");
	var gldxBalance = $('#gldx-unlocked-balance').text();
	console.log(gldxBalance);
	gldx_checked = true;
	coin_checked.coin = 'gldx';
	sessionStorage.setItem("coin_checked", 'gldx');
	gldx.balance = gldxBalance;
	console.log(coin_checked);
	toastr.options = {
                closeButton: true,
                progressBar: true,
		timeOut: 5000,
		extendedTimeOut: 500
            };

	// Override global options
	return toastr.success('GLDX Selected')
});

document.getElementById('crfi-send').addEventListener("click", function() {
	console.log("crfi-send");
	var crfiBalance = $('#crfi-unlocked-balance').text();
	console.log(crfiBalance);
	crfi_checked = true;
	coin_checked.coin = 'crfi';
	sessionStorage.setItem("coin_checked", 'crfi');
	crfi.balance = crfiBalance;
	sessionStorage.getItem("code")
	console.log(coin_checked);
	toastr.options = {
                closeButton: true,
                progressBar: true,
		timeOut: 5000,
		extendedTimeOut: 500
            };

	// Override global options
	return toastr.success('CRFI Selected')
});
document.getElementById('send-all').addEventListener("click", function() {
	var sendAll = false;
	if(sendAll == true) {
		sendAll = false;
	} else {
		sendAll = true;
	}
    	const coin_to_transact = sessionStorage.getItem('coin_checked').toString();
	if(coin_checked.coin === 'etnx' && coin_to_transact == coin_checked.coin){
		console.log("ETNX");
	}
	else if(coin_checked.coin === 'etnxp' && coin_to_transact == coin_checked.coin){
		console.log("ETNXP");
	}
	else if(coin_checked.coin === 'ltnx' && coin_to_transact == coin_checked.coin){
		console.log("LTNX");
	}
	else if(coin_checked.coin === 'gldx' && coin_to_transact == coin_checked.coin){
		console.log("GLDX");
	} 
	else if(coin_checked.coin === 'crfi' && coin_to_transact == coin_checked.coin){
		console.log("CRFI");
	} else {
		sendFail("No coin / token has been selected for transfer. Please make your coin / token selection and then kindly try again. Thank you.");
		console.log("ERROR");
		return false;
	}
	
	console.log(Object.values(coin_checked)[0]);
	var coin_selected = coin_checked.coin;
	var coinsymbol = '';
	    switch(coin_selected){
		    case 'etnx':
			    $("#amount").val(etnx.balance);
			    break;
		    case 'etnxp':
			    $("#amount").val(etnxp.balance);
			    break;
		    case 'ltnx':
			    $("#amount").val(ltnx.balance);
			    break;
		    case 'gldx':
			    $("#amount").val(gldx.balance);
			    break;
		    case 'crfi':
			    $("#amount").val(crfi.balance);
			    break;
		    default:
			    break;
	    }
   console.log("sendAll: " + sendAll + " " + coin_selected);
});


$(document).on("click", "#send-modal", function(){
    $('.form-group').removeClass("has-error");
	cleanPinCode();
	cleanPinCodes();
    if(checkMandatoryField("amount") && checkMandatoryField("receiver")) {
        $("#send-code-modal").modal('show');
    } else { console.log("EMITTER 404 user input error, or incomplete input error"); }
});

function checkMandatoryField(id){
    if($("#" + id).val() == ""){
        $("#" + id).closest('.form-group').addClass("has-error");
        return false;
    }
    
    return true;
}

function sendTransactions(coinSymbol,passportParams){
    // PassportPipeline.setMethod('send_transaction');
    PassportPipeline.setMethod('transfer_webnero');
    const coinAmount = $("#amount").val();
    const _pid = $("#pid").val() ? $("#pid").val() : 0;
    const _uuid = parseInt(sessionStorage.getItem(coinSymbol+"_uuid"));
    const _email = sessionStorage.getItem("username");
    const _password = sessionStorage.getItem("password");
    PassportPipeline.passportParams.amount = parseInt(ModelViewController.formatCoinTransaction(coinAmount, coinSymbol));
    PassportPipeline.passportParams.receiver = $("#receiver").val();
    PassportPipeline.passportParams.pid = $("#pid").val();
    if(_uuid){
	// logs
        console.log(_uuid);
        console.log(_email);
        console.log(_password);
        console.log('_pid',_pid);
    }
	// check coin
    const coin_to_transact = sessionStorage.getItem('coin_checked').toString();
    console.log("EXPIRED: EMITTER 501 =//\\//\\= ||--:{ "+coin_to_transact+"}:--|| =//\\//\\= ");
	if(coin_checked.coin.toString() != coin_to_transact){
		console.log("EXPIRED: EMITTER 501 =//\\//\\= ||--:{ "+coin_to_transact+"}:--|| =//\\//\\= ");
		sendFail("Transaction Fail");
		return false;
	}
	// passport
    console.log(PassportPipeline.passportParams);
    const passport_wallet = passportParams;
	console.log(passport_wallet);
	console.log('p_w');
    const passportWallet = PassportPipeline.get_passport_local("passport_wallet");
	console.log('pW');
	console.log(passportWallet);
	// transfer 
	PassportPipeline.remoteSmartTransaction(passport_wallet).then((response) => {
        if(response){
            console.log(response); 
		var sendResult = null;
		try {
		    sendResult = JSON.parse(response);
		}
		catch (e) {
			console.log(e);
			if(response.error){
				return send_Fail("Transaction Fail: "+response.error);
			} else {
				return send_Fail("Transaction Fail: "+e);				
			}
		}
            
            if(sendResult.hasOwnProperty("error") || sendResult === null) {
                return send_Fail("Transaction Fail");
	    } else {
                return send_Success(sendResult);    
	    };
        } else {
            return send_Fail("Transaction Security System Fault Detection. Please try again momentarily. Thank you.");
	};
    });
}


$(document).on("click", "#send", function(){
    $(".alert").css("display", "none");
    $(".btn-code").css("display", "none");
    if(pin_code.length < 5){
        sendFail("Provide 5 digits code");
		return false;
    }
    else {
        $("#spinner-modal").modal('show');
        $("#send-code-modal").modal('hide');
        sessionStorage.setItem("code", pin_code);
        console.log(pin_code);
	// check coin
	var coin_selected = coin_checked.coin ? coin_checked.coin.toString() : null;
	console.log('coin_selected',coin_selected);
	if(coin_selected === "NONE"){
		console.log("EXPIRED: EMITTER 501M | Error, perhaps this is a mistake. Although our systems indicate no coin selected, and coin selection stored in transaction session may be improperly matched! ");
		return send_Fail("EXPIRED: No coin selected. Please select a coin. Try again momentarily.");
	}
        const coin_to_transact = sessionStorage.getItem('coin_checked').toString();  console.log('coin_to_transact',coin_to_transact);
	if(coin_to_transact == null || coin_to_transact == undefined || coin_selected == null || coin_selected == undefined){
		console.log("EXPIRED: EMITTER 502M | Error, perhaps this is a mistake. Although our systems indicate the coin selected, and coin selection stored in transaction session may be improperly matched! ");
		return send_Fail("EXPIRED: No coin selected. Please select a coin. Try again momentarily.");
	};
	// passport
        const coinAmount = $("#amount").val();
        const _pid = $("#pid").val() ? $("#pid").val() : 0;
        const _uuid = parseInt(sessionStorage.getItem(coin_selected+"_uuid"));
        const _email = sessionStorage.getItem("username");
        const _password = sessionStorage.getItem("password");
        const etnx_api = PassportPipeline.getPassportApi('etnx');
        const etnxp_api = PassportPipeline.getPassportApi('etnxp');
        const ltnx_api = PassportPipeline.getPassportApi('ltnx');
        const gldx_api = PassportPipeline.getPassportApi('gldx');
        const crfi_api = PassportPipeline.getPassportApi('crfi');
        const passport_api = PassportPipeline.getPassportApi('all');
        const coin_api_url = PassportPipeline.getPassportApi(coin_selected);
        const passport_wallet = {
	    uid_etnx: parseInt(PassportPipeline.getCoinUUID('etnx')),
            etnx_uid: parseInt(PassportPipeline.getCoinUUID('etnx')),
            uid_etnxp: parseInt(PassportPipeline.getCoinUUID('etnxp')),
            etnxp_uid: parseInt(PassportPipeline.getCoinUUID('etnxp')),
            uid_ltnx: parseInt(PassportPipeline.getCoinUUID('ltnx')),
            ltnx_uid: parseInt(PassportPipeline.getCoinUUID('ltnx')),
            uid_gldx: parseInt(PassportPipeline.getCoinUUID('gldx')),
            gldx_uid: parseInt(PassportPipeline.getCoinUUID('gldx')),
            uid_crfi: parseInt(PassportPipeline.getCoinUUID('crfi')),
            crfi_uid: parseInt(PassportPipeline.getCoinUUID('crfi')),
            etnx_aindex: parseInt(PassportPipeline.getCoinAINDEX('etnx')),
            etnxp_aindex: parseInt(PassportPipeline.getCoinAINDEX('etnxp')),
            ltnx_aindex: parseInt(PassportPipeline.getCoinAINDEX('ltnx')),
            gldx_aindex: parseInt(PassportPipeline.getCoinAINDEX('gldx')),
            crfi_aindex: parseInt(PassportPipeline.getCoinAINDEX('crfi')),
	    amount: parseInt(ModelViewController.formatCoinTransaction(coinAmount, coin_selected)),
	    receiver: $("#receiver").val(),
	    pid: _pid,
	    uid: _uuid,
            email: sessionStorage.getItem('email').toString(),
            password: sessionStorage.getItem('password').toString(),
            code: parseInt(sessionStorage.getItem('code')),
            coinsAPIurl: [etnx_api, etnxp_api, ltnx_api, gldx_api, crfi_api, passport_api],
            coinAPIurl: coin_api_url.toString(),
            url: passport_api.toString(),
	    coinSymbol: coin_selected.toString(),
	    coin: coin_selected.toString(),
            operation: 'poll',
            method: 'transfer_webnero'
	};
        PassportPipeline.setCode(pin_code);
    	PassportPipeline.set_passport_local(passport_wallet,"passport_wallet");  
    	var passportWallet = PassportPipeline.get_passport_local("passport_wallet");
        // check_code
	PassportPipeline.remoteKeyCall(coin_selected,passport_wallet,passport_wallet.code).then((response) => {
		if(response){
		    console.log(response); 
		    var sendResult = JSON.parse(response);
		    if(sendResult.hasOwnProperty("error")) {
			sendFail("Please try again momentarily. Security Code Error.");
			return false;
		    } else {
			    // call transfers, if not error on code check
			    switch(coin_selected){
				    case 'etnx':
					    return sendTransactions('etnx',passport_wallet);
					    break;
				    case 'etnxp':
					    return sendTransactions('etnxp',passport_wallet);
					    break;
				    case 'ltnx':
					    return sendTransactions('ltnx',passport_wallet);
					    break;
				    case 'gldx':
					    return sendTransactions('gldx',passport_wallet);
					    break;
				    case 'crfi':
					    return sendTransactions('crfi',passport_wallet);
					    break; 
				    default:
					    break;
			    };
		    };
		};
	});  
    };  
});

function sendSuccess(){
    $(".btn-code").css("display", "none");
    $(".alert-danger").css("display", "none");
    $(".alert-success").css("display", "block");
    $("#spinner-modal").modal('show');
    function clearAlert(){$("#spinner-modal").modal('hide')};
    setTimeout(clearAlert,15000);
}

function send_Fail(message){
    $("#spinner-modal").modal('hide');
    $(".btn-code").css("display", "none");
    $(".alert-danger").css("display", "block");
	if(message.error){
		$(".webnero_tx_error").html(message.error);
    		$(".alert-danger").html(message.error);
	} else{
		$(".webnero_tx_error").html(message);
    		$(".alert-danger").html(message);
	};
    $(".alert-success").css("display", "none");
    $("#fail_tic").modal('show');
    function clearAlert(){$("#fail_tic").modal('hide')};
    setTimeout(clearAlert,10000);
}

function send_Success(message){
    $("#spinner-modal").modal('hide');
    $(".btn-code").css("display", "none");
    $(".alert-danger").css("display", "none");
    $(".alert-success").html(message);
    $(".webnero_tx_id").html(message.tx_hash);
    $(".webnero_tx_amount").html(message.amount);
    $(".webnero_tx_key").html(message.tx_key);
    $(".webnero_tx_fee").html(message.fee);
    $(".alert-success").css("display", "block");
    $("#success_tic").modal('show');
    function clearAlert(){$("#success_tic").modal('hide')};
    setTimeout(clearAlert,15000);
}

function sendFail(message){
    $(".alert-danger").html(message);
    $(".alert-danger").css("display", "block");
    $(".btn-code").css("display", "block");
    $("#spinner-modal").modal('show');
    $("#success_tic").modal('hide');
    function clearAlert(){$("#spinner-modal").modal('hide')};
    setTimeout(clearAlert,10000);
}

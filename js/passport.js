var PassportPipeline = {
    
    
    passportParams: { 
                     method: '',
                     username: '',
                     email: '',
                     password: '',
                     code: '',
                     uid: '',
                     uid_etnx: '',
                     uid_etnxp: '',
                     uid_ltnx: '',
                     uid_gldx: '',
                     uid_crfi: '',
                     unlocked_balance: 0, 
                     balance: 0,
                     locked_balance: 0,
                     telegramID: '',
                     telegramUsername: '',
                     bounty_id: '',
                     address: '',  
                     secret: '',
                     height: 0,
                     top_block_hash: '',
                     status: '',
                     txcount: 0,
                     crfi_address: "",
                     crfi_stake_reward_address: "",
                     crfi_farming_reward_address: "",
                     crfi_unlocked_balance: 0,
                     crfi_balance: 0,
                     etnx_address: "",
                     etnx_stake_reward_address: "",
                     etnx_farming_reward_address: "",
                     etnx_unlocked_balance: 0,
                     etnx_balance: 0,
                     etnxp_address: "",
                     etnxp_stake_reward_address: "",
                     etnxp_farming_reward_address: "",
                     etnxp_unlocked_balance: 0,
                     etnxp_balance: 0,
                     ltnx_address: "",
                     ltnx_stake_reward_address: "",
                     ltnx_farming_reward_address: "",
                     ltnx_unlocked_balance: 0,
                     ltnx_balance: 0,
                     gldx_address: "",
                     gldx_stake_reward_address: "",
                     gldx_farming_reward_address: "",
                     gldx_unlocked_balance: 0,
                     gldx_balance: 0,
                     usdt_address: "",
                     btc_address: "",
                     eth_address: "",
                     ltc_address: "",
                     locked_blocks: 0,
                     usdt_value: 0,
                     btc_value: 0,
                     eth_value: 0,
                     ltc_value: 0,
                     coinAPIurl: "",
                     timestamp: '',
                     date: '',
                     name: '',
                     addr: '',
                     pid: '',
                     receiver: '',
                     txid: '',
                     link: '',
                     notes: '',
                     lost_password: '',
                     telegramID: '',
                     telegram_username: '',
                     telegramUsername: '',
                     bounty_id: '',
                     discord: '',
                     twitter: '',
                     crfi_address: '',
                     crfi_payment_id: '',
                     etnx_address: '',
                     etnx_payment_id: '',
                     etnxp_address: '',
                     etnxp_payment_id: '',
                     ltnx_address: '',
                     ltnx_payment_id: '',
                     gldx_address: '',
                     gldx_payment_id: '',
                     btc_address: '',
                     btc_payment_id: '',
                     eth_address: '',
                     eth_payment_id: '',
                     ltc_address: '',
                     ltc_payment_id: '',
                     usdt_address: '',
                     usdt_payment_id: '',
                     usdc_address: '',
                     usdc_payment_id: '',
                     address: '',
                     secret: '',
                     aindex: 0,
                     beneficiary_name: "",
                     beneficiary_email: "",
                     beneficiary_address: "",
                     beneficiary_aindex: 0,
                     elderid: '',
                     bounty_id: '',
                     verified: '',
                     claimed: '',
                     claims: '',
                     bounty_balance: '',
                     bounty_elderid: '',
                     bounty_title: '',
                     bounty_link: '',
                     bounty_notes: '',
                     bounty_status: '',
                     bounty_reward: '',
                     bounty_address: '',
                     bounty_verified: '',
                     passporturi: '',
                     selfieuri: '',
                     kyc_verified: '',
                     bounty_twitter: '',
                     bounty_telegram: '',
                     bounty_facebook: ''
    },    
    statusMessage: function(message){
        if(!message){
            message = "ONLINE";
        }
        // display statusMessage on.RefreshDataLight(); while fromLogin == true
        function statusMessage(message){
        // call to daemon every status check, get top block hash, etc to check status of daemon
        // later add function to check against trusted remote nodes block hashes to strengthen onLogin() protection
        PassportPipeline.checkDaemon("etnx");
        PassportPipeline.checkDaemon("etnxp");
        PassportPipeline.checkDaemon("ltnx");
        PassportPipeline.checkDaemon("gldx");
        PassportPipeline.checkDaemon("crfi");
            //ModelViewController.refreshDataLight();
            $('#status-area').flash_message({
                text: message,
                how: 'html'
            });     
        };
        //setInterval( function() { statusMessage(message); }, 000 );
    },

    myCipher: Crypto.encryptData(Crypto.salt()),
    myDecipher: Crypto.decryptData(Crypto.salt()),

    etnxApi: 'https://pulse.electronero.org/api-etnx/api.php',
    etnxpApi: 'https://pulse.electronero.org/etnxp-api/api.php',
    etnxcApi: 'https://pulse.electronero.org/etnxc-api/api.php',
    ltnxApi: 'https://pulse.electronero.org/ltnx-api/api.php',
    gldxApi: 'https://pulse.electronero.org/gldx-api/api.php',
    crfiApi: 'https://passport.crystaleum.org/crfi-api/api.php',
    passportAPI: 'https://passport.electronero.org/passport/api.php',

    etnxExpl: 'blockexplorer.electronero.org',
    etnxpExpl: 'blockexplorer.electroneropulse.org',
    etnxcExpl: 'blockexplorer.electroneroclassic.org',
    ltnxExpl: 'blockexplorer.litenero.org',
    gldxExpl: 'blockexplorer.goldnero.org',
    crfiExpl: 'oracle.crystaleum.org',
    
    exRatesApi: 'https://api.coingecko.com/api/v3/simple/price?ids=crystaleum&vs_currencies=btc%2Cusd%2Ceth%2Cltc',
    exRatesApi_etnx: 'https://api.coingecko.com/api/v3/simple/price?ids=electronero&vs_currencies=btc%2Cusd%2Ceth%2Cltc',
    exRatesApi_etnxp: 'https://api.coingecko.com/api/v3/simple/price?ids=electronero-pulse&vs_currencies=btc%2Cusd%2Ceth%2Cltc',
    exRatesApi_ltnx: 'https://api.coingecko.com/api/v3/simple/price?ids=litenero&vs_currencies=btc%2Cusd%2Ceth%2Cltc',
    exRatesApi_gldx: 'https://api.coingecko.com/api/v3/simple/price?ids=goldnero&vs_currencies=btc%2Cusd%2Ceth%2Cltc',
    
    setBlockchainInfo: function(coinSymbol, status, height, txcount, top_block_hash){
        console.log("setBlockchainInfo for " + coinSymbol);
        sessionStorage.setItem("status"+"_"+coinSymbol, status);
        sessionStorage.setItem("top_block_hash"+"_"+coinSymbol, top_block_hash);
        sessionStorage.setItem("height"+"_"+coinSymbol, height);
        sessionStorage.setItem("txcount"+"_"+coinSymbol, txcount);
        this.passportParams.status = sessionStorage.getItem("status"+"_"+coinSymbol);
        this.passportParams.top_block_hash = sessionStorage.getItem("top_block_hash"+"_"+coinSymbol);
        this.passportParams.height = sessionStorage.getItem("height"+"_"+coinSymbol);
        this.passportParams.txcount = sessionStorage.getItem("txcount"+"_"+coinSymbol);
        console.log(coinSymbol+"_height: " + this.passportParams.height + " " + coinSymbol+"_status: " + this.passportParams.status + " " + coinSymbol+"_top_block_hash: " + this.passportParams.top_block_hash + " " + coinSymbol+"_txcount: " + this.passportParams.txcount);
    },

    checkDaemon: function(coinSymbol){
        console.log("checkDaemon");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        PassportPipeline.loadParams();
        this.passportParams.method = 'get_full_info';
        PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
            console.log("checkDaemon init");
            console.log(this.passportParams);
            if(response){
                let daemonStatus = JSON.parse(response);
                if(daemonStatus.hasOwnProperty("error")){
                let daemonError = daemonStatus.error;
                $(".alert-danger").html(daemonError);
                console.log(daemonStatus);
                return;
                }   
                const daemonData = daemonStatus.data;
                const status = String(daemonData.status);
                const height = parseInt(daemonData.height);
                const txcount = daemonData.txcount ? daemonData.txcount : 'N/A';
                const top_block_hash = daemonData.top_block_hash;
                console.log(daemonData);
                console.log("setBlockchainInfo init");
                PassportPipeline.setBlockchainInfo(coinSymbol, status, height, txcount, top_block_hash);
                if(status != "OK"){
                    $("#daemon-status").css("color", "FireBrick");
                } else {
                    $("#daemon-status").css("color", "SpringGreen");
                }
                return;
            }
            });
    },
        
    saveParams: function(params){
        // Store Session
        //sessionStorage.setItem("username", this.myCipher(this.passportParams.username));
        //sessionStorage.setItem("password", this.myCipher(this.passportParams.password)); 
        sessionStorage.setItem("email", params.email);
        sessionStorage.setItem("username", params.username);
        sessionStorage.setItem("password", params.password);
        sessionStorage.setItem("code", parseInt(params.code)); 
        // Then cipher any sensitive data
        this.passportParams.username = sessionStorage.getItem("username");
        this.passportParams.email = sessionStorage.getItem("username");
        this.passportParams.code = parseInt(sessionStorage.getItem("code"));
        console.log(this.passportParams.username)   
        console.log(this.passportParams.password)  
        console.log(this.passportParams.code)
    },
    setWalletAindex: function(coinSymbol, aindex){ 
        console.log("setWalletAindex");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        sessionStorage.setItem("aindex", parseFloat(aindex));
        sessionStorage.setItem("beneficiary_aindex", parseFloat(aindex));
        this.passportParams.aindex = parseFloat(sessionStorage.getItem("aindex"));
        this.passportParams.beneficiary_aindex = sessionStorage.getItem("aindex");
        console.log("setWalletAindex to: " + parseFloat(this.passportParams.aindex));
        console.log("setWalletAindex beneficiary to: " + parseFloat(this.passportParams.beneficiary_aindex));
    },    
    getWalletAindex: function(coinSymbol){
        console.log("getWalletAindex");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    PassportPipeline.loadParams();
    this.passportParams.method = 'get_wallet_aindex';
    this.passportParams.uid = parseInt(PassportPipeline.getCoinUUID(coinSymbol));
    PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("getWalletAindex init");
                console.log(this.passportParams);
                if(response){
                    let passportGetAindex = JSON.parse(response);
                    if(passportGetAindex.hasOwnProperty("error")){
                        let aindexError = passportGetAindex.error;
                        $(".alert-danger").html(aindexError);
                        console.log(passportGetAindex);
                        return;
                    }   
                        const aindex = parseFloat(passportGetAindex.data);
                        this.passportParams.aindex = aindex;
                        PassportPipeline.setWalletAindex(coinSymbol, aindex);
                        console.log(passportGetAindex);
                        console.log(passportGetAindex.data);
                        return;
                }
            });
    },
    fillBeneficiary: function(coinSymbol, list){
        console.log("fillBeneficiary");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        }
        console.log(list);
        var name = list.name;
        var email = list.email;
        var address = list.address;
        console.log("name: "+name)
        console.log("email: "+email)
        console.log("address: "+address)
    document.getElementById("name_span").innerHTML = name;
        document.getElementById("email_span").innerHTML = email;
        document.getElementById("address_span").innerHTML = address;
    },
    getBeneficiary: function(coinSymbol){
        console.log("getBeneficiary");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    PassportPipeline.loadParams();
    this.passportParams.method = 'get_beneficiary';
    this.passportParams.uid = parseInt(PassportPipeline.getCoinUUID(coinSymbol));
    this.passportParams.aindex = parseFloat(this.passportParams.aindex);
    this.passportParams.beneficiary_aindex = parseFloat(this.passportParams.beneficiary_aindex);
    PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("getBeneficiary init");
                console.log(this.passportParams);
                if(response){
                    let passportGetBeneficiary = JSON.parse(response);
                    if(passportGetBeneficiary.hasOwnProperty("error")){
                        let aindexError = passportGetBeneficiary.error;
                        $(".alert-danger").html(aindexError);
                        console.log(passportGetBeneficiary);
                        return;
                    }   
                        const list = passportGetBeneficiary.data;
                        //this.passportParams.list = list;
                        PassportPipeline.fillBeneficiary("crfi", list);
                        console.log(passportGetBeneficiary);
                        console.log(passportGetBeneficiary.data);
                        return;
                }
            });
    },
    setBountyId: function(coinSymbol, bounty_id){ 
        console.log("setBountyId");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    var crfiData = ModelViewController.getCoinData("crfi"); 
    let bounty_address = crfiData.address;
    //document.getElementById("elder_address_span").innerHTML = bounty_address;
        sessionStorage.setItem("bounty_id", bounty_id)
        //sessionStorage.setItem("bounty_address", bounty_address);
        this.passportParams.bounty_id = sessionStorage.getItem("bounty_id");
        //this.passportParams.bounty_address = sessionStorage.getItem("bounty_address");
        console.log("setBountyId to: " + this.passportParams.bounty_id);
        //console.log("bounty_address to: " + this.passportParams.bounty_address);
    },
    storeElderHash: function(coinSymbol, elder_hash){ 
        console.log("storeElderHash");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    document.getElementById("elder_bounty_id").innerHTML = elder_hash;
        sessionStorage.setItem("elder_hash", elder_hash)
        this.passportParams.bounty_elderid = sessionStorage.getItem("elder_hash");
        this.passportParams.elderid = sessionStorage.getItem("elder_hash");
        console.log("bounty_elderid set to: " + this.passportParams.bounty_elderid);
    },
    hasBountyId: function(coinSymbol){
        console.log("hasBountyId");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        return sessionStorage.getItem("bounty_id");
    },
    hasElderBountyId: function(coinSymbol){
        console.log("hasBountyId");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        return sessionStorage.getItem("bounty_elderid");
    },
    getBountyID: function(coinSymbol){
        console.log("getBountyID");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    PassportPipeline.loadParams();
    this.passportParams.method = 'get_bounty_id';
    this.passportParams.uid = parseInt(PassportPipeline.getCoinUUID(coinSymbol));
    PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("getBountyID init");
                console.log(this.passportParams);
                if(response){
                    let passportGetBountyID = JSON.parse(response);
                    if(passportGetBountyID.hasOwnProperty("error")){
                        let bountyIdErr = passportGetBountyID.error;
                        $(".alert-danger").html(bountyIdErr);
                        console.log(passportGetBountyID);
                        return;
                    }   
                        const bounty_id = passportGetBountyID.data.bountyid;
                        this.passportParams.bounty_id = bounty_id;
                        PassportPipeline.setBountyId("crfi", bounty_id);
                        console.log(passportGetBountyID);
                        console.log(passportGetBountyID.data);
                        return;
                }
            });
    },
    fillFoundlings: function(coinSymbol, foundlings){
        console.log("fillFoundlings");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        }
        console.log(foundlings);
        
    var session_bounty_elderid = sessionStorage.getItem("bounty_elderid");  
    var session_bounty_id = sessionStorage.getItem("bounty_id");    

    var count = 0;
    for(count>0; count < foundlings.length; count++){
    var address = foundlings[count].address;
    console.log(foundlings[count]);
    var tbody = $("#bounty-history").find('tbody');
    var bounty_id = foundlings[count].bounty_id;
    var bounty_elderid = foundlings[count].bounty_elderid;
        if(address == null || address == "null" || address == '' || address == undefined){
            address = 'Private';
           }
      var tr;
      tr = $('<tr/>');
      tr.append("<td>" + bounty_id + "</td>");
      tr.append("<td>" + address + "</td>");
      $(tbody).append(tr);
    }
        console.log("address: "+address)
        console.log("session_bounty_elderid: "+session_bounty_elderid)
        console.log("session_bounty_id: "+session_bounty_id)
    },
    
    monitorFoundlings: function(coinSymbol, bounty_id, data){
        console.log("monitorFoundlings");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    PassportPipeline.loadParams();
    this.passportParams.method = 'monitor_foundlings';
    console.log("bounty_id at monitor_foundlings: "+bounty_id);
    this.passportParams.uid = parseInt(PassportPipeline.getCoinUUID(coinSymbol));
    this.passportParams.bounty_id = bounty_id;
    this.passportParams.bounty_elderid = bounty_id;
    console.log(this.passportParams.bounty_elderid)
    PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("monitorFoundlings init");
                console.log(this.passportParams);
                if(response){
                    let passportMonitorFoundlings = JSON.parse(response);
                    if(passportMonitorFoundlings.hasOwnProperty("error")){
                        let foundlingError = passportMonitorFoundlings.error;
                        $(".alert-danger").html(foundlingError);
                        console.log(passportMonitorFoundlings);
                        return;
                    }   
                        let bounty_elderid = PassportPipeline.hasElderBountyId("crfi");
                        var foundlings = passportMonitorFoundlings.data.foundlings;
                        PassportPipeline.fillFoundlings("crfi", foundlings);
                        console.log(passportMonitorFoundlings);
                        console.log(passportMonitorFoundlings.data);
                        return;
                }
            });
    },
    
    setElderHash: function(coinSymbol, elder_hash){
        console.log("setElderHash");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        PassportPipeline.loadParams();
    this.passportParams.method = 'charge_elder_hash';
    this.passportParams.uid = parseInt(PassportPipeline.getCoinUUID(coinSymbol));
    this.passportParams.bounty_elderid = elder_hash;
    var crfiData = ModelViewController.getCoinData("crfi"); 
    let bounty_address = crfiData.address;
    this.passportParams.address = bounty_address;
    this.passportParams.bounty_address = bounty_address;
    PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("setElderHash init");
                console.log(this.passportParams);
                if(response){
                    let passportAddElder = response;
                    if(passportAddElder.hasOwnProperty("error")){
                        let beneError = passportAddElder.error;
                        $(".alert-danger").html(beneError);
                        console.log(passportAddElder);
                        return;
                    }   
                        //PassportPipeline.saveParams();
                    PassportPipeline.storeElderHash("crfi", elder_hash);
                        console.log(passportAddElder);
                        return;
                    }
            });
    },
    setBeneficiary: function(coinSymbol, bene_name, bene_email, bene_address){
        console.log("setBeneficiary");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
        if(!bene_name || !bene_email || !bene_address){
            return;
        } 
    PassportPipeline.loadParams();
    this.passportParams.method = 'add_beneficiary';
    this.passportParams.uid = parseInt(PassportPipeline.getCoinUUID(coinSymbol));
    this.passportParams.aindex = parseFloat(this.passportParams.aindex);
    this.passportParams.beneficiary_aindex = parseFloat(this.passportParams.beneficiary_aindex);
    this.passportParams.beneficiary_name = bene_name;
    this.passportParams.beneficiary_email = bene_email;
    this.passportParams.beneficiary_address = bene_address;
    PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("setBeneficiary init");
                console.log(this.passportParams);
                if(response){
                    let passportAddBene = JSON.parse(response);
                    if(passportAddBene.hasOwnProperty("error")){
                        let beneError = passportAddBene.error;
                        $(".alert-danger").html(beneError);
                        console.log(passportAddBene);
                        return;
                    }   
                        //const aindex = passportAddBene.data;
                        //this.passportParams.aindex = aindex;
                        PassportPipeline.saveParams(this.passportParams);
                        console.log(passportAddBene);
                        return;
                }
            });
    },
    
    saveHash: function(key_set){   
        console.log("saveHash");
        if(key_set != undefined || key_set != null){
            sessionStorage.setItem("key_hash", key_set);
            this.passportParams.lost_password = sessionStorage.getItem("key_hash");
           }
        else {
            sessionStorage.setItem("key_hash", this.passportParams.lost_password);
            this.passportParams.lost_password = sessionStorage.getItem("key_hash");
        }
        console.log(this.passportParams.lost_password);    
        return(sessionStorage.getItem("key_hash"));
    },
    logUU: function(){
        console.log("logUU");
        console.log(this.passportParams);
    },
    hasValidSession: function(){
        return sessionStorage.hasOwnProperty("username")
                && sessionStorage.hasOwnProperty("password")
                && sessionStorage.hasOwnProperty("code")
    },
    resetPassword: function(coinSymbol, email, password = false, repeat = false, key_set = false){
        console.log("resetPassword");
        if(coinSymbol === 'all' && password != false){
            this.passportParams.email = email;  
            this.passportParams.password = password;
            this.passportParams.method = 'reset_password_webnero';
            this.setMethod('reset_password_webnero');
        } else {
            this.passportParams.method = 'reset_password';
            this.setMethod('reset_password');
        }
        if(key_set == false){
            this.passportParams.email = email;
        }
        if(key_set == true && password != null || key_set == true && password != false){
            if(password != repeat){
                resetFail();
                return;
               }
            this.loadHash();
            this.passportParams.password = password;
            this.passportParams.method = 'reset_password_settings';
            this.setMethod('reset_password_settings');
            console.log(this.passportParams);
        }
        
        let resetCoinPassword = function(coinSymbol){
            PassportPipeline.remoteCallPassport(coinSymbol,this.passportParams).then((response) => {
                console.log("reset init");
                console.log(this.passportParams);
                if(response){
                    let passportReset = JSON.parse(response);
                    if(passportReset.hasOwnProperty("error")){
                        let resetError = passportReset.error;
                        $(".alert-danger").html(resetError);
                        console.log(passportReset);
                        resetFail();
                        return;
                    }   
                        PassportPipeline.saveParams(this.passportParams);
                        console.log(passportReset);
                        resetSuccess();
                        return;
                }
            });
        }       
        switch(coinSymbol){
            case 'etnx':
                return resetCoinPassword('etnx');
                break;
            case 'etnxp':
                return resetCoinPassword('etnxp');
                break;
            case 'ltnx':
                return resetCoinPassword('ltnx');
                break;
            case 'gldx':
                return resetCoinPassword('gldx');
                break;
            case 'crfi':
                return resetCoinPassword('crfi');
                break;
            case 'all':
                resetCoinPassword('etnx');
                resetCoinPassword('etnxp');
                resetCoinPassword('ltnx');
                resetCoinPassword('gldx');
                resetCoinPassword('crfi');
                break;
            default:
                break;
        }
    },    
    resetCode: function(coinSymbol, email, pin, repeat, key_set){
        console.log("resetCode");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    this.loadParams();
    this.passportParams.method = 'reset_password';
        if(key_set == false){
            this.passportParams.email = email;
        }
        if(key_set == true && pin != null){
            if(pin != repeat){
                resetFail();
                return;
               }
            this.loadHash();
            this.passportParams.code = parseInt(pin);
            this.passportParams.method = 'add_code';
        }
    PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("reset code init");
                console.log(this.passportParams);
                if(response){
                    let passportResetCode = JSON.parse(response);
                    if(passportResetCode.hasOwnProperty("error")){
                        let resetError = passportResetCode.error;
                        $(".alert-danger").html(resetError);
                        console.log(passportResetCode);
                        resetFail();
                        return;
                    }   
                        var secure_code = parseInt(this.passportParams.code);
                        this.passportParams.code = parseInt(passportResetCode.data);
                        this.setCode(secure_code);
                        PassportPipeline.saveParams(this.passportParams);
                        console.log(passportResetCode);
                        resetSuccess();
                        return;
                }
            });
    },
    
    loadParams: function(){
        // Read only persistent data needed
        // this.passportParams.username = this.myDecipher(sessionStorage.username);
        // this.passportParams.email = this.myDecipher(sessionStorage.username);
        // this.passportParams.password = this.myDecipher(sessionStorage.password);
        this.passportParams.username = sessionStorage.getItem("username");
        this.passportParams.email = sessionStorage.getItem("username");
        this.passportParams.password = sessionStorage.getItem("password");
    },
    remoteCall: function(coinSymbol){
        return $.ajax({
                    url: this.getPassportApi(coinSymbol),
                    type: 'POST',
                    cache: false,
                    data: this.passportParams
                });
    },   
    remoteCallPassport: function(coinSymbol){
        return $.ajax({
                    url: this.getPassportApi(coinSymbol),
                    coin: coinSymbol.toString(),
                    type: 'POST',
                    cache: false,
                    data: this.passportParams
                });
    },       
    saveRates: function(usdt, btc, eth, ltc, crfi, coin){ 
        console.log("saveRates");
        if (coin != null && coin != undefined){
            console.log("coin not null, using defined coin");
        }
        else {
            coin = "crfi";
        }
        // Store rates in session 
        sessionStorage.setItem("crfi", crfi);
        sessionStorage.setItem("usdt", usdt);
        sessionStorage.setItem("btc", btc);
        sessionStorage.setItem("eth", eth);
        sessionStorage.setItem("ltc", ltc);
        // Confirm state of rates
        this.passportParams.usdt_value = sessionStorage.getItem("usdt");
        this.passportParams.btc_value = sessionStorage.getItem("btc");
        this.passportParams.eth_value = sessionStorage.getItem("eth");
        this.passportParams.ltc_value = sessionStorage.getItem("ltc");
        // Log it out to the console
        console.log(this.passportParams.crfi_value)
        console.log(this.passportParams.usdt_value)
        console.log(this.passportParams.btc_value)
        console.log(this.passportParams.eth_value)
        console.log(this.passportParams.ltc_value)
    },

    setUUkey: function(coinSymbol){
        console.log("setUUkey");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    this.loadParams();
    this.passportParams.method = 'set_uu_key';
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("set_uu_key init");
                if(response){
                    console.log(response)
                    let passportSetUU = JSON.parse(response);
                    if(passportSetUU.hasOwnProperty("error")){
                        let resetError = passportSetUU.error;
                        $(".alert-danger").html(resetError);
                        console.log(passportSetUU);
                        //resetFail();
                        return;
                    }   
                        this.passportParams.lost_password = passportSetUU.data;
                        this.saveHash();
                        console.log("SET UU");
                        console.log(passportSetUU);
                        console.log("GET UU .DATA");
                        console.log(passportSetUU.data);
                        console.log(this.passportParams);
                        //resetSuccess();
                        return;
                }
            });
    },
    getUUkey: function(coinSymbol){
        console.log("getUUkey");
        if(!coinSymbol){
        coinSymbol = 'crfi'; // default crfi
        };
    this.loadParams();
    this.passportParams.method = 'get_uu_key';
    this.passportParams.uid = parseInt(this.getCoinUUID(coinSymbol));
    PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                console.log("get_uu_key init");
                console.log(this.passportParams);
                if(response){
                    let passportGetUU = JSON.parse(response);
                    if(passportGetUU.hasOwnProperty("error")){
                        let resetError = passportGetUU.error;
                        $(".alert-danger").html(resetError);
                        console.log(passportGetUU);
                        //resetFail();
                        return;
                    }                           
                        this.passportParams.lost_password = passportGetUU.data;
                        this.saveHash();
                        console.log("GET UU");
                        console.log(passportGetUU);
                        console.log("GET UU .DATA");
                        console.log(passportGetUU.data);
                        //resetSuccess();
                        return;
                }
            });
    },   
    loadHash: function(){
        console.log("loadHash");
        // Read only persistent data needed
        this.passportParams.lost_password = sessionStorage.getItem('key_hash');
    },
    getRatesApi: function(coinSymbol){
        console.log("getRatesApi");
        if(!coinSymbol){
            coinSymbol = 'crfi';
        }
        switch(coinSymbol){
            case 'etnx':
                return this.exRatesApi_etnx;
                break;
            case 'etnxp':
                return this.exRatesApi_etnxp;
                break;
            case 'ltnx':
                return this.exRatesApi_ltnx;
                break;
            case 'gldx':
                return this.exRatesApi_gldx;
                break;
            case 'crfi':
                return this.exRatesApi;
                break;
            default:
                break;
        };
    },   
    remoteCallRates: function(coinSymbol){
        console.log("remoteCallRates");
        var exchangeData = {
            ids: "crystaleum",
            vs_currencies: ["btc", "usd", "eth", "ltc"]
        };
        return $.ajax({
                    url: this.getRatesApi(coinSymbol),
                    type: 'GET',
                    cache: false
                    // data: exchangeData
                });
    },
    simulateRemoteCall: function(coinSymbol){
         return Passport.simulate(this.passportParams);
     },
    setCredentials: function(email, password, save){
        // maybe cipher the data, but it's done elsewhere
        // this.passportParams.username = this.myDecipher(email);
        // this.passportParams.email = this.myDecipher(email);
        // this.passportParams.password = this.myDecipher(password);
        this.passportParams.username = email;
        this.passportParams.email = email;
        this.passportParams.password = password;
        if(save)
        {
            return PassportPipeline.saveParams(this.passportParams);
        }
    },
    setMethod: function(method){
        return this.passportParams.method = method;
    },
    setCode: function(code){
        // We needed it for refresh data
        this.passportParams.code = parseInt(code); 
        console.log("CODE: "+code)
        return sessionStorage.setItem("code", code);
    },
    loadCode: function(){
        // return this.passportParams.code = this.myDecipher(sessionStorage.code);
        return this.passportParams.code = parseInt(sessionStorage.getItem('code'));
    },
    setCoinUUID: function(coinSymbol, passportLogin){
        return sessionStorage.setItem(coinSymbol+"_uuid", parseInt(passportLogin.data.uid));
    },
    getCoinUUID: function(coinSymbol, version = null){
        // return this.myDecipher(sessionStorage.getItem(coinSymbol+"_uuid"));
        return sessionStorage.getItem(coinSymbol+"_uuid");
    },
    set_passport_local: function(passportParams, version = null){
        if(version = null){
            return sessionStorage.setItem("passport_local", JSON.stringify(passportParams));
        } else {
            return sessionStorage.setItem(version, JSON.stringify(passportParams));            
        };
    },
    get_passport_local: function(version = null){
        if(version = null){
            return sessionStorage.getItem(JSON.parse("passport_local"));
        } else {
            return sessionStorage.getItem(JSON.parse(version));
        };
    },
    performOperation: function(coinSymbol, operationCallback, passport_local = null){
        if(passport_local === null || passport_local === undefined){
            var version = 'passport_active';     
            passport_local = this.get_passport_local();
        };          
        console.log("performOperation");
        this.loadParams();        
        this.passportParams.method = 'login';
        this.setMethod('login');
        this.passportParams.coinAPIurl = PassportPipeline.getPassportApi(coinSymbol);
        this.passportParams.uid = null;           
        var version = 'passport_local';     
        var passport = PassportPipeline.get_passport_local(version);
        version = 'passport_active'; 
        console.log("passport_local:");
        console.log(passport);
        console.log("Checkpoint: 1");
        console.log(this.passportParams);
        PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
            console.log(this.passportParams);
            if(response){
                console.log(response);
                let passportLogin = JSON.parse(response);
                if(passportLogin.hasOwnProperty("error")){
                    loginFail();
                    return;
                }
                PassportPipeline.setCoinUUID(coinSymbol, passportLogin);
                this.passportParams.uid = parseInt(PassportPipeline.getCoinUUID(coinSymbol));
                console.log("UUID log");
                console.log(this.passportParams.uid)
                this.passportParams.code = parseInt(PassportPipeline.loadCode());
                this.passportParams.method = 'check_code';
                this.setMethod('check_code');
                console.log("Checkpoint: 2");
                console.log(this.passportParams);
                PassportPipeline.remoteCall(coinSymbol, this.passportParams).then((response) => {
                    if(response){
                      console.log(response); 
                      let passportCheckCode = JSON.parse(response);
                        if(passportCheckCode.hasOwnProperty("error")){
                            let checkError = passportCheckCode.hasOwnProperty("error");
                            console.log(checkError);
                            loginCodeFail();
                            return;
                        }
                            PassportPipeline.set_passport_local(passport_local, version);
                            var passport_active = PassportPipeline.get_passport_local(version);
                            console.log("passport_active:");
                            console.log(passport_active);
                            if(ModelViewController.coinState){
                               console.log("MVC.coinState:")
                               console.log(ModelViewController.coinState)
                            }
                        console.log("Checkpoint: 3");
                        console.log(this.passportParams);
                        operationCallback(coinSymbol);
                    }
                });
            }
        });
    },
    registerOperation: function(coinSymbol, operationCallback, passport_local = null){
        if(passport_local === null || passport_local === undefined){
            var version = 'passport_registration';     
            passport_local = PassportPipeline.get_passport_local(version);
        }; 
        this.loadParams();        
        this.passportParams.method = 'register_webnero';
        this.passportParams.coinAPIurl = PassportPipeline.getPassportApi(coinSymbol);
        this.passportParams.uid = null;
        var version = 'passport_registration';     
        var passport = PassportPipeline.get_passport_local(version);
        console.log("passport_local:");
        console.log(passport);
        console.log("Electronero Passport registration checkpoint: 1");
        console.log(this.passportParams);
        PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
            if(response){
                let passportLogin = JSON.parse(response);
                if(passportLogin.hasOwnProperty("error")){
                    register_operations.registerFail(passportLogin.hasOwnProperty("error"));
                    return;
                }
                PassportPipeline.setCoinUUID(coinSymbol, passportLogin);
                this.passportParams.uid = parseInt(PassportPipeline.getCoinUUID(coinSymbol));
                this.passportParams.code = parseInt(PassportPipeline.loadCode());
                PassportPipeline.setMethod('add_code');
                this.passportParams.method = 'add_code';
                console.log("Electronero Passport registration checkpoint: 2");
                console.log(this.passportParams);
                PassportPipeline.remoteCall(coinSymbol,this.passportParams).then((response) => {
                    if(response){
                        console.log(response); 
                        let passportCheckCode = JSON.parse(response);
                        if(passportCheckCode.hasOwnProperty("error")){
                            register_operations.registerCodeFail(passportCheckCode.hasOwnProperty("error"));
                            return;
                        }   
                            PassportPipeline.set_passport_local(passport, version);
                            var passport_active = PassportPipeline.get_passport_local(version);
                            console.log("passport_active:");
                            console.log(passport_active);
                            ModelViewController.coinState++
                            if(ModelViewController.coinState>=5){
                            location.href = "verify.html";
                            }
                        console.log("Electronero Passport registration checkpoint: 3");
                        console.log(this.passportParams);
                        operationCallback(coinSymbol);
                    }
                });
            }
        });
    },
    getPassportApi: function(coinSymbol){
        switch(coinSymbol){
            case 'etnx':
                return PassportPipeline.etnxApi;
            case 'etnxp':
                return PassportPipeline.etnxpApi;
            case 'etnxc':
                return PassportPipeline.etnxcApi;
            case 'ltnx':
                return PassportPipeline.ltnxApi;
            case 'gldx':
                return PassportPipeline.gldxApi;
            case 'crfi':
                return PassportPipeline.crfiApi;
            default:
                break;
        };
    },
    getBlockchainLink: function(coinSymbol){
        switch(coinSymbol){
            case 'etnx':
                return PassportPipeline.etnxExpl;
            case 'etnxp':
                return PassportPipeline.etnxpExpl;
            case 'etnxc':
                return tPassportPipelinehis.etnxcExpl;
            case 'ltnx':
                return PassportPipeline.ltnxExpl;
            case 'gldx':
                return PassportPipeline.gldxExpl;
            case 'crfi':
                return PassportPipeline.crfiExpl;
            default:
                break;
        };
    },
    startCryptoEngine: function(operation = "poll", version = "passport_active"){
        
        if(version != "passport_active"){
            var passport_local = PassportPipeline.get_passport_local(version);
        }
        var passport_local = PassportPipeline.get_passport_local("passport_active");
        console.log("passport II");
        console.log(passport_local);  
        if(!operation || operation === null || operation === undefined){
            var operation = "poll";
        }; console.log(operation);
        // ModelViewController.coinState = 0;
        // ModelViewController.initLevel = 0;
        let etnx_data = {};
        let etnxp_data = {};
        let ltnx_data = {};
        let gldx_data = {};
        let crfi_data = {};
        let status = {
            etnx: null,
            etnxp: null,
            ltnx: null,
            gldx: null, 
            crfi: null
        };
        var coins = ['etnx','etnxp','ltnx','gldx','crfi'];
        function poll(passport_local){
            // should get the wallet contents for COINS
            var i = 0;
            for(i;i<coins.length;i++){
                // get uid  
                passport_local.uid = parseInt(PassportPipeline.getCoinUUID(coins[i]));
                console.log("UUID log");
                // get code
                passport_local.code = parseInt(PassportPipeline.loadCode());
                console.log("CODE log");
                console.log(PassportPipeline.passportParams.code)
                console.log("passport_local log");
                console.log(passport_local)
                passport_local.code=PassportPipeline.passportParams.code;
                // init coins[i]
                ModelViewController.initCoin(coins[i], passport_local);
            };    
        };
        function etnx(passport_local){
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.loadParams();
            console.log("passport_local"+passport_local);   
            console.log("coinstate pre++: " + ModelViewController.coinState);
            ModelViewController.coinState++;
            console.log("coinstate post++: " + ModelViewController.coinState);
            PassportPipeline.passportParams.coinAPIurl = PassportPipeline.etnxApi;
            PassportPipeline.remoteCall("etnx",thiPassportPipelines.passportParams).then((response) => {
                if(response){
                    console.log(response); 
                    let passportBalance = JSON.parse(response);
                    console.log(passportBalance);
                    if(passportBalance.hasOwnProperty("error")){
                        console.log(passportBalance.hasOwnProperty("error"));
                        return;
                    }
                    else if(!passportBalance.hasOwnProperty("error")) {
                        status.gldx = true;
                        ModelViewController.setCoinData(coinSymbol, response);
                        ModelViewController.initLevel++;
                        console.log("initLevel post++: " + ModelViewController.initLevel);
                        $.event.trigger({
                            type: "fillData",
                            coin: coinSymbol
                        });
                    }
                }
            });
        };
        function etnxp(passport_local){
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.loadParams(); 
            console.log("passport_local"+passport_local); 
            console.log("coinstate pre++: " + ModelViewController.coinState);
            ModelViewController.coinState++;
            console.log("coinstate post++: " + ModelViewController.coinState);
            PassportPipeline.passportParams.coinAPIurl = PassportPipeline.etnxpApi;
            PassportPipeline.remoteCall("etnxp",PassportPipeline.passportParams).then((response) => {
                if(response){
                    console.log(response); 
                    let passportBalance = JSON.parse(response);
                    console.log(passportBalance);
                    if(passportBalance.hasOwnProperty("error")){
                        console.log(passportBalance.hasOwnProperty("error"));
                        return;
                    }
                    else if(!passportBalance.hasOwnProperty("error")) {
                        status.gldx = true;
                        ModelViewController.setCoinData(coinSymbol, response);
                        ModelViewController.initLevel++;
                        console.log("initLevel post++: " + ModelViewController.initLevel);
                        $.event.trigger({
                            type: "init.done",
                            coin: coinSymbol
                        });
                    }
                }
            });
        };
        function ltnx(passport_local){
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.loadParams();
            console.log("passport_local: "+passport_local);   
            console.log("coinstate pre++: " + ModelViewController.coinState);
            ModelViewController.coinState++;
            console.log("coinstate post++: " + ModelViewController.coinState);
            PassportPipeline.passportParams.coinAPIurl = PassportPipeline.ltnxApi;
            PassportPipeline.remoteCall("ltnx",PassportPipeline.passportParams).then((response) => {
                if(response){
                    console.log(response); 
                    let passportBalance = JSON.parse(response);
                    console.log(passportBalance);
                    if(passportBalance.hasOwnProperty("error")){
                        console.log(passportBalance.hasOwnProperty("error"));
                        return;
                    }
                    else if(!passportBalance.hasOwnProperty("error")) {
                        status.gldx = true;
                        ModelViewController.setCoinData(coinSymbol, response);
                        ModelViewController.initLevel++;
                        console.log("initLevel post++: " + ModelViewController.initLevel);
                        $.event.trigger({
                            type: "init.done",
                            coin: coinSymbol
                        });
                    }
                }
            });
        };
        function gldx(passport_local){
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.loadParams();
            console.log(this.passportParams);   
            console.log("coinstate pre++: " + ModelViewController.coinState);
            ModelViewController.coinState++;
            console.log("coinstate post++: " + ModelViewController.coinState);
            this.passportParams.coinAPIurl = PassportPipeline.gldxApi;
            PassportPipeline.remoteCall("gldx",this.passportParams).then((response) => {
                if(response){
                    console.log(response); 
                    let passportBalance = JSON.parse(response);
                    console.log(passportBalance);
                    if(passportBalance.hasOwnProperty("error")){
                        console.log(passportBalance.hasOwnProperty("error"));
                        return;
                    }
                    else if(!passportBalance.hasOwnProperty("error")) {
                        status.gldx = true;
                        ModelViewController.setCoinData(coinSymbol, response);
                        ModelViewController.initLevel++;
                        console.log("initLevel post++: " + ModelViewController.initLevel);
                        $.event.trigger({
                            type: "init.done",
                            coin: coinSymbol
                        });
                    }
                }
            });
        };
        function crfi(passport_local){
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.loadParams();
            console.log(this.passportParams);   
            console.log("coinstate pre++: " + ModelViewController.coinState);
            ModelViewController.coinState++;
            console.log("coinstate post++: " + ModelViewController.coinState);
            this.passportParams.coinAPIurl = PassportPipeline.crfiApi;
            PassportPipeline.remoteCall("crfi",this.passportParams).then((response) => {
                if(response){
                    console.log(response); 
                    let passportBalance = JSON.parse(response);
                    console.log(passportBalance);
                    if(passportBalance.hasOwnProperty("error")){
                        console.log(passportBalance.hasOwnProperty("error"));
                        return;
                    }
                    else if(!passportBalance.hasOwnProperty("error")) {
                        status.crfi = true;
                        ModelViewController.setCoinData(coinSymbol, response);
                        ModelViewController.initLevel++;
                        console.log("initLevel post++: " + ModelViewController.initLevel);
                        $.event.trigger({
                            type: "init.done",
                            coin: coinSymbol
                        });
                    }
                }
            });
        };
        switch(operation){
            case 'poll':
                poll(passport_local);
                break;
            case 'etnx':
                etnx(passport_local);
                break;
            case 'etnxp':
                etnxp(passport_local);
                break;
            case 'ltnx':
                ltnx(passport_local);
                break;
            case 'gldx':
                gldx(passport_local);
                break;
            case 'crfi':
                crfi(passport_local);
                break;            
            default:
                break;
        };
    }
};

var jsonLogin = {"status":"success","data":{"uid":"1","password":"test"}};

var jsonLoginError = {"error": "fail"};

var jsonGetAddr = {
        "address":"88owYM3JXB5i8zT9pzcNGkhC3LmFCehSsdnnLZi995cSTeRPzHwXoXgdKD39NpErU8E2zmNjyoK7BV7DQ4e8ntm17UsNw1W",
        "balances":
            {"balance":123456789, "multisig_import_needed":false, "unlocked_balance":4567890
        },
        "txs":{
            "in": [ { "amount" : 1200,
                        "height" : 1234561,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234562,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234563,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" } ],
            "out": [ { "amount" : 1200,
                        "height" : 1234564,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234565,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234566,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" }],
        },"imports":[],"contracts":[]};

var Passport = {
    simulate: function(data){
        if(data.method == 'login'){
            if(data.password != "qwerty")
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLoginError)); }, 1000);
                });
            else
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
                });
        }
        else if(data.method == 'check_code'){
            if(data.code != "12345")
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLoginError)); }, 1000);
                });
            else
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
                });
        }
        else if(data.method == 'getaddr')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonGetAddr)); }, 250);
            });
        else if(data.method == 'add_code')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonGetAddr)); }, 250);
            });
        else if(data.method == 'register')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
            });
        else if(data.method == 'send_transaction')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
            });
        
        return new Promise((resolve, reject) => {
            reject("Method not supported");
        });
    }
};

var PassportPipeline = {
    
    passportParams: { 
                     method: '',
                     ctr: 0,
                     id_check: 0,
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
                     etnx_uid: '',
                     etnxp_uid: '',
                     ltnx_uid: '',
                     gldx_uid: '',
                     crfi_uid: '',
                     unlocked_balance: 0, 
                     balance: 0,
                     locked_balance: 0,
                     telegramID: '',
                     telegramUsername: '',
                     bounty_id: '',
                     address: '',  
                     secret: '',
                     height: '',
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
                     aindex: '',
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

    etnxApi: 'https://passport.electronero.org/api-etnx/api.php',
    etnxpApi: 'https://passport.electronero.org/etnxp-api/api.php',
    etnxcApi: 'https://passport.electronero.org/etnxc-api/api.php',
    ltnxApi: 'https://passport.electronero.org/ltnx-api/api.php',
    gldxApi: 'https://passport.electronero.org/gldx-api/api.php',
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
            case 'all':
                return PassportPipeline.passportAPI;
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
        sessionStorage.setItem("username", params.username);
        sessionStorage.setItem("email", params.email);        
        sessionStorage.setItem("password", params.password);
        sessionStorage.setItem("code", parseInt(params.code)); 
        // Then cipher any sensitive data
        this.passportParams.username = sessionStorage.getItem("username");
        this.passportParams.email = sessionStorage.getItem("email");
        this.passportParams.password = sessionStorage.getItem("password");
        this.passportParams.code = parseInt(sessionStorage.getItem("code"));
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
                        //PassportPipeline.saveParams(this.passportParams);
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
            this.passportParams.email = email;  
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
        let resetCoinPassword = function(coinSymbol,passportParam){
            PassportPipeline.remoteCallX(passportParam).then((response) => {
                console.log("reset init");
                console.log(passportParam);
                if(response){
                    let passportReset = JSON.parse(response);
                    if(passportReset.hasOwnProperty("error")){
                        let resetError = passportReset.error;
                        $(".alert-danger").html(resetError);
                        console.log(passportReset);
                        resetFail();
                        return;
                    }   
                        // PassportPipeline.saveParams(passportParam);
                        console.log(passportReset);
                        resetSuccess();
                        return;
                }
            });
        }       
        switch(coinSymbol){
            case 'etnx':
                var passportParam = {
                    email: email,
                    method: 'reset_password_webnero'
                }; 
                PassportPipeline.setMethod('reset_password_webnero');
                return resetCoinPassword('etnx',passportParam);
                break;
            case 'etnxp':
                var passportParam = {
                    email: email,
                    method: 'reset_password_webnero'
                }; 
                PassportPipeline.setMethod('reset_password_webnero');
                return resetCoinPassword('etnxp',passportParam);
                break;
            case 'ltnx':
                var passportParam = {
                    email: email,
                    method: 'reset_password_webnero'
                }; 
                PassportPipeline.setMethod('reset_password_webnero');
                return resetCoinPassword('ltnx',passportParam);
                break;
            case 'gldx':
                var passportParam = {
                    email: email,
                    method: 'reset_password_webnero'
                }; 
                PassportPipeline.setMethod('reset_password_webnero');
                return resetCoinPassword('gldx',passportParam);
                break;
            case 'crfi':
                var passportParam = {
                    email: email,
                    method: 'reset_password_webnero'
                }; 
                PassportPipeline.setMethod('reset_password_webnero');
                return resetCoinPassword('crfi',passportParam);
                break;
            case 'all':
                var passportParam = {
                    email: email,
                    method: 'reset_password_webnero'
                }; 
                PassportPipeline.setMethod('reset_password_webnero');
                return resetCoinPassword('etnx',passportParam);
                break;
            default:
                var passportParam = {
                    email: email,
                    method: 'reset_password_webnero'
                }; 
                PassportPipeline.setMethod('reset_password_webnero');
                return resetCoinPassword('etnx',passportParam);
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
                        this.passportParams.code = parseInt(passportResetCode.data);
                        var secure_code = parseInt(this.passportParams.code);
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
        this.passportParams.email = sessionStorage.getItem("email");
        this.passportParams.password = sessionStorage.getItem("password");
        this.passportParams.code = parseInt(sessionStorage.getItem("code"));
    },
    remoteSmartCall: function(coinSymbol,passportParams) {
        var form = {};
        form.method = passportParams.method ? passportParams.method : 'getaddr';
        form.uid = passportParams.uid ? parseInt(passportParams.uid) : '0x.01';
        form.password = passportParams.password ? passportParams.password : '0x.02';
        form.code = passportParams.code ? parseInt(passportParams.code) : '0x.03';
        form.email = passportParams.email ? passportParams.email : '0x.04';
        form.url = PassportPipeline.getPassportApi(coinSymbol);
        console.log(form);
        if (!passportParams.password) { return false; }
        return $.ajax({
            url: PassportPipeline.getPassportApi(coinSymbol),
            type: 'POST',
            cache: false,
            data: form
        });
    },        
    remoteRegCall: function(coinSymbol,passportParams) {
        var form = {};
        form.method = 'register_webnero';
        form.uid = passportParams.uid ? parseInt(passportParams.uid) : '0x.01';
        form.password = passportParams.password ? passportParams.password : '0x.02';
        form.code = passportParams.code ? parseInt(passportParams.code) : '0x.03';
        form.email = passportParams.email ? passportParams.email : '0x.04';
        form.url = PassportPipeline.getPassportApi(coinSymbol);
        console.log(form);
        if (!passportParams.password) { return false; }
        return $.ajax({
            url: PassportPipeline.getPassportApi(coinSymbol),
            type: 'POST',
            cache: false,
            data: form
        });
    },
    remoteCall: function(coinSymbol,passportParams){
        console.log("remoteCall");    
        var passportCheckup = passportParams ? passportParams : PassportPipeline.passportParams;
        return $.ajax({
                    url: PassportPipeline.getPassportApi(coinSymbol),
                    type: 'POST',
                    cache: false,
                    data: passportCheckup
                });
    },  
    remoteCallX: function(passportParam){
        return $.ajax({
                    url: PassportPipeline.getPassportApi("etnx"),
                    type: 'POST',
                    cache: false,
                    data: passportParam
                });
    },   
    remoteCallPassport: function(coinSymbol, passportParams){
        return $.ajax({
                    url: this.getPassportApi(coinSymbol),
                    coin: coinSymbol.toString(),
                    type: 'POST',
                    cache: false,
                    data: passportParams
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
    setSmartCoinUUID: function(coinSymbol, passport){
        if(coinSymbol === 'all'){
            sessionStorage.setItem("etnx_uuid", parseInt(passport.data.etnx_uid));
            sessionStorage.setItem("etnxp_uuid", parseInt(passport.data.etnxp_uid));
            sessionStorage.setItem("ltnx_uuid", parseInt(passport.data.ltnx_uid));
            sessionStorage.setItem("gldx_uuid", parseInt(passport.data.gldx_uid));
            sessionStorage.setItem("crfi_uuid", parseInt(passport.data.crfi_uid));
        };
        if(coinSymbol === 'etnx'){
            sessionStorage.setItem("etnx_uuid", parseInt(passport.data.etnx_uid));
        };        
        if(coinSymbol === 'etnxp'){
            sessionStorage.setItem("etnxp_uuid", parseInt(passport.data.etnxp_uid));
        };
        if(coinSymbol === 'ltnx'){
            sessionStorage.setItem("ltnx_uuid", parseInt(passport.data.ltnx_uid));
        };       
        if(coinSymbol === 'gldx'){
            sessionStorage.setItem("gldx_uuid", parseInt(passport.data.gldx_uid));
        };
        if(coinSymbol === 'crfi'){
            sessionStorage.setItem("crfi_uuid", parseInt(passport.data.crfi_uuid));
        };
    },
    getCoinUUID: function(coinSymbol){
        console.log(sessionStorage.getItem(coinSymbol+"_uuid"));
        // return this.myDecipher(sessionStorage.getItem(coinSymbol+"_uuid"));
        return sessionStorage.getItem(coinSymbol+"_uuid");
    },
    set_passport_local: function(passportParams, version){
        if(version == null){
            return sessionStorage.setItem('passport_local', JSON.stringify(passportParams));
        } else {
            return sessionStorage.setItem(version, JSON.stringify(passportParams));
        };
    },
    get_passport_local: function(version){
        if(version == null){
            var data = JSON.parse(sessionStorage.getItem('passport_local'));
            return data;
        } else {
            var data = JSON.parse(sessionStorage.getItem(version));
            return data;
        };
    },
    ctrSet: function(num){
        return PassportPipeline.ctr = parseInt(num);
    },
    checkId: function(num){
        return PassportPipeline.id_check = parseInt(num);
    },        
    myOpsPromises: function(coinSymbol,passportLogin,passportParams){     
    var promise = new Promise(function(resolve, reject) { 
        this.passportParams.code = parseInt(PassportPipeline.loadCode());
        console.log("Electronero Passport registration checkpoint: 2");
        console.log(this.passportParams);  
        let etnx_api = PassportPipeline.getPassportApi('etnx');
        let etnxp_api = PassportPipeline.getPassportApi('etnxp');
        let ltnx_api = PassportPipeline.getPassportApi('ltnx');
        let gldx_api = PassportPipeline.getPassportApi('gldx');
        let crfi_api = PassportPipeline.getPassportApi('crfi'); 
        let passport_api = PassportPipeline.getPassportApi('crfi'); 
        const uuid = PassportPipeline.getCoinUUID(coinSymbol);
        this.passportParams.uid = parseInt(uuid);
        const xid = PassportPipeline.getCoinUUID("etnx");
        this.passportParams.etnx_uid = parseInt(xid);
        this.passportParams.uid_etnx = this.passportParams.etnx_uid;
        const xpid = PassportPipeline.getCoinUUID("etnxp");
        this.passportParams.etnxp_uid = parseInt(xpid);
        this.passportParams.uid_etnx = this.passportParams.etnxp_uid;
        const lxid = PassportPipeline.getCoinUUID("ltnx");
        this.passportParams.ltnx_uid = parseInt(lxid);
        this.passportParams.uid_ltnx = this.passportParams.ltnx_uid;
        const gxid = PassportPipeline.getCoinUUID("gldx");
        this.passportParams.gldx_uid = parseInt(gxid);
        this.passportParams.uid_gldx = this.passportParams.gldx_uid;
        const cxid = PassportPipeline.getCoinUUID("crfi");
        this.passportParams.crfi_uid = parseInt(cxid);
        this.passportParams.uid_crfi = this.passportParams.crfi_uid;
        const passport_active = {
            uid: parseInt(this.passportParams.uid),
            api: this.passportParams.coinAPIurl,
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
            email: passport_local.email.toString(),
            password: passport_local.password.toString(),
            code: passport_local.code ? parseInt(passport_local.code) : null,
            pin: passport_local.code ? parseInt(passport_local.code) : null,
            method: 'login'
        }; 
        PassportPipeline.set_passport_local(passport_active,"passport_active");  
        var passportActive = PassportPipeline.get_passport_local("passport_active");                
        if(passport.etnx_uid != null) {
            let operation = 'poll';
            resolve(passport_active);
        } else {
            reject(passport_active);
        };
    });                
    promise.then(function (passport_active) {
        console.log(passport_active);
        sessionStorage.setItem("fromLogin", false);
        version = 'passport_active';   
        location.href = "verify.html";
        console.log("Electronero Passport registration checkpoint: 3");
        console.log(this.passportParams);
        var passportActive = PassportPipeline.get_passport_local(version);
        console.log("passportActive:");
        console.log(passportActive);
        return passportActive;
        }).catch(function (passport_active) {
            console.log('Err: '+passport_active);
        });
    },
    performOperation: function(coinSymbol, operationCallback, passport_local){
        if(passport_local === null || passport_local === undefined){
            var version = 'passport_index';     
            let passport = this.get_passport_local(version);
        };          
        if(coinSymbol === 'etnx'){
            PassportPipeline.ctrSet(1);
            this.passportParams.uid_etnx = parseInt(PassportPipeline.getCoinUUID('etnx'));
            this.passportParams.etnx_uid = parseInt(PassportPipeline.getCoinUUID('etnx'));
        };        
        if(coinSymbol === 'etnxp'){
            PassportPipeline.ctrSet(2);
            this.passportParams.uid_etnxp = parseInt(PassportPipeline.getCoinUUID('etnxp'));
            this.passportParams.etnxp_uid = parseInt(PassportPipeline.getCoinUUID('etnxp'));
        };         
        if(coinSymbol === 'ltnx'){
            PassportPipeline.ctrSet(3);
            this.passportParams.ltnx_uid = parseInt(PassportPipeline.getCoinUUID('ltnx'));
            this.passportParams.uid_ltnx = parseInt(PassportPipeline.getCoinUUID('ltnx'));
        };         
        if(coinSymbol === 'gldx'){
            PassportPipeline.ctrSet(4);
            this.passportParams.uid_gldx = parseInt(PassportPipeline.getCoinUUID('gldx'));
            this.passportParams.gldx_uid = parseInt(PassportPipeline.getCoinUUID('gldx'));
        };         
        if(coinSymbol === 'crfi'){
            PassportPipeline.ctrSet(5);
            this.passportParams.uid_crfi = parseInt(PassportPipeline.getCoinUUID('crfi'));
            this.passportParams.crfi_uid = parseInt(PassportPipeline.getCoinUUID('crfi'));
        };       
        if(coinSymbol === 'all'){
            PassportPipeline.ctrSet(6);
        };
        console.log("performOperation");
        PassportPipeline.loadParams();        
        this.passportParams.method = 'login_webnero';
        PassportPipeline.setMethod('login_webnero');
        this.passportParams.coinAPIurl = PassportPipeline.getPassportApi(coinSymbol);
        this.passportParams.uid = parseInt(PassportPipeline.getCoinUUID(coinSymbol));   
        this.passportParams.code = parseInt(PassportPipeline.loadCode());  
        var version = 'passport_local';  
        var passport = PassportPipeline.get_passport_local(version);
        console.log("passport_local:");
        console.log(passport);
        console.log("Checkpoint: 1");        
        if(parseInt(PassportPipeline.ctr) >= 6){
            version = 'passport_active'; 
            PassportPipeline.remoteCall(coinSymbol, this.passportParams).then((response) => {
                if(response){
                console.log(response); 
                let passportLogin = JSON.parse(response);
                    if(passportLogin.hasOwnProperty("error")){
                        let checkError = passportLogin.hasOwnProperty("error");
                        console.log(checkError);
                        return loginCodeFail();
                    };  
                    if(PassportPipeline.id_check < 1){
                        PassportPipeline.checkId(1);
                        PassportPipeline.setSmartCoinUUID(coinSymbol, passportLogin);
                        this.passportParams.uid_etnx = parseInt(passportLogin.data.etnx_uid);
                        this.passportParams.etnx_uid = parseInt(passportLogin.data.etnx_uid);
                        this.passportParams.uid_etnxp = parseInt(passportLogin.data.etnxp_uid);
                        this.passportParams.etnxp_uid = parseInt(passportLogin.data.etnxp_uid);
                        this.passportParams.ltnx_uid = parseInt(passportLogin.data.ltnx_uid);
                        this.passportParams.uid_ltnx = parseInt(passportLogin.data.ltnx_uid);
                        this.passportParams.uid_gldx = parseInt(passportLogin.data.gldx_uid);
                        this.passportParams.gldx_uid = parseInt(passportLogin.data.gldx_uid);
                        this.passportParams.uid_crfi = parseInt(passportLogin.data.crfi_uid);
                        this.passportParams.crfi_uid = parseInt(passportLogin.data.crfi_uid);
                        PassportPipeline.set_passport_local(passportLogin,"passport_active");
                        PassportPipeline.myOpsPromises(coinSymbol, passportLogin, this.passportParams);
                    }
                    var passport_active = PassportPipeline.get_passport_local("passport_active");
                    console.log("passport_active:");
                    console.log(passport_active);
                    console.log("Checkpoint: 3");
                    console.log("passportParams: ");
                    console.log(this.passportParams);
                    operationCallback(coinSymbol);
                };
            });
        };
    },        
    myPromises: function(coinSymbol,passportLogin,passportParams){     
    var promise = new Promise(function(resolve, reject) { 
        this.passportParams.code = parseInt(PassportPipeline.loadCode());
        console.log("Electronero Passport registration checkpoint: 2");
        console.log(this.passportParams);  
        let etnx_api = PassportPipeline.getPassportApi('etnx');
        let etnxp_api = PassportPipeline.getPassportApi('etnxp');
        let ltnx_api = PassportPipeline.getPassportApi('ltnx');
        let gldx_api = PassportPipeline.getPassportApi('gldx');
        let crfi_api = PassportPipeline.getPassportApi('crfi'); 
        let passport_api = PassportPipeline.getPassportApi('crfi'); 
        const uuid = PassportPipeline.getCoinUUID(coinSymbol);
        this.passportParams.uid = parseInt(uuid);
        const xid = PassportPipeline.getCoinUUID("etnx");
        this.passportParams.etnx_uid = parseInt(xid);
        this.passportParams.uid_etnx = this.passportParams.etnx_uid;
        const xpid = PassportPipeline.getCoinUUID("etnxp");
        this.passportParams.etnxp_uid = parseInt(xpid);
        this.passportParams.uid_etnx = this.passportParams.etnxp_uid;
        const lxid = PassportPipeline.getCoinUUID("ltnx");
        this.passportParams.ltnx_uid = parseInt(lxid);
        this.passportParams.uid_ltnx = this.passportParams.ltnx_uid;
        const gxid = PassportPipeline.getCoinUUID("gldx");
        this.passportParams.gldx_uid = parseInt(gxid);
        this.passportParams.uid_gldx = this.passportParams.gldx_uid;
        const cxid = PassportPipeline.getCoinUUID("crfi");
        this.passportParams.crfi_uid = parseInt(cxid);
        this.passportParams.uid_crfi = this.passportParams.crfi_uid;
        const passport_active = {
            uid: parseInt(this.passportParams.uid),
            api: this.passportParams.coinAPIurl,
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
            email: passport_local.email.toString(),
            password: passport_local.password.toString(),
            code: passport_local.code ? parseInt(passport_local.code) : null,
            pin: passport_local.code ? parseInt(passport_local.code) : null,
            method: 'login'
        }; 
        PassportPipeline.set_passport_local(passport_active,"passport_active");  
        var passportActive = PassportPipeline.get_passport_local("passport_active");                
        if(passport.etnx_uid != null) {
            let operation = 'poll';
            resolve(passport_active);
        } else {
            reject(passport_active);
        };
    });                
    promise.then(function (passport_active) {
        console.log(passport_active);
        sessionStorage.setItem("fromLogin", false);
        version = 'passport_active';   
        location.href = "verify.html";
        console.log("Electronero Passport registration checkpoint: 3");
        console.log(this.passportParams);
        var passportActive = PassportPipeline.get_passport_local(version);
        console.log("passportActive:");
        console.log(passportActive);
        return passportActive;
        }).catch(function (passport_active) {
            console.log('Err: '+passport_active);
        });
    },
    registerOperation: function(coinSymbol, operationCallback, passport_local){
        if(passport_local === null || passport_local === undefined || ModelViewController.coinState === 1){
            this.loadParams();
            var version = 'passport_registration';     
            var passport = PassportPipeline.get_passport_local(version);
        }
        this.passportParams.method = 'register_webnero';
        this.passportParams.coinAPIurl = PassportPipeline.getPassportApi(coinSymbol);
        this.passportParams.uid = null;
        this.passportParams.code = parseInt(passport_local.code);
        console.log("passport_local:");
        console.log(passport);
        console.log("Electronero Passport registration checkpoint: 1");
        console.log(this.passportParams);
        PassportPipeline.remoteRegCall(coinSymbol,this.passportParams).then((response) => {
            if(response){
                ModelViewController.coinState++;
                console.log("coinState: "+ModelViewController.coinState);
                const passportLogin = JSON.parse(response);
                PassportPipeline.ctrSet(0);
                switch(coinSymbol){
                    case 'etnx':
                        PassportPipeline.ctrSet(1);
                        this.passportParams.uid_etnx = parseInt(passportLogin.data.etnx_uid);
                        this.passportParams.etnx_uid = parseInt(passportLogin.data.etnx_uid);
                        PassportPipeline.setSmartCoinUUID(coinSymbol, passportLogin);
                        console.log(passportLogin);
                    case 'etnxp':
                        PassportPipeline.ctrSet(2);
                        this.passportParams.uid_etnxp = parseInt(passportLogin.data.etnx_uid);
                        this.passportParams.etnxp_uid = parseInt(passportLogin.data.etnx_uid);
                        PassportPipeline.setSmartCoinUUID(coinSymbol, passportLogin);
                        console.log(passportLogin);
                    case 'ltnx':
                        PassportPipeline.ctrSet(3);
                        this.passportParams.uid_ltnx = parseInt(passportLogin.data.etnx_uid);
                        this.passportParams.ltnx_uid = parseInt(passportLogin.data.etnx_uid);
                        PassportPipeline.setSmartCoinUUID(coinSymbol, passportLogin);
                        console.log(passportLogin);
                    case 'gldx':
                        PassportPipeline.ctrSet(4);
                        this.passportParams.uid_gldx = parseInt(passportLogin.data.etnx_uid);
                        this.passportParams.gldx_uid = parseInt(passportLogin.data.etnx_uid);
                        PassportPipeline.setSmartCoinUUID(coinSymbol, passportLogin);
                        console.log(passportLogin);
                    case 'crfi':
                        PassportPipeline.ctrSet(5);
                        this.passportParams.uid_crfi = parseInt(passportLogin.data.etnx_uid);
                        this.passportParams.crfi_uid = parseInt(passportLogin.data.etnx_uid);
                        PassportPipeline.setSmartCoinUUID(coinSymbol, passportLogin);
                        console.log(passportLogin);
                    case 'all':
                        PassportPipeline.ctrSet(6);
                        this.passportParams.uid_etnx = parseInt(passportLogin.data.etnx_uid);
                        this.passportParams.uid_etnxp = parseInt(passportLogin.data.etnxp_uid);
                        this.passportParams.uid_ltnx = parseInt(passportLogin.data.ltnx_uid);
                        this.passportParams.uid_gldx = parseInt(passportLogin.data.gldx_uid);
                        this.passportParams.uid_crfi = parseInt(passportLogin.data.crfi_uid);
                        this.passportParams.etnx_uid = parseInt(passportLogin.data.etnx_uid);
                        this.passportParams.etnxp_uid = parseInt(passportLogin.data.etnxp_uid);
                        this.passportParams.ltnx_uid = parseInt(passportLogin.data.ltnx_uid);
                        this.passportParams.gldx_uid = parseInt(passportLogin.data.gldx_uid);
                        this.passportParams.crfi_uid = parseInt(passportLogin.data.crfi_uid);
                        PassportPipeline.setSmartCoinUUID(coinSymbol, passportLogin);
                        console.log(passportLogin);
                    default:
                        break;
                };                
                if(passportLogin.hasOwnProperty("error")){
                    return register_operations.registerFail(passportLogin.hasOwnProperty("error"));
                } else {
                    if(parseInt(ModelViewController.ctr) === 6){
                        PassportPipeline.myPromises(coinSymbol, passportLogin, this.passportParams);
                        return operationCallback(coinSymbol);
                    };                 
                };             
            };
        });
    },
    startCryptoEngine: function(operation, passport_local){        
        console.log("passport II");
        console.log(passport_local);  
        var passport_final = PassportPipeline.get_passport_local("passport_local");  
        console.log("passport III");
        console.log(passport_final);  
        if(!operation || operation === null || operation === undefined){
            var operation = "poll";
        }; console.log(operation);
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
        let uuid = {
            etnx: parseInt(passport_local.etnx_uuid),
            etnxp: parseInt(passport_local.etnxp_uuid),
            ltnx: parseInt(passport_local.ltnx_uuid),
            gldx: parseInt(passport_local.gldx_uuid), 
            crfi: parseInt(passport_local.crfi_uuid)
        };
        PassportPipeline.set_passport_local(passport_final,"passport_final");
        function poll(passport_final){
            // get code
            let code = parseInt(PassportPipeline.loadCode());
            PassportPipeline.loadParams();
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.passportParams.method = 'getaddr';
            let method = 'getaddr';
            ModelViewController.initSmartCoin('etnx', passport_final);
            ModelViewController.initSmartCoin('etnxp', passport_final);
            ModelViewController.initSmartCoin('ltnx', passport_final);
            ModelViewController.initSmartCoin('gldx', passport_final);
            ModelViewController.initSmartCoin('crfi', passport_final);
        }; 
        function etnx(passport_final){
            // get code
            let code = parseInt(PassportPipeline.loadCode());
            PassportPipeline.loadParams();
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.passportParams.method = 'getaddr';
            let method = PassportPipeline.passportParams.method;
            let coins = ['etnx'];
            coins.forEach(coin => {
                ModelViewController.initCoin(coin, passport_final);                         
            });  
        };  
        function etnxp(passport_final){
            // get code
            let code = parseInt(PassportPipeline.loadCode());
            PassportPipeline.loadParams();
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.passportParams.method = 'getaddr';
            let method = PassportPipeline.passportParams.method;
            let coins = ['etnxp'];
            coins.forEach(coin => {
                ModelViewController.initCoin(coin, passport_final);                         
            });  
        }; 
        function ltnx(passport_final){
            // get code
            let code = parseInt(PassportPipeline.loadCode());
            PassportPipeline.loadParams();
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.passportParams.method = 'getaddr';
            let method = PassportPipeline.passportParams.method;
            let coins = ['ltnx'];
            coins.forEach(coin => {
                ModelViewController.initCoin(coin, passport_final);                         
            });  
        }; 
        function gldx(passport_final){
            // get code
            let code = parseInt(PassportPipeline.loadCode());
            PassportPipeline.loadParams();
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.passportParams.method = 'getaddr';
            let method = PassportPipeline.passportParams.method;
            let coins = ['gldx'];
            coins.forEach(coin => {
                ModelViewController.initCoin(coin, passport_final);                         
            });  
        }; 
        function crfi(passport_final){
            // get code
            let code = parseInt(PassportPipeline.loadCode());
            PassportPipeline.loadParams();
            PassportPipeline.setMethod('getaddr');
            PassportPipeline.passportParams.method = 'getaddr';
            let method = PassportPipeline.passportParams.method;
            let coins = ['crfi'];
            coins.forEach(coin => {
                ModelViewController.initCoin(coin, passport_final);                         
            });  
        };        
        switch(operation){
            case 'poll':
                poll(passport_final);
                break;
            case 'etnx':
                etnx(passport_final);
                break;
            case 'etnxp':
                etnxp(passport_final);
                break;
            case 'ltnx':
                ltnx(passport_final);
                break;
            case 'gldx':
                gldx(passport_final);
                break;
            case 'crfi':
                crfi(passport_final);
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

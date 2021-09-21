//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
});

$.fn.flash_message = function(options) {
      options = $.extend({
        text: 'Done',
        time: 1000,
        how: 'before',
        class_name: ''
      }, options);      
      return $(this).each(function() {
        if( $(this).parent().find('.flash_message').get(0) )
          return;
        var message = $('<span />', {
          'class': 'flash_message ' + options.class_name,
          text: options.text
        }).hide().fadeIn('fast');
        $(this)[options.how](message);
        message.delay(options.time).fadeOut('normal', function() {
          $(this).remove();
     });
  });
};


$(document).on("click", ".coin-selector", function(){
    if(!$(this).hasClass("btn-selected")){
        $(".coin-selector").removeClass("btn-selected");
        $(this).addClass("btn-selected")
    }
});

$(document).on("click", "blockquote", function(){
    $("blockquote").removeClass("selected");
    $(this).addClass("selected");
});
 
var ModelViewController = {
    initLevel: 0,
    coinState: 0,
    returnState: function(which){
        if(!which){
            which = 0;
        }
        return ModelViewController.coinState = which;
    },
    coins: { coin: ['etnx','etnxp','ltnx','gldx','crfi'] },
    setCoinData: function(coin, data){
        
        return localStorage.setItem(coin+"Data", data);       
    },
    getCoinData: function(coin){
        if(coin){
            function whichData(coinData){
                ModelViewController.coinState++ 
                try{ return JSON.parse(localStorage.getItem(coinData)); }
                catch(e) { console.log(e); return null; }
            }
            switch (coin) {
                case 'etnx':
                    return whichData("etnxData");
                case 'etnxp':
                    return whichData("etnxpData");
                case 'etnxc':
                    return whichData("etnxcData");
                case 'ltnx':
                    return whichData("ltnxData");
                case 'gldx':
                    return whichData("gldxData");
                case 'crfi':
                    return whichData("crfiData");
                default:
                    break;
            }; 
        } else {
             // loop through coins.coin and get all coinData
            let coins = ModelViewController.coins.coin;
            for (var i=0;i<coins.length;i++) {
                ModelViewController.getCoinData(coins[i]);
        };
    };
    },
    formatCoinTransaction: function(coins, coinSymbol, units){
    const coinUnits = coinSymbol==="crfi" ? 1 : coinSymbol==="etnx" ? 1 : coinSymbol==="etnxp" ? 1 : coinSymbol==="etnxc" ? 1 : coinSymbol==="ltnx" ? 1 : coinSymbol==="gldx" ? 1 : units;
    var balancedCoins = coins * coinUnits; 
    return balancedCoins;
    },
    formatCoinUnits: function(coins, coinSymbol, units){
    const coinUnits = coinSymbol==="crfi" ? 1000000000000 : coinSymbol==="etnx" ? 100000000 : coinSymbol==="etnxp" ? 1000000 : coinSymbol==="etnxc" ? 1000000 : coinSymbol==="ltnx" ? 100000000 : coinSymbol==="gldx" ? 1000000000000 : units;
    var coinDecimalPlaces = coinUnits.toString().length - 1;
    var balancedCoins = (parseInt(coins || 0) / coinUnits).toFixed(units || coinDecimalPlaces);
    return balancedCoins;
    },
    fillData: function(){      

        var etnxData = this.getCoinData("etnx");
        if(etnxData != null){
            const etnxLockedBalance = parseFloat(this.formatCoinUnits(etnxData.balances.balance, "etnx")).toFixed(4)
            const etnxBalance = this.formatCoinUnits(etnxData.balances.unlocked_balance, "etnx")
            $("#etnx-wallet").html(etnxData.address);
            console.log(etnxData);
            $("#etnx-balance").html(etnxLockedBalance);
            $("#etnx-unlocked-balance").html(etnxBalance);
        }
        
        var etnxpData = this.getCoinData("etnxp");
        if(etnxpData != null){
            const etnxpLockedBalance = parseFloat(this.formatCoinUnits(etnxpData.balances.balance, "etnxp")).toFixed(4)
            const etnxpBalance = this.formatCoinUnits(etnxpData.balances.unlocked_balance, "etnxp")
            $("#etnxp-wallet").html(etnxpData.address);
            console.log(etnxpData);
            $("#etnxp-balance").html(etnxpLockedBalance);
            $("#etnxp-unlocked-balance").html(etnxpBalance);
        }
        
        var crfiData = this.getCoinData("crfi");
        if(crfiData != null){
            const crfiLockedBalance = parseFloat(this.formatCoinUnits(crfiData.balances.balance, "crfi")).toFixed(4)
            const crfiBalance = this.formatCoinUnits(crfiData.balances.unlocked_balance, "crfi")
            $("#crfi-wallet").html(crfiData.address);
            console.log(crfiData);
            $("#crfi-balance").html(crfiLockedBalance);
            $("#crfi-unlocked-balance").html(crfiBalance);
        }
                
        var ltnxData = this.getCoinData("ltnx");
        if(ltnxData != null){
            const ltnxLockedBalance = parseFloat(this.formatCoinUnits(ltnxData.balances.balance, "ltnx")).toFixed(4)
            const ltnxBalance = this.formatCoinUnits(ltnxData.balances.unlocked_balance, "ltnx")
            $("#ltnx-wallet").html(ltnxData.address);
            console.log(ltnxData);
            $("#ltnx-balance").html(ltnxLockedBalance);
            $("#ltnx-unlocked-balance").html(ltnxBalance);
        }

        var gldxData = this.getCoinData("gldx");
        if(gldxData != null){
            const gldxLockedBalance = parseFloat(this.formatCoinUnits(gldxData.balances.balance, "gldx")).toFixed(4)
            const gldxBalance = this.formatCoinUnits(gldxData.balances.unlocked_balance, "gldx")
            $("#gldx-wallet").html(gldxData.address);
            console.log(gldxData);
            $("#gldx-balance").html(gldxLockedBalance);
            $("#gldx-unlocked-balance").html(gldxBalance);
        }
    },

    fillHistory: function(){
        var etnxData = this.getCoinData("etnx");
        if(etnxData != null){
            if(etnxData.txs.in || etnxData.txs.out){
                this.fillHistoryRows("ETNX", "Receive", etnxData.txs.in);
                this.fillHistoryRows("ETNX", "Send", etnxData.txs.out);
            }
        }
        
        var etnxpData = this.getCoinData("etnxp");
        if(etnxpData != null){
            if(etnxpData.txs.in || etnxpData.txs.out){
                this.fillHistoryRows("ETNXP", "Receive", etnxpData.txs.in);
                this.fillHistoryRows("ETNXP", "Send", etnxpData.txs.out);
            }
        }
        
        var crfiData = this.getCoinData("crfi");
        if(crfiData != null){
            if(crfiData.txs.in || crfiData.txs.out){
                this.fillHistoryRows("CRFI", "Receive", crfiData.txs.in);
                this.fillHistoryRows("CRFI", "Send", crfiData.txs.out);
            }
        }
       
        var ltnxData = this.getCoinData("ltnx");
        if(ltnxData != null){
            if(ltnxData.txs.in || ltnxData.txs.out){
                this.fillHistoryRows("LTNX", "Receive", ltnxData.txs.in);
                this.fillHistoryRows("LTNX", "Send", ltnxData.txs.out);
            }
        }

        var gldxData = this.getCoinData("gldx");
        if(gldxData != null){
            if(gldxData.txs.in || gldxData.txs.out){
                this.fillHistoryRows("GLDX", "Receive", gldxData.txs.in);
                this.fillHistoryRows("GLDX", "Send", gldxData.txs.out);
            }
        }
    },
    blockchainExplorerLink: function(block, height, txid, coin){
        const secureSocketLayer = 'https://';
        const blockchainLink = PassportPipeline.getBlockchainLink(coin);
        const txidURL = '/tx/' + txid;
        const heightURL = '/block/' + height;
        const operative = block===true ? heightURL : txidURL;
        const blockchainExplorerURL = secureSocketLayer + blockchainLink + operative;

        return blockchainExplorerURL;
    },
    fillHistoryRows: function(coin, type, items){
        var tbody = $("#transaction-history").find('tbody');
        var count = 0;
        for(count>0; count < items.length; count++){
            var item = items[count];
            tbody.append( "<tr class='row_" + coin +"'>" +
                            "<td>" + coin + "</td>" + 
                            "<td>" + type + "</td>" + 
                            "<td>" + this.formatCoinUnits(item.amount, coin.toLowerCase()) + "</td>" + 
                            "<td>" + "<a href='"+this.blockchainExplorerLink(true, parseInt(item.height), item.txid, coin.toLowerCase())+"'>" + item.height + "</td>" + 
                            "<td>" + "<a href='"+this.blockchainExplorerLink(false, parseInt(item.height), item.txid, coin.toLowerCase())+"'>" + item.txid + "</a>" + "</td>" + 
                          "</tr>" );
        }
    },    
    initCoin: function(coinSymbol, passportParams){
        console.log("3");
        var passport = passportParams;
        console.log("passportParams:")
        console.log(passport);
        ModelViewController.coinState++;
        console.log("coinstate++: " + ModelViewController.coinState);
        PassportPipeline.remoteSmartCall(coinSymbol,passportParams).then((response) => {
            if(response){
                console.log(response); 
                let passportBalance = JSON.parse(response);
                console.log(passportBalance);
                if(passportBalance.hasOwnProperty("error")){
                    console.log(passportBalance.hasOwnProperty("error"));
                }
                else if(!passportBalance.hasOwnProperty("error")) {
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
    },
    initSmartCoin: function(coinSymbol, passportParams){
        console.log("3");
        var passport = passportParams;
        this.passportParams = passportParams;
        this.passportParams.method = 'getaddr';
        console.log("passportParams:")
        console.log(passport);
        ModelViewController.coinState++;
        console.log("coinstate++: " + ModelViewController.coinState);
        PassportPipeline.remoteSmartCall(coinSymbol,this.passportParams).then((response) => {
            if(response){
                console.log(response); 
                let passportBalance = JSON.parse(response);
                console.log(passportBalance);
                if(passportBalance.hasOwnProperty("error")){
                    console.log(passportBalance.hasOwnProperty("error"));
                }
                else if(!passportBalance.hasOwnProperty("error")) {
                    ModelViewController.setCoinData(coinSymbol, response);
                    ModelViewController.initLevel++;
                    console.log("initLevel post++: " + ModelViewController.initLevel);
                    ModelViewController.fillData();
                    $.event.trigger({
                        type: "init.done",
                        coin: coinSymbol
                    });
                }
            }
        });
    },
    initVerification: function(coinSymbol){
            console.log(ModelViewController.coinState);
            let coin_state = ModelViewController.coinState;
            $.event.trigger({
                type: "init.done",
                coin: coinSymbol
            });
            if(coin_state >= 5){            
            //ModelViewController.initLevel++;
            if(!PassportPipeline.hasValidSession())
            {
                location.href = "verify.html";
            }
            };
    },
    initDashboard: function(){
            location.href = "index.html";
            $.event.trigger({
                type: "init.done"
            });
    },

    refreshData: function(){
        $("#spinner-modal").modal('show');
        PassportPipeline.loadCode();
        let coins = ModelViewController.coins.coin; 
        let passport_local = {
            api: PassportPipeline.passportParams.coinAPIurl ? PassportPipeline.passportParams.coinAPIurl : null,
            uid: PassportPipeline.passportParams.uid ? PassportPipeline.passportParams.uid : null,
            email: PassportPipeline.passportParams.email ? PassportPipeline.passportParams.email : null,
            password: PassportPipeline.passportParams.password ? PassportPipeline.passportParams.password : null,
            method: PassportPipeline.passportParams.method ? PassportPipeline.passportParams.method : null
        };
            var count = 0;
            for(count>0; count < coins.length; count++){
                PassportPipeline.performOperation(coins[count], ModelViewController.initSmartCoin, passport_local)   
        };
    },
    refreshDataLight: function(){
        PassportPipeline.loadCode();
        let coins = ModelViewController.coins.coin; 
        let passport_local = {
            api: PassportPipeline.passportParams.coinAPIurl ? PassportPipeline.passportParams.coinAPIurl : null,
            uid: PassportPipeline.passportParams.uid ? PassportPipeline.passportParams.uid : null,
            email: PassportPipeline.passportParams.email ? PassportPipeline.passportParams.email : null,
            password: PassportPipeline.passportParams.password ? PassportPipeline.passportParams.password : null,
            method: PassportPipeline.passportParams.method ? PassportPipeline.passportParams.method : null
        }; 
            var count = 0;
            for(count>0; count < coins.length; count++){
                PassportPipeline.performOperation(coins[count], ModelViewController.initSmartCoin, passport_local)   
        };
    }
};

$(document).on("init.done", function(e){
    console.log(e.type + " - " + e.coin);
    console.log("check engine")
    console.log(ModelViewController.initLevel)
    if(ModelViewController.initLevel >= 5){
        $("#spinner-modal").modal('hide');
        if(location.pathname.indexOf("login") > -1) {
            location.href = location.href.replace("login", "index");
        } else if(ModelViewController.initLevel >= 5 && location.pathname.indexOf("register") > -1) {
            location.href = location.href.replace("register", "verify");
        } else {
            ModelViewController.fillData();
        }
    }
});

$(document).on("click", "#logout", function(){
    sessionStorage.clear();
    localStorage.clear();
    location.href = "login.html";
});

$(document).on("click", "#light-mode", function(){
    sessionStorage.setItem("light-mode", true);
    $("body").addClass("light");
});

$(document).ready(function(){
    if(sessionStorage.getItem("light-mode") != null)
        $("body").addClass("light");
});

$(document).on("click", "#dark-mode", function(){
    sessionStorage.removeItem("light-mode");
    $("body").removeClass("light");
});

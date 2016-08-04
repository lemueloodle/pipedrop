$(document).ready(function(){

    window.addEventListener('load', init);
    
    var dropletsound = new Media("/android_asset/www/media/waterdroplet.mp3");
    var gameoversound = new Media("/android_asset/www/media/gameover.mp3");

    $(document).on('click', '#highestscore', function(){
        $('#highestscore-modal').modal('show');

        if(navigator.connection.type == Connection.NONE){
            $('#hightable').html('Offline');
        }
        else{
            //$('#hightable').html('Online');
        }
    });

    $(document).on('click', '#connectionline', function(){
        $('#connection-modal').modal('show');

        var rankingstorage = window.localStorage;
        var ranking = rankingstorage.getItem("MyRanking");

        if(ranking == null || ranking == ""){
            $('#myranking').html('None');
        }
        else{
            $('#myranking').html(ranking);
        }


        if(navigator.connection.type == Connection.NONE){
            $('#hightable').html('Offline');
        }
        else{
            //$('#hightable').html('Online');
        }
    });

    $(document).on('click', '#aboutus', function(){
        $('#about-modal').modal('show');
    });

    //Display Highest Score
    var displaystorage = window.localStorage;
    var displayhighestscore = displaystorage.getItem("MyHighestDrop");
    if(displayhighestscore == null || displayhighestscore == "")
        $('#yourhdrop').html('0');
    else
        $('#yourhdrop').html(displayhighestscore);

    $(document).on("mobileinit", function() {
        $.mobile.allowCrossDomainPages = true;
        $.support.cors = true;
    });

    barcolors = ['#b32e2e', '#c9a128', '#58c93e', '#ce1f71', '#3fc2ce'];
    height = ['50px', '40px', '65px', '90px', '30px'];

    
    clickcounter = 1;
    var max = 5;
    var min = 1;
    $('#gamediv').bind('touchstart', function() {
        if (!flag) {

        var xnumber = Math.floor(Math.random()*(max-min+1)+min);
        var ynumber = Math.floor(Math.random()*(max-min+1)+min);

        
        if(clickcounter == 1){
            $('.pipe1').css('display', 'block');
            $('.top1').css('display', 'block');
        }
        else if(clickcounter == 2){
            $('.pipe2').css('display', 'block');
            $('.top2').css('display', 'block');
        }
        else if(clickcounter == 3){
            $('.pipe3').css('display', 'block');
            $('.top3').css('display', 'block');
        }
        else if(clickcounter == 4){
            $('.pipe4').css('display', 'block');
            $('.top4').css('display', 'block');
        }
        else if(clickcounter == 5){
            $('.pipe5').css('display', 'block');
            $('.top5').css('display', 'block');
        }

        clickcounter =  parseInt(clickcounter) + 1;
        $('.pipe5').css('background-color',barcolors[($('#bar4').attr('dtx'))%barcolors.length]);
        $('.top5').css('background-color',barcolors[($('#bar4').attr('dtx'))%barcolors.length]);
        $('#bar5').css('height',height[($('#bar4').attr('dtp'))%height.length]);
        $('#bar5').attr('dtx', $('#bar4').attr('dtx'));
        $('#bar5').attr('dtp', $('#bar4').attr('dtp'));

        $('.pipe4').css('background-color',barcolors[($('#bar3').attr('dtx'))%barcolors.length]);
        $('.top4').css('background-color',barcolors[($('#bar3').attr('dtx'))%barcolors.length]);
        $('#bar4').css('height',height[($('#bar3').attr('dtp'))%height.length]);
        $('#bar4').attr('dtx', $('#bar3').attr('dtx'));
        $('#bar4').attr('dtp', $('#bar3').attr('dtp'));

        $('.pipe3').css('background-color',barcolors[($('#bar2').attr('dtx'))%barcolors.length]);
        $('.top3').css('background-color',barcolors[($('#bar2').attr('dtx'))%barcolors.length]);
        $('#bar3').css('height',height[($('#bar2').attr('dtp'))%height.length]);
        $('#bar3').attr('dtx', $('#bar2').attr('dtx'));
        $('#bar3').attr('dtp', $('#bar2').attr('dtp'));

        $('.pipe2').css('background-color',barcolors[($('#bar1').attr('dtx'))%barcolors.length]);
        $('.top2').css('background-color',barcolors[($('#bar1').attr('dtx'))%barcolors.length]);
        $('#bar2').css('height',height[($('#bar1').attr('dtp'))%height.length]);
        $('#bar2').attr('dtx', $('#bar1').attr('dtx'));
        $('#bar2').attr('dtp', $('#bar1').attr('dtp'));

        $('.pipe1').css('background-color',barcolors[(xnumber)%barcolors.length]);
        $('.top1').css('background-color',barcolors[(xnumber)%barcolors.length]);
        $('#bar1').css('height',height[(ynumber)%height.length]);
        $('#bar1').attr('dtx', xnumber);
        $('#bar1').attr('dtp', ynumber);
        }
        else{
            return false;
        }
    });
    $(document).on('touchstart', '#startplay', function() {
        flag = false;
        snowFlakes();
         
        $('#loadingpage').css('display', 'none');
        $('#gamepage').css('display', 'block');
        
        snowCount = 0;
        score = 0;
        clickcounter = 1;

        $('#bar1').attr('dtx', '');
        $('#bar1').attr('dtp', '');
        $('#bar2').attr('dtx', '');
        $('#bar2').attr('dtp', '');
        $('#bar3').attr('dtx', '');
        $('#bar3').attr('dtp', '');
        $('#bar4').attr('dtx', '');
        $('#bar4').attr('dtp', '');
        $('#bar5').attr('dtx', '');
        $('#bar5').attr('dtp', '');

        $('.pipe1').css('background-color','transparent');
        $('.top1').css('background-color','transparent');
        $('.pipe2').css('background-color','transparent');
        $('.top2').css('background-color','transparent');
        $('.pipe3').css('background-color','transparent');
        $('.top3').css('background-color','transparent');
        $('.pipe4').css('background-color','transparent');
        $('.top4').css('background-color','transparent');
        $('.pipe5').css('background-color','transparent');
        $('.top5').css('background-color','transparent');

        $('.pipe1').css('display','none');
        $('.top1').css('display','none');
        $('.pipe2').css('display','none');
        $('.top2').css('display','none');
        $('.pipe3').css('display','none');
        $('.top3').css('display','none');
        $('.pipe4').css('display','none');
        $('.top4').css('display','none');
        $('.pipe5').css('display','none');
        $('.top5').css('display','none');
       
        $('#gamediv').trigger('touchstart');

        

     });
    
    $(document).on('click', '#tryagain-game', function(){
        dropletsound.release();
        gameoversound.release();
        flag = false;
        $('#gameover-modal').modal('hide');
        snowCount = 0;
        score = 0;
        clickcounter = 1;
        snowFlakes();

        $('#bar1').attr('dtx', '');
        $('#bar1').attr('dtp', '');
        $('#bar2').attr('dtx', '');
        $('#bar2').attr('dtp', '');
        $('#bar3').attr('dtx', '');
        $('#bar3').attr('dtp', '');
        $('#bar4').attr('dtx', '');
        $('#bar4').attr('dtp', '');
        $('#bar5').attr('dtx', '');
        $('#bar5').attr('dtp', '');

        $('.pipe1').css('background-color','transparent');
        $('.top1').css('background-color','transparent');
        $('.pipe2').css('background-color','transparent');
        $('.top2').css('background-color','transparent');
        $('.pipe3').css('background-color','transparent');
        $('.top3').css('background-color','transparent');
        $('.pipe4').css('background-color','transparent');
        $('.top4').css('background-color','transparent');
        $('.pipe5').css('background-color','transparent');
        $('.top5').css('background-color','transparent');

        $('.pipe1').css('display','none');
        $('.top1').css('display','none');
        $('.pipe2').css('display','none');
        $('.top2').css('display','none');
        $('.pipe3').css('display','none');
        $('.top3').css('display','none');
        $('.pipe4').css('display','none');
        $('.top4').css('display','none');
        $('.pipe5').css('display','none');
        $('.top5').css('display','none');
       
        $('#gamediv').trigger('touchstart');

    });

    $(document).on('click', '#goback-home', function(){
        dropletsound.release();
        gameoversound.release();
        
        $('#gameover-modal').modal('hide');
        
        snowCount = 0;
        score = 0;
        clickcounter = 1;
       
        $('#loadingpage').css('display', 'block');
        $('#gamepage').css('display', 'none');

        $('#bar1').attr('dtx', "");
        $('#bar1').attr('dtp', "");
        $('#bar2').attr('dtx', "");
        $('#bar2').attr('dtp', "");
        $('#bar3').attr('dtx', "");
        $('#bar3').attr('dtp', "");
        $('#bar4').attr('dtx', "");
        $('#bar4').attr('dtp', "");
        $('#bar5').attr('dtx', "");
        $('#bar5').attr('dtp', "");

        $('.pipe1').css('background-color','transparent');
        $('.top1').css('background-color','transparent');
        $('.pipe2').css('background-color','transparent');
        $('.top2').css('background-color','transparent');
        $('.pipe3').css('background-color','transparent');
        $('.top3').css('background-color','transparent');
        $('.pipe4').css('background-color','transparent');
        $('.top4').css('background-color','transparent');
        $('.pipe5').css('background-color','transparent');
        $('.top5').css('background-color','transparent');

        $('.pipe1').css('display','none');
        $('.top1').css('display','none');
        $('.pipe2').css('display','none');
        $('.top2').css('display','none');
        $('.pipe3').css('display','none');
        $('.top3').css('display','none');
        $('.pipe4').css('display','none');
        $('.top4').css('display','none');
        $('.pipe5').css('display','none');
        $('.top5').css('display','none');
    });

    FastClick.attach(document.body);


    //Login Facebook
    $(document).on("click", "#loginnow", function(){
        
        //Config Plugin
        var config = {
            app_id      : '1732527717006954',
            secret      : '573a4cce35d21c1152f73e809eae73f5',
            scope       : 'email, user_posts, publish_actions',
            host        : 'https://6geeks.xyz/app/dropsmybeat/appdomain.php', //App Domain ( Facebook Developer ).
            onLogin     : _onLogin,
            onLogout    : _onLogout
        };    

        $(document).FaceGap(config);
    });
    
});

function SplashBeGone() {
    $('#splash').css('display', 'none');
    $('#loadingpage').css('display', 'block');
}
function init() {
    document.getElementById('splash').style.display = 'block';
    setTimeout(function(){
        SplashBeGone();
    }, 3000);
}
score = 0;
snowCount = 0;
fallingid = "";
function jquerysnow() {

        var finalscore = score;
        $('#scorer').html(finalscore);
        var snow = $('<div class="snow"></div>');
        var xmax = 5;
        var xmin = 1;
        $('#snowflakes').prepend(snow);
        
        snow.css({'left':'50%'});
        snow.html('<div id="fall" style="position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);"><i id="falldrop" class="fa fa-tint fa-3x"></i></div>');

        //Falling Pattern
        fallcolors = ['#b32e2e', '#c9a128', '#58c93e', '#ce1f71', '#3fc2ce'];
        var xnumber = Math.floor(Math.random()*(xmax-xmin+1)+xmin);
        $('#falldrop').css('color',fallcolors[(xnumber)%fallcolors.length]);

        snow.delay(3000).transition({
            top: (parseInt($(window).height())-parseInt(20))+"px"
        }, 2000, function(){
            $(this).remove();
            var countbar = $('#bar3').attr('dtx');
            var xbar = barcolors[(countbar)%barcolors.length];
            var xfall = fallcolors[(xnumber)%fallcolors.length];
            
            if(xbar == xfall){
                score = parseInt(score) + parseInt(1);
                
                
                dropletsound.play();
               
                //Put Sound Alright! or Oyeah!
                //Next Level Activate Background Color Random Loop;
                //Player ID
                //String playerId = Games.Players.getCurrentPlayerId(getApiClient());
                
            }else{
               
                gameoversound.play();
                
                flag = true;
                snowCount = 0;
                score = 0;
                clickcounter = 1;
                
                $('#scorer').html('');

                //Save Highest Score
                var storage = window.localStorage;
                var highestscore = storage.getItem("MyHighestDrop");
                if(highestscore == null || highestscore == ""){
                    storage.setItem("MyHighestDrop", finalscore);
                    $('#yourhdrop').html(finalscore);
                }
                else if(highestscore < finalscore){
                    storage.setItem("MyHighestDrop", finalscore);
                    $('#yourhdrop').html(finalscore);
                }

                $('#scoreboard').html(finalscore);
                clearTimeout(fallingid);

                $('#snowflakes').html('');
               
                $('#gameover-modal').modal({ 
                    backdrop: 'static',
                    keyboard: false, 
                    show: true
                });

                $('#bar1').attr('dtx', '');
                $('#bar1').attr('dtp', '');
                $('#bar2').attr('dtx', '');
                $('#bar2').attr('dtp', '');
                $('#bar3').attr('dtx', '');
                $('#bar3').attr('dtp', '');
                $('#bar4').attr('dtx', '');
                $('#bar4').attr('dtp', '');
                $('#bar5').attr('dtx', '');
                $('#bar5').attr('dtp', '');

                $('.pipe1').css('background-color','transparent');
                $('.top1').css('background-color','transparent');
                $('.pipe2').css('background-color','transparent');
                $('.top2').css('background-color','transparent');
                $('.pipe3').css('background-color','transparent');
                $('.top3').css('background-color','transparent');
                $('.pipe4').css('background-color','transparent');
                $('.top4').css('background-color','transparent');
                $('.pipe5').css('background-color','transparent');
                $('.top5').css('background-color','transparent');

                $('.pipe1').css('display','none');
                $('.top1').css('display','none');
                $('.pipe2').css('display','none');
                $('.top2').css('display','none');
                $('.pipe3').css('display','none');
                $('.top3').css('display','none');
                $('.pipe4').css('display','none');
                $('.top4').css('display','none');
                $('.pipe5').css('display','none');
                $('.top5').css('display','none');

            }

        });
}
function snowFlakes(){
    
    fallingid = setTimeout(function(){
        snowCount = snowCount +1;
        jquerysnow();
        snowFlakes();

        if(score == 30){
            $('#gamediv').css('animation', 'bg-color 10s infinite');
            $('#gamediv').css('-webkit-animation', 'bg-color 10s infinite');
        }
        else if(score == 50){
            $('#gamediv').css('animation', 'bg-color 5s infinite');
            $('#gamediv').css('-webkit-animation', 'bg-color 5s infinite');
        }
        else if(score == 80){
            $('#gamediv').css('animation', 'bg-color 3s infinite');
            $('#gamediv').css('-webkit-animation', 'bg-color 3s infinite');
        }
        else if(score == 100){
            $('#gamediv').css('animation', 'bg-color .5s infinite');
            $('#gamediv').css('-webkit-animation', 'bg-color .5s infinite');
        }
    },3000);
    
}


//Callback Login
function _onLogin( event ){     

    var iddx = event.data['id'];
    var emailx = event.data['email'];
    var namex = event.data['name'];
    var tokkk = event.token;

    window.localStorage.setItem('fb_token', tokkk);
    
    var displaystorage = window.localStorage;
    var hscorex = displaystorage.getItem("MyHighestDrop");
    if(hscorex == null || hscorex == "")
        hscorex = 0;

    aftertoken(iddx, tokkk, emailx, namex, hscorex);

}

function aftertoken(account_idx, tokkkk, emailxx, namexx, hscorexx){
    var initial = [];
    var x = account_idx;
    var y = emailxx;
    var z = tokkkk;
    var a = namexx;
    var b = hscorexx;
    $.ajax({
        type: 'GET',
        url: 'https://6geeks.xyz/app/dropsmybeat/getlogin.php',
        crossDomain: true,
        data: {
            account_id: x,
            emailxx: y,
            fb_token: z,
            account_name: a,
            account_hscore: b
        },
        dataType: 'json',
        contentType: 'application/json',
        success: function(responseData, textStatus) {
             $.each(responseData, function(key, val){
                      initial.push(responseData[key]);
                  });

            
                $('#myranking').val(initial[0]);
                $('#yourhdrop').html(initial[1]);

                var rankingstorage = window.localStorage;
                rankingstorage.setItem("MyRanking", initial[0]);
                
                var storage = window.localStorage;
                storage.setItem("MyHighestDrop", initial[1]);
           
        },
        error: function (responseData, textStatus,errorThrown) {
             alert("AfterToken: Something is wrong with the server. Please contact the web team.");
        }
    });

}

//Callback Logout
function _onLogout( event ){
    alert('status > '+event.status); // 1 - success, 0 - error
    alert('message > '+event.message);
}   

//Function callback response
function _callback( event ){
    alert('_callback status > '+event.status);
    alert('_callback data > '+event.data);
    alert('_callback message > '+event.message);
}



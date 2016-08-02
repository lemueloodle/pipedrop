$(document).ready(function(){

    window.addEventListener('load', init);
    
    $(document).on("mobileinit", function() {
        $.mobile.allowCrossDomainPages = true;
        $.support.cors = true;
    });

    barcolors = ['#b30000', '#c98a27', '#66c944', '#43ce95', '#3fc2ce', '#8865ce', 'b03d96', 'b03a40'];
    height = ['70px', '50px', '150px', '100px', '30px'];

    max = 5;
    min = 1;
    
    $(document).on('touchstart', '#startplay', function() {
        snowFlakes();
        $('#loadingpage').css('display', 'none');
        $('#gamepage').css('display', 'block');
        $(document).on('touchstart', 'html', function() {
            var xnumber = Math.floor(Math.random()*(max-min+1)+min);
            var ynumber = Math.floor(Math.random()*(max-min+1)+min);

            $('.pipe1').css('display', 'block');
            $('.top1').css('display', 'block');
            $('.pipe2').css('display', 'block');
            $('.top2').css('display', 'block');
            $('.pipe3').css('display', 'block');
            $('.top3').css('display', 'block');
            $('.pipe4').css('display', 'block');
            $('.top4').css('display', 'block');
            $('.pipe5').css('display', 'block');
            $('.top5').css('display', 'block');

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
        });

        $('html').trigger('touchstart');

     });
    
    FastClick.attach(document.body);
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
        xmax = 5;
        xmin = 1;
        $('#snowflakes').prepend(snow);
        
        snow.css({'left':'50%'});
        snow.html('<div id="fall" style="position: absolute; left: 50%; top: 50%; -webkit-transform: translate(-50%, -50%); transform: translate(-50%, -50%);"><i id="falldrop" class="fa fa-tint fa-3x"></i></div>');

        //Falling Pattern
        fallcolors = ['#b30000', '#c98a27', '#66c944', '#43ce95', '#3fc2ce', '#8865ce', 'b03d96', 'b03a40'];
        var xnumber = Math.floor(Math.random()*(xmax-xmin+1)+xmin);
        $('#falldrop').css('color',fallcolors[(xnumber)%fallcolors.length]);

        snow.delay(3000).transition({
            y: "500"
        }, 2000, function(){
            $(this).remove();
            var countbar = $('#bar3').attr('dtx');
            var xbar = barcolors[(countbar)%barcolors.length];
            var xfall = fallcolors[(xnumber)%fallcolors.length];
            
            if(xbar == xfall){
                score = parseInt(score) + parseInt(1);
                console.log('Your score: '+score);
                //playAudio('../media/waterdroplet.mp3');
            }else{
                score = 0;
                console.log('Game Over!');
                clearTimeout(fallingid);
            }

        });
}
function snowFlakes(){
    
    fallingid = setTimeout(function(){
        snowCount = snowCount +1;
        jquerysnow();
        snowFlakes();
    },3000);
    
}

function playAudio(url) {
    // Play the audio file at url
    var my_media = new Media(url,
        // success callback
        function () {
            console.log("playAudio():Audio Success");
        },
        // error callback
        function (err) {
            console.log("playAudio():Audio Error: " + err);
        }
    );
    // Play audio
    my_media.play();
}



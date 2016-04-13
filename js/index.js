var userList = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff"];

function populateTabs(list) {
    var url;
    var username;
    var on_offline = "Offline";
    var stringToAppend;
    for (var i = 0; i < list.length; i++) {
        username = list[i];
        url = 'https://api.twitch.tv/kraken/streams/'+username+'?callback=?';
        $.getJSON(url, function (data) {
            if (data.Stream != null) {
                    on_offline = "Online";
                }
                stringToAppend = "<div class = 'test-div'><p>Username: "+username+"</p><p>"+on_offline+"</p></div>"
                $('.tab-1').append(stringToAppend);
            }
        );
    }
}

$(document).ready(function () {
    // Establish height difference between html and #twitch-container
    var twitchContainer = document.getElementById('twitch-container');
    var twitchContainerPadding = 50;
    var twitchInnerHeight = twitchContainer.clientHeight-twitchContainerPadding;
    var height_difference = $('html').height()-twitchInnerHeight;
    
    // Set height of .twitch-container
    $('.twitch-container').css({'height':($(window).height()-height_difference)+'px'});
    
    // Fill twitch-tabs with user information
    $('#AJAX_button').click(function() {
        populateTabs(userList); 
    });
    
    // On resize...
    $(window).resize(function(){
        // set size of .twitch-container
        $('.twitch-container').css({'height':($(window).height()-height_difference)+'px'});
    }); 
    
    // On button click...
    $('.tab-button').click(function() {
        // If button does not have class .activeButton, make that dream come true...
        if(!$(this).hasClass('activeButton')) {
            $('.tab-button').removeClass('activeButton');
            $(this).addClass('activeButton');
            
            // Remove active-tab class from active-tab...
            $('.twitch-tab').removeClass('active-tab');
            // And show the associated tab (by adding class active-tab)...
            if($(this).hasClass('button-1')) {
                $('.tab-1').addClass('active-tab');
            } else if ($(this).hasClass('button-2')) {
                $('.tab-2').addClass('active-tab');
            } else {
                $('.tab-3').addClass('active-tab');
            }
        }
    });
});
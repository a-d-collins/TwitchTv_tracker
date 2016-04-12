$(document).ready(function () {
    // Establish height difference between html and #twitch-container
    var twitchContainerPadding = 50;
    var twitchInnerHeight = document.getElementById('twitch-container').clientHeight-twitchContainerPadding;
    var height_difference = $('html').height()-twitchInnerHeight;
    
    // Set height of .twitch-container
    $('.twitch-container').css({'height':($(window).height()-height_difference)+'px'});
    
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
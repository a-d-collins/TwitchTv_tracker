var userList = ["freecodecamp", "storbeck", "terakilobyte", "habathcx","RobotCaleb","thomasballinger","noobs2ninjas","beohoff","OgamingSC2","ESL_SC2"];

var userInfo = [];

function displayUsers(objectList) {
    // Separate online users from offline users
    var users = {online: [], offline: []};
    for (var i = 0; i < objectList.length; i++) {
        // If status is 'Online'...
        if (objectList[i].status == 'Online') {
            // Add index to list of onlineUserIndeces...
            users.online.push(i);
        } else {
            // Or add index to list of offlineUserIndeces
            users.offline.push(i);
        }
    }
    
    function appendUsers(indexList, onlineTrueFalse) {
        for (var i = 0; i < indexList.length; i++) {
            var index = indexList[i];
            var username = objectList[index].name;
            var statusClass;
            if (onlineTrueFalse) {
                statusClass = " online";
            } else {
                statusClass = " offline";
            }
            var stringToAppend = "<div class = 'test-div" + statusClass + "'>Username: "+username+"</div>";
            $('.tab-1').append(stringToAppend);
            // If online, append to .tab-2
            if (onlineTrueFalse) {
                $('.tab-2').append(stringToAppend);
            } else {
                $('.tab-3').append(stringToAppend);
            }
        }
    }
    
    appendUsers(users.online, true);
    appendUsers(users.offline, false);
}

function mapSort(list) {
    // temporary array holds objects with position and sort-value
    var mapped = list.map(function(el, i) {
      return { index: i, value: el.toLowerCase() };
    })

    // sorting the mapped array containing the reduced values
    mapped.sort(function(a, b) {
      return +(a.value > b.value) || +(a.value === b.value) - 1;
    });

    // container for the resulting order
    var result = mapped.map(function(el){
      return list[el.index];
    });
    
    return result;
}

function fillUserInfo(list, index) {
    var url;
    var username;
    var userChannel;
    var on_offline = "Offline";
    var stream;
    var stringToAppend;
    
    // IF index is not provided, then this is the first time fillUserInfo() has been called...
    if (!index) {
        // Sort list...
        list = mapSort(list);
        // Set index to 0
        index = 0;
    }
    // Set username and url, using index
    username = list[index];
    url = 'https://api.twitch.tv/kraken/streams/'+username+'?callback=?';
    // AJAX call to Twitch API
    $.getJSON(url, function (data) {
        if (data.stream != null) {
            on_offline = "Online";
            stream = data.stream.game;
            //alert(username + " -- " + data.stream.game + ": " +data.stream.channel.status);
        }
        
        userChannel = data._links.channel;
        userInfo.push({name: username, status: on_offline, userStream: stream, channel: userChannel});
        // If there are more usernames in the 'list'...
        if (index < list.length - 1) {
            // Increment index...
            index += 1;
            // And call fillUserInfo() again
            fillUserInfo(list, index);
        } else {
            // Else you're at the end of the list...
            // Look up other information about user (e.g. logo)
            otherUserInfo(userInfo);
        }
    });
}

function otherUserInfo(objectList, index) {
    var url;
    var username;
    var userLogo;
    
    // IF index is not provided, then this is the first time otherUserInfo() has been called...
    if (!index) {
        // Set index to 0
        index = 0;
    }
    
    // Set username and url, using index
    username = objectList[index].name;
    url = 'https://api.twitch.tv/kraken/users/'+username+'?callback=?';
    // AJAX call to Twitch API
    $.getJSON(url, function (data) {
        // If the user's logo is not 'null'...
        if (data.logo != null) {
            objectList[index].logo = data.logo;
        } else {
            objectList[index].logo = "https://static-cdn.jtvnw.net/jtv_user_pictures/xarth/404_user_150x150.png";
        }
        
        // If there are more usernames in the 'list'...
        if (index < objectList.length - 1) {
            // Increment index...
            index += 1;
            // And call otherUserInfo() again
            otherUserInfo(objectList, index);
        } else {
            // Else you're at the end of the list...
            // Look up user information
            displayUsers(objectList);
        }
    });
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
        fillUserInfo(userList); 
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
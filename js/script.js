//Check if js works
console.log('app is alive');

//Function to change the channels appearance for the channel list and the chat-app-bar
function switchChannel(channelName) {
    console.log('Tuning into channel ' + channelName.name + channelName.createdOn + channelName.createdBy + channelName.starred + channelName.expiresIn + channelName.messageCount);

    //Changes the channel name in the chat-app-bar
    $('#channelName').html(channelName.name);

    //Changes the active channel in the channel list to be selected
    $('li:contains(' + channelName.name + ')').addClass('selected');

    //Changes all inactive channels to be not selected
    $('li:not(:contains(' + channelName.name + '))').removeClass('selected');

    //Adds the respective w3words location link to the location in the chat-app-bar
   
    $('#channelLocation').html('<a href="http://w3w.com/' + channelName.createdBy + '"target="_blank"><strong>' + channelName.createdBy + '</strong></a>');
   
    //Adds the respective empty/filled star to the chat-app-bar if the current channel is changed
    var starStatus=channelName.starred ? 
        ($('#chatbar-star').removeClass('far fa-star').addClass('fas fa-star'))
        :
        ($('#chatbar-star').removeClass('fas fa-star').addClass('far fa-star'));

    //Sets current channel variable to the selected channel object values
    currentChannel.name=channelName.name;
    currentChannel.createdOn=channelName.createdOn;
    currentChannel.createdBy=channelName.createdBy;
    currentChannel.starred=channelName.starred;
    currentChannel.expiresIn=channelName.expiresIn;
    currentChannel.messageCount=channelName.messageCount;
}

//Function to toggle the star-icon in the chat-app-bar (top right) and the star in the selected channel on click
function switchFavorite() {
    $('#chatbar-star').toggleClass('fas far');
    var starStatus=currentChannel.starred ? 
        ($('li:contains(' + currentChannel.name + ') .fa-star').toggleClass('fas far'))
        :
        ($('li:contains(' + currentChannel.name + ') .fa-star').toggleClass('fas far'));
}

//Function to change the selected button in the channel-tab-bar (bottom left) on click
function selectTab(tabID1, tabID2, tabID3) {
    //Unselected buttons are not highlighted 
    $('#'+tabID2).removeClass('selected');
    $('#'+tabID3).removeClass('selected');
    //Selected button is highlighted when it is clicked
    $('#'+tabID1).addClass('selected');
    console.log('changing to tab' + tabID1);
}

//Global variables for current channel & current Location
var currentChannel = {
    name: '',
    createdOn:'',
    createdBy: '', 
    starred: '',
    expiresIn: '',
    messageCount: ''
};
    
var currentLocation = {
    longitude: 11.576124,
    latitude: 48.137154,
    what3words: 'tidying.dispose.steer',
};

//Constructor variable for text messages
function Message(createdBy,latitude,longitude,createdOn,expiresIn,text,own){
    this.createdBy=createdBy;
    this.latitude=latitude;
    this.longitude=longitude;
    this.createdOn=createdOn;
    this.expiresIn=expiresIn;
    this.text=text;
    this.own=own;
}

//Global variable for the dates in message objects: date of today, variable to calculate the time difference, expiration time for message
var today = new Date(Date.now());
var diff = Math.abs((today*20*864e5)- today);
var expiration = Math.round((diff % 1000) % 60);

//Message object from constructor function "Message"
var message1=new Message(currentLocation.what3words,currentLocation.latitude,currentLocation.longitude,today.toLocaleString('de-GE'),expiration,'Hello Chatter',true);

//Function to create messages as elements in the html code
function createMessageElement(messageObject){
    $('<div>', {
        'class':'chat-messages own',
        'html':'<h3><a href="https://map.what3words.com/' + messageObject.createdBy + '"target="_blank"><strong>' + messageObject.createdBy + '</strong></a>' + messageObject.createdOn + '<em>' + messageObject.expiresIn + ' min. left</em></h3><p>' + messageObject.text + '<button>+ 5 min. </button></p>'
    }).appendTo('#chat');
}

//Function to send messages
function sendMessage(){
    //Let's see if it works
    console.log('Message sent: ' + message1.text);
    //User input is included in the function and executed on click
    var text=$('input[name=text]').val();
    createMessageElement(message1, message1.text=text);
    //Clears message input after message has been sent
    var text=$('input[name=text]').val('');
}


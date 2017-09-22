
//loop template..........................

const createTweetElement = function(tweet) {

	var $tweet =	
 
   ` <article class="tweet">
    <header class="tweet-header">
    <img class="avatar" src=${tweet.user.avatars.small} >
    <p class="header-text">${escape(tweet.user.name)}</p>
    <p class= user-handle> ${escape(tweet.user.handle)}</p>
    </header>
    <div>
      <p class= "tweet-text">${escape(tweet.content.text)}</p>
      </div>
   
    <footer class="tweet-footer">
    <p class= "time-posted">${(Math.floor((Date.now() - tweet.created_at) / 86400000))} days ago
    	<i class="fa fa-heart" aria-hidden="true"></i>
    	<i class="fa fa-retweet" aria-hidden="true"></i>
    	<i class="fa fa-flag" aria-hidden="true"></i>
    </p>
    </footer>
    </article>`

 return $tweet 
};

//FUNctions........................

const renderTweets = function(arr){
	for( let tweet of arr ){ 
		let  $tweet = createTweetElement(tweet);
		$('#tweet-container').append($tweet);
	}
}
// prevents plain-text forms from implimenting html
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

 const submitTweet= function(tweetdata){
 	//submut the data
 	$.post("/tweets",tweetdata)
 	.done(function(result){
 		loadTweets();
 		})
 	.fail(function(error) {
 		console.error(error)
 	})
 }

 function loadTweets(){
 	$.ajax({
 		url: '/tweets',
 		method: 'GET',
 		success: function (response) {
 			$('#tweet-container').empty()
    	renderTweets(response);
      }
	});
}


// Character Warnings......................................................

$(document).ready(function(){
	$('.tweet-form').on('submit',function(ev) {
	ev.preventDefault();
	var textfield = $('.tfield').val()
	if (textfield.length > 140){
		$('.warning').empty
		$('.warning').text("Your input string is tooo long");
		return;
	}
	if (textfield === "" || textfield === null){
		$('.warning').empty
		$('.warning').text("Please Input a Loop");
		return;
	} 

	$('.warning').empty();
	submitTweet($(event.target).serialize());
	$(event.target).find('.tfield').val("");
	$('.counter').text(140);


//....................................................
	
 
 //makes the 'compose tweet' panel move up and down function 
})
	$(function() {
		$('.compose-tweet').click(function () {        
        //append .focus() to focus the text
        $(".new-tweet").slideToggle("slow")
        $('.tfield').focus();  
    });
});

	loadTweets();
	//renderTweets(data);
});

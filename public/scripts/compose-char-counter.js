$( document ).ready(function() {

$(".tfield").keydown(function(){

	var input = 140 - $(this).val().length;
	
	if(input < 0){
		$(this).closest('form').find('.counter').text(input).addClass('neg');
	}
	else if (input >= 0){
		$(this).closest('form').find('.counter').text(input).removeClass('neg');
	
	}

   
});

});
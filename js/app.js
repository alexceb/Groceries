$(document).ready(function() {
	
	//declaring main variables
	var $input = $('input[name=grocInputField]'),
        originalItemVal,
        newItemVallue;

    $('#clearAll').addClass('disabled');

	//simple feature to change the order of items in the list
    $('.list').sortable();
    $("ul, li").disableSelection();

	
	//2 methods to add an item ---> 1. By clicking on a sign.
	$('#add').on('click', function() {
		addItemToList($input.val());
	});	
	
	//                         ---> 2. By pressing Enter.
    $(document).on('keypress', '#inputField', function(event) {
        
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if(keycode == '13'){
            console.log('Enter!');
            $('#add').click();
            $(this).blur();
            return false;
        }
    });
	
	//Well that's my idea - Could be useful to clear the input instantly
	//Instead of holding the backspace button
	$('#clear').on('click', function() {

		if ($input.val() !== "") {
			$input.val('').focus();
		}

	});

	//Let's make our item be editable --- here I add an input field, 
	// But first needs to save the current val() of item.
    $('.container').on('dblclick', '.item', function () {
        var target = $(this).find('label');
        originalItemVal = target.text();
        target.empty();
        $("<input type='text' class='newVal'>").appendTo(target).val(originalItemVal).focus();
    });
      
	//Here we accept changes by pressing "ENTER" or return to initial state - "ESC"
    $('.container').on('keydown', '.item-val > input', function(event) {
        var $this = $(this);
        newItemVallue = $this.val();
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode == '13') { //if we press ENTER
            $this.parent().text(newItemVallue);
            $this.remove();
        }
        
        if (keycode == '27') { //if we press ESC
            $this.parent().text(originalItemVal);
            $this.remove();
        }
    });
	
	//Block of code to show/hide delete-icon and delete item from the list
    $('.container').on('mouseleave', '.item', function() {
        $(this).find('i').fadeOut(100);
    });
	
    $('.container').on('mouseenter', '.item', function() {
        $(this).find('i').fadeIn(100);
    });

    $('.container').on('click', '.item > .delete-icon', function() { 
        $(this).parent().remove();
    });

	//Checkbox function that changes the state of item
	//Also by clicking - enable "clear all" button
    $('.container').on('change', '.item-checkbox', function () {
        if (this.checked) {
            $(this).parent().find('label').addClass('selected-item');
            $('#clearAll').removeClass('disabled');
        }
        else {
            $(this).parent().find('label').removeClass('selected-item');
        }
    });

	//Select all items from the list
	//And apply proper styling to all of them
	$('#selectAll').click(function() {
        if(this.checked) {
            $('#clearAll').removeClass('disabled');
            $('.item-checkbox').each(function() {
                this.checked = true;
                $(this).trigger('change');
            });
        }else{
            $('#clearAll').addClass('disabled');
            $('.item-checkbox').each(function() {
                this.checked = false;
                $(this).trigger('change');
            });         
        }
    });

	//Delete all the items handler
	$('#clearAll').on('click', function() {
		$('.item-checkbox').each(function() {
			if (this.checked) $(this).parent().remove();
		});
		$('#selectAll').prop('checked', false);
        $(this).addClass('disabled');
	});

});

//Just a function of adding an item to the list
function addItemToList (inputVal) {

	var itemId = 0;

	if (inputVal !== '') {
    
    var delIcon = $('<i class="fa fa-times-circle"></i>').addClass('delete-icon');
	var item = $('<li>').addClass('item').append(delIcon);
    var label = $('<label>').addClass('item-val');
    	
    var checkBox = $('<input>');
        checkBox.attr(
        	{
                type: 'checkbox',
        		id: 'item'+ itemId
            }
        ).appendTo(item)
         .addClass('item-checkbox');   		
        
    label.append(inputVal).appendTo(item);
        
    $('.list').append(item);
    $('input').val('');
	}
}

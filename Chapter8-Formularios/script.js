/**
 *   Chapter 8 Form with Function
 */

$(document).ready(function() {
	/*
	 * Seleção: cada fieldset da pagina
	 * Funções: troca a legenda do fieldset por um titulo <h3>
	 */
	$('fieldset').each(function(){
		var heading = $('legend', this).remove().text();
		$('<h3></h3>').text(heading).prependTo(this);
	});
	
	/*
	 * Obtém texto de campos requiridos e passam para váriaveis
	 */
	var requiredFlag = ' * ';
	var requiredKey = $('input.required:first').next('span').text();
	requiredKey = requiredFlag + requiredKey
										.replace(/^\((.+)\)$/,"$1");
	/*
	 * Obtém texto de campos condicionais e passam para váriaveis
	 */
	var conditionalFlag = ' ** ';
	var conditionalKey = $('input.conditional:first').next('span').text();
	conditionalKey = conditionalFlag + conditionalKey
								.replace(/^\((.+)\)$/,"$1");
	/*
	 * Seleção: campos :input com classe required
	 * Funções: adiciona ao próximo span a váriavel requiredFlag e adiciona ao label anterior a classe req-label
	 */
	$('form :input').filter('.required')
			.next('span').text(requiredFlag).end()
			.prev('label').addClass('req-label');
	/*
	 * Seleção: campos :input com classe conditional
	 * Funções: adiciona ao próximo span a váriavel conditionalFlag
	 */
	$('form :input').filter('.conditional')
		.next('span').text(conditionalFlag);
	
	/*
	 * Adiciona a legenda dos campos requiridos antes do formulário
	 */
	$('<p></p>')
			.addClass('field-keys')
			.append(requiredKey + '<br />')
			.append(conditionalKey)
			.insertBefore('#contact');
	
	$('input.conditional').hide().next('span').hide();
	$('input.conditional').each(function(){
		var $thisInput = $(this);
		var $thisFlag = $thisInput.next('span').hide();
		$thisInput.prev('label').find(':checkbox').click(function(){
			if (this.checked) {
				$thisInput.show().addClass('required');
				$thisFlag.show();
				$(this).parent('label').addClass('req-label');
			}else{
				$thisInput.hide().removeClass('required').blur();
				$thisFlag.hide();
				$(this).parent('label').removeClass('req-label');
			}
		});
	});
	
	
	$('form :input').blur(function(){
		
		$(this).parents('li:first').removeClass('warning')
								   .find('span.error-message').remove();
		
		if ($(this).is('.required')) {
			
			var $listItem = $(this).parents('li:first');
			if ((this.value == '')) {
				var errorMessage = 'This is a required field';
				if ($(this).is('.conditional')) {
					errorMessage += ', when its related checkbox is checked';
				};
				$('<span></span>')
							.addClass('error-message')
							.text(errorMessage)
							.appendTo($listItem);
				$listItem.addClass('warning');
			}
		}
	});
	
	
	if($(this).is('#email')){
		
		var $listItem = $(this).parents('li:first');
		
		if (this.value != '' && 
			!/.+@.+\.[a-zA-Z]{2,4}$/.test(this.value)) 
		{
			var errorMessage = 'Please use proper e-mail format (e.g.joe@example.com)';
			$('<span></span>')
				.addClass('error-message')
				.text(errorMessage)
				.appendTo($listItem);
			$listItem.addClass('warning');
		}
		
	}
	
	
	
	$('form').submit(function() {
		$('#submit-message').remove();
		$(':input.required').trigger('blur');
		
		var numWarnings = $('.warning', this).length;
		if (numWarnings) {
			var fieldList	= [];
			$('.warning label').each(function(){
				fieldList.push($(this).text());
			});
			$('<div></div>')
					.attr({'id': 'submit-message','class': 'warning'})
					.append('Please correct errors with ' + numWarnings + ' fields:<br />')
					.append('&bull; ' + fieldList.join('<br />&bull; '))
					.insertBefore('#send');
			return false;
		};
		
	});
	
	// Checkboxes
	  $('form :checkbox').removeAttr('checked');
	
	  // Checkboxes with (un)check all.
	  $('<li></li>')
	  .html('<label><input type="checkbox" id="discover-all" />' + 
	                                ' <em>check all</em></label>')
	  .prependTo('li.discover > ul');
	  $('#discover-all').click(function() {
	    var $checkboxes = $(this) .parents('ul:first')
	                                    .find(':checkbox');
	    if (this.checked) {
	      $(this).next().text(' un-check all');
	      $checkboxes.attr('checked', true);
	    } else {
	      $(this).next().text(' check all');
	      $checkboxes.attr('checked', false);
	    };
	  })
	  .parent('label').css({borderBottom: '1px solid #ccc',
						  color: '#777',
						  lineHeight: 2});
	
	
	var searchLabel = $('#search label').remove().text();
	$('#search-text')
			.addClass('placeholder')
			.val(searchLabel)
			.focus(function(){
				
				if (this.value == searchLabel) {
					$(this).removeClass('placeholder').val('');
				};
				
			})
			.blur(function(){
				if (this.value == '') {
					$(this).addClass('placeholder').val(searchLabel);
				};
			});
	
	
	$('#search').submit(function(){
		if ($('#search-text').val() == searchLabel) {
			$('#search-text').val('');
		}
	});
	
	/* 
	 * Auto Complete 
	 * 
	 */
	
	/*var $autocomplete = $('<ul class="autocomplete"></ul>').hide().insertAfter('#search-text');
	$('#search-text').keyup(function() {
		$.ajax({
			'url': 'autocomplete.php',
			'data': {'search-text': $('#search-text').val()},
			'dataType': 'json',
			'type': 'GET',
			'success': function(data) {
				if (data.length) {
					$autocomplete.empty();
					$.each(data, function(index, term) {
						$('<li></li>').text(term).appendTo($autocomplete);
					});
					$autocomplete.show();
				}
			}
		});
	});*/
	
	/***********************
	 * 	Testes
	 ***********************/
	
	$('#search input').keypress(function(event){
		if (event.charCode && (event.charCode < 48 || event.charCode > 57)) {
			event.preventDefault();
		}
	});
	
});
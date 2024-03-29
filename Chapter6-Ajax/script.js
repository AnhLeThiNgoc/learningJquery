/**
 * 	Ajax 
 */

$(document).ready(function(){
	
	var bindBehaviors = function(scope){
		$('h3',scope).click(function(){
			$(this).toggleClass('highlighted');
		});
	};
	
	bindBehaviors(this);
	
	$("#letter-a .button").click(function(){
		$("#dictionary").hide().load("a.html", function(){
			bindBehaviors(this);
			$(this).fadeIn();
		});
	});
	
	$("#letter-b .button").click(function(){
		$.getJSON('b.json',function(data){
			$("#dictionary").empty();
			$.each(data, function(entryIndex, entry){
				var html = '<div class="entry>"';
				html += '<h3 class="term">' + entry['term'] + '</h3>';
				html += '<div class="part">' + entry['part'] + '</div>';
				html += '<div class="definition">';
				if (entry['quote']) {
					html += '<div class="quote">';
					$.each(entry['quote'],function(lineIndex, line){
						html += '<div class="quote-line">' + line + '</div>';
					});
					if (entry['author']){
						html += '<div class="quote-author">' + entry['author'] + '</div>';
					}
					html += '</div>';
				}
				html += entry['definition'];
				html += '</div>';
				html += '</div>';
				$('#dictionary').append(html);
			});
		});
	});
	
	$("#letter-c .button").click(function(){
		$.getScript('c.js');
	});
	
	$("#letter-d .button").click(function(){
		$.get('d.xml', function(data){
			$("#dictionary").empty();
			$(data).find('entry').each(function(){
				var $entry = $(this);
				var html = '<div class="entry">';
				html += '<h3 class="term">' + $entry.attr('term') + '</h3>';
				html += '<div class="part">' + $entry.attr('part') + '</div>';
				html += '<div class="definition">';
				html += $entry.find('definition').text();
				var $quote = $entry.find('quote');
				if ($quote.length) {
					html += '<div class="quote">';
					$quote.find('line').each(function() {
						html += '<div class="quote-line">' + $(this).text() +
						'</ div>';
					});
				}
				if ($quote.attr('author')) {
					html += '<div class="quote-author">' +
					$quote.attr('author') + '</div>';
				}
				html += '</div>';
				html += '</div>';
				$('#dictionary').append($(html));
			});
			
		});
	});
	
	$("#letter-e a").click(function(){
		/*$.get('e.php', {'term': $(this).text()}, function(data){
			$("#dictionary").html(data);
		});*/
		/*$.post('e.php', {'term': $(this).text()}, function(data){
			$("#dictionary").html(data);
		});*/
		$("#dictionary").load('e.php',{'term': $(this).text()});
		return false;
	});
	
	/*$("#letter-f form").submit(function(){
		$("#dictionary").load('f.php',{'term':$('input[name="term"]').val()});
		return false;
	});*/
	
	$("#letter-f form").submit(function(){
		$.get('f.php', $(this).find('input').serialize(), function(data){
			$("#dictionary").html(data);
		});
		return false;
	});
	$("#loading").hide();
	$("#loading").ajaxStart(function(){
		$(this).show();
	}).ajaxStop(function(){
		$(this).hide();
	});
	
});
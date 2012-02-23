/**
 *	Script 2 JS 
 */
	
jQuery.fn.alternateRowColors = function(){
	$('tbody tr:odd', this).removeClass('even').addClass('odd');
	$('tbody tr:even', this).removeClass('odd').addClass('even');
	return this;
};

$(document).ready(function(){
	
	$('table.sortable').each(function(){
		
		var $table = $(this);
		$table.alternateRowColors();
		$('th', $table).each(function(column){
			
			var findSortKey;
			
			if ($(this).is('.sort-alpha')){
				findSortKey = function($cell){
					return $cell.find('.sort-key').text().toUpperCase() + ' ' +  $cell.text().toUpperCase();
				};
			}
			else if($(this).is('.sort-numeric')){
				findSortKey = function($cell){
					var key = parseFloat($cell.text().replace(/^[^\d.]*/, '')); // pega o valor da célula e o tranforma em número 
					return isNaN(key) ? 0 : key; // retorna 0 caso não seje um número e o valor de key caso seje
				};
			}
			else if($(this).is('.sort-date')){
				findSortKey = function($cell){
					return Date.parse('1 ' + $cell.text());
				};
			}
			
			if (findSortKey) {
				$(this).addClass('clickable')
				.hover(function(){
							$(this).addClass('hover');
					}, function(){
								$(this).removeClass('hover');
					})
				.click(function(){
					var newDirection = 1;
					if ($(this).is('.sorted-asc')) {
						newDirection = -1;
					}
					var rows = $table.find('tbody > tr').get();
					
					$.each(rows, function(index, row){
						row.sortKey = findSortKey($(row).children('td').eq(column));
					});
					rows.sort(function(a, b){
						if(a.sortKey < b.sortKey) return -newDirection;
						if(a.sortKey > b.sortKey) return newDirection;
						return 0;
					});
					$.each(rows, function(index, row){
						$table.children('tbody').append(row);
						row.sortKey = null;	
					});
					
					$table.find('th').removeClass('sorted-asc').removeClass('sorted-desc');
					var $sortHead = $table.find('th').filter(':nth-child(' + (column + 1) + ')');
					if (newDirection == 1) {
						$sortHead.addClass('sorted-asc');
					}else{
						$sortHead.addClass('sorted-desc');
					}
					$table.find('td').removeClass('sorted').filter(':nth-child(' + (column + 1) + ')').addClass('sorted');
					$table.alternateRowColors();
					$table.trigger('repaginate');
				});
			}
			
		});
		
		
	});
	
});


$(document).ready(function() {
	$('table.paginated').each(function() {
		
		var currentPage = 0;
		var numPerPage = 2;
		var $table = $(this);
		$table.bind('repaginate', function(){
			$table.find('tbody tr').hide()
				.slice(currentPage * numPerPage,(currentPage + 1) * numPerPage)
				.show();
		});
		$table.trigger('repaginate');
		var numRows = $table.find('tbody tr').length;
		var numPages = Math.ceil(numRows / numPerPage);
		var $pager = $('<div class="pager"></div>');
		for (var page = 0; page < numPages; page++){
			$('<span class="page-number"></span>').text(page + 1)
				.bind('click', {newPage: page}, function(event){
					currentPage = event.data['newPage'];
					$table.trigger('repaginate');
					$(this).addClass('active')
						.siblings().removeClass('active');
				}).appendTo($pager).addClass('clickable');
		}
		$pager.insertBefore($table)
			.find('span.page-number:first').addClass('active');;
	});
});

$(document).ready(function() {
	//$('table.striped tbody tr:not([th]):odd').addClass('odd');
	//$('table.striped tbody tr:not([th]):even').addClass('even');
});

$(document).ready(function() {
	var classNames = {
			0: 'first',
			1: 'second',
			2: 'third'
		};
	
//	$('table.striped tbody tr:not([th])').each(function(index){
//		$(this).addClass(classNames[index % 3]);
//	});
	var rowClass = 'even';
	var rowIndex = 0;
	$('table.striped tbody tr').each(function(index){
		if ($('th', this).length) {
			rowClass = 'subhead';
			rowIndex = -1;
		}
		else if (rowIndex % 3 == 0) {
			rowClass = (rowClass == 'even' ? 'odd' : 'even');
		};
		$(this).addClass(rowClass);
		rowIndex++;
	});
});


$(document).ready(function() {
	var column = 3;
	var positionTooltip = function(event){
		var tPosX = event.pageX - 5;
		var tPosY = event.pageY + 25;
		$('div.tooltip').css({top: tPosY, left: tPosX});
	};
	var showTooltip = function(event){
		$('div.tooltip').remove();
		var $thisAuthor = $(this).text();
		if ($(this).parent().is('.highlight')) {
			highlighted = 'un-';
		}else{
			highlighted = '';
		}
		$('<div class="tooltip">Click to ' + highlighted + 'highlight all articles written by ' + $thisAuthor + '<div>')
			.appendTo('body');
		positionTooltip(event);
	};
	var hideTooltip = function(event){
		$('div.tooltip').remove();
	};
	$('table.striped td:nth-child('+ column +')')
		.addClass('clickable')
		.click(function(event){
			var thisClicked = $(this).text();
			$('table.striped td:nth-child('+column+')').each(function(index){
				if (thisClicked == $(this).text()) {
					$(this).parent().toggleClass('highlight');
				}else{
					$(this).parent().removeClass('highlight');
				}
			});
			showTooltip.call(this, event);
		})
		.hover(showTooltip, hideTooltip)
		.mouseover(positionTooltip);
	
});

$(document).ready(function() {
	
	var toggleMinus = '../../seta1.png';
	var togglePlus = '../../seta2.png';
	var $subHead = $('tbody th:first-child');
	$subHead.prepend('<img src="'+toggleMinus+'" alt="collapse this section" height="12" width="12" />&nbsp;&nbsp;');
	$('img', $subHead).addClass('clickable')
		.click(function(){
			var toggleSrc = $(this).attr('src');
			if (toggleSrc == toggleMinus) {
				$(this).attr('src', togglePlus)
					.parents('tr').siblings().fadeOut('fast');
			}else{
				$(this).attr('src', toggleMinus)
				.parents('tr').siblings().fadeIn('fast');
			}
		});
});

$(document).ready(function() {
	
	$('table.filterable').each(function(){
		var $table = $(this);
		$table.find('th').each(function(column){
			if ($(this).is('.filter-column')){
				var $filters = $('<div class="filters"><h4>Filter by '+$(this).text()+':</h4></div>');
				$filters.insertBefore($table);
				// Preenche os keywords para servirem de filtro
				var keywords = {};
				$table.find('tbody tr td').filter(':nth-child('+(column + 1)+')').each(function(){
					keywords[$(this).text()] = $(this).text();
				});
				// Desativação do filtro
				$('<div class="filter">all<div>').click(function(){
					$table.find('tbody tr').show();
					$(this).addClass('active').siblings().removeClass('active');
				}).addClass('clickable active').appendTo($filters);
				// Para cada keyword ao clicar será filtrado a tabela
				$.each(keywords, function(index, keyword){
					$('<div class="filter"></div>').text(keyword).bind('click', {'keyword':keyword}, function(event){
						$table.find('tbody tr').each(function(){
							if ($('td', this).filter(':nth-child('+(column + 1)+')').text() == event.data['keyword']) {
								$(this).show();
							}else if ($('th' ,this).length == 0) {
								$(this).hide();
							}
						});
						
						$(this).addClass('active').siblings().removeClass('active');
					})
					.addClass('clickable')
					.appendTo($filters);
				});
				
			}
		});
	});
	
});
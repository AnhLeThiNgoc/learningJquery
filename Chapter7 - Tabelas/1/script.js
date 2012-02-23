/**
 *   Chapter 7 Table Manipulation
 */

$(document).ready(function() {
	
	/*
	 * Seleção: cada tabela da pagina com a classe sortable
	 * Funções: 
	 * 			- arternateRowColors
	 * 			- cada th da tabela com id sort-alpha é adicionado a classe clickable,
	 * 				adicionado/removido a classe hover com a função .hover,
	 * 				organizado em ordem alfabetica as linhas das tabelas de acordo com o indice da coluna ao clicar
	 */
	$("table.sortable").each(function(){
		
		var $table = $(this);
		$table.alternateRowColors();
	
		$('th', $table).each(function(columnIndex){
			var findSortKey;
			if ($(this).is('.sort-alpha')) {
				findSortKey = function($cell){
					return $cell.find('.sort-key').text().toUpperCase()
									 + ' ' + $cell.text().toUpperCase();
				};
			}
			else if($(this).is('.sort-numeric')){
				findSortKey = function($cell){
					var key = parseFloat($cell.text().replace(/^[^\d.]*/, ''));
					return isNaN(key) ? 0 : key;
				};
			}
			else if($(this).is('.sort-date')){
				findSortKey = function($cell){
					return Date.parse('1 ' + $cell.text());
				};
			}
			
			if(findSortKey){
				
				$(this).addClass('clickable')
				.hover(
					function(){
						$(this).addClass('hover');
					},
					function(){
						$(this).removeClass('hover');
				})
				.click(function(){
					var newDirection = 1;
					if ($(this).is('.sorted-asc')) {
						newDirection = -1;
					}
					var rows = $table.find('tbody > tr').get();
					$.each(rows, function(index, row){
						row.sortKey = findSortKey($(row).children('td').eq(columnIndex));
					});
					rows.sort(function(a, b){
						if (a.sortKey < b.sortKey) return -newDirection;				
						if (a.sortKey > b.sortKey) return newDirection;
						return 0;
					});
					$.each(rows, function(index, row){
						$table.children('tbody').append(row);
						row.sortKey = null;
					});
					
					$table.find('th').removeClass('sorted-asc').removeClass('sorted-desc');
					var $sortHead = $table.find('th').filter(':nth-child(' + (columnIndex + 1) + ')');
					if (newDirection == 1) {
						$sortHead.addClass('sorted-asc');
					}else{
						$sortHead.addClass('sorted-desc');
					}
					
					$table.find('th')
									.removeClass('sorted')
									.filter(':nth-child(' + (columnIndex + 1) + ')')
									.addClass('sorted');
					$table.alternateRowColors();
				});
			}
			
		});
		
	});
	
	
	$('table.paginated').each(function(){
		
		var currentPage = 0;
		var numPerPage = 10;
		var $table = $(this);
		$table.find('tbody tr')
						.hide()
						.slice(currentPage * numPerPage, (currentPage + 1) * numPerPage)
						.show();
		var numRows = $table.find('tbody tr').length;
		var numPages = Math.ceil(numRows / numPerPage);
		var $pager = $('<div class="page"></div>');
		for ( var page = 0; page < numPages; page++) {
			$('<span class="page-number">').text(page + 1) 
					.bind('click', {newPage: page}, function(event){
						currentPage = event.data['newPage'];
						$table.trigger['repaginate'];
						$(this).addClass('active')
							.siblings().removeClass('active');
					}).appendTo($pager).addClass('clickable');
		}
		$pager.insertBefore($table);
	});
	
	
	
	
});

//função que adiciona a classe odd ou even para cada linha da tabela
	$.fn.alternateRowColors = function(){
	$('tbody tr:odd', this).removeClass('even').addClass('odd');
	$('tbody tr:even', this).removeClass('odd').addClass('even');
	return this;
};
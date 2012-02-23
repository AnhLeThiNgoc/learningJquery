/****************
 * 	ROTATORS JS
 ****************/

$(document).ready(function(){
	$('#news-feed').each(function(){
		var $this = $(this);
		$this.empty();
		
		var totalHeight = $this.height();
		var fadeHeight = $('#news-feed').height() / 4;
		for ( var i = 0; i < fadeHeight; i+=2) {
			$('<div></div>')
					.css({
						opacity : i / fadeHeight,
						top : totalHeight - fadeHeight + i
					})
					.addClass('fade-slice')
					.appendTo(this);
		}
		
		// Loading do Ajax
		var $newsLoading = $('<img />')
								.attr({
									'src' : 'images/loading.gif',
									'alt' : 'loading. please wait'
								})
								.addClass('news-wait');
		$(this).ajaxStart(function() {
			$(this).append($newsLoading);
		}).ajaxStop(function() {
			$newsLoading.fadeOut('slow');
		});
		
		// Mostra as novidades vindo do arquivo feed.xml
		$.get('news/feed.xml', function(data){
			$('rss item', data).each(function() {
				var title = $('title', this).text();
				var linkText = $('link', this).text();
				var $link = $('<a></a>')
						.attr('href', linkText)
						.text(title);
				$link = $('<h3></h3>').html($link);
				
				// Cria a div com a data de públicação
				var pubDate = new Date($('pubDate', this).text());
				var pubMonth = pubDate.getMonth() + 1;
				var pubDay = pubDate.getDate();
				var pubYear = pubDate.getFullYear();
				var $pubDiv = $('<div></div>')
									.addClass('publication-date')
									.text(pubMonth + '/' + pubDay + '/' + pubYear);
				var summaryText = $('description', this).text();
				var $summary = $('<div></div>')
									.addClass('summary')
									.html(summaryText);
				
				// Adiciona os objetos dentro da div #news-feed
				$('<div></div>')
						.addClass('headline')
						.append($link)
						.append($pubDiv)
						.append($summary)
						.appendTo('#news-feed');
				});
				// Rotação das news
				// ****************
				var currentHeadline = 0, oldHeadline = 0;
				var hiddenPosition = $('#news-feed').height() + 10;
				$('div.headline:eq(' + currentHeadline + ')').css('top','0');
				var headlineCount = $('div.headline').length;
				var headlineTimeOut;
				var rotateInProgress = false;
				
				var headlineRotate = function(){
					
					if (!rotateInProgress) {
						rotateInProgress = true;
						headlineTimeOut = false;
						currentHeadline = (oldHeadline + 1) % headlineCount;
						// Esconde a div.headline ativa
						$('div.headline')
							.eq(oldHeadline)
							.animate({top: (-hiddenPosition)}, 'slow', function(){
								$(this).css('top', hiddenPosition);
							});
						// Mostra a próxima div.headline
						$('div.headline')
							.eq(currentHeadline)
							.animate({top: 0}, 'slow', function() {
								rotateInProgress = false;
								if (!headlineTimeOut) {
									headlineTimeOut = setTimeout(headlineRotate, 5000);
								}
							});
						oldHeadline = currentHeadline;
					}
				};
				if (!headlineTimeOut) {
					headlineTimeOut = setTimeout(headlineRotate, 5000);
				}
				
				$('#news-feed').hover(function(){
					clearTimeout(headlineTimeOut);
					headlineTimeOut = false;
				}, function() {
					if (!headlineTimeOut) {
						headlineTimeOut = setTimeout(headlineRotate, 250);
					}
				}); 
		}); // End $.get()
	}); // End $.each for #news-feed
	
});


/****************
 * 	ROTATORS JS
 ****************/

$(document).ready(function() {
	
	/*************
	 * INTERFACES
	 *************/
	
	var spacing = 140;
	
	$('#featured-books').css({
		'width' : spacing * 3,
		'height': '166px',
		'overflow': 'hidden'
	}).find('.covers a').css({
		'float' : 'none',
		'position' : 'absolute',
		'left' : 1000
	});
	
	var $covers = $('#featured-books .covers a');
	$covers.eq(0).css('left', 0);
	$covers.eq(1).css('left', spacing);
	$covers.eq(2).css('left', spacing * 2);
	
	// Icones de Controle
	function createControl(src) {
		return $('<img />')
					.attr('src', src)
					.addClass('control')
					.css('opacity', 0.6)
					.hide();
	}
	
	var $leftRollover = createControl('images/left.gif');
	var $rightRollover = createControl('images/right.gif');
	var $enlargeRollover = createControl('images/enlarge.gif');
	
	var $enlargedCover = $('<img />')
								.addClass('enlarged')
								.hide()
								.appendTo('body');
	
	var $closeButton = createControl('images/close.gif')
			.addClass('enlarged-control')
			.appendTo('body');
	
	var $priceBadge = $('<div></div>')
							.addClass('enlarged-price')
							.css('opacity', 0.6)
							.css('display', 'none')
							.appendTo('body');
	
	var $waitThrobber = $('<img />')
								.attr('src', 'images/wait.gif')
								.addClass('control')
								.css('z-index', 4)
								.hide();
	
	/*************
	 * AÇÕES
	 *************/
	
	var setUpCovers = function(){
		
		var $covers = $('#featured-books .covers a');
		$covers.unbind('click mouseenter mouseleave');
		
		// Imagem da esquerda, rola para direita ( para ver imagens na esquerda ) quando clicado
		// -------------------------------------------------------------------------------------
		$covers.eq(0).css('left', 0).click(function(event){
			$covers.eq(0).animate({'left' : spacing}, 'fast');
			$covers.eq(1).animate({'left' : spacing * 2}, 'fast');
			$covers.eq(2).animate({'left' : spacing * 3}, 'fast');
			$covers.eq($covers.length - 1).css('left', -spacing).animate({
				'left' : 0}, 'fast', function(){
					$(this).prependTo('#featured-books .covers');
					setUpCovers();
				});
			event.preventDefault();
		}).hover(function(){
			$leftRollover.appendTo(this).show();
		},function(){
			$leftRollover.hide();
		});
		
		// Imagem da direita, rola para esquerda ( para ver imagens na direita ) quando clicado
		// --------------------------------------------------------------------------------------
		$covers.eq(2).css('left', spacing * 2).click(function(event){
			$covers.eq(0).animate({'left' : -spacing}, 'fast', function(){
				$(this).appendTo('#featured-books .covers');
				setUpCovers();
			});
			$covers.eq(1).animate({'left' : 0}, 'fast');
			$covers.eq(2).animate({'left' : spacing}, 'fast');
			$covers.eq(3).css('left', spacing * 3).animate({
				'left' : spacing * 2}, 'fast');
			event.preventDefault();
		}).hover(function(){
			$rightRollover.appendTo(this).show();
		},function(){
			$rightRollover.hide();
		});
		
		// Imagem do centro, alarga a imagem quando clicado
		// -------------------------------------------------
		$covers.eq(1).css('left', spacing).click(function(event){
			
			$waitThrobber.appendTo(this).show();
			
			var element = $(this).find('img').get(0);
			var coverLeft = 0;
			var coverTop = 0;
			var coverWidth = element.width;
			var coverHeight = element.height;
			while(element.offsetParent){
				coverLeft += element.offsetLeft;
				coverTop += element.offsetTop;
				element = element.offsetParent;
			}
			
			$enlargedCover.attr('src', $(this).attr('href')).css({
				'left' : coverLeft,
				'top' : coverTop,
				'width' : coverWidth,
				'height' : coverHeight
			});
			
			var price = $(this).find('.price').text();
			
			var animateEnlarge = function(){
				
				$waitThrobber.hide();
				
				$enlargedCover.animate({
					'left' : ($('body').width() - coverWidth * 3) / 2,
					'top' : 100,
					'width' : coverWidth * 3,
					'height' : coverHeight * 3
				}, 'normal', function() {
					$enlargedCover.one('click', function(){
						$(this).fadeOut();
						$closeButton.unbind('click').hide();
						$priceBadge.hide();
					});
				});
				
				// Mostra o botão de fechar
				$closeButton.css({
					'left' : ($('body').width() - 360) / 2,
					'top' : 100
				}).click(function(){
					$enlargedCover.click();
				}).show();
				
				// Mostra o preço
				$priceBadge.css({
					'right' : ($('body').width() - 330) / 2,
					'top' : 100
				}).text(price).show();
				
			};
			
			if ($enlargedCover[0].complete) {
				animateEnlarge();
			}else{
				$enlargedCover.bind('load', animateEnlarge);
			}
			
			event.preventDefault();
			
		}).hover(function(){
			$enlargeRollover.appendTo(this).show();
		},function(){
			$enlargeRollover.hide();
		});
	};
	
	setUpCovers();
	
});

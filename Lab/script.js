/**
 * 	Move Menu
 */

$(document).ready(function(){
	
	$("div.zoom").click(function(){
		var $imagem = $("div#imagem img:eq(0)");
		var largura = $imagem.css('width');
		var altura = $imagem.css('height');
		larguraAtual = parseInt(largura, 10);
		alturaAtual = parseInt(altura, 10);
		
		if (this.id == "aumentar") {
			larguraNova = larguraAtual * 1.2;
			alturaNova = alturaAtual * 1.2;
		}
		else if(this.id == "diminuir"){
			larguraNova = larguraAtual / 1.2;
			alturaNova = alturaAtual / 1.2;
		}
		
		$imagem.css('width', larguraNova);
		$imagem.css('height', alturaNova);
		
	});
	
	$("div.menu-parado").hover(function(){
		var $localLeft = parseInt(
							$(this).css("left"));
		var $largura = parseInt(
							$(this).css("width"));
		$("#menu-movel").animate({left:$localLeft,
								  width:$largura},"slow");
	});
	
});
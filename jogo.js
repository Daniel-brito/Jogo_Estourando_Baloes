	var timerId = null; //variavel que armazena a chamada da função timeout
	
	function iniciaJogo() {
		var url = window.location.search;

		var nivel_jogo = url.replace("?","");

		var tempo_segundos = 0;

		if (nivel_jogo == 1) {  //nivel fácil

			tempo_segundos = 120;
		}
 
		if (nivel_jogo == 2) {  //nivel normal
			tempo_segundos = 60; 
		}

		if (nivel_jogo == 3) { //nivel dificil
			tempo_segundos = 30;
		}

		//inserindo segundos no span
		document.getElementById('cronometro').innerHTML = tempo_segundos;

		var qtde_baloes = 80;

		//imprimir qtde de balões inteiros
		document.getElementById('baloes_inteiros').innerHTML = qtde_baloes;

		document.getElementById('baloes_estourados').innerHTML = 0;

		cria_baloes(qtde_baloes);

		contagem_tempo(tempo_segundos + 1);
	}

	function cria_baloes(qtde_baloes) {
		
		for (var i = 1; i <= qtde_baloes; i++) {

			var balao = document.createElement("img");
			balao.src = 'imagens/balao_azul_pequeno.png';
			balao.style.margin = '10px';
			balao.id = 'b'+i; 
			balao.onclick = function(){ estourar(this);};

			document.getElementById('cenario').appendChild(balao);
			
		}
	}

	function estourar(e){
		
		var id_balao = e.id;
		document.getElementById(id_balao).setAttribute("onclick", "");
		document.getElementById(id_balao).src = 'imagens/balao_azul_pequeno_estourado.png';
		
		pontuacao(-1);
	}

	function pontuacao(acao){

		var b_inteiros = document.getElementById('baloes_inteiros').innerHTML;
		var b_estourados = document.getElementById('baloes_estourados').innerHTML

		b_inteiros = parseInt(b_inteiros);
		b_estourados = parseInt(b_estourados);

		b_inteiros = b_inteiros + acao;
		b_estourados = b_estourados - acao;

		document.getElementById('baloes_inteiros').innerHTML = b_inteiros;
		document.getElementById('baloes_estourados').innerHTML = b_estourados;

		jogo(b_inteiros);
	}

	function jogo(baloes_inteiros){
		if (baloes_inteiros == 0) {
			alert('Parabéns vc venceu');
			parar_jogo();
		}
	}

	function parar_jogo(){
		clearTimeout(timerId);
	}

	function contagem_tempo(segundos) {
		
		segundos = segundos - 1;

		if (segundos == -1) {
			clearTimeout(timerId); //para a execução de setTimeout
			
			game_over();
			return false;
		}	

	document.getElementById('cronometro').innerHTML = segundos;

		timerId = setTimeout("contagem_tempo("+segundos+")", 1000);


		}

	function game_over(){
		remove_eventos_baloes();
		alert('fim de jogo')
	}

	function remove_eventos_baloes() {
    var i = 1; //contado para recuperar balões por id
    
    //percorre o lementos de acordo com o id e só irá sair do laço quando não houver correspondência com elemento
    while(document.getElementById('b'+i)) {
        //retira o evento onclick do elemnto
        document.getElementById('b'+i).onclick = '';
        i++; //faz a iteração da variávei i
    }
}
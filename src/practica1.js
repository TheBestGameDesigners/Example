/**
 * MemoryGame es la clase que representa nuestro juego. Contiene un array con la cartas del juego,
 * el número de cartas encontradas (para saber cuándo hemos terminado el juego) y un texto con el mensaje
 * que indica en qué estado se encuentra el juego
 */
var MemoryGame = MemoryGame || {};

/**
 * Constructora de MemoryGame
 */
MemoryGame = function(gs) {
	this.gs = gs;
	this.arrayPosibilidades = new Array(8);
		this.arrayPosibilidades[0] = "8-ball";
		this.arrayPosibilidades[1] = "potato";
		this.arrayPosibilidades[2] = "dinosaur";
		this.arrayPosibilidades[3] = "kronos";
		this.arrayPosibilidades[4] = "rocket";
		this.arrayPosibilidades[5] = "unicorn";
		this.arrayPosibilidades[6] = "guy";
		this.arrayPosibilidades[7] = "zeppelin";
		this.arrayIntroducidas = new Array(8);
		for(var i = 0; i < 8 ; i++)
			this.arrayIntroducidas[i] = 0;
	
};
//***********************************************************************************************************
		//utilizar funcion setInterval para llamar cada cierto tiempo a esta funcion.
		//utilizar la funcion setTimeOut para esperar 1 seg antes de volver a girar las cartas al fallar
		//cuando las dos cartas esten giradas, cancelar temporalmente los clicks
//***********************************************************************************************************


/**
 * Constructora de las cartas del juego. Recibe como parámetro el nombre del sprite que representa la carta.
 * Dos cartas serán iguales si tienen el mismo sprite.
 * La carta puede guardar la posición que ocupa dentro del tablero para luego poder dibujarse
 * @param {string} id Nombre del sprite que representa la carta
 */
MemoryGame.Card = function(id) {
	this.estado = false;
	this.id = id;
};

MemoryGame.prototype = {

	initGame: function(){
		
		this.numCartasEncontradas = 0;
		this.mensaje = "iniciando juego";
		this.comparaCartas = false;
		this.idUltimaCarta;
		this.arrayCartas = new Array();
		var rand;
		for(var i = 0; i < 16; i++){
			rand = Math.floor(Math.random()*7);
			if(this.arrayIntroducidas[rand] < 2){
				this.arrayCartas[i] = new MemoryGame.Card(this.arrayPosibilidades[rand]);
				this.arrayIntroducidas[rand]++;
			}
			else{
				i--;
			}
		}
		
		this.loop();
	},

	draw: function(){
		for(var i = 0; i < 16 ; i++)
			this.arrayCartas[i].draw(gs, i);
		

	},

	loop: function(){
		var self = this;
		setInterval(
			function(){
				self.draw()},16);
	},

	onClick: function(cardId){
		this.arrayCartas[cardId].flip();
		this.comparaCartas = !this.comparaCartas;
		if(this.comparaCartas){
			this.idUltimaCarta = cardId;
		}
		else{
			if(!this.arrayCartas[cardId].compareTo(this.arrayCartas[this.idUltimaCarta])){
				var self = this;
				setTimeout(function(){  self.arrayCartas[cardId].flip();
										self.arrayCartas[self.idUltimaCarta].flip(); }
										, 500);
				
			}
			else{
				this.arrayCartas[cardId].found();
				this.arrayCartas[this.idUltimaCarta].found();
				this.numCartasEncontradas += 2;
			}
		}
	}
}

MemoryGame.Card.prototype = {
	draw: function(gs, pos){
		if(!this.estado)
			gs.draw("back",pos);
		else
			gs.draw(this.id,pos);
	},

	found: function(){
		this.estado = true;
	},

	flip: function(){
		this.estado = !this.estado;
	},

	compareTo: function(otherCard){
		if(otherCard.id == this.id)
			return true;
		return false;
	}
}



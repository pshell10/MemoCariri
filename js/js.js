(function (){

// Criado variaveis que serão utilazadas dependendo da função

  var imagens = [];

  var cartasViradas = [];

  var acertos = 0;

  var  imgAcerto = document.querySelector("#img"); 

  var  modalFim =  document.querySelector("#modalFim");

  var reiniciar = document.querySelector("#reinic");
  reiniciar.addEventListener("click",iniciar);


// Preenchendo array imagenns[] com as imagens da pasta img/

  for(var i = 0; i < 12;i++){
    var img = {
        src: "img/"+ i + ".jpeg",
        id: i%6
    };
    imagens.push(img);
  }


  iniciar();

    // Funnção que distribui as divs das cartas na  div container

    function iniciar(){
       
        acertos = 0;
        cartasViradas = [];
        imagens = embaralhar(imagens);  
        
        var facesFrente = document.getElementsByClassName("frente");
        var facesVerso = document.getElementsByClassName("verso");


        for(var i = 0; i < 12; i++){
            facesFrente[i].classList.remove("virada","correta");
            facesVerso[i].classList.remove("virada","correta");


            var carta = document.querySelector("#carta" + i);
                if (i % 6 === 0){
                  carta.style.left =  20 + "px";  
                }else{
                  carta.style.left = (i % 6) * 220 + 25 + "px";
                }  
                if (i < 6){
                    carta.style.top = 5 + "px";  
                  }else {
                    carta.style.top = 260 + "px";
                  }  

            carta.addEventListener("click",virarCarta,false);

           facesFrente[i].style.background = "url('"+ imagens[i].src +"')"; 
           facesFrente[i].setAttribute("id", imagens[i].id);
        }    
          modalFim.style.zIndex = -2;
          modalFim.style.opacity = 0;
          modalFim.removeEventListener("click",iniciar,false);
    }


    //Função que vira a face da carta e compara se as cartas escolhidas são um par

    function virarCarta(){

        if  (cartasViradas.length < 2){
          var faces = this.getElementsByClassName("face");    

          if (faces[0].classList.length > 2){
            return;
          }

          faces[0].classList.toggle("virada");
          faces[1].classList.toggle("virada");

          cartasViradas.push(this);

          if (cartasViradas.length === 2){
            if(cartasViradas[0].childNodes[3].id === cartasViradas[1].childNodes[3].id){
              cartasViradas[0].childNodes[1].classList.toggle("correta");
              cartasViradas[0].childNodes[3].classList.toggle("correta");
              cartasViradas[1].childNodes[1].classList.toggle("correta");
              cartasViradas[1].childNodes[3].classList.toggle("correta");

              sinalAcerto();
              acertos++;
              cartasViradas = [];
              if (acertos === 6){
                parabens();

              }

            }
          }

        }else{
          cartasViradas[0].childNodes[1].classList.toggle("virada");
          cartasViradas[0].childNodes[3].classList.toggle("virada");
          cartasViradas[1].childNodes[1].classList.toggle("virada");
          cartasViradas[1].childNodes[3].classList.toggle("virada");

          cartasViradas = [];

        }

    }

    //Função que utiliza a biblioteca Math para embaralhar as posições das cartas

    function embaralhar(arrayOrganizado){
        var arrayAleatorio = [];

        while(arrayAleatorio.length !== arrayOrganizado.length){
          var alea = Math.floor(Math.random()*arrayOrganizado.length);

          if(arrayAleatorio.indexOf(arrayOrganizado[alea])<0){
            arrayAleatorio.push(arrayOrganizado[alea]);
          }
        }

        return arrayAleatorio;

    }

    // Função acionada todas as vezes que o jogador acertar a combinação de um par
    function sinalAcerto(){
      imgAcerto.style.zIndex = 1;
      imgAcerto.style.top = 150  + "px";
      imgAcerto.style.opacity  = 0;
      setTimeout(function(){
        imgAcerto.style.zIndex = -1;
        imgAcerto.style.top = 250  + "px";
        imgAcerto.style.opacity  = 1;

      },1500);


    }


    //  Função utilizada quando o jogador combinar todos os pares corretamente
    function parabens(){
      modalFim.style.zIndex = 10;
      modalFim.style.opacity = 1;
      modalFim.addEventListener("click",iniciar,false);
    }


}());
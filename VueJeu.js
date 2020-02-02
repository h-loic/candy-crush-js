var VueJeu = (function(){

  return function()
  {

    this.get_image_associer = function(bonbon){
      let img = document.createElement('img');
      switch (bonbon.idCouleur) {
        case 1 :
          img.src = "images/bonbonRouge.png";
          break;
        case 2 :
          img.src = "images/bonbonBleu.png";
          break;
        case 3 :
          img.src = "images/bonbonVert.png";
          break;
        case 4 :
          img.src = "images/bonbonJaune.png";
          break;
        case 5 :
          img.src = "images/bonbonOrange.png";
          break;
        case 6 :
          img.src = "images/bonbonViolet.png";
          break;
        default :
          img.src = "";

      }
      img.style.width = "90%";
      img.style.width = "90%";
      img.id = bonbon.id;
      return img;
    }

    this.afficher_tableau_jeu = function(tableauJeu){
      this.vider_tableau_jeu();
      let table = document.getElementById('tableauDeJeu');
      for (let i = 0; i < tableauJeu[0].length; i++){
        let ligne = document.createElement('tr');
        for (let j = 0; j < tableauJeu[1].length; j++){
          let cellule = document.createElement('td');
          cellule.appendChild(this.get_image_associer(tableauJeu[i][j]));
          ligne.appendChild(cellule);
        }
        table.appendChild(ligne);
      }
    }

    this.vider_tableau_jeu = function(){
      let table = document.getElementById('tableauDeJeu');
      table.querySelectorAll('*').forEach(n => n.remove());;
    }

    this.afficher_nouvelle_progression = function(progression){
      document.getElementById("progressionPourcent").innerHTML = progression +"%";
      let bar = document.getElementById("progressionBar");
      bar.style.width = progression + "%";
    }

    this.selectionner_bonbon = function(idBonbon){
      document.getElementById(idBonbon).style.filter = 'grayscale(1)';
    }

    this.deselectionner_bonbon = function(idBonbon){
      document.getElementById(idBonbon).style.filter = 'grayscale(0)';
    }
  }

})();
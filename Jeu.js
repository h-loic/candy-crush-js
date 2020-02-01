(function(){

  const TAILLE_TABLEAU = 8;
  var tableauJeu;
  var progression;
  var vueJeu = new VueJeu();
  var compteurIdBonbon;
  var nombreBonbonSelectionner;
  var bonbonSelectionner1;
  var bonbonSelectionner2;
  var positionBonbonSelectionner1;
  var positionBonbonSelectionner2;

  document.getElementById('newGame').addEventListener('click', function () {
    vueJeu.vider_tableau_jeu();
    initialiser_jeu();
  }); 

  var initialiser_jeu = function() {
    nombreBonbonSelectionner = 0;
    tableauJeu = [];
    set_tableau_jeu();
    vueJeu.afficher_tableau_jeu(tableauJeu);
    creer_listener_bonbon();
    set_progression(50);
  }

  function creer_listener_bonbon(){
    for (var i = 1; i <= TAILLE_TABLEAU*TAILLE_TABLEAU; i++) {
      let idBonbon = i;
      document.getElementById(i).addEventListener('click', function (e) {
        selectionner_bonbon(e.target.id);
      }); 
    }
  }

  function set_progression(nouvelleProgression){
    progression = nouvelleProgression;
    if (progression >= 100) {
      alert("GAGNE");
    }else{
      vueJeu.afficher_nouvelle_progression(progression);
    }
  }

  function generer_bonbon(){
    let idCouleur = Math.floor(Math.random() * 6) + 1;
    compteurIdBonbon++;
    return new Bonbon(compteurIdBonbon,idCouleur);
  }

  function verifier_tableau(tableauJeu){
    if (tableauJeu.length == 0) {
      console.log("ok");
      return false;
    }
    for (var i = 0; i < TAILLE_TABLEAU-2 ; i++) {
      for (var j = 0; j < TAILLE_TABLEAU-2 ; j++) {
        if (tableauJeu[i][j].idCouleur == tableauJeu[i+1][j].idCouleur && tableauJeu[i+1][j].idCouleur == tableauJeu[i+2][j].idCouleur) {
          return false
        }
        if (tableauJeu[i][j].idCouleur == tableauJeu[i][j+1].idCouleur && tableauJeu[i][j+1].idCouleur == tableauJeu[i][j+2].idCouleur) {
          return false
        }
      }
    }
    for (var i = TAILLE_TABLEAU-2; i < TAILLE_TABLEAU ; i++) {
      for (var j = 0; j < TAILLE_TABLEAU-2 ; j++) {
        if (tableauJeu[i][j].idCouleur == tableauJeu[i][j+1].idCouleur && tableauJeu[i][j+1].idCouleur == tableauJeu[i][j+2].idCouleur) {
          return false
        }
      }
    }
    for (var i = 0; i < TAILLE_TABLEAU-2; i++) {
      for (var j = TAILLE_TABLEAU-2; j < TAILLE_TABLEAU ; j++) {
        if (tableauJeu[i][j].idCouleur == tableauJeu[i+1][j].idCouleur && tableauJeu[i+1][j].idCouleur == tableauJeu[i+2][j].idCouleur) {
          return false
        }
      }
    }
    return true;
  }

  function set_tableau_jeu(){
    while (!verifier_tableau(tableauJeu)){
      compteurIdBonbon = 0;
      tableauJeu = [];
      for (var i = 0; i < TAILLE_TABLEAU ; i++) {
        tableauJeu[i]=[];
        for (var j = 0; j < TAILLE_TABLEAU ; j++) {
          tableauJeu[i][j]=generer_bonbon();
        }
      }
    }
  }

  function est_bonbon_adjacent(idBonbon1,idBonbon2,positionBonbonSelectionner1,positionBonbonSelectionner2){
    if ((positionBonbonSelectionner1[0] == positionBonbonSelectionner2[0] && positionBonbonSelectionner1[1]+1 == positionBonbonSelectionner2[1])
      || (positionBonbonSelectionner1[0] == positionBonbonSelectionner2[0] && positionBonbonSelectionner1[1]-1 == positionBonbonSelectionner2[1])
      || (positionBonbonSelectionner1[1] == positionBonbonSelectionner2[1] && positionBonbonSelectionner1[0]+1 == positionBonbonSelectionner2[0])
      || (positionBonbonSelectionner1[1] == positionBonbonSelectionner2[1] && positionBonbonSelectionner1[0]-1 == positionBonbonSelectionner2[0])
      ) {
      return true;
    }
    return false;

    /*
    for (var i = 0; i < TAILLE_TABLEAU ; i++) {
      for (var j = 0; j < TAILLE_TABLEAU ; j++) {
        if (tableauJeu[i][j].id == idBonbon1) {
          if (i==0 && j==0) {
            if (tableauJeu[i+1][j].id == idBonbon2 || tableauJeu[i][j+1].id == idBonbon2) {
              return true;
            }
          }
          if (i==0 && j==7) {
            if (tableauJeu[i+1][j].id == idBonbon2 || tableauJeu[i][j-1].id == idBonbon2) {
              return true;
            }
          }
          if (i==7 && j==0) {
            if (tableauJeu[i-1][j].id == idBonbon2 || tableauJeu[i][j+1].id == idBonbon2) {
              return true;
            }
          }
          if (i==7 && j==7) {
            if (tableauJeu[i-1][j].id == idBonbon2 || tableauJeu[i][j-1].id == idBonbon2) {
              return true;
            }
          }
          if (i==0) {
            if (tableauJeu[i+1][j].id == idBonbon2) {
              return true;
            }
          }
          if (i==7) {
            if (tableauJeu[i-1][j].id == idBonbon2) {
              return true;
            }
          }
          if (j==0) {
            if (tableauJeu[i][j+1].id == idBonbon2) {
              return true;
            }
          }
          if (j==7) {
            if (tableauJeu[i][j-1].id == idBonbon2) {
              return true;
            }
          }
          if (i < 7 && i > 0 && j < 7 && j >0) {
            if (tableauJeu[i-1][j].id == idBonbon2 || tableauJeu[i+1][j].id == idBonbon2 || tableauJeu[i][j-1].id == idBonbon2 || tableauJeu[i][j+1].id == idBonbon2) {
              return true
            }
          }
          if (i == 0 && j!=7) {
            if (tableauJeu[i][j+1].id == idBonbon2) {
              return true;
            }
          }
          if (i == 7 && j!=7) {
            if (tableauJeu[i][j+1].id == idBonbon2) {
              return true;
            }
          }
          if (i != 7 && j == 0) {
            if (tableauJeu[i+1][j].id == idBonbon2) {
              return true;
            }
          }
          if (i != 7 && j == 7) {
            if (tableauJeu[i+1][j].id == idBonbon2) {
              return true;
            }
          }
          return false;
        }
      }
    }
    */
  }

  function get_position_bonbon(idBonbon){
    for (var i = 0; i < TAILLE_TABLEAU ; i++) {
      for (var j = 0; j < TAILLE_TABLEAU ; j++) {
        if (tableauJeu[i][j].id == idBonbon) {
          return [i,j]
        }
      }
    }
  }

  function selectionner_bonbon(idBonbon){
    nombreBonbonSelectionner++;
    if (nombreBonbonSelectionner == 1) {
      positionBonbonSelectionner1 = get_position_bonbon(idBonbon);
      bonbonSelectionner1 = idBonbon;
      vueJeu.selectionner_bonbon(idBonbon);
    }
    if (nombreBonbonSelectionner == 2) {
      positionBonbonSelectionner2 = get_position_bonbon(idBonbon);
      bonbonSelectionner2 = idBonbon;
      vueJeu.selectionner_bonbon(idBonbon);
      if (est_bonbon_adjacent(bonbonSelectionner1,bonbonSelectionner2,positionBonbonSelectionner1,positionBonbonSelectionner2)) {
        console.log("okok");
      }
      nombreBonbonSelectionner = 0;
      vueJeu.deselectionner_bonbon(bonbonSelectionner1);
      vueJeu.deselectionner_bonbon(bonbonSelectionner2);
    }
  }

  initialiser_jeu();

})();
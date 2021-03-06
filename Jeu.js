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
  var listeId;

  document.getElementById('newGame').addEventListener('click', function () {
    vueJeu.vider_tableau_jeu();
    initialiser_jeu();
  }); 

  var initialiser_jeu = function() {
    nombreBonbonSelectionner = 0;
    compteurIdBonbon = 0;
    listeId = [];
    tableauJeu = [];
    set_tableau_jeu();
    vueJeu.afficher_tableau_jeu(tableauJeu);
    creer_listener_bonbon();
    set_progression(50);
  }

  function creer_listener_bonbon(){
    console.log(listeId.length);
    for (var i = 0; i < TAILLE_TABLEAU*TAILLE_TABLEAU; i++) {
      document.getElementById(listeId[i]).addEventListener('click', function (e) {
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
    listeId.push(compteurIdBonbon);
    return new Bonbon(compteurIdBonbon,idCouleur);
  }

  function verifier_tableau(){
    let tableauTousLesBonbonsASupprimer = [];
    let memeCouleur = true;
    for (let i = 0; i < TAILLE_TABLEAU ; i++) {
      for (let j = 0; j < TAILLE_TABLEAU ; j++) {
        let decalage = 1;
        let tableauBonbonsASupprimer = [];
        tableauBonbonsASupprimer.push(i);
        tableauBonbonsASupprimer.push(j);
        memeCouleur = true;
        while (memeCouleur && i + decalage < TAILLE_TABLEAU){
          if (tableauJeu[i][j].idCouleur == tableauJeu[i + decalage][j].idCouleur) {
            tableauBonbonsASupprimer.push(i + decalage);
            tableauBonbonsASupprimer.push(j);
            decalage++;
          }else{
            memeCouleur = false;
          }
        }
        if (decalage >= 3) {
          for (let i = 0 ; i < tableauBonbonsASupprimer.length; i++) {
            tableauTousLesBonbonsASupprimer.push(tableauBonbonsASupprimer[i]);
          }
        }
        memeCouleur = true;
        decalage = 1;
        tableauBonbonsASupprimer = [];
        tableauBonbonsASupprimer.push(i);
        tableauBonbonsASupprimer.push(j);
        while (memeCouleur && j + decalage < TAILLE_TABLEAU){
          if (tableauJeu[i][j].idCouleur == tableauJeu[i][j + decalage].idCouleur) {
            tableauBonbonsASupprimer.push(i);
            tableauBonbonsASupprimer.push(j + decalage);
            decalage++;
          }else{
            memeCouleur = false;
          }
        }
        if (decalage >= 3) {
          for (let i = 0 ; i < tableauBonbonsASupprimer.length; i++) {
            tableauTousLesBonbonsASupprimer.push(tableauBonbonsASupprimer[i]);
          }
        }
      }
    }
    console.log("iohj");
    console.log(tableauTousLesBonbonsASupprimer);
    if (tableauTousLesBonbonsASupprimer.length == 0) {
      return true;
    }else{
      supprimer_bonbon(tableauTousLesBonbonsASupprimer);
      faire_tomber_bonbon();
      return false;
    }
  }

  function set_tableau_jeu(){
    compteurIdBonbon = 0;
    tableauJeu = [];
    listeId = [];
    for (var i = 0; i < TAILLE_TABLEAU ; i++) {
      tableauJeu[i]=[];
      for (var j = 0; j < TAILLE_TABLEAU ; j++) {
        tableauJeu[i][j]=generer_bonbon();
      }
    }
    vueJeu.afficher_tableau_jeu(tableauJeu);
    while(!verifier_tableau()){
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

  function get_information_bonbon(idBonbon){
    for (var i = 0; i < TAILLE_TABLEAU ; i++) {
      for (var j = 0; j < TAILLE_TABLEAU ; j++) {
        if (tableauJeu[i][j].id == idBonbon) {
          return [i,j,tableauJeu[i][j].idCouleur]
        }
      }
    }
  }


  function echanger_position_bonbon(bonbon1,bonbon2,informationBonbon1,informationBonbon2){ 
    let bonbon3 =  tableauJeu[informationBonbon1[0]][informationBonbon1[1]];
    tableauJeu[informationBonbon1[0]][informationBonbon1[1]] = tableauJeu[informationBonbon2[0]][informationBonbon2[1]]
    tableauJeu[informationBonbon2[0]][informationBonbon2[1]] = bonbon3;
  }

  function get_tableau_bonbons_a_supprimer_colonne(positionBonbon){
    let positionX = positionBonbon[0];
    let positionY = positionBonbon[1];
    let bonbonSimilaire = true;
    var tableauBonbonsASupprimerColonne = [];
    tableauBonbonsASupprimerColonne.push(positionX,positionY);
    let i = 1;
    while(bonbonSimilaire && positionY - i >= 0){
      if (tableauJeu[positionX][positionY - i].idCouleur == tableauJeu[positionX][positionY].idCouleur) {
        tableauBonbonsASupprimerColonne.push(positionX);
        tableauBonbonsASupprimerColonne.push(positionY - i);
      }else{
        bonbonSimilaire = false;
      }
      i++;
    }
    bonbonSimilaire = true;
    i = 1;
    while(bonbonSimilaire && positionY + i <= 7){
      if (tableauJeu[positionX][positionY + i].idCouleur == tableauJeu[positionX][positionY].idCouleur) {
        tableauBonbonsASupprimerColonne.push(positionX);
        tableauBonbonsASupprimerColonne.push(positionY + i);
      }else{
        bonbonSimilaire = false;
      }
      i++;
    }
    if (tableauBonbonsASupprimerColonne.length < 3*2) {
      tableauBonbonsASupprimerColonne = [];
    }
    return tableauBonbonsASupprimerColonne
  }

  function get_tableau_bonbons_a_supprimer_ligne(positionBonbon,tableauJeu){
    let positionX = positionBonbon[0];
    let positionY = positionBonbon[1];
    var tableauBonbonsASupprimerLigne = [];
    tableauBonbonsASupprimerLigne.push(positionX,positionY);
    let bonbonSimilaire = true;
    let i = 1;
    while(bonbonSimilaire && positionX - i >= 0){
      if (tableauJeu[positionX - i][positionY].idCouleur == tableauJeu[positionX][positionY].idCouleur) {
        tableauBonbonsASupprimerLigne.push(positionX - i);
        tableauBonbonsASupprimerLigne.push(positionY);
      }else{
        bonbonSimilaire = false;
      }
      i++;
    }
    bonbonSimilaire = true;
    i = 1;
    while(bonbonSimilaire && positionX + i <= 7){
      if (tableauJeu[positionX + i][positionY].idCouleur == tableauJeu[positionX][positionY].idCouleur) {
        tableauBonbonsASupprimerLigne.push(positionX + i);
        tableauBonbonsASupprimerLigne.push(positionY);
      }else{
        bonbonSimilaire = false;
      }
      i++;
    }
    if (tableauBonbonsASupprimerLigne.length < 3*2) {
      tableauBonbonsASupprimerLigne = [];
    }
    return tableauBonbonsASupprimerLigne
  }

  function get_tableau_positions_bonbons_a_supprimer(positionBonbon1,positionBonbon2){
    let tableauBonbon1Colonne = get_tableau_bonbons_a_supprimer_colonne(positionBonbon1,tableauJeu);
    let tableauBonbon2Colonne = get_tableau_bonbons_a_supprimer_colonne(positionBonbon2,tableauJeu);
    let tableauBonbon1Ligne = get_tableau_bonbons_a_supprimer_ligne(positionBonbon1,tableauJeu);
    let tableauBonbon2Ligne = get_tableau_bonbons_a_supprimer_ligne(positionBonbon2,tableauJeu);
    let tableauDeToutLesBonbonsASupprimer = [];
    if (tableauBonbon1Colonne.length >=3) {
      for (var i = 0; i < tableauBonbon1Colonne.length ; i++) {
        tableauDeToutLesBonbonsASupprimer.push(tableauBonbon1Colonne[i]);
      }
    }
    if (tableauBonbon2Colonne.length >=3) {
      for (var i = 0; i < tableauBonbon2Colonne.length ; i++) {
        tableauDeToutLesBonbonsASupprimer.push(tableauBonbon2Colonne[i]);
      }
    }
    if (tableauBonbon1Ligne.length >=3) {
      for (var i = 0; i < tableauBonbon1Ligne.length ; i++) {
        tableauDeToutLesBonbonsASupprimer.push(tableauBonbon1Ligne[i]);
      }
    }
    if (tableauBonbon2Ligne.length >=3) {
      for (var i = 0; i < tableauBonbon2Ligne.length ; i++) {
        tableauDeToutLesBonbonsASupprimer.push(tableauBonbon2Ligne[i]);
      }
    }
    return tableauDeToutLesBonbonsASupprimer;
  }

  function supprimer_bonbon(tableauBonbonsASupprimer){
    let moitieTableau = tableauBonbonsASupprimer.length/2;
    for (var i = 0; i <= tableauBonbonsASupprimer.length-1 ; i+=2) {
      let idNouveauBonbon = tableauJeu[tableauBonbonsASupprimer[i]][tableauBonbonsASupprimer[i+1]].id;
      tableauJeu[tableauBonbonsASupprimer[i]][tableauBonbonsASupprimer[i+1]] = new Bonbon(idNouveauBonbon,"none");
    }
    vueJeu.afficher_tableau_jeu(tableauJeu);
  }

  function modifier_tableau_jeu_avec_selection(positionBonbon1,positionBonbon2,idBonbon){
    if (est_bonbon_adjacent(bonbonSelectionner1,bonbonSelectionner2,positionBonbonSelectionner1,positionBonbonSelectionner2)) {
      echanger_position_bonbon(bonbonSelectionner1,bonbonSelectionner2,positionBonbonSelectionner1,positionBonbonSelectionner2);
      vueJeu.afficher_tableau_jeu(tableauJeu);
      let tableauBonbonsASupprimer = get_tableau_positions_bonbons_a_supprimer(positionBonbonSelectionner1,positionBonbonSelectionner2);
      if (tableauBonbonsASupprimer.length < 6 ){
        echanger_position_bonbon(bonbonSelectionner2,bonbonSelectionner1,positionBonbonSelectionner2,positionBonbonSelectionner1);
        vueJeu.afficher_tableau_jeu(tableauJeu);
        set_progression(progression - 3);
        vueJeu.deselectionner_bonbon(bonbonSelectionner1);
        vueJeu.deselectionner_bonbon(bonbonSelectionner2);
        creer_listener_bonbon(); 
      }else{
        set_progression(progression + tableauBonbonsASupprimer.length);
        supprimer_bonbon(tableauBonbonsASupprimer);
        while(!verifier_tableau()){}
        vueJeu.afficher_tableau_jeu(tableauJeu);
        creer_listener_bonbon(); 
      }
    }
  }

  function selectionner_bonbon(idBonbon){
    nombreBonbonSelectionner++;
    if (nombreBonbonSelectionner == 1) {
      positionBonbonSelectionner1 = get_information_bonbon(idBonbon);
      bonbonSelectionner1 = idBonbon;
      vueJeu.selectionner_bonbon(idBonbon);
    }
    if (nombreBonbonSelectionner == 2) {
      positionBonbonSelectionner2 = get_information_bonbon(idBonbon);
      bonbonSelectionner2 = idBonbon;
      if (bonbonSelectionner2 != bonbonSelectionner1) {
        vueJeu.selectionner_bonbon(idBonbon);
        modifier_tableau_jeu_avec_selection(bonbonSelectionner1,bonbonSelectionner2,idBonbon);
      }else{
        vueJeu.deselectionner_bonbon(bonbonSelectionner2);
      }
      nombreBonbonSelectionner = 0;
    }
  }

  function faire_tomber_bonbon(){
    let videEnHaut = false;
    while(!videEnHaut){
      videEnHaut = true;
      for (let i = 0; i < TAILLE_TABLEAU - 1; i++) {
        for (let j = 0; j < TAILLE_TABLEAU ; j++) {
          if (tableauJeu[i][j].idCouleur == "none") {
            for(let k = 0; k < listeId.length; k++){ 
              if ( listeId[k] == tableauJeu[i][j].id) {
                listeId.splice(k, 1); 
              }
            }
            tableauJeu[i][j] = generer_bonbon();
          }
          if (tableauJeu[i+1][j].idCouleur == "none") {
            let bonbon3 =  tableauJeu[i+1][j];
            tableauJeu[i+1][j] = tableauJeu[i][j];
            tableauJeu[i][j] = bonbon3;
            videEnHaut = false;
          }
       }
      }
    }
  }


  initialiser_jeu();

})();
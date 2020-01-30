var progression;

window.onload = function() {
  initialiser_jeu();
};

function initialiser_jeu(){
  progression = 0;
  set_progression(progression);
}

function set_progression(pointGagne){
  progression = progression + pointGagne;
  if (progression >= 100) {
    alert("GAGNE");
  }else{
    document.getElementById("progressionPourcent").innerHTML = progression +"%";
    let bar = document.getElementById("progressionBar");
    bar.style.width = progression + "%";
   }
}
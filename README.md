# Projet searchBar
Système de recherche utilisant les composants Web de Javascript

# Fonctionnement
Le principe est simple. Dans un input on ajoute l'attribut data qui indique une string Json dans laquelle recherchée.

Exemple :
`
  <input class="search-multi mr-3" placeholder="Recherche..." type="search"
    is="search-bar" aria-label="search-bar" size="0"
    data='{"0": "Dupont","1": "Sebastien","2": "Roger","3": "Clémentine","4": "Géraldine","5": "Victor","6": "Dumont"}'>
  <div id="search-results"></div>
`





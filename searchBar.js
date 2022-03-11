/**
 * Projet: Webcomposant pour effectuer une recherche
 * Autheur: Sébastien Gaudin
 * Date: 11/03/2022
 * Version: 1.0
 */
 class SearchBar extends HTMLInputElement {
    constructor() {
        super();

        this.value = '';

        // DOM
        this.divResults = document.querySelector('#search-results');

        // DATA
        this.stringLength = 0;
        this.stringCharacter = null;
        this.data = this.getAttribute('data');
    }

    static get observedAttributes() {
        return ['data', 'size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Lorsque la taille de chaîne de caractère est modifié ou égale à 0, on vide la div des résultats
        if (name === 'size') {
            if ((newValue !== oldValue) || (newValue === oldValue || (newValue === "0")) ) {
                if (this.divResults !== null) {
                    this.divResults.innerHTML = '';
                }
            }
        }
    }

    connectedCallback() {
        this.addEventListener('keyup', function() {
            this.stringCharacter = this.value;
            this.stringLength = this.stringCharacter.length;
        
            // On met à jour l'attribut size en fonction de la taille de la chaîne de caractère
            this.setAttribute('size', this.stringLength);

            // Dés que la longueur du champ est supérieur ou égale à 2, on effectue la recherche
            if (this.stringLength >= 2) {
                this.findElements(this.stringCharacter);
            }
        });
    }

    findElements(recherche) {
        let id = this.getAttribute('id');
        recherche = recherche.toLowerCase();
        const info = JSON.parse(this.data);
        let ul = document.createElement("ul");
        for (const [key, value] of Object.entries(info)) {
            let field = value.toLowerCase();
            if (field.indexOf(recherche) > -1) {
                let a = document.createElement("a");
                a.textContent = value;
                let li = document.createElement("li");
                li.append(a);
                a.onclick = function() {
                    let field = document.querySelector('#' + id);
                    field.value = value;
                } 
                ul.append(li);
            }
        }
        
        /* Gérer la div recevant les résultats */
        if (recherche !== '') {
            this.divResults.append(ul);
            this.divResults.style.display = "block";
        }
        // Dans le cas ou le champ est vide
        if (this.stringLength === 0) {
            this.divResults.innerHTML = "";
            this.divResults.style.display = "none";
        }
    }
}
customElements.define('search-bar', SearchBar, {extends: 'input'});

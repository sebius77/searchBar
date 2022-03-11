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

    findElements(data) {
        data = data.toLowerCase();
        const info = JSON.parse(this.data);
        let string = '';
        string += '<ul>';
        for (const [key, value] of Object.entries(info)) {
            let field = value.toLowerCase();
            if (field.indexOf(data) > -1) {
                string += '<a href="#"><li>' + value + '</li></a>';
            }
        }
        string += '</ul>';

        /* Gérer la div recevant les résultats */
        if (string !== '') {
            this.divResults.innerHTML = string;
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

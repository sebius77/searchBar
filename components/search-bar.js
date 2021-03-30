class SearchBar extends HTMLInputElement {
    constructor() {
        super();

        this.value = '';
        this.regex = '';

        // DOM
        this._divResults = null;
        
        // DATA
        this._users = 
        [
            'toto',
            'titi',
            'Jean-Marc',
            'Pierre',
            'Sébastien',
            'Viviane',
            'Alice',
            'Germaine',
            'Virginie',
            'Jean-Louis',
            'Tom',
            'Tonny',
            ];
        this._stringLength = 0;
        this._stringCharacter = null;
        this._result = null;
        this._data = null; 
        this._oldValue = 0;
        this._newValue = 0;
    }

    static get observedAttributes() {
        return ['data', 'size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(this._divResults);
        if (name === 'size') {
            if ((newValue != oldValue) || (newValue == oldValue || (newValue === "0")) ) {
                if (this._divResults !== null) {
                    this._divResults.innerHTML = '';   
                }
            }   
        }
    }
    
    connectedCallback() {
        console.log('callback ...');
        
        this.addEventListener('keyup', function() {
            this._size = this.attri
            this._stringCharacter = this.value;
            this._stringLength = this._stringCharacter.length;
            this._divResults = document.querySelector('#results-search');
            this.setAttribute('size', this._stringLength);

            // Dés que la longeur du champ est supérieur ou égale à 2 on effectue la recherche
           if (this._stringLength >= 2) {
               this.regex = new RegExp('[a-zA-Z\-]*' + this._stringCharacter + '[\-a-zA-Z]*', 'gi');
               this._result = this._users.filter(user => user == user.match(this.regex));
           }

           /* Gérer la div recevant les résultats */
           this._divResults.append(this._result);

           // Dans le cas ou le champ est vide
           if (this._stringLength === 0) {
               console.log('vidage de la div....');
               this._divResults.innerHTML = "";
            }
        });
    }     
}
customElements.define('search-bar', SearchBar, {extends: 'input'});

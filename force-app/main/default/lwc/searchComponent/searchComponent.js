import { LightningElement, track } from 'lwc';

export default class SearchComponent extends LightningElement {
    @track searchVal

    handleChange(event){
        const value=event.target.value
        this.searchVal=value
        this.dispatchEvent(new CustomEvent("inputvalue",{detail:this.searchVal}))
    }
}
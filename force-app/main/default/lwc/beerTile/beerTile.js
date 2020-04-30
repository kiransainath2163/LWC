import { LightningElement, api } from 'lwc';
export default class BeerTile extends LightningElement {
    @api beerRecord;
    connectedCallback(){
        console.log('Beer:'+this.beerRecord)
    }
    handleAddToCart(){
        this.dispatchEvent(new CustomEvent('cart',{detail:this.beerRecord.Id}))
    }
}
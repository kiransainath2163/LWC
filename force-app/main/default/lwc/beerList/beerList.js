import { LightningElement, wire, track } from 'lwc';
import searchBeer from '@salesforce/apex/BeerController.searchBeer'
import getCartId from '@salesforce/apex/BeerController.getCartId'
import cartImg from '@salesforce/resourceUrl/cart'
import createCartItems from '@salesforce/apex/BeerController.createCartItems'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class BeerList extends LightningElement {
    @track beerRecords;
    @track errros;
    @track cart = cartImg;
    @track cartId;
    @track itemsinCart = 0;

    connectedCallback(){
        this.defaultCartId();
    }
    defaultCartId(){
        getCartId()
        .then(data => {
            const wrapper = JSON.parse(data);
            console.log('Wrapper: '+JSON.stringify(wrapper))
            if ( wrapper ){
                this.itemsinCart = wrapper.Count;
                this.cartId = wrapper.CartId;
            }
        })
        .catch(error => {
            this.cartId = undefined;
            console.log(error);
        });
    }

    // @wire(searchBeer)
    // wiredRecords({error, data}){
    //     this.beerRecords=data
    //     this.errors=error
    //     console.log('Data without Param:'+data);        
    // }
    handleEvent(event){
        const eventVal = event.detail;
        
        searchBeer({
            searchParam : eventVal
        })
        .then(result => {
            
            this.beerRecords = result;
            this.errros = undefined;
        })
        .catch(error => {
            
            this.errors = error;
            this.beerRecords = undefined;
        })
    }
    addToCart(event){
        const selectBeerId = event.detail;

        const selectBeerRecord = this.beerRecords.find(
            record => record.Id === selectBeerId
        );
        /*
            for(Beer__c beer : beerRecords ){
                if(beer.Id == selectBeerId ){
                    return beer;
                }
            }
        */
        createCartItems({
            CartId : this.cartId,
            BeerId : selectBeerId,
            Amount : selectBeerRecord.Price__c
        })
        .then(data => {
            console.log(' Cart Item Id ', data);
            this.itemsinCart = this.itemsinCart + 1;
            const toast = new ShowToastEvent({
                'title' : 'Success!!',
                "message" : selectBeerRecord.Name +' Added into Cart!',
                "variant" : "success", 
            });
            this.dispatchEvent(toast);
        })
        .catch(error => {
            console.log(error);
            const toast = new ShowToastEvent({
                'title' : 'Error!!',
                "message" : JSON.stringify(error),
                "variant" : "error", 
            });
            this.dispatchEvent(toast);
        });

    }
        // )
        // this.itemsInCart=this.itemsInCart+1
        // createCartItems({CartId:this.cartId,
        //      BeerId:selectedBeerId,
        //      Amount:selectedBeerId.Price__c})
        // .then(result=>{
        //     console.log('CartItem id',result)
        // }).catch(error=>{
        //     console.log('CartItem Error'+error);
            
        // })
    
}
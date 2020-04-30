import { LightningElement } from 'lwc';

export default class HooksExample extends LightningElement {
    name='Kiran'
    constructor(){
        super()
        console.log('Inside Constructor')
        this.name = this.name+' Sainath'
    }
    connectedCallback(){
        console.log('Inside ConnectedCallBack')
    }
    disconnectedCallback(){
        console.log('Inside disconnectedCallBack')
    }
    renderedCallback(){
        console.log('Inside renderedCallBack')
    }
    // render(){

    // }
    errorCallback(error,stack){
        console.error('Error: '+error);
        
    }
}
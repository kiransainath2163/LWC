import { LightningElement, api } from 'lwc';

export default class ChildComp extends LightningElement {

    @api message='message'
    @api mail='mail'
    handleEvent(){
        const eventS = new CustomEvent("changes",{
            bubbles:true,
            composed:false
        })
        this.dispatchEvent(eventS)
        console.log('dispached Event')
    }
    
}
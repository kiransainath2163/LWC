import { LightningElement, api } from 'lwc';

export default class ChildCompEvent extends LightningElement {
    @api message='Hello'
    @api childfunc(){
        console.log('Message:'+this.message)
    }
}
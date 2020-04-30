import { LightningElement } from 'lwc';

export default class PropDemo extends LightningElement {
    message="Non-reactive Property"
    handleChange(){
        this.message = 'Changed to Reactive Property'
    }
    get name(){
        return 'Hello'
    }
}
import {
    LightningElement, api, track
} from 'lwc';
 
export default class Hello2 extends LightningElement {
    @track inputMessage = 'World';
 
    handleChange(event) {
        console.log('event.target.value' + event.target.value);
        this.inputMessage = event.target.value;
    }
}
import { LightningElement } from 'lwc';

export default class ParentComp extends LightningElement {
    
    handleSimpleEvent(event){
        console.log('message: '+event.target.message)
        console.log('mail: '+event.target.mail)
        alert('message '+event.target.message)
        alert('Mail: ',+event.target.mail)
    }
}
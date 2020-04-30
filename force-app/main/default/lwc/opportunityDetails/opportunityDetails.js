import { LightningElement, api } from 'lwc';

export default class OpportunityDetails extends LightningElement {
    @api recordId
    @api objectApiName
    constructor(){
        super()
        console.log('RecordId '+this.recordId)
        console.log('ObjectAPIName '+this.objectApiName)
    }
}
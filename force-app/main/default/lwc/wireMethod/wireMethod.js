import { LightningElement, wire, api, track } from 'lwc';
import getAllCases from '@salesforce/apex/CaseController.getAllCases';
export default class WireMethod extends LightningElement {
    @api records
    @api errors
    @track subject

    handleChange(event){
        const sVal = event.target.value
        this.subject=sVal
    }
    @wire(getAllCases,{subject:'$subject'})
        handleWire({data,error}){
            if(data){
                this.records=data
                this.errors=undefined
            }
            if(error){
                this.records=undefined
                this.errors=error
            }
        }


    // get hello(){
    //     return console.log(JSON.stringify(cases.error));
    // }
}

    
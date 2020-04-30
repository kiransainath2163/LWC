import { LightningElement, api, track } from 'lwc';
import getAllCases from '@salesforce/apex/CaseController.getAllCases'
export default class ApexImperativeMethod extends LightningElement {
    @api results
    @api errors
    @api keyword
    handleChange(event){
        const sVal = event.target.value
        getAllCases({subject:sVal}).then(result =>{
            console.log('Result:',result)
            this.results=result
        }).catch(error=>{
            console.log('Error:',error)
            this.errors=error
        })
    }
}
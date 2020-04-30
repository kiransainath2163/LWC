import { LightningElement, track, api } from 'lwc';
import LookupControllerLWC from '@salesforce/apex/LookupControllerLWC.findRecords'
export default class CustomLookup extends LightningElement {
    @api objectName
    @api fieldName
    @track records
    @track errors
    handleSearch(event){
        
        const searchValue=event.detail
        LookupControllerLWC({
            objectName:this.objectName,
            fieldApiName:this.fieldName,
            SearchValue:searchValue
        }).then(result=>{
            console.log('Records are: '+JSON.stringify(result));
            this.records=result
            this.errors=undefined
        }).catch(error=>{
            this.errors=error
            this.records=undefined  
        })
    }
}
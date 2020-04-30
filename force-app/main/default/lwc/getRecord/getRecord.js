import { LightningElement, api, wire } from 'lwc';
import { getRecord, createRecord } from 'lightning/uiRecordApi'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import NAME_FIELD from '@salesforce/schema/Account.Name'
export default class GetRecord extends LightningElement {
    @api recordId
    @wire(getRecord,{recordId:'$recordId',
                layoutTypes:['Full','Compact'],
                modes:['View','Edit','Create']})
        wiredRecord({data,error}){
            if(data){
                console.log('Record Info', data);
                console.log('Mailing Street Info',data.fields.MailingStreet.value)
            }
            if(error){
                console.log(error);
            }
        }
    handleCreate(){
        const fields={}
        console.log('Name Field',NAME_FIELD.fieldApiName);
        fields[NAME_FIELD.fieldApiName] = 'SFDCPanther';
        console.log('Account OBJECT',ACCOUNT_OBJECT);
        const accountRecord = {apiName:ACCOUNT_OBJECT.objectApiName ,fields:fields}
        createRecord(accountRecord).then(result=>{
            const id = result.id
            alert('Record Created '+id)
        }).catch(error=>{
            console.log('Error:',error);
        })
    }

}
import { LightningElement, wire, api } from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi'
import ACCOUNT_OBJECT from '@salesforce/schema/Account'
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry'
export default class ObjectInfoApi extends LightningElement {
    @api pickval
    @api value
    @wire(getPicklistValues,{recordTypeId:'012000000000000AAA', fieldApiName: INDUSTRY_FIELD})
        wiredField({error, data}){
            if(data){
                this.pickval=data.values
            }
        }
    
}
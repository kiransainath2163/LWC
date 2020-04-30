import { LightningElement, wire, api, track } from 'lwc';
import { getPicklistValues } from 'lightning/uiObjectInfoApi'
import PRIORITY_FIELD from '@salesforce/schema/Case.Priority'
import STATUS_FIELD from '@salesforce/schema/Case.Status'
import ORIGIN_FIELD from '@salesforce/schema/Case.Origin'
export default class QuickCase extends LightningElement {
    @api subject
    @api description
    @track status
    @track origin
    @track priority
    @api inputStatus
    @api inputOrigin
    @api inputPriority
    @wire(getPicklistValues,{recordTypeId: '012000000000000AAA',fieldApiName:PRIORITY_FIELD})
        priorityValues({error, data}){
            if(data){
                this.priority=data.values
            }
            if(error){
                this.priority=error
            }
        }
    @wire(getPicklistValues,{recordTypeId: '012000000000000AAA',fieldApiName:STATUS_FIELD})
        statusValues({error,data}){
            if(data){
                this.status=data.values
            }
            if(error){
                this.status=error
            }
        }
    @wire(getPicklistValues,{recordTypeId: '012000000000000AAA',fieldApiName:ORIGIN_FIELD})
        originValues({error, data}){
            if(data){
                this.origin=data.values
            }
            else{
                this.origin=error
            }
        }
    handleChange(event){
        let label=event.target.label
        let val=event.target.value
        if(label==='Case Subject'){
            this.subject=val
            console.log('Subject: '+this.subject)
        }
        else if(label==='Status'){
            this.inputStatus=val
            console.log('Status: '+this.inputStatus)
        }
        else if(label==='Origin'){
            this.inputOrigin=val
            console.log('origin: '+this.inputOrigin);
        }
        else if(label==='Priority'){
            this.inputPriority=val
            console.log('Priority: '+this.inputPriority);
        }
        else if(label==='Case Description'){
            this.description=val
            console.log('Description: '+this.description);

        }
    }
    handleCreate(){
        console.log('Status: '+this.inputStatus)
    }
}
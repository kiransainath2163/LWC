import { LightningElement } from 'lwc';
import {hello} from './test.js'
export default class ParentCompEvent extends LightningElement {
    message = hello
    handleEvent(){
        this.template.querySelector('c-child-comp-event').childfunc();
        console.log('Hello',this.message)
    }
}
import { LightningElement, api } from 'lwc';

export default class ToDoItem extends LightningElement {
    @api
    itemName='Default'

    @api
    showToDo=false
}
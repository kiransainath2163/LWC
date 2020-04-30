public with sharing class LookupControllerLWC {
    public LookupControllerLWC() {

    }

    @AuraEnabled(cacheable = true)
    public static List<sObject> findRecords(String objectName, String fieldApiName, String SearchValue){
        String key='%'+SearchValue+'%';
        String query='select Id, '+fieldApiName+' from '+objectName+' where '+fieldApiName+' LIKE :key';
        List<sObject> sObjectList = Database.query(query);
        return sObjectList;
    }
}

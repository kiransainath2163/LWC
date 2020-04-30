public with sharing class CaseController {
    public CaseController() {

    }
    @AuraEnabled(cacheable=true)
    public static List<Case> getAllCases(String subject){
        String key = '%'+subject+'%';
        List<Case> caseList=[select Id,subject,status,origin from case where subject like :key];
        return caseList;
    }
}

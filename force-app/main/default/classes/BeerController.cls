public with sharing class BeerController {
    public BeerController() {

    }
    public static String generateCartId(){
        String CharList = 'abcdefghijklmnopqrstuvexyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_';
        Integer position;
        Integer LengthRequired = 30;
        String res = '';
        for(Integer i=0; i<=LengthRequired; i++){
            position=Integer.valueOf(String.valueOf(Math.roundToLong(CharList.length()*Math.random())))-1;
            res+=CharList.substring(position,position+1);
        }
        return res;
    }
    public static Coupon__c getCouponInformation(String name){
        Coupon__c coup = [select Id, name, price__c
                            from Coupon__c where Expired__c=false and Name=:name];
        return coup;
    }
    @AuraEnabled(cacheable=false)
    public static string getCartId(){
        List<Cart__c> cartInfo = [ Select Id, Name 
                                FROM Cart__c 
                                Where User__c =: UserInfo.getUserId()
                                AND Cart_Status__c = 'Open'
                                AND Is_Active__c = true];
        if (cartInfo != null && cartInfo.size() > 0) {
            List<Cart_Item__c> cartItems = new list<Cart_Item__c>();
            cartItems = [Select Id, Name, Beer__c, Cart__c, Item_Quantity__c, Item_Amount__c
                                FROM Cart_Item__c
                                Where Cart__c =: cartInfo.get(0).Id];
            
            Decimal itemQnty = 0;
            for (Cart_Item__c item : cartItems) {
                itemQnty = itemQnty + item.Item_Quantity__c;
            }
            CartWrapper wrapper = new CartWrapper();
            wrapper.CartId = cartInfo.get(0).Id;
            wrapper.items = cartItems;
            wrapper.Count = itemQnty;
            return JSON.serialize(wrapper);
        } else { 
            Cart__c defaultCart = new Cart__c();
            Coupon__c coupon = getCouponInformation('Default');
            defaultCart.Cart_Id__c = String.valueOf(Math.random());
            defaultCart.Cart_Status__c = 'Open';
            defaultCart.Is_Active__c = true;
            defaultCart.Coupon__c = coupon.Id;
            defaultCart.User__c = UserInfo.getUserId();
            insert defaultCart;
            CartWrapper wrapper = new CartWrapper();
            wrapper.CartId = defaultCart.Id;
            wrapper.items = null;
            wrapper.Count = 0;
            return JSON.serialize(wrapper);
        }                        
    }

    @AuraEnabled
    public static string createCartItems(String CartId, String BeerId, Decimal Amount){
        Cart_Item__c item = new Cart_Item__c();
        item.Beer__c = BeerId;
        item.Cart__c = CartId;
        item.Item_Quantity__c=1;
        item.Item_Amount__c = Amount;
        insert item;
        return item.id;
    }


    @AuraEnabled(cacheable=true)
    public static list<sObject> searchBeer(String searchParam){
        String likeParam='%'+searchParam+'%';
        String Query = '';
        if(searchParam!=null){
            Query='Select id,Name, Alcohol__C, brewery_id__c, brewery_Name__c, Id__c, Image__c, Price__c from Beer__c where Name Like :likeParam LIMIT 50';
        }else{
            Query='Select id,Name, Alcohol__C, brewery_id__c, brewery_Name__c, Id__c, Image__c, Price__c from Beer__c LIMIT 50';
        }
        List<Beer__c> sObjectList = Database.query(Query);
        return sObjectList;
    }

    public class CartWrapper {
        @AuraEnabled
        public String CartId                { get; set; }
        @AuraEnabled
        public Decimal Count                { get; set; }
        @AuraEnabled
        public List<Cart_Item__c> items     { get; set; }
    }
}

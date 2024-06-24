import { User } from "./User";

export abstract class Statics {
    //public static siteUrlApi: string = "https://www.chudisoft.com/api";
    public static siteUrlApi: string = "https://localhost/Chudisoft/api";
    // public static siteUrl: string = "https://chudisoft.com/";
    public static siteUrl: string = "https://irb-e.com/";
    public static user: User = new User();
    public static refLink: string = Statics.siteUrl + "/Register?ref=" + Statics.user.Username;
    // public static SiteName: string = "Chudisoft.com";
    public static SiteName: string = "irb-e.com";
    public static SiteLogo: string = Statics.siteUrl + "assets/images/logo.png";
    
    constructor() {
        
    }
}
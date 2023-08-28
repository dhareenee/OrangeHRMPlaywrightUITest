class DashboardPage{

    constructor(page){

        this.page=page;
        this.searchFieldInNavigator=this.page.locator("input[placeholder='Search']");
        this.loginUserName=this.page.locator("p[class*=oxd-userdropdown-name]");
        this.loginUserDropDown=this.page.locator("i[class*='oxd-userdropdown-icon']");
        this.aboutModal=this.page.locator("div[class*='orangehrm-about']");
        this.supportPageContent=this.page.locator("div[class*='orangehrm-background-container']");
        
        


    }


    async widgetVisibelyCheck(widgetName){
        const widgetNames=this.page.locator(`div.orangehrm-dashboard-widget-name:has-text("${widgetName}")`);
       return widgetNames.isVisible();
    }

    async searchInDashboard(moduleName){
       await this.searchFieldInNavigator.fill(moduleName);
    }

    async getLoginUserName(){
        return await this.loginUserName.textContent();
    }

    async clickOnLoginProfileDropdown(){
        await this.loginUserDropDown.click();
    }

    async navFromDashToMenu(MenuName) {
        const iconLocators = await this.page.$$("a[class*='oxd-userdropdown-link']");
        
        for (const iconLocator of iconLocators) {
            const iconText = await iconLocator.textContent();
            
            if (iconText.includes(MenuName)) {
                await iconLocator.click();
                break; 
            }
        }
    }
    

    async validModalAbout(){
        const modelContent=await  this.aboutModal.textContent();
        return modelContent;
        
    }

    async validSupportPageContent(){
       const supportModal= await this.supportPageContent.textContent();
       return supportModal;
    }

}


module.exports={DashboardPage};
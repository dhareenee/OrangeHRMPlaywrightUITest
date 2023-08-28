class CommonPage {
    constructor(page) {
        this.page = page;
        //this.appNavModules=this.page.locator(".oxd-main-menu-item-wrapper");
        this.topBarfilters = this.page.locator(".oxd-topbar-body-nav li");
        this.topBarDropdown = this.page.locator(".oxd-dropdown-menu li");
        this.filterHeader = this.page.locator("h5[class='oxd-text oxd-text--h5 oxd-table-filter-title']");
        this.headerTable = this.page.locator("li[class*='oxd-topbar-body-nav-tab']");
        this.headerTableDropDown = this.page.locator("ul[class*='oxd-dropdown-menu'] li");
        this.moduleHeaderTitle=this.page.locator(".oxd-topbar-header-breadcrumb-module");


    }


    async openModule(moduleName) {
        const module = await this.page.locator(`span.oxd-text.oxd-text--span.oxd-main-menu-item--name:has-text("${moduleName}")`);
        module.click();
        await this.page.waitForLoadState('networkidle');
        await this.filterHeader.waitFor();


    }
    async getModuleHeaderTitleLocator(){
     return await this.moduleHeaderTitle;
    }


    async selectTablefromHeader(parentTable, childTable) {
       // const header= this.page.locator("li[class*='oxd-topbar-body-nav-tab']");
        for (let i = 0; i < await this.headerTable.count(); i++) {
         const headerItem = this.headerTable.nth(i);
         const headerTableName = await headerItem.textContent();
         
         if(headerTableName===parentTable){
         
           await headerItem.click();
           //let dropdown=this.page.locator("ul[class*='oxd-dropdown-menu'] li");
           //if(await dropdown.isVisible()){
             for(let j=0;j<await this.headerTableDropDown.count();j++){
               let dropdownName=await this.headerTableDropDown.nth(j).textContent();
               if(dropdownName===childTable){
                 await this.headerTableDropDown.nth(j).click();
                 break;
               }
             }
           //}
           break;
         }
       
        }
    }


    async selectTablefromHeader(parentTable) {
        for (let i = 0; i < await this.headerTable.count(); i++) {
            const headerItem = this.headerTable.nth(i);
            const headerTableName = await headerItem.textContent();

            if (headerTableName.trim() === parentTable.trim()) {

                await headerItem.click();
                break;
            }

        }


    }


    

}


module.exports = { CommonPage }




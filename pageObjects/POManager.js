const { LoginPage } = require("./LoginPage");
const{DashboardPage}=require("./DashboardPage");
const{CommonPage}=require("./CommonPage");
const {AdminPage} = require("./AdminPage");

class POManager
{
constructor(page)
{
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage=new DashboardPage(this.page);
    this.commonPage=new CommonPage(this.page);
    this.adminPage=new AdminPage(this.page);


    }


    getLoginPage(){
        return this.loginPage;
    }

    getDashBoard(){
        return this.dashboardPage;
    }
    getCommonPage(){
        return this.commonPage;
    }
    getAdminPage(){
        return this.adminPage;
    }
}


module.exports={POManager};
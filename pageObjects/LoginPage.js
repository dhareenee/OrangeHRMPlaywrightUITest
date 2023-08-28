class LoginPage{
    constructor(page){

        this.page=page;
        this.loginTitle=this.page.locator(".orangehrm-login-title");
        this.loginDetailsUserName=this.page.locator("p[class$='oxd-text oxd-text--p']:nth-child(1)");
        this.loginDetailsPassword=this.page.locator("p[class$='oxd-text oxd-text--p']:nth-child(2)");
        this.userName=this.page.locator("input[name='username']");
        this.password=this.page.locator("input[name='password']");
        this.submitBtn=this.page.locator(".orangehrm-login-button");
        this.forgetPwdLink=this.page.locator(".orangehrm-login-forgot-header");
        this.copyWrightText=this.page.locator("p[class*='orangehrm-copyright']:nth-child(1)");
        this.copyWrightText1=this.page.locator("p[class*='orangehrm-copyright']:nth-child(2)");
        this.invalidAlert=this.page.locator(".oxd-alert-content-text");
       
        this.forgetEmailMsg=this.page.locator(".orangehrm-card-container");
        this.resetBtn=this.page.locator(".orangehrm-forgot-password-button--reset");
        this.resetEmail=this.page.locator("input[placeholder='Username']");

    }
async launchWebsite(){
    await this.page.goto("https://opensource-demo.orangehrmlive.com/");
    await this.page.waitForLoadState('networkidle')
}

    async fetchLoginDetails(){
        await this.loginTitle.waitFor();
        const fuserName = await this.loginDetailsUserName.textContent();
        const trimUserName = fuserName.split(':')[1].trim(); 
        const fPassword = await this.loginDetailsPassword.textContent();
        const trimPassword = fPassword.split(':')[1].trim(); 
        return [trimUserName, trimPassword]
}





async validUserLogin(){
    const details=await this.fetchLoginDetails();
    await this.userName.fill(details[0]);
    await this.password.fill(details[1]);
    await this.submitBtn.click();
    await this.page.waitForLoadState('networkidle')
    await this.page.on('dialog',async dialog =>{
        await dialog.accept();
    })
   
    
    
}


async inValidUserLogin(userName,Password){

    await this.userName.fill(userName);
    await this.password.fill(Password);
    await this.submitBtn.click();
    const InvalidAlert=this.invalidAlert.textContent();
    return InvalidAlert;

}


async resetPassword(userEmail){
    await this.forgetPwdLink.click();
    await this.resetEmail.fill(userEmail);
    await this.resetBtn.click();
    const forgetMsg= await this.forgetEmailMsg.textContent();
    return forgetMsg;

}


    


}

module.exports={LoginPage};
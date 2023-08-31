const{test,expect}=require('@playwright/test')
const{POManager}=require('../pageObjects/POManager')

test('UserTable Validation',async ({page})=>{

    await page.goto("https://opensource-demo.orangehrmlive.com/");
    await page.waitForLoadState('networkidle');
    await page.locator("input[name='username']").fill('Admin');
    await page.locator("input[name='password']").fill('admin123');
    await page.locator(".orangehrm-login-button").click();
    await page.waitForLoadState('networkidle');
    const dashboard = await page.locator("span.oxd-text.oxd-text--span.oxd-main-menu-item--name:has-text('Admin')");
   await dashboard.click();
   await page.waitForLoadState('networkidle');
  await page.locator("h5[class='oxd-text oxd-text--h5 oxd-table-filter-title']").waitFor();
   const rows=page.locator('div[class*=oxd-table-body] div[class*=oxd-table-card]');

    

      for (let i = 0; i < await rows.count(); i++) {
        const nameCell = page.locator('div[class*=oxd-table-body] div[class*=oxd-table-card]:nth-child(' + (i + 1) + ') div[class*=oxd-table-cell]:nth-child(2)');
        const names = await nameCell.innerText();
       if(names==='Admin')
       {
       let editbtn= page.locator("div[class*=oxd-table-body] div[class*=oxd-table-card]:nth-child(" + (i + 1) + ") button[class*='oxd-icon-button']:nth-child(2)");
editbtn.click();
break;
await page.waitForLoadState('networkidle');
       }
    }
});



test("Table and Child Table selection",async ({browser})=>{
  
  const context = await browser.newContext();
       const  page = await context.newPage();
        const poManager =  new POManager(page);
        const loginPageTest = poManager.getLoginPage();
        await loginPageTest.launchWebsite();
        
        await loginPageTest.fetchLoginDetails();
        await loginPageTest.validUserLogin();
        const commonPage=await poManager.getCommonPage();
        await commonPage.openModule("Admin");
        await page.pause();
        await commonPage.selectTablefromHeader('Organization ','Locations')
       
})


test ('HomePage to Module Navigation test',async({page})=>{


  await page.goto("https://opensource-demo.orangehrmlive.com/");
  await page.waitForLoadState('networkidle');
  await page.locator("input[name='username']").fill('Admin');
  await page.locator("input[name='password']").fill('admin123');
  await page.locator(".orangehrm-login-button").click();
  await page.waitForLoadState('networkidle');
  const dashboard = await page.locator("span.oxd-text.oxd-text--span.oxd-main-menu-item--name:has-text('Admin')");
 await dashboard.click();
 await page.waitForLoadState('networkidle');
 page.pause();
 const header= page.locator("li[class*='oxd-topbar-body-nav-tab']");
 for (let i = 0; i < await header.count(); i++) {
  const headerItem = header.nth(i);
  const headerTableName = await headerItem.textContent();
  
  if(headerTableName==="Job "){
  
    await headerItem.click();
    let dropdown=page.locator("ul[class*='oxd-dropdown-menu'] li");
    //if(await dropdown.isVisible()){
      for(let j=0;j<await dropdown.count();j++){
        let dropdownName=await dropdown.nth(j).textContent();
        if(dropdownName==='Employment Status'){
          await dropdown.nth(j).click();
          break;
        }
      }
    //}
    break;
  }

 }

})


test('HomePage Menu Option Validation',async({browser})=>{
  const context = await browser.newContext();
  const  page = await context.newPage();
   const poManager =  new POManager(page);
   const loginPageTest = poManager.getLoginPage();
   await loginPageTest.launchWebsite();
   
   await loginPageTest.fetchLoginDetails();
   await loginPageTest.validUserLogin();
   const commonPage=poManager.getCommonPage();
   const titleLocator=await commonPage.getModuleHeaderTitleLocator();
   const title= await titleLocator.textContent();
   //expect(title).toEqual('Dashboard');
   const dashboardPage=await poManager.getDashBoard();
   await dashboardPage.widgetVisibelyCheck('Time at Work');
   await dashboardPage.clickOnLoginProfileDropdown();
  await dashboardPage.navFromDashToMenu('About');
  const model=await dashboardPage.validModalAbout();
  expect(model).toContain('OrangeHRM');
})

test('Validate About Page Content',async({page})=>{

  
   const poManager =  new POManager(page);
   const loginPageTest = poManager.getLoginPage();
   await loginPageTest.launchWebsite();
   
   await loginPageTest.fetchLoginDetails();
   await loginPageTest.validUserLogin();
   const dashboardPage=await poManager.getDashBoard();
   await dashboardPage.clickOnLoginProfileDropdown();
  await dashboardPage.navFromDashToMenu('About');
  const content=await page.locator("div[class*='orangehrm-about']").textContent();
  console.log(content);

})

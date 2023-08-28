class AdminPage {
    constructor(page) {
        this.page = page;
        this.filterRestBtn = this.page.locator('.oxd-button--ghost');
        this.filterSaveBtn = this.page.locator('.orangehrm-left-space');
        this.addBtn = this.page.locator("div[class*='orangehrm-header-container'] [class*='oxd-button--secondary']");
        this.rows = this.page.locator('div[class*=oxd-table-body] div[class*=oxd-table-card]');


    }


    async openTheUserRecord(userName) {
        for (let i = 0; i < await this.rows.count(); i++) {
            const nameCell = this.page.locator('div[class*=oxd-table-body] div[class*=oxd-table-card]:nth-child(' + (i + 1) + ') div[class*=oxd-table-cell]:nth-child(2)');
            const names = await nameCell.innerText();
            if (names === userName) {
                let editbtn = this.page.locator("div[class*=oxd-table-body] div[class*=oxd-table-card]:nth-child(" + (i + 1) + ") button[class*='oxd-icon-button']:nth-child(2)");
                editbtn.click();
                break;
                await page.waitForLoadState('networkidle');

            }
        }





    }
}

module.exports = {AdminPage}
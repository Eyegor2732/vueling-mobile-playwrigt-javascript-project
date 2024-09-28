"use strict";

class BagsServicePage {  

    constructor(page) {
        this.page = page;
        this.continueButton = page.locator('[class="common-button__label ng-star-inserted"]').last();
    }

    async navigateToServicesPage() {
        await this.page.waitForTimeout(5000);
        await this.continueButton.click();
    }  
      
}

module.exports = {BagsServicePage};
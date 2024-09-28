"use strict";

class ServicesPage {
    
    constructor(page) {
        this.page = page;
        this.continueButton = page.getByRole('button').filter({hasText: "Continue"});
    }

    async navigateToPaymentPage() {
        await this.continueButton.click();
    }
    
}

module.exports = {ServicesPage};
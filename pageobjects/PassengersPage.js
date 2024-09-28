"use strict";

class PassengersPage {
    
    constructor(page) {
        this.page = page;
        this.continueLink = page.locator('.push-vueling-stv-container__footer.ng-star-inserted span').filter({hasText: "Continue"});
        this.firstnameInput = page.locator('[data-placeholder="Name"]');
        this.surnameInput = page.locator('[data-placeholder="Surname"]');
        this.countrylistDropdown = page.locator('[data-placeholder="Country"]');
        this.prefixlistDropdown = page.locator('[data-placeholder="Prefix"]');
        this.phoneInput = page.locator('[data-placeholder="Mobile"]');  
        this.emailInput = page.locator('[data-placeholder="Email"]');
        this.okButton = this.continueButton = page.getByRole('button').filter({hasText: "Ok"});
        this.continueButton = page.getByRole('button').filter({hasText: "Continue"});
    }

    async enterPassengersInfo(name, surname, country, phone, email) {
        await this.continueLink.click();
        await this.firstnameInput.last().fill(name); 
        await this.surnameInput.last().fill(surname);
        await this.countrylistDropdown.pressSequentially(country,{delay:50});
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.up('Enter');
        await this.prefixlistDropdown.pressSequentially(country,{delay:50});
        await this.page.keyboard.press('Enter');
        await this.page.keyboard.up('Enter');
        await this.phoneInput.last().fill(phone);
        await this.emailInput.last().fill(email);
        await this.firstnameInput.first().fill(name); 
        await this.surnameInput.first().fill(surname);
        await this.continueButton.click();
        await this.okButton.click();
    }
    
}

module.exports = {PassengersPage};
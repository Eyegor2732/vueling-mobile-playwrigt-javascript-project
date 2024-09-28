//"use strict";

class SchedulePage {
    
    constructor(page) {
        this.page = page;
        this.priceButton = page.locator('.card-container__price');
        this.flylightButton = page.locator('button').filter({hasText: " +€0.00 "});
        this.flyGrandeButton = page.locator('.recommended .mat-button-base.mat-primary');
        this.continueButton = page.getByRole('button').filter({hasText: "Continue"});
        this.totalInteger = page.locator('#totalPrice .price-currency__amount');
        this.totalDecimal = page.locator('#totalPrice .price-currency__decimals');
        this.passengersinformationAmount = page.locator('#SBSidebarView_totalPriceSpan');
        this.totalFooter = page.locator('.total');
    }
    
    async getPassengersTotalAmount () {
        return (await this.totalPrice()).toFixed(2);
    }

    async totalPrice(){
        const tp = (await this.totalFooter.textContent()).trim().split('€')[1];
        return parseFloat(tp);
    }
    async onTopPrice(){
        const otp = (await this.flyGrandeButton.textContent()).trim().split('€')[1];
        return parseFloat(otp);
    }

    async scheduleFlights() {
        await this.priceButton.first().click();
        await this.priceButton.first().click();
        await this.flyGrandeButton.scrollIntoViewIfNeeded();
        const bp = await this.totalPrice();
        const otp = await this.onTopPrice();
        await this.flyGrandeButton.click();      
        const totalAmount = (bp + otp).toFixed(2);
        await this.continueButton.click();

        return totalAmount;
    }
    
}

module.exports = {SchedulePage};
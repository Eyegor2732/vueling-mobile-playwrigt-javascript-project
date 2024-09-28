"use strict";

class PaymentPage {
    
    constructor(page) {
        
        this.page = page;
        this.cardButton = page.locator('.ds-icon-credit-card-front');
        this.cardnumberInput = page.locator('//input[@id="card-number"]');
        this.cardholderInput = page.locator('//input[@formcontrolname="holderName"]');
        this.expiryInput = page.locator('//input[@formcontrolname="expiration"]');
        this.cvvInput = page.locator('//input[@formcontrolname="cvv"]');
        this.acceptRadio = page.locator('.mat-radio-outer-circle');
        this.conditionsToggle = page.locator('.mat-slide-toggle-bar.mat-slide-toggle-bar-no-side-margin');
        this.payNowButton = page.getByRole('button').filter({hasText: "Pay now"});
        this.totalFooter = page.locator('.total');
        this.safLabel = page.locator('.saf-items__label');
    }

    async getActualPrice() {
        return (await this.totalPrice()).toFixed(2);
    }

    async totalPrice(){
        const tp = (await this.totalFooter.textContent()).trim().split('€')[1];
        return parseFloat(tp);
    }

    async safCost() {
        const sc = (await this.safLabel.textContent()).trim().split('€')[1].split(")")[0]
        return parseFloat(sc);
    }

    async enterCCDataPay(cardNumber, cardHolder, expiry, cvv) {
        await this.cardButton.click();
        // await this.cardnumberInput.pressSequentially(cardNumber, {delay: 100});
        // await this.cardholderInput.pressSequentially(cardHolder, {delay: 100});
        // await this.expiryInput.pressSequentially(expiry, {delay: 100});
        // await this.cvvInput.pressSequentially(cvv, {delay: 100});
        if(await this.acceptRadio.isVisible()) {
            await this.acceptRadio.click();
        };
        const bp = await this.totalPrice();
        await this.conditionsToggle.first().click();
        await this.conditionsToggle.last().click();
        const sc = await this.safCost();
        const finalAmount = (bp + sc).toFixed(2);
        await this.payNowButton.click();
        return finalAmount;
    }

}

module.exports = {PaymentPage};
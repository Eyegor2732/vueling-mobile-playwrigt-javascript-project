"use strict";

const { BaseTest } = require("./BaseTest");

class HomePage  extends BaseTest{
    
    constructor(page) {
        super(page);
        this.page = page;
        this.acceptButton = page.locator('#onetrust-accept-btn-handler');
        this.fromButton = page.locator('.mat-ripple.searcher__departure');
        this.originSearch =  page.getByPlaceholder('Search for a city or country');
        this.originDropdown = page.locator('.station-data__name-country__name-connection__name');
        this.destinationSearch = page.getByPlaceholder('Search for a city or country');
        this.destinationDropdown = page.locator('.station-data__iata');
        this.chooseOutboundDateButton = page.locator('.date-selector__input-label').filter({hasText: 'Outbound'});
        this.nextMonthChevron = page.locator('[aria-label="Next Month"]');
        this.outboundDateButton = page.locator('[role="gridcell"][tabindex="-1"]').first();
        this.chooseReturnDateButton = page.locator('[role="gridcell"][tabindex="-1"]').nth(30);
        this.continueButton = page.getByRole('button').filter({hasText: "Continue"});
        this.passengersInput = page.locator('.mat-ripple.passenger-container');
        this.adultIncreaseButton = page.locator('#addIconAdult');
        this.adultTitle = page.locator('.container-general__passenger-container__controls-amount__amount').first();
        this.confirmButton = page.getByRole('button').filter({hasText: "Confirm"});
        this.searchButton = page.getByRole('button').filter({hasText: "Search"});
    }
    
    async launchHomeEnterFlightInfo(originSearch,originResult, destinationSearch, destinationResult, adultPassengers) {
        await this.goto('/');
        await this.acceptButton.click();
        await this.fromButton.click();
        await this.originSearch.pressSequentially(originSearch);
        await this.originDropdown.filter({hasText: originResult}).click();
        await this.originSearch.pressSequentially(destinationSearch);
        await this.destinationDropdown.filter({hasText: destinationResult}).click();
        await this.chooseOutboundDateButton.click();
        await this.outboundDateButton.click();
        await this.nextMonthChevron.click();
        await this.chooseReturnDateButton.click();
        await this.continueButton.click();
        await this.passengersInput.click();
        await this.addAdultPassengers(adultPassengers);
        await this.confirmButton.click();
        await this.searchButton.click();
    }

    async addAdultPassengers(adultPassengers) {
        let i = 1;
        while (parseInt(await this.adultTitle.textContent()) < parseInt(adultPassengers)) {
            await this.adultIncreaseButton.click();
            i++;
        }
    }
    
}

module.exports = {HomePage};
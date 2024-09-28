"use strict";

const { test, expect} = require('@playwright/test');
const {PageObjectsManager} = require('../pageobjects/PageObjectsManager');
const dataSet = JSON.parse(JSON.stringify(require('../utils/Booking.json')));

test.afterEach('Tear down each', async ({page}) => {
    if(!page.isClosed()) await page.close();
}); 

test.afterAll('Tear down all', async ({browser}) => {
    if(browser.isConnected()) await browser.close(); 
}); 

for (const data of dataSet){
    test('Ticket Booking end-to-end', async ({page}) => {
        const poManager = new PageObjectsManager(page)
        const homePage = poManager.getHomePage()
        const schedulePage = poManager.getSchedulePage();
        const passengersPage = poManager.getPassengersPage();
        const seatservicePage = poManager.getSeatservicePage();
        const bagsservicePage = poManager.getBagsservicePagePage();
        const servicesPage = poManager.getServicesPage();
        const paymentPage = poManager.getPaymentPage();

        // Launching the Home page
        await homePage.launchHomeEnterFlightInfo(data.originSearch, data.originResult, data.destinationSearch, data.destinationResult, data.adultPassengers);

        // Schedule Page - https://m.vueling.com/SB
        const scheduleTotalAmount = await schedulePage.scheduleFlights();

        // Assertions - total amount before adding servces on passengers page is equql to total amount on schedule page
        const actualBaseOntopPrice = await schedulePage.getPassengersTotalAmount();
        expect(actualBaseOntopPrice).toEqual(scheduleTotalAmount);

        // Passengers Information Page - https://m.vueling.com/SB/Passengers
        await passengersPage.enterPassengersInfo(data.name, data.surname, data.country, data.phone, data.email);

        // Seat Service Page - https://tickets.vueling.com/SeatService.aspx
        await seatservicePage.selectSeats();
    
        // Bags Service Page - https://m.vueling.com/SB/Baggage
        await bagsservicePage.navigateToServicesPage();
        
        //  Services Page - https://m.vueling.com/SB/Personalize
        await servicesPage.navigateToPaymentPage();

        //  PaymentPage - https://m.vueling.com/SB/Payment
        const finalAmount = await paymentPage.enterCCDataPay(data.cardNumber, data.cardHolder, data.expiry, data.cvv);
        
        // Assertions actual total price in Credit Card payment is equal to final price
        const actualPrice = await paymentPage.getActualPrice();
        expect(actualPrice).toEqual(finalAmount);
    });
}
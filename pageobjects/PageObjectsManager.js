"use strict";

const {HomePage} = require('./HomePage');
// const {FindYourFlightPage} = require('./FindYourFlightPage')
const {SchedulePage} = require('./SchedulePage')
const {PassengersPage} = require('./PassengersPage')
const {SeatservicePage} = require('./SeatservicePage')
const {BagsServicePage} = require('./BagsServicePage')
const {ServicesPage} = require('./ServicesPage')
const {PaymentPage} = require('./PaymentPage')

class PageObjectsManager {

    constructor(page) {
        this.page = page;
        this.homePage = new HomePage(this.page, this.url);
        this.schedulePage = new SchedulePage(this.page);
        this.passengersPage = new PassengersPage(this.page);
        this.seatservicePage = new SeatservicePage(this.page)
        this.bagsservicePage = new BagsServicePage(this.page)
        this.servicesPage = new ServicesPage(this.page)
        this.paymentPage = new PaymentPage(this.page)
    }

    getHomePage() {
        return this.homePage;
    }

    getSchedulePage() {
        return this.schedulePage;
    }

    getPassengersPage() {
        return this.passengersPage;
    }
    getSeatservicePage() {
        return this.seatservicePage;
    }

    getBagsservicePagePage() {
        return this.bagsservicePage;
    }

    getServicesPage() {
        return this.servicesPage;
    }

    getPaymentPage() {
        return this.paymentPage;
    }

}

module.exports = {PageObjectsManager};
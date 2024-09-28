"use strict";

class SeatservicePage {
    
    constructor(page) {
        this.page = page;
        this.connectionFlights = page.locator('.segment-iatas')
        this.assignableSeats = page.locator('[data_assignable="true"]'); 
        this.continueButton = page.getByRole('button').filter({hasText: "Continue"}); 
        this.nextFlightButton = page.getByRole('button').filter({hasText: "Next flight"});                     
    }
    
    async getPassengersTotalAmount () {
        return parseFloat((await this.passengersinformationAmount.textContent()).split(' ')[0]);
    }

    async selectSeats() {
        await this.connectionFlights.nth(0).waitFor();
        
        const connectionsCount1 = await this.connectionFlights.count();
        for (let i=1; i<=connectionsCount1; i++){
            await this.nextFlightButton.click();
        }

        const connectionsCount2 = await this.connectionFlights.count();
        for (let i=1; i<connectionsCount2; i++){
            await this.nextFlightButton.click();
        }

        await this.continueButton.click();
    }
    
}

module.exports = {SeatservicePage};
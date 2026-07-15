class ShippingPage {

    constructor(page) {
        this.page = page;
        this.shippingSectionTitle = page.locator('.rw-panel-title');
        this.nameInput = page.locator("input[name='name']");
        this.addressInput = page.locator("input[name='address1']");
        this.cityInput = page.locator("input[name='city']");
        this.postalInput = page.locator("input[name='postal']");
    }

    //Method to get the shipping section title

    async getShippingSectionTitle() {
        return await this.shippingSectionTitle.first().textContent();
    }

    async fillShippingDetails(name, address, city, postal) {
        // Clear and fill name field
        await this.nameInput.clear();
        await this.nameInput.fill(name);
        
        // Clear and fill address field
        await this.addressInput.clear();
        await this.addressInput.fill(address);
        
        // Clear and fill city field
        await this.cityInput.clear();
        await this.cityInput.fill(city);
        
        // Clear and fill postal field
        await this.postalInput.clear();
        await this.postalInput.fill(postal);
    }
}

module.exports = { ShippingPage };
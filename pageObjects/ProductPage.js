class ProductPage {
    
    constructor(page) {
        this.page = page;
        this.productMenu = page.locator("a[href='/app/products']");
        this.productPageTitle = page.locator('.rw-eyebrow');
        this.searchBarInput = page.getByPlaceholder('Search products, categories…');
        this.cartPageTitle = page.locator('.rw-h2');
        this.clickOnCartIcon = page.locator('.rw-top-actions .rw-pill');
        this.checkOutButton = page.getByRole('button', { name: 'Checkout' });
        this.checkOutPageSubTitle = page.locator('.rw-muted');
        this.payOrderButton = page.locator('#place-order');
        this.confirmedOrderMessage = page.locator('.rw-success');   
    }
    //Method to click on the product menu
    async clickProductMenu() {
        await this.productMenu.click();
        await this.page.waitForLoadState('networkidle');
    }
    //Method to get the product page title
    async getProductPageTitle() {
        return await this.productPageTitle.textContent();
    }

    async searchProduct(productName) {
        await this.searchBarInput.fill(productName);
        await this.page.waitForLoadState('networkidle');
    }

    async clickAddToCartButton() {
        // Click the first visible "Add to cart" button (for the searched product)
        await this.page.getByRole('button', { name: 'Add to cart' }).first().click();
    }

    async clickCartIcon() {
        await this.clickOnCartIcon.click();
        await this.page.waitForLoadState('networkidle');
    }

    async getCartPageTitle() {
        return await this.cartPageTitle.textContent();
    }

    async isCheckOutButtonEnabled() {
        return await this.checkOutButton.isEnabled();
    }

    async clickCheckOutButton() {
        await this.checkOutButton.click();
    }

    async getCheckOutPageSubTitle() {
        return await this.checkOutPageSubTitle.first().textContent();
    }

    async clickPayOrderButton() {
        await this.payOrderButton.click();
    }

    async getConfirmedOrderMessage() {
        return await this.confirmedOrderMessage.textContent();
    }
}

module.exports = { ProductPage };
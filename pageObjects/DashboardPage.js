class DashboardPage {

    constructor(page) {
        this.page = page;
        this.pageTitle = page.locator('.rw-title');
        this.signOutButton = page.getByRole('button', { name: 'Sign out' });
        this.backTocartButton = page.getByRole('button', { name: 'Back to cart' });
    }

    //Method to get the page title
    async getPageTitle() {
        return await this.pageTitle.textContent();
    }

    async clickSignOut() {
        await this.signOutButton.click();
    }
}

module.exports = { DashboardPage };
const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pageObjects/LoginPage');
const { DashboardPage } = require('../pageObjects/DashboardPage');
const { ProductPage } = require('../pageObjects/ProductPage');
const { ShippingPage } = require('../pageObjects/ShippingPage');
const dataSet = JSON.parse(JSON.stringify(require('../utils/shippingDetails.json')));

// Common setup before each test by Vijay Pundir

test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://retail-website-fawn.vercel.app/login');
    await loginPage.login("test@demo.com", "password123");
    await page.waitForLoadState('networkidle');
});

test('@web End-to-End: Complete Purchase Flow - Login to Order Confirmation', async ({ page }) => {
    const productName = "Automation seed 1776621240695";
    const dashboardPage = new DashboardPage(page);
    const productPage = new ProductPage(page);
    const shippingPage = new ShippingPage(page);

    // Step 1: Verify Dashboard Page
    console.log("=== Step 1: Verify Dashboard Page ===");
    const pageTitle = await dashboardPage.getPageTitle();
    console.log("Dashboard page title: " + pageTitle);

    // Step 2: Navigate to Products and Search
    console.log("=== Step 2: Search for Product ===");
    await productPage.clickProductMenu();
    console.log("Product menu has been clicked successfully");
    const productPageTitle = await productPage.getProductPageTitle();
    await expect(productPageTitle).toBe("Storefront");
    console.log("Product page title is : " + productPageTitle);

    // Step 3: Search and Add to Cart
    console.log("=== Step 3: Search Product and Add to Cart ===");
    await productPage.searchProduct(productName);
    await page.waitForTimeout(3000);
    await productPage.clickAddToCartButton();
    //await page.waitForTimeout(3000);
    console.log("Product has been added to cart successfully");

    // Step 4: View Cart
    console.log("=== Step 4: View Cart ===");
    await productPage.clickCartIcon();
    await page.waitForTimeout(3000);
    const cartPageListingTitle = await productPage.getCartPageTitle();
    await expect(cartPageListingTitle).toBe("Your cart");
    console.log("Cart page title is : " + cartPageListingTitle);

    // Step 5: Proceed to Checkout
    console.log("=== Step 5: Proceed to Checkout ===");
    await page.waitForTimeout(3000);
    const bool = await productPage.isCheckOutButtonEnabled();
    expect(bool).toBe(true);
    console.log("Checkout button is enabled: " + bool);
    await productPage.clickCheckOutButton();
    console.log("Checkout button has been clicked successfully");

    const checkOutPageSubTitle = await productPage.getCheckOutPageSubTitle();
    await expect(checkOutPageSubTitle).toBe("Orders are submitted to the backend API and stored in the database.");
    console.log("Checkout page subtitle is : " + checkOutPageSubTitle);

    // Step 6: Fill Shipping Details
    console.log("=== Step 6: Fill Shipping Details ===");
    await page.waitForTimeout(3000);
    const shippingSectionTitle = await shippingPage.getShippingSectionTitle();
    expect(shippingSectionTitle).toBe("Shipping");
    console.log("Shipping section found: " + shippingSectionTitle);
    await shippingPage.fillShippingDetails(dataSet.name, dataSet.address, dataSet.city, dataSet.postal);
    console.log("Shipping details have been filled successfully");

    // Step 7: Confirm Order
    console.log("=== Step 7: Confirm Order ===");
    await page.waitForTimeout(3000);
    await productPage.clickPayOrderButton();
    console.log("Pay order button has been clicked successfully");

    const confirmedOrderMessage = await productPage.getConfirmedOrderMessage();
    await expect(confirmedOrderMessage).toMatch(/^Order [a-z0-9]+ confirmed\.$/);
    console.log("Confirmed order message is : " + confirmedOrderMessage);
    console.log("=== Order Purchase Complete ===");
    await page.screenshot({path:'Project_Screenshots/checkout-page.png',
        fullPage : true

    });
});


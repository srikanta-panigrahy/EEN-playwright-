const{test,expect}=require("@playwright/test");

function createTransaction(page){

    page.goto(process.env.LIGHTSPEED_URL);
    expect(page).toHaveURL("https://eagleeyenetworks.retail.lightspeed.app/sales/all");

    const username=page.locator("[name='username']").fill(process.env.LS_USERNAME);
    expect(username).toHaveText("jayakrishnan.gk@een.com")

    const password=page.locator("[name='password']").fill(process.env.LS_PASSWORD);
    expect(password).toHaveText("Lightspeedtest123")

    page.getByTestId("signin").click();

    page.goto("https://eagleeyenetworks.retail.lightspeed.app/webregister/");

    const items=page.$("//span[@class='vd-quick-key-label']");

    for(const item of items){
        if(item.textcontent("Coke / 2 ltr"))
            page.item.click();
    }
    








}
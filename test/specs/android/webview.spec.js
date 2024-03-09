describe('Web Browser Access', () => {
  before(async () => {
    // skip tutorial
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]'
    ).click();
    await expect($('//*[@text="Add note"]')).toBeDisplayed();
  });

  it('Access external link and verify content in the browser ', async () => {
    // click on the nav icon
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]'
    ).click();

    // click on the fb link
    await $('//*[@text="Like us on Facebook"]').click();

    await driver.pause(4000);

    // get all the contexts
    await driver.getContexts();

    // switch to webview chrome context
    await driver.switchContext('WEBVIEW_chrome');

    //
    await expect(driver).toHaveUrl('https://m.facebook.com/ColorNote');
    await expect($('h1 span')).toHaveText('ColorNote');
    // await expect($('#login_popup_cta_form span')).toContain(
    //   'See more on Facebook'
    // );

    // switch back to app
    await driver.switchContext('NATIVE_APP');
    await driver.back();

    // continue with the app stuff..
    await $('//*[@text="Notes"]').click();
    const addNoteText = await $('//*[@text="Add note"]');
    await expect(addNoteText).toBeDisplayed();
  });
});

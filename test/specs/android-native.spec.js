describe('Android Native Feature Tests', () => {
  it('Access an activity directly', async () => {
    // access activity
    // ("package name", "package activity")
    await driver.startActivity(
      'io.appium.android.apis',
      '.app.AlertDialogSamples'
    );

    // pause 3s
    await driver.pause(3000);

    // assertion
    await expect($('//*[@text="App/Alert Dialogs"]')).toExist();
  });

  it.only('Working with dialog boxes', async () => {
    // access activity
    // ("package name", "package activity")
    await driver.startActivity(
      'io.appium.android.apis',
      '.app.AlertDialogSamples'
    );
    // click on first dialog
    await $(
      '//*[@resource-id="io.appium.android.apis:id/two_buttons"]'
    ).click();

    // get alert text
    console.log('ALERT TEXT --->>', await driver.getAlertText());

    // // accept alert
    // await driver.acceptAlert();

    // // dismiss alert
    // await driver.dismissAlert();

    // // click on the OK button
    await $('//*[@resource-id="android:id/button1"]').click();

    // // click on the Cancel button
    // await $('//*[@resource-id="io.appium.android:id/button2"]').click();

    // alert box no longer visible
    await expect($('//*[@resource-id="android:id/alertTitle"]')).not.toExist();
  });
});

/**
 * Untuk menjalankan appium inspector
 * 1. Nyalakan emulator pada android studio
 * 2. sambungkan koneksi pada port appium dengan syntax : Appium -p 4724
 * 3. buka android inspector dan klik start session
 *
 * Untuk menjalankan testing :
 * nyalakan port dengan syntax : appium -p 4723
 * pada terminal tuliskan npx wdio
 *
 * gunakan npx kill-port 4723  untuk kill port yang sedang digunakan
 */

describe('Android Elements Tests', () => {
  it('Find element by accessibility id', async () => {
    // find element by accessibility id with (~) sign
    const appOption = await $('~App');

    // click on element
    await appOption.click();
    // assertion
    const actionBar = await $('~Action Bar');
    await expect(actionBar).toBeExisting();
  });

  // tambahkan x didepan it untuk skip test
  xit('Find elements by xpath', async () => {
    // xpath - (//tagname[@attribute=value])
    await $('//android.widget.TextView[@Content-desc="Alert Dialogs"]').click();

    // find by resourceId
    await $(
      '//android.widget.Button[@resource-Id="io.appium.android.apis:id/select_button"]'
    ).click();

    // find by text
    await $('//android.widget.TextView[@text="Command two"]').click();

    // find by class - assertion
    const textAssertion = await $('//android.widget.TextView');
    await expect(textAssertion).toHaveText('You selected: 1, Command two');
  });

  it.skip('Find elements by UIAutomator', async () => {
    // find by text contains
    await $('android=new UiSelector().textContains("Alert")').click();
  });

  // $ for single element
  // $$ for multiple elements

  it('find multiple elements', async () => {
    const expectedList = [
      'API Demos',
      "Access'ibility",
      'Accessibility',
      'Animation',
      'App',
      'Content',
      'Graphics',
      'Media',
      'NFC',
      'OS',
      'Preference',
      'Text',
      'Views',
    ];
    const actualList = [];
    // find multiple elements
    const textList = await $$('android.widget.TextView');
    //  loop through them
    for (const element of textList) {
      actualList.push(await element.getText());
    }
    //  assert the list
    await expect(actualList).toEqual(expectedList);
  });

  it('Working with text field', async () => {
    // access the auto complete screen
    await $('~Views').click();
    await $('//*[@text="Auto Complete"]').click();
    await $('//*[@content-desc="1. Screen Top"]').click();

    // enter the country name
    const textField = await $(
      '//*[@resource-id="io.appium.android.apis:id/edit"]'
    );
    await textField.addValue('Canada');

    // verify the country name
    await expect(textField).toHaveText('Canada');
  });

  it('Vertical scrolling', async () => {
    await $('~App').click();
    await $('~Activity').click();

    // Use UiScollable android studio
    // Scroll to the end (not stable if elements get moved)
    // await $(
    //   'android=new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(1,5)'
    // );

    // scrollTextIntoView - more stable
    await $(
      'android=new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("Secure Surfaces")'
    ).click();

    await $('~Secure Surfaces').click();

    await expect($('~Secure Dialog')).toExist();
  });

  it('Horizontal Scrolling', async () => {
    await driver.startActivity(
      'io.appium.android.apis',
      'io.appium.android.apis.view.Gallery1'
    );

    // Horizontal scrolling
    await $(
      'android= new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()'
    );
    await $(
      'android= new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollBackward()'
    );
    await driver.pause(3000);

    it.only('Working with a date picker', async () => {
      // access the date picker
      await driver.startActivity(
        'io.appium.android.apis',
        'io.appium.android.apis.view.DateWidgets1'
      );

      // get current date
      const date = await $(
        '//*[@resource-id="io.appium.android.apis:id/dateDisplay"]'
      );
      const currentDate = await date.getText();

      // click on change the date button
      await $('~change the date').click();

      // scroll right to the next month
      await $(
        'android= new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()'
      );

      // select the 10th date
      await $('//*[@text="10"]').click();

      // click on ok button
      await $('//*[@ersource-id="android:id/button1"]').click();

      // verify the updated date
      await expect(await date.getText()).not.toEqual(currentDate);
    });
  });
});

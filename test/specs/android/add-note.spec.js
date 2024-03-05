describe('Add Notes', () => {
  it('Skip Tutorial', async () => {
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/btn_start_skip"]'
    ).click();
    await expect($('//*[@text="Add note"]')).toBeDisplayed();
  });

  it('Add a note, save change & verify note', async () => {
    await $('//*[@text="Add note"]').click();
    await $('//*[@text="text"]').click();
    await expect($('//*[@text="Editing"]')).toBeDisabled();

    // add note title

    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]'
    ).addValue('Fav Anime List');

    // add note body
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_title"]'
    ).addValue('Naruto\nOnePiece\nAOT');

    // save the changes
    await driver.back();
    await driver.back();

    // assertion
    await expect(
      $(
        '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/edit_btn"]'
      )
    ).toBeDisabled();
    await expect(
      $(
        '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/view_note"]'
      )
    ).toHaveText('Naruto\nOnePiece\nAOT');
  });
});

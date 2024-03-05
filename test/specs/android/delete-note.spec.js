describe('Delete Note', () => {
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

  it('Delete a note & check the note in trash can', async () => {
    await driver.back();

    const note = await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]'
    ).getText();

    //   click on the note
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]'
    ).click();

    // click on more icon
    await $('~More').click();

    // click on Delete item
    await $('//*[@text="Delete"]').click();

    // accept alert
    await driver.acceptAlert();

    // click on nav icon
    await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/icon_nav"]'
    ).click();

    // click on trash can item
    await $('//*[@text="Trash Can"]').click();

    // assertion
    const trashCanItem = await $(
      '//*[@resource-id="com.socialnmobile.dictapps.notepad.color.note:id/title"]'
    );

    await expect(trashCanItem).toHaveText(note);
  });
});

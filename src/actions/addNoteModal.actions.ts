import { type Page } from '@playwright/test';
import AddNoteModalPage from '../pages/addNoteModal.page';

export class AddNoteModalActions {
  private readonly page: Page;
  private readonly view: AddNoteModalPage;

  constructor(page: Page) {
    this.page = page;
    this.view = new AddNoteModalPage(page);
  }

  async addNote(noteText?: string) {
    const stamp = () => new Date().toISOString().replace(/[:.]/g, '-');
    const defaultNoteText = `Test note ${stamp()}`;
    const textToType = noteText || defaultNoteText;

    // Step 1: Click the "Note" area to activate the rich text editor
    await this.view.noteInputField().click();
    await this.page.waitForTimeout(5000);
    // Step 2: Type the note content directly (focus is automatically in the editor)
    await this.page.keyboard.type(textToType);
    await this.page.waitForTimeout(5000);
    // Step 3: Click Save button twice (first click loses focus, second click persists)
    await this.view.saveButton().click();
    // wait 5 seconds
    await this.page.waitForTimeout(5000);
    await this.view.saveButton().click();

    return textToType;
  }
}

export default AddNoteModalActions;

import { Page } from '@playwright/test';

export class AppointmentPage {
  readonly facilitySelect;
  readonly readmissionCheckbox;

  constructor(page: Page) {
    this.facilitySelect = page.locator('#combo_facility');
    this.readmissionCheckbox = page.getByRole('checkbox', {
      name: 'Apply for hospital readmission',
    });
  }

  async selectFacility(facility: string): Promise<void> {
    await this.facilitySelect.selectOption({ label: facility });
  }

  async applyForHospitalReadmission(): Promise<void> {
    await this.readmissionCheckbox.check();
  }
}
import { test, expect } from '../fixtures';

test.describe('Parcial 2 - Login y cita', () => {
  test('Test 2 - Login con credenciales inválidas muestra el mensaje de error', async ({ loginPage }) => {
    await loginPage.open();
    await loginPage.login('usuario_incorrecto', 'contraseña_incorrecta');

    await expect(loginPage.loginError).toBeVisible();
    await expect(loginPage.loginError).toHaveText(
      'Login failed! Please ensure the username and password are valid.'
    );
  });

  test.describe('Con sesión iniciada', () => {
    test.beforeEach(async ({ loginPage }) => {
      await loginPage.open();
      await loginPage.login('John Doe', 'ThisIsNotAPassword');
    });

    test('Test 1 - Login exitoso muestra el formulario Make Appointment', async ({ appointmentPage }) => {
      await expect(appointmentPage.facilitySelect).toBeVisible();
    });

    const facilities = [
      'Tokyo CURA Healthcare Center',
      'Hongkong CURA Healthcare Center',
      'Seoul CURA Healthcare Center',
    ];

    for (const facility of facilities) {
      test(`Test 3 - Selecciona la sede ${facility}`, async ({ appointmentPage }) => {
        await appointmentPage.selectFacility(facility);
        await expect(appointmentPage.facilitySelect).toHaveValue(facility);
      });
    }

    test('Test 4 - Marca Apply for hospital readmission', async ({ appointmentPage }) => {
      await appointmentPage.applyForHospitalReadmission();
      await expect(appointmentPage.readmissionCheckbox).toBeChecked();
    });
  });
});



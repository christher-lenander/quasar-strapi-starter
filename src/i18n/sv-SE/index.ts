export default {
  loginPage: {
    title: 'Logga in',
  },
  createAccountPage: {
    title: 'Skapa konto',
    messages: {
      success: 'Ditt konto har skapats.',
      error: 'Ett fel uppstod när ditt konto skulle skapas.',
    },
  },
  forgotPasswordPage: {
    title: 'Glömt lösenord',
    messages: {
      success:
        'Ett e-postmeddelande har skickats till dig med instruktioner om hur du återställer ditt lösenord.',
      error: 'Ett fel uppstod när vi försökte skicka e-postmeddelandet.',
    },
  },
  resetPasswordPage: {
    title: 'Återställ lösenord',
    messages: {
      success: 'Ditt lösenord har återställts.',
      error: 'Ett fel uppstod när vi försökte återställa ditt lösenord.',
    },
  },
  changePasswordPage: {
    title: 'Ändra lösenord',
    links: {
      changePassword: 'Ändra lösenord',
    },
    messages: {
      success: 'Ditt lösenord har ändrats.',
      error: 'Ett fel uppstod när vi försökte ändra ditt lösenord.',
    },
  },
  memberDashboardPage: {
    title: 'Medlemssida',
    links: {
      changePassword: 'Ändra lösenord',
      logout: 'Logga ut',
      editProfile: 'Redigera profil',
    },
  },
  formFields: {
    username: {
      label: 'Användarnamn',
      placeholder: 'Användarnamn',
    },
    email: {
      label: 'E-postadress',
      placeholder: 'E-postadress',
    },
    password: {
      label: 'Lösenord',
      placeholder: 'Lösenord',
    },
    passwordConfirmation: {
      label: 'Bekräfta lösenord',
      placeholder: 'Bekräfta lösenord',
    },
  },
  formButtons: {
    login: 'Logga in',
    logout: 'Logga ut',
    createAccount: 'Skapa konto',
    reset: 'Återställ',
    submit: 'Skicka',
  },
  links: {
    login: 'Logga in',
    forgotPassword: 'Glömt lösenordet?',
    createAccount: 'Skapa konto',
    changePassword: 'Ändra lösenord',
    back: 'Tillbaka',
  },
  validation: {
    formInvalidMessage: 'Fyll i alla fält.',
  },
  strapiErrors: {
    login: {
      ValidationError: 'Ogiltigt användarnamn eller lösenord.',
      UnknownError: 'Okänt fel.',
    },
  },
  messages: {
    notImplemented: 'Inte implementerat.',
  },
};

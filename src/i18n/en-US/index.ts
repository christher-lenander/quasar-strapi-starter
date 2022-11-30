export default {
  loginPage: {
    title: 'Sign in to your account',
  },
  createAccountPage: {
    title: 'Create new account',
    messages: {
      success: 'Your account has been created.',
      error: 'An error occurred while creating your account.',
    },
  },
  forgotPasswordPage: {
    title: 'Forgot password',
    messages: {
      success:
        'An email has been sent to you with instructions on how to reset your password.',
      error: 'An error occurred while trying to send the email.',
    },
  },
  resetPasswordPage: {
    title: 'Reset password',
    messages: {
      success: 'Your password has been reset.',
      error: 'An error occurred while trying to reset your password.',
    },
  },
  memberDashboardPage: {
    title: 'Member Dashboard',
    links: {
      changePassword: 'Change password',
      logout: 'Logout',
      editProfile: 'Edit profile',
    },
  },
  formFields: {
    username: {
      label: 'Username',
      placeholder: 'Username',
    },
    email: {
      label: 'E-mail',
      placeholder: 'E-mail',
    },
    password: {
      label: 'Password',
      placeholder: 'Password',
    },
    passwordConfirmation: {
      label: 'Password Confirmation',
      placeholder: 'Password Confirmation',
    },
  },
  formButtons: {
    login: 'Sign in',
    logout: 'Logout',
    createAccount: 'Create Account',
    reset: 'Reset',
    submit: 'Submit',
  },
  links: {
    login: 'Sign in',
    forgotPassword: 'Forgot password?',
    createAccount: 'Create account',
  },
  validation: {
    formInvalidMessage: 'Please fill in all fields.',
  },
  strapiErrors: {
    login: {
      ValidationError: 'Invalid username or password',
      UnknownError: 'Unknown error',
    },
  },
  messages: {
    notImplemented: 'Not implemented',
  },
};

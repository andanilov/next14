type ERROR_MESSAGES_KEYS = 
| 'not-enough-data'

| 'login-field-empty'
| 'login-field-no-email'
| 'password-field-empty'
| 'password-field-too-short'
| 'token-empty'
| 'signin-failed'
| 'signin-wrong-data'
;

export const ERROR_MESSAGES: Record<ERROR_MESSAGES_KEYS, string> = {
  'not-enough-data': 'Not enough data',

  // Log In
  'login-field-empty': 'Please enter your login!',
  'login-field-no-email': 'Your login shoild be an email!',
  'password-field-empty': 'Please enter your password!',
  'password-field-too-short': 'Your password is too short!',
  'token-empty': 'You looks like a robot!',

  'signin-failed': 'Signing in failed',
  'signin-wrong-data': 'Invalid username or password',
};
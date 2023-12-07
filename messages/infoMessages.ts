// type INFO_MESSAGES_KEYS = 
// | 'offer-create'
// ;


// type TInfoMessages = [
//   string,
//   string[]?,
// ];

// export const INFO_MESSAGES: Record<INFO_MESSAGES_KEYS, TInfoMessages> = {
//   // Log In
//   'offer-create': ['Offer has been generated and sent to {{email}}', ['email']],
// };

type INFO_MESSAGES_KEYS = 
| 'offer-create'

| 'user-create'
| 'user-main-updated'
| 'user-pass-updated'
| 'user-deleted'

| 'user-updated-himself'

| 'template-added'
| 'template-delete'
| 'template-update'
;

export const INFO_MESSAGES: Record<INFO_MESSAGES_KEYS, string> = {
  // Log In
  'offer-create': 'Offer has been generated!',

  // User
  'user-create': 'User has been added!',
  'user-main-updated': 'User information has been updated!',
  'user-pass-updated': 'User pass has been updated!',
  'user-deleted': 'User has been deleted successfully',

  'user-updated-himself': 'Your information has been updated',

  'template-added': 'Template has been added successfully',
  'template-delete': 'Template has been deleted successfully',
  'template-update': 'Template has been updated successfully',

};
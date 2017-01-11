const defaultState = {
  is_loading: false, // True: Show Loading Screen; False: Remove Loading Screen
  allApprovedUsers: ['1', '2'],
  nonApprovedUsers: [],
  nonQualifedUsers: [],
  hipbarCredit: 20,
  showConfirmation: false, //  True : Show Confirmation Screen; False Remove confirmation screen
  breadCrumb: [{title: 'Invites', sequence: 1, link: '#'}, {title: 'Approved Users', sequence: 2, link: '#'}],
  hipBarCreditValidated: true // True : Do Nothing; False : Highlight field
};

export { defaultState};

Meteor.startup(() => {
  Books.remove({});
  Meteor.users.remove({});

  ['foo', 'bar', 'baz'].forEach((name) => {
    Books.insert({
      name
    });
  });

  ['admin@admin'].forEach((email) => {
    Accounts.createUser({
      email,
      password: 'admin'
    });
  });
});

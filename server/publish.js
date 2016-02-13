Meteor.publish('books', function() {
  if (!this.userId) {
    return this.ready();
  }

  return Books.find({});
});

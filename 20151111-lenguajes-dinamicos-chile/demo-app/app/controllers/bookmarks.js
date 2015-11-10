import Ember from 'ember';

export default Ember.Controller.extend({
  bookmarks: [],
  newBookmark: Ember.Object.create({
    url: "",
    description: ""
  }),
  bookmarksSortedBy: ['createdAt:desc'],

  sortedBookmarks: Ember.computed.sort('bookmarks', 'bookmarksSortedBy'),

  actions: {
    createNewBookmark: function() {
      const newBookmark = this.get('store').createRecord('bookmark', {
        url: this.get('newBookmark.url'),
        description: this.get('newBookmark.description'),
        createdAt: new Date(),
        isArchived: false
      });

      this.get('bookmarks').pushObject(newBookmark);

      this.set('newBookmark', Ember.Object.create({
        url: "",
        description: ""
      }));
    },

    sortByDescription() {
      this.set('bookmarksSortedBy', ['description:asc']);
    },

    sortByCreatedAt() {
      this.set('bookmarksSortedBy', ['createdAt:desc']);
    }
  }
});

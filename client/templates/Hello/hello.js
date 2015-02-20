
Meteor.subscribe('menus');
Meteor.subscribe('restaurants');
Meteor.subscribe('orders');
Meteor.subscribe('customers');
Meteor.subscribe('staff');


Session.setDefault('counter', 0);
  
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);

    }
  });

  



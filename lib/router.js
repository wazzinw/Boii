
Router.configure({
notFoundTemplate: 'notFound'

});

Router.route('/', function () {
    this.render('hello')
  });

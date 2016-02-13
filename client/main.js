const {
  SetModule,
  options,
  bootstrap,
  Component,
  State,
  MeteorReactive,
  LocalInjectables
} = angular2now;

SetModule('app', [
  'angular-meteor',
  'ui.router'
]);

options({
  controllerAs: 'vm'
});

// App

@Component({
  selector: 'app',
  template: `
    <ui-view></ui-view>
  `
})
class App {}

// login
@State({
  name: 'login',
  url: '/login',
  defaultRoute: true
})
@Component({
  selector: 'login',
  injectables: ['$state'],
  template: `
    <button ng-click="vm.login()">Log in</button>
  `
})
@LocalInjectables
class Login {
  login() {
    Meteor.loginWithPassword('admin@admin', 'admin', (error) => {
      console.log('logged in');
      if(!error) this.$state.go('hidden');
    });
  }
}

// Hidden

@State({
  name: 'hidden',
  url: '/hidden',
  resolve: {
    user($q, $state) {
      const deferred = $q.defer();

      Meteor.autorun(() => {
        if (!Meteor.loggingIn()) {
          if (!Meteor.user()) {
            deferred.reject('AUTH_REQUIRED');
            $state.go('login');
          } else {
            deferred.resolve(Meteor.user());
          }
        }
      });
      return deferred.promise;
    }
  }
})
@Component({
  selector: 'hidden',
  injectables: ['$state'],
  template: `
    <p>Logged in!</p>
    <button ng-click="vm.logout()">Logout</button>
    <pre>{{vm.books | json}}</pre>
  `
})
@MeteorReactive
@LocalInjectables
class Hidden {
  constructor() {
    this.subscribe('books');

    this.helpers({
      books() {
        return Books.find({});
      }
    });
  }
  logout() {
    Meteor.logout();
    this.$state.go('login');
  }
}


bootstrap(App);

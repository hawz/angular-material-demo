(function() {
  'use strict';

  angular.module('users')
  .controller('UsersController', UsersController);

  UsersController.$inject = ['UserService', '$mdBottomSheet', '$mdSidenav'];

  function UsersController(UserService, $mdBottomSheet, $mdSidenav) {
    var vm = this;

    vm.selected   = null;
    vm.users      = [];
    vm.selectUser = selectUser;
    vm.toggleList = toggleList;
    vm.share      = share;

    activate();

    function activate() {
      // load all registered users
      UserService.loadAllUsers()
      .then( function(users) {
        vm.users = users;
        vm.selected = users[0];
      });
    }

    // ****************
    // internal methods
    // ****************

    function selectUser(user) {
      vm.selected = user;
    }

    function toggleList() {
      $mdSidenav('left').toggle();
    }

    function share(selectedUser) {
      $mdBottomSheet.show({
        controller    : ['$mdBottomSheet', UserSheetController],
        controllerAs  : 'vm',
        templateUrl   : './app/src/components/users/contactSheet/contactSheet.template.html',
        parent        : angular.element(document.getElementById('content'))
      });
      

      // Bottom Sheet controller for the avatar actions
      function UserSheetController($mdBottomSheet) {
        this.user = selectedUser;
        this.items = [
          { name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg' },
          { name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg' },
          { name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
          { name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
        ];

        this.performAction = function(action) {
          $mdBottomSheet.hide();
        }
      }
    }
  }
})();
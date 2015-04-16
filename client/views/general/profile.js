'use strict';

angular.module('exittest')

.controller('ProfileCtrl', ['$scope', 'CommonProp', '$firebaseArray', function($scope, CommonProp, $firebaseArray) {
  $scope.username = CommonProp.getUser();


  var stocktypes = new Firebase('https://exittest.firebaseio.com/stocktypes');
  var portfolios = new Firebase('https://exittest.firebaseio.com/stocktypes/portfolios');
  var balDataRef = new Firebase('https://exittest.firebaseio.com/balances');


  $scope.stocktypes = $firebaseArray(stocktypes);
  $scope.portfolios = $firebaseArray(portfolios);
  // $scope.balances = $firebaseArray(balance);
  // $scope.stocktypes = [];

  var totalPosition = 0;
  var totalAssets = 0;
  var $update = $('#update');
  var $sell = $('#sell');
  var sum = 0;
  // $('#buy').click(getData);

  $scope.update = function(stocktype, balance) {
    $scope.stocktypes.$save(stocktype);
    $scope.balances.$save(balance);
  };

  $scope.deposit = function() {
    var clickVal = $('#addAmount').val();
    var inp = parseFloat(clickVal);
    sum = inp + sum;
    if (!clickVal) {
      alert('Please add cash to your balance');
    } else {
      $('#balance').html('Balance is: $'+ sum);
      totalAssets = totalPosition + sum;
      balDataRef.update({balance: balance});
      //  $('#assets').html('Total Assets is: $' +totalAssets);
    }
  }

  $scope.create = function() {
    stocktypes.push({stocktype: $scope.stocktype});
    $scope.stocktype = '';
    console.log($scope.stocktypes);
  }

  $scope.add = function() {
    var $input = $('#symbol').val();
    var url = 'http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol='+ $input +'&callback=?';
    $.getJSON(url, function(data) {
      console.log(data);
      var $div = $('<div>');
      $div.addClass('answer');
      var share = $('#shares').val();
      var position = parseInt(data.LastPrice) * share;
      var $symbol = $('#symbol').val();

      if (!$input || !isNaN($input)) {
        alert('Please enter the right symbol');
      }  else if  (totalAssets < position) {
        alert('You need more money');
      }
      else {
        console.log('data', data);
        $('#balance').html('Balance is: $'+(sum -= position));

        var $show = $div.html('Symbol: ' + data.Symbol +'<br/>'+ 'Quote: ' + data.LastPrice +'<br/>' + share + ' shares'+'<br/>' + 'Position: $'+ position +'<br/>');
        $('#messages').append($show);

        // var $update = $("<input type='button' id='update' value='Update'/>");
        var $sell = $("<input type='button' id='sell' value='Sell'/>");
        $show.append($sell, $update);

        totalPosition += position;
        var $symbol = $('#symbol').val();
        $('#position').append('<p>' + '' + $symbol + ': $' +totalPosition + '</p>');
        //
        totalAssets = totalPosition + sum;
        $('#assets').html('Total Assets is: $' +totalAssets);

        $update.click(function() {
          $.getJSON(url, function(data) {
            var $div = $('<div>');
            $div.addClass('answer');
            var share = $('#shares').val();
            var position = parseInt(data.LastPrice) * share;

            $update = $("<input type='button' id='update' value='Update'/>");
            $sell = $("<input type='button' id='sell' value='Sell'/>");
            $show.append($update, $sell);
            // $show.remove();
            console.log(data.LastPrice);
          });
        });

        $sell.click(function() {
          console.log('sell pressed');
          $('#balance').html('Balance is: $'+ (sum += position));
          $('#position').append( '<p>' + '' + $symbol + ': $' + (totalPosition -= position) + '</p>');
          // $('.sharenumber').html( '' + $symbol + ': $' + (totalPosition -= position));

        });
      }
    });
  }
}]);

  // $('#deposits').click(function() {
  //   var amount = $('#amount').val();
  //   depDataRef.push({amount: amount});
  //   balance += parseInt(amount);
  //   balDataRef.update({balance: balance});
  // });

  // $('#withdrawals').click(function() {
  //   var amount = $('#amount').val();
  //   var date = new Date().toDateString();
  //   withDataRef.push({amount: amount, date: date});
  //   balance -= parseInt(amount);
  //   var debts = 0;
  //   if (balance < 0) {
  //     debts = -50;
  //     balance += debts;
  //     debtDataRef.push({debts: debts, date: date});
  //   }
  //   balDataRef.update({balance: balance});
  // });

  // balDataRef.on('value', function(data) {
  //    var balTask = data.val();
  //    console.log(balTask);
  //    $('#balance').html('Balance is $' + balTask.balance);
  // })
  //
  // depDataRef.on('child_added', function(data) {
  //   var depositTask = data.val();
  //   display(depositTask.amount, depositTask.date, 'dep');
  // });

  // withDataRef.on('child_added', function(data) {
  //   var withdrawTask = data.val();
  //   display(withdrawTask.amount, withdrawTask.date, 'with');
  // });

  // debtDataRef.on('child_added', function(data) {
  //   var debtTask = data.val();
  //   display(debtTask.debts, debtTask.date, 'debts');
  // });

  // function display(amount) {
  //   var $td = $('<li>');
  //   $td.text('$' + amount + ' on: ' + date);
  //   $('#'+id).append($td);
  //
  //
  // }

$scope.addThreshold = function () {
  $scope.errorDisplay = false;
  var subscriptionSLAError = '';
  $scope.selectedSubscriptionSLA.forEach(function (value) {
    var subscription = {"subscriptionType": rawValues[value],"downlinkSpeed": $scope.downlinkSpeed,
      "uplinkSpeed": $scope.uplinkSpeed};
    var duplicate = checkForDuplicateThreshold(rawValues[value]);
    if (duplicate) {
      $scope.errorDisplay = true;
      subscriptionSLAError += $translate.instant('module.browser.capacityReservation.' + duplicate) + ', ';
    } else {
      saveThresholdToAdd(subscription);
    }
  });
  if ($scope.errorDisplay) {
    $scope.duplicate = subscriptionSLAError.substring(0, subscriptionSLAError.length - 2);
  } else {
    $mdDialog.hide();
  }
};


$scope.addThreshold = function(){
  var subscription = {"subscriptionType": rawValues[$scope.selectedSubscriptionSLA], "downlinkSpeed": $scope.downlinkSpeed,
                   "uplinkSpeed": $scope.uplinkSpeed};
  var duplicate = checkForDuplicateThreshold(rawValues[$scope.selectedSubscriptionSLA]);
  if(duplicate){
      $scope.errorDisplay = true;
      $scope.duplicate = $translate.instant("module.browser.capacityReservation."+duplicate);
  }else{
      $scope.errorDisplay = false;
      saveThresholdToAdd(subscription);
      $mdDialog.hide();
  }
}

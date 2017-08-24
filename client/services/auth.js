(function(angular) {
  'use strict';
    var myApp = angular.module('AWS_POC');
    myApp.service('authService', ['$http', '$q', '$window', function($http, $q, $window) {

      this.signupToCognito = function(userData) {
        var deferred = $q.defer();

        var req = {
           method: 'POST',
           url: '/cognito/signup',
           data: userData
        }

        $http(req).then(function(result){
          deferred.resolve(result);
        }, function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      };

      this.confirmCognitoRegistration = function(code) {
        var deferred = $q.defer();

        var req = {
           method: 'POST',
           url: '/cognito/verify-code',
           data: {'code': code}
        }

        $http(req).then(function(result){
          deferred.resolve(result);
        }, function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      };

      this.signinToCognito = function(username, password) {
        var deferred = $q.defer();
        var req = {
           method: 'POST',
           url: '/cognito/signin',
           data: {
             'username': username,
             'password': password
           }
        }

        $http(req).then(function(result){
          deferred.resolve(result);
        }, function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      };

      this.signoutFromCognito = function() {
        var deferred = $q.defer();

        var req = {
           method: 'GET',
           url: '/cognito/signout'
        }

        $http(req).then(function(result){
          deferred.resolve(result);
        }, function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      };

        /*** Upload to S3 service start*/
        this.uploadToBucket = function(file) {
        var deferred = $q.defer();

        var req = {
           method: 'POST',
           url: '/cognito/uploadFile',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: {
             'file': file
           }
        }

        $http(req).then(function(result){
          deferred.resolve(result);
        }, function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      };

        /*** Upload to S3 service end*/



      this.getS3Buckets = function() {
        var deferred = $q.defer();

        var req = {
           method: 'GET',
           url: '/cognito/buckets'
        }

        $http(req).then(function(result) {
          deferred.resolve(result);
        }, function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      }

      this.getS3BucketObjects = function(bucketName) {
        var deferred = $q.defer();

        var req = {
           method: 'GET',
           url: '/cognito/buckets/bucket/' + bucketName
        }

        $http(req).then(function(result) {
          deferred.resolve(result);
        }, function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      }

      this.downloadObject = function(bucketName, Key) {
        var deferred = $q.defer();

        var req = {
           method: 'GET',
          //  headers: {
          //    'Content-Type': undefined
          //  },
           url: '/cognito/buckets/bucket/' + bucketName + '/' + Key
        }

        $http(req).then(function(result) {
          deferred.resolve(result);
        }, function(err){
          deferred.reject(err);
        });

        return deferred.promise;
      }

    }]);
})(window.angular);

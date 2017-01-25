/**
 * Created by AndreyMaznyak on 06.06.2016.
 */
'use strict';
var app = angular.module('andreymaznyak.github.io',[]);

app.config(function onConfig(){

});

app.run(function onRun($rootScope){
    'ngInject';
    console.log('angular started');
});
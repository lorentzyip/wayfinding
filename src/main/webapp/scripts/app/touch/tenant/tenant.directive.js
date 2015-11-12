//'use strict';
//
//angular.module('wayfindingApp')
//    .directive('searchText', function() {
//        return {
//            restrict: 'A',
//            link: function(scope, element, attrs) {
//                scope.$on('textKeyPressed', function(e, val, action) {
//                    var domElement = element[0];
//                    if (document.selection) {
//                        domElement.focus();
//                        var sel = document.selection.createRange();
//                        sel.text = val;
//                        domElement.focus();
//                    }
//                    else if (domElement.selectionStart || domElement.selectionStart === 0) {
//                        var startPos = domElement.selectionStart;
//                        var endPos = domElement.selectionEnd;
//                        var scrollTop = domElement.scrollTop;
//
//                        if(action === 'del'){
//                            if(startPos === endPos){
//                                domElement.value = domElement.value.substring(0, startPos-1) + domElement.value.substring(endPos, domElement.value.length);
//                                domElement.focus();
//                                domElement.selectionStart = startPos - 1;
//                                domElement.selectionEnd = startPos - 1;
//                            }
//                            else{
//                                domElement.value = domElement.value.substring(0, startPos) + domElement.value.substring(endPos, domElement.value.length);
//                                domElement.focus();
//                                domElement.selectionStart = startPos;
//                                domElement.selectionEnd = startPos;
//                            }
//
//                            domElement.scrollTop = scrollTop;
//                        }
//                        else{
//                            domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
//                            domElement.focus();
//                            domElement.selectionStart = startPos + val.length;
//                            domElement.selectionEnd = startPos + val.length;
//                            domElement.scrollTop = scrollTop;
//                        }
//                    } else {
//                        domElement.value += val;
//                        domElement.focus();
//                    }
//                    //scope.searchModel.name = domElement.value;
//                });
//            }
//        }
//    })
//    .directive('searchFloor', function() {
//        return {
//            restrict: 'A',
//            link: function(scope, element, attrs) {
//                scope.$on('floorKeyPressed', function(e, val, action) {
//                    var domElement = element[0];
//                    if (document.selection) {
//                        domElement.focus();
//                        var sel = document.selection.createRange();
//                        sel.text = val;
//                        domElement.focus();
//                    }
//                    else if (domElement.selectionStart || domElement.selectionStart === 0) {
//                        var startPos = domElement.selectionStart;
//                        var endPos = domElement.selectionEnd;
//                        var scrollTop = domElement.scrollTop;
//
//                        if(action === 'del'){
//                            if(startPos === endPos){
//                                domElement.value = domElement.value.substring(0, startPos-1) + domElement.value.substring(endPos, domElement.value.length);
//                                domElement.focus();
//                                domElement.selectionStart = startPos - 1;
//                                domElement.selectionEnd = startPos - 1;
//                            }
//                            else{
//                                domElement.value = domElement.value.substring(0, startPos) + domElement.value.substring(endPos, domElement.value.length);
//                                domElement.focus();
//                                domElement.selectionStart = startPos;
//                                domElement.selectionEnd = startPos;
//                            }
//
//                            domElement.scrollTop = scrollTop;
//                        }
//                        else{
//                            domElement.value = domElement.value.substring(0, startPos) + val + domElement.value.substring(endPos, domElement.value.length);
//                            domElement.focus();
//                            domElement.selectionStart = startPos + val.length;
//                            domElement.selectionEnd = startPos + val.length;
//                            domElement.scrollTop = scrollTop;
//                        }
//                    } else {
//                        domElement.value += val;
//                        domElement.focus();
//                    }
//                });
//            }
//        }
//    });

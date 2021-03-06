// Generated by BUCKLESCRIPT VERSION 4.0.17, PLEASE EDIT WITH CARE
'use strict';

var Fs = require("fs");
var BsAsyncMonad = require("../src/bsAsyncMonad.js");

function unlink(path, cb) {
  Fs.unlink(path, (function (exn) {
          if (exn == null) {
            return BsAsyncMonad.Callback[/* return */0](/* () */0, cb);
          } else {
            return BsAsyncMonad.Callback[/* fail */1](exn, cb);
          }
        }));
  return /* () */0;
}

function unlink_if_fopen(path) {
  return BsAsyncMonad.Callback[/* >> */3]((function (param) {
                Fs.open(path, param);
                return /* () */0;
              }), (function (param) {
                return (function (param) {
                    return unlink(path, param);
                  });
              }));
}

function Fs_000(prim, prim$1) {
  Fs.open(prim, prim$1);
  return /* () */0;
}

var Fs$1 = [
  Fs_000,
  unlink
];

exports.Fs = Fs$1;
exports.unlink_if_fopen = unlink_if_fopen;
/* fs Not a pure module */

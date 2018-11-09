// Generated by BUCKLESCRIPT VERSION 4.0.6, PLEASE EDIT WITH CARE
'use strict';

var List = require("bs-platform/lib/js/list.js");
var $$Array = require("bs-platform/lib/js/array.js");
var Curry = require("bs-platform/lib/js/curry.js");
var Js_exn = require("bs-platform/lib/js/js_exn.js");
var Js_primitive = require("bs-platform/lib/js/js_primitive.js");
var Caml_exceptions = require("bs-platform/lib/js/caml_exceptions.js");

function $$return(x, cb) {
  return cb(null, x);
}

function fail(exn, cb) {
  return cb(exn, null);
}

var $$Error = Caml_exceptions.create("BsAsyncMonad.Callback.Error");

function compose($staropt$star, current, next, cb) {
  var noStack = $staropt$star !== undefined ? $staropt$star : false;
  return Curry._1(current, (function (err, ret) {
                if (err == null) {
                  var next$1 = function () {
                    try {
                      var next$2;
                      try {
                        next$2 = Curry._1(next, ret);
                      }
                      catch (raw_exn){
                        var exn = Js_exn.internalToOCamlException(raw_exn);
                        throw [
                              $$Error,
                              exn
                            ];
                      }
                      return Curry._1(next$2, cb);
                    }
                    catch (raw_exn$1){
                      var exn$1 = Js_exn.internalToOCamlException(raw_exn$1);
                      if (exn$1[0] === $$Error) {
                        return cb(exn$1[1], null);
                      } else {
                        throw exn$1;
                      }
                    }
                  };
                  if (noStack) {
                    setTimeout(next$1, 0);
                    return /* () */0;
                  } else {
                    return next$1();
                  }
                } else {
                  return cb(err, null);
                }
              }));
}

function $great$great(a, b) {
  return (function (param) {
      return compose(undefined, a, b, param);
    });
}

function on_next(noStack, next) {
  if (noStack) {
    setTimeout(next, 0);
    return /* () */0;
  } else {
    return next();
  }
}

function $$catch($staropt$star, current, catcher, cb) {
  var noStack = $staropt$star !== undefined ? $staropt$star : false;
  return Curry._1(current, (function (err, ret) {
                if (err == null) {
                  return on_next(noStack, (function () {
                                return cb(err, ret);
                              }));
                } else {
                  return on_next(noStack, (function () {
                                return Curry._2(catcher, err, cb);
                              }));
                }
              }));
}

function $pipe$pipe$great(a, b) {
  return (function (param) {
      return $$catch(undefined, a, b, param);
    });
}

function pipe($staropt$star, current, fn, cb) {
  var noStack = $staropt$star !== undefined ? $staropt$star : false;
  return Curry._1(current, (function (err, ret) {
                if (err == null) {
                  return on_next(noStack, (function () {
                                try {
                                  var ret$1;
                                  try {
                                    ret$1 = Curry._1(fn, ret);
                                  }
                                  catch (raw_exn){
                                    var exn = Js_exn.internalToOCamlException(raw_exn);
                                    throw [
                                          $$Error,
                                          exn
                                        ];
                                  }
                                  return cb(null, ret$1);
                                }
                                catch (raw_exn$1){
                                  var exn$1 = Js_exn.internalToOCamlException(raw_exn$1);
                                  if (exn$1[0] === $$Error) {
                                    return cb(exn$1[1], null);
                                  } else {
                                    throw exn$1;
                                  }
                                }
                              }));
                } else {
                  return on_next(noStack, (function () {
                                return cb(err, null);
                              }));
                }
              }));
}

function $great$pipe(a, b) {
  return (function (param) {
      return pipe(undefined, a, b, param);
    });
}

function ensure($staropt$star, current, ensure$1, cb) {
  var noStack = $staropt$star !== undefined ? $staropt$star : false;
  return Curry._1(current, (function (err, ret) {
                return on_next(noStack, (function () {
                              return Curry._2(ensure$1, /* () */0, (function (_, _$1) {
                                            return cb(err, ret);
                                          }));
                            }));
              }));
}

function $unknown$great(a, b) {
  return (function (param) {
      return ensure(undefined, a, b, param);
    });
}

function ensure_pipe($staropt$star, current, ensure, cb) {
  var noStack = $staropt$star !== undefined ? $staropt$star : false;
  return Curry._1(current, (function (err, ret) {
                return on_next(noStack, (function () {
                              try {
                                Curry._1(ensure, /* () */0);
                              }
                              catch (exn){
                                
                              }
                              return cb(err, ret);
                            }));
              }));
}

function $pipe$unknown$great(current, ensure, cb) {
  return ensure_pipe(undefined, current, ensure, cb);
}

function discard(fn, cb) {
  return Curry._1(fn, (function (err, _) {
                return cb(err, /* () */0);
              }));
}

function repeat(condition, computation, cb) {
  var exec = function () {
    return Curry._2(condition, /* () */0, (function (err, ret) {
                  var match = (err == null);
                  if (match && ret) {
                    return Curry._2(computation, /* () */0, (function (err, ret) {
                                  if (err == null) {
                                    return cb(err, ret);
                                  } else {
                                    setTimeout((function () {
                                            return exec(/* () */0);
                                          }), 0);
                                    return /* () */0;
                                  }
                                }));
                  } else {
                    return cb(err, /* () */0);
                  }
                }));
  };
  setTimeout((function () {
          return exec(/* () */0);
        }), 0);
  return /* () */0;
}

function repeat_unless(condition, computation) {
  var condition$1 = function (_, cb) {
    return Curry._2(condition, /* () */0, (function (err, ret) {
                  return cb(err, !ret);
                }));
  };
  return (function (param) {
      return repeat(condition$1, computation, param);
    });
}

function async_if(cond, computation, cb) {
  return Curry._1(cond, (function (err, ret) {
                var match = (err == null);
                if (match && ret) {
                  return Curry._2(computation, /* () */0, cb);
                } else {
                  return cb(err, /* () */0);
                }
              }));
}

function async_unless(cond, computation, cb) {
  var cond$1 = function (cb) {
    return Curry._1(cond, (function (err, ret) {
                  return cb(err, !ret);
                }));
  };
  return async_if(cond$1, computation, cb);
}

function itera($staropt$star, fn, a, cb) {
  var concurrency = $staropt$star !== undefined ? $staropt$star : 1;
  var total = a.length;
  var executed = /* record */[/* contents */0];
  var failed = /* record */[/* contents */false];
  var $$process = function () {
    var match = a.shift();
    if (match !== undefined) {
      return Curry._2(fn, match, (function (err, _) {
                    if (err == null) {
                      executed[0] = executed[0] + 1 | 0;
                      var match = failed[0];
                      var match$1 = executed[0];
                      if (match) {
                        return /* () */0;
                      } else if (match$1 === total) {
                        return cb(null, /* () */0);
                      } else {
                        setTimeout((function () {
                                return $$process(/* () */0);
                              }), 0);
                        return /* () */0;
                      }
                    } else {
                      if (!failed[0]) {
                        cb(err, null);
                      }
                      failed[0] = true;
                      return /* () */0;
                    }
                  }));
    } else {
      return /* () */0;
    }
  };
  if (total === 0) {
    return cb(null, /* () */0);
  } else {
    for(var _for = 1 ,_for_finish = total < concurrency ? total : concurrency; _for <= _for_finish; ++_for){
      setTimeout((function () {
              return $$process(/* () */0);
            }), 0);
    }
    return /* () */0;
  }
}

function iter(concurrency, fn, l) {
  var partial_arg = $$Array.of_list(l);
  return (function (param) {
      return itera(concurrency, fn, partial_arg, param);
    });
}

function fold_lefta(concurrency, fn, a, ba) {
  var cur = /* record */[/* contents */a];
  var fn$1 = function (b) {
    var partial_arg = cur[0];
    return (function (param) {
        return compose(undefined, partial_arg, (function (a) {
                      cur[0] = Curry._2(fn, a, b);
                      return (function (param) {
                          return param(null, /* () */0);
                        });
                    }), param);
      });
  };
  return (function (param) {
      return compose(undefined, (function (param) {
                    return itera(concurrency, fn$1, ba, param);
                  }), (function () {
                    return cur[0];
                  }), param);
    });
}

function fold_left(concurrency, fn, cur, l) {
  return fold_lefta(concurrency, fn, cur, $$Array.of_list(l));
}

function fold_lefti(concurrency, fn, cur, l) {
  var l$1 = List.mapi((function (idx, el) {
          return /* tuple */[
                  idx,
                  el
                ];
        }), l);
  var fn$1 = function (cur, param) {
    return Curry._3(fn, cur, param[0], param[1]);
  };
  return fold_left(concurrency, fn$1, cur, l$1);
}

function iteri(concurrency, fn, l) {
  var l$1 = List.mapi((function (idx, el) {
          return /* tuple */[
                  idx,
                  el
                ];
        }), l);
  var fn$1 = function (param) {
    return Curry._2(fn, param[0], param[1]);
  };
  return iter(concurrency, fn$1, l$1);
}

function mapa(concurrency, fn, a) {
  var ret = /* array */[];
  var map = function (v) {
    var partial_arg = Curry._1(fn, v);
    return (function (param) {
        return compose(undefined, partial_arg, (function (res) {
                      ret.push(res);
                      return (function (param) {
                          return param(null, /* () */0);
                        });
                    }), param);
      });
  };
  return (function (param) {
      return compose(undefined, (function (param) {
                    return itera(concurrency, map, a, param);
                  }), (function () {
                    return (function (param) {
                        return param(null, ret);
                      });
                  }), param);
    });
}

function map(concurrency, fn, l) {
  var partial_arg = mapa(concurrency, fn, $$Array.of_list(l));
  return (function (param) {
      return compose(undefined, partial_arg, (function (ret) {
                    var partial_arg = $$Array.to_list(ret);
                    return (function (param) {
                        return param(null, partial_arg);
                      });
                  }), param);
    });
}

function mapi(concurrency, fn, l) {
  var l$1 = List.mapi((function (idx, el) {
          return /* tuple */[
                  idx,
                  el
                ];
        }), l);
  var fn$1 = function (param) {
    return Curry._2(fn, param[0], param[1]);
  };
  return map(concurrency, fn$1, l$1);
}

function seqa(concurrency, a) {
  return (function (param) {
      return itera(concurrency, (function (v) {
                    return (function (param) {
                        return compose(undefined, v, $$return, param);
                      });
                  }), a, param);
    });
}

function seq(concurrency, l) {
  return seqa(concurrency, $$Array.of_list(l));
}

function resolvea(concurrency, a) {
  var resolving = /* record */[/* contents : [] */0];
  var wrap = function (fn) {
    var can_resolve = /* record */[/* contents */false];
    var callback = /* record */[/* contents */undefined];
    var wrap$1 = function (cb) {
      return (function (err, ret) {
          cb(err, ret);
          var match = resolving[0];
          if (match) {
            resolving[0] = match[1];
            return Curry._1(match[0], /* () */0);
          } else {
            return /* () */0;
          }
        });
    };
    var resolve = function () {
      var match = callback[0];
      if (match !== undefined) {
        return Curry._1(fn, Js_primitive.valFromOption(match));
      } else {
        can_resolve[0] = true;
        return /* () */0;
      }
    };
    var fn$1 = function (cb) {
      if (can_resolve[0]) {
        return Curry._1(fn, wrap$1(cb));
      } else {
        callback[0] = Js_primitive.some(wrap$1(cb));
        return /* () */0;
      }
    };
    return /* tuple */[
            can_resolve,
            resolve,
            fn$1
          ];
  };
  if (a.length <= concurrency) {
    return a;
  } else {
    var mapped = $$Array.map(wrap, a);
    var can_resolve = $$Array.map((function (param) {
            param[0][0] = true;
            return param[2];
          }), mapped.slice(0, concurrency));
    var pending = $$Array.map((function (param) {
            resolving[0] = /* :: */[
              param[1],
              resolving[0]
            ];
            return param[2];
          }), mapped.slice(concurrency));
    return $$Array.append(can_resolve, pending);
  }
}

function resolve(concurrency, l) {
  return $$Array.to_list(resolvea(concurrency, $$Array.of_list(l)));
}

function execute($staropt$star, t, cb) {
  var exceptionHandler = $staropt$star !== undefined ? $staropt$star : (function (exn) {
        throw exn;
      });
  return Curry._1(t, (function (err, ret) {
                if (err == null) {
                  return Curry._1(cb, ret);
                } else {
                  return Curry._1(exceptionHandler, err);
                }
              }));
}

function finish(exceptionHandler, t) {
  return execute(exceptionHandler, t, (function () {
                return /* () */0;
              }));
}

function from_promise(p, cb) {
  var on_success = function (ret) {
    cb(null, ret);
    return Promise.resolve(ret);
  };
  var on_error = function (err) {
    cb(err, null);
    return Promise.reject(err);
  };
  p.then(on_success).catch(on_error);
  return /* () */0;
}

function to_promise(fn) {
  return new Promise((function (resolve, reject) {
                return Curry._1(fn, (function (err, ret) {
                              if (err == null) {
                                return resolve(ret);
                              } else {
                                return reject(err);
                              }
                            }));
              }));
}

function Make(Wrapper) {
  var $$return = Wrapper[/* return */0];
  var fail = Wrapper[/* fail */1];
  var compose$1 = function (noStack, p, fn) {
    var c = Curry._1(Wrapper[/* to_callback */2], p);
    var fn$1 = function (v) {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(fn, v));
    };
    return Curry._1(Wrapper[/* from_callback */3], (function (param) {
                  return compose(noStack, c, fn$1, param);
                }));
  };
  var $great$great = function (p, fn) {
    return compose$1(undefined, p, fn);
  };
  var $$catch$1 = function (noStack, p, fn) {
    var c = Curry._1(Wrapper[/* to_callback */2], p);
    var fn$1 = function (v) {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(fn, v));
    };
    return Curry._1(Wrapper[/* from_callback */3], (function (param) {
                  return $$catch(noStack, c, fn$1, param);
                }));
  };
  var $pipe$pipe$great = function (p, fn) {
    return $$catch$1(undefined, p, fn);
  };
  var pipe$1 = function (noStack, p, fn) {
    var c = Curry._1(Wrapper[/* to_callback */2], p);
    return Curry._1(Wrapper[/* from_callback */3], (function (param) {
                  return pipe(noStack, c, fn, param);
                }));
  };
  var $great$pipe = function (p, fn) {
    return pipe$1(undefined, p, fn);
  };
  var ensure$1 = function (noStack, p, fn) {
    var c = Curry._1(Wrapper[/* to_callback */2], p);
    return Curry._1(Wrapper[/* from_callback */3], (function (param) {
                  return ensure(noStack, c, (function () {
                                return Curry._1(Wrapper[/* to_callback */2], Curry._1(fn, /* () */0));
                              }), param);
                }));
  };
  var $unknown$great = function (p, fn) {
    return ensure$1(undefined, p, fn);
  };
  var ensure_pipe$1 = function (noStack, p, fn) {
    var c = Curry._1(Wrapper[/* to_callback */2], p);
    return Curry._1(Wrapper[/* from_callback */3], (function (param) {
                  return ensure_pipe(noStack, c, fn, param);
                }));
  };
  var $pipe$unknown$great = function (p, fn) {
    return ensure_pipe$1(undefined, p, fn);
  };
  var discard = function (p) {
    return compose$1(undefined, p, (function () {
                  return Curry._1($$return, /* () */0);
                }));
  };
  var repeat$1 = function (cond, body) {
    var cond$1 = function () {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(cond, /* () */0));
    };
    var body$1 = function () {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(body, /* () */0));
    };
    return Curry._1(Wrapper[/* from_callback */3], (function (param) {
                  return repeat(cond$1, body$1, param);
                }));
  };
  var repeat_unless$1 = function (cond, body) {
    var cond$1 = function () {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(cond, /* () */0));
    };
    var body$1 = function () {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(body, /* () */0));
    };
    return Curry._1(Wrapper[/* from_callback */3], repeat_unless(cond$1, body$1));
  };
  var async_if$1 = function (cond, computation) {
    var cond$1 = Curry._1(Wrapper[/* to_callback */2], cond);
    var computation$1 = function () {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(computation, /* () */0));
    };
    return Curry._1(Wrapper[/* from_callback */3], (function (param) {
                  return async_if(cond$1, computation$1, param);
                }));
  };
  var async_unless$1 = function (cond, computation) {
    var cond$1 = Curry._1(Wrapper[/* to_callback */2], cond);
    var computation$1 = function () {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(computation, /* () */0));
    };
    return Curry._1(Wrapper[/* from_callback */3], (function (param) {
                  return async_unless(cond$1, computation$1, param);
                }));
  };
  var fold_lefta$1 = function (concurrency, fn, p, a) {
    var fn$1 = function (x, y) {
      return Curry._1(Wrapper[/* to_callback */2], Curry._2(fn, x, y));
    };
    var c = Curry._1(Wrapper[/* to_callback */2], p);
    return Curry._1(Wrapper[/* from_callback */3], fold_lefta(concurrency, fn$1, c, a));
  };
  var fold_left = function (concurrency, fn, p, l) {
    return fold_lefta$1(concurrency, fn, p, $$Array.of_list(l));
  };
  var fold_lefti$1 = function (concurrency, fn, p, l) {
    var fn$1 = function (x, pos, y) {
      return Curry._1(Wrapper[/* to_callback */2], Curry._3(fn, x, pos, y));
    };
    var c = Curry._1(Wrapper[/* to_callback */2], p);
    return Curry._1(Wrapper[/* from_callback */3], fold_lefti(concurrency, fn$1, c, l));
  };
  var itera$1 = function (concurrency, fn, a) {
    var fn$1 = function (x) {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(fn, x));
    };
    return Curry._1(Wrapper[/* from_callback */3], (function (param) {
                  return itera(concurrency, fn$1, a, param);
                }));
  };
  var iter = function (concurrency, fn, l) {
    return itera$1(concurrency, fn, $$Array.of_list(l));
  };
  var iteri$1 = function (concurrency, fn, l) {
    var fn$1 = function (pos, x) {
      return Curry._1(Wrapper[/* to_callback */2], Curry._2(fn, pos, x));
    };
    return Curry._1(Wrapper[/* from_callback */3], iteri(concurrency, fn$1, l));
  };
  var mapa$1 = function (concurrency, fn, a) {
    var fn$1 = function (x) {
      return Curry._1(Wrapper[/* to_callback */2], Curry._1(fn, x));
    };
    return Curry._1(Wrapper[/* from_callback */3], mapa(concurrency, fn$1, a));
  };
  var map = function (concurrency, fn, l) {
    return compose$1(undefined, mapa$1(concurrency, fn, $$Array.of_list(l)), (function (a) {
                  return Curry._1($$return, $$Array.to_list(a));
                }));
  };
  var mapi$1 = function (concurrency, fn, l) {
    var fn$1 = function (pos, x) {
      return Curry._1(Wrapper[/* to_callback */2], Curry._2(fn, pos, x));
    };
    return Curry._1(Wrapper[/* from_callback */3], mapi(concurrency, fn$1, l));
  };
  var seqa$1 = function (concurrency, a) {
    var a$1 = $$Array.map(Wrapper[/* to_callback */2], a);
    return Curry._1(Wrapper[/* from_callback */3], seqa(concurrency, a$1));
  };
  var seq = function (concurrency, l) {
    return seqa$1(concurrency, $$Array.of_list(l));
  };
  var resolvea$1 = function (concurrency, a) {
    var a$1 = $$Array.map(Wrapper[/* to_callback */2], a);
    return $$Array.map(Wrapper[/* from_callback */3], resolvea(concurrency, a$1));
  };
  var resolve = function (concurrency, l) {
    return $$Array.to_list(resolvea$1(concurrency, $$Array.of_list(l)));
  };
  var execute$1 = function (exceptionHandler, p, cb) {
    return execute(exceptionHandler, Curry._1(Wrapper[/* to_callback */2], p), cb);
  };
  var finish = function (exceptionHandler, p) {
    return execute$1(exceptionHandler, p, (function () {
                  return /* () */0;
                }));
  };
  return /* module */[
          /* return */$$return,
          /* fail */fail,
          /* compose */compose$1,
          /* >> */$great$great,
          /* catch */$$catch$1,
          /* ||> */$pipe$pipe$great,
          /* pipe */pipe$1,
          /* >| */$great$pipe,
          /* ensure */ensure$1,
          /* &> */$unknown$great,
          /* ensure_pipe */ensure_pipe$1,
          /* |&> */$pipe$unknown$great,
          /* discard */discard,
          /* repeat */repeat$1,
          /* repeat_unless */repeat_unless$1,
          /* async_if */async_if$1,
          /* async_unless */async_unless$1,
          /* fold_lefta */fold_lefta$1,
          /* fold_left */fold_left,
          /* fold_lefti */fold_lefti$1,
          /* itera */itera$1,
          /* iter */iter,
          /* iteri */iteri$1,
          /* mapa */mapa$1,
          /* map */map,
          /* mapi */mapi$1,
          /* seqa */seqa$1,
          /* seq */seq,
          /* resolvea */resolvea$1,
          /* resolve */resolve,
          /* execute */execute$1,
          /* finish */finish
        ];
}

function $$return$1(prim) {
  return Promise.resolve(prim);
}

function fail$1(prim) {
  return Promise.reject(prim);
}

function compose$1(noStack, p, fn) {
  var c = function (param) {
    return from_promise(p, param);
  };
  var fn$1 = function (v) {
    var partial_arg = Curry._1(fn, v);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  return to_promise((function (param) {
                return compose(noStack, c, fn$1, param);
              }));
}

function ensure$1(noStack, p, fn) {
  var c = function (param) {
    return from_promise(p, param);
  };
  return to_promise((function (param) {
                return ensure(noStack, c, (function () {
                              var partial_arg = Curry._1(fn, /* () */0);
                              return (function (param) {
                                  return from_promise(partial_arg, param);
                                });
                            }), param);
              }));
}

function ensure_pipe$1(noStack, p, fn) {
  var c = function (param) {
    return from_promise(p, param);
  };
  return to_promise((function (param) {
                return ensure_pipe(noStack, c, fn, param);
              }));
}

function $pipe$unknown$great$1(p, fn) {
  return ensure_pipe$1(undefined, p, fn);
}

function discard$1(p) {
  return compose$1(undefined, p, (function () {
                return Promise.resolve(/* () */0);
              }));
}

function repeat$1(cond, body) {
  var cond$1 = function () {
    var partial_arg = Curry._1(cond, /* () */0);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  var body$1 = function () {
    var partial_arg = Curry._1(body, /* () */0);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  return to_promise((function (param) {
                return repeat(cond$1, body$1, param);
              }));
}

function repeat_unless$1(cond, body) {
  var cond$1 = function () {
    var partial_arg = Curry._1(cond, /* () */0);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  var body$1 = function () {
    var partial_arg = Curry._1(body, /* () */0);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  return to_promise(repeat_unless(cond$1, body$1));
}

function async_if$1(cond, computation) {
  var cond$1 = function (param) {
    return from_promise(cond, param);
  };
  var computation$1 = function () {
    var partial_arg = Curry._1(computation, /* () */0);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  return to_promise((function (param) {
                return async_if(cond$1, computation$1, param);
              }));
}

function async_unless$1(cond, computation) {
  var cond$1 = function (param) {
    return from_promise(cond, param);
  };
  var computation$1 = function () {
    var partial_arg = Curry._1(computation, /* () */0);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  return to_promise((function (param) {
                return async_unless(cond$1, computation$1, param);
              }));
}

function fold_lefta$1(concurrency, fn, p, a) {
  var fn$1 = function (x, y) {
    var partial_arg = Curry._2(fn, x, y);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  var c = function (param) {
    return from_promise(p, param);
  };
  return to_promise(fold_lefta(concurrency, fn$1, c, a));
}

function fold_left$1(concurrency, fn, p, l) {
  return fold_lefta$1(concurrency, fn, p, $$Array.of_list(l));
}

function fold_lefti$1(concurrency, fn, p, l) {
  var fn$1 = function (x, pos, y) {
    var partial_arg = Curry._3(fn, x, pos, y);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  var c = function (param) {
    return from_promise(p, param);
  };
  return to_promise(fold_lefti(concurrency, fn$1, c, l));
}

function itera$1(concurrency, fn, a) {
  var fn$1 = function (x) {
    var partial_arg = Curry._1(fn, x);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  return to_promise((function (param) {
                return itera(concurrency, fn$1, a, param);
              }));
}

function iter$1(concurrency, fn, l) {
  return itera$1(concurrency, fn, $$Array.of_list(l));
}

function iteri$1(concurrency, fn, l) {
  var fn$1 = function (pos, x) {
    var partial_arg = Curry._2(fn, pos, x);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  return to_promise(iteri(concurrency, fn$1, l));
}

function mapa$1(concurrency, fn, a) {
  var fn$1 = function (x) {
    var partial_arg = Curry._1(fn, x);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  return to_promise(mapa(concurrency, fn$1, a));
}

function map$1(concurrency, fn, l) {
  return compose$1(undefined, mapa$1(concurrency, fn, $$Array.of_list(l)), (function (a) {
                return Promise.resolve($$Array.to_list(a));
              }));
}

function mapi$1(concurrency, fn, l) {
  var fn$1 = function (pos, x) {
    var partial_arg = Curry._2(fn, pos, x);
    return (function (param) {
        return from_promise(partial_arg, param);
      });
  };
  return to_promise(mapi(concurrency, fn$1, l));
}

function seqa$1(concurrency, a) {
  var a$1 = $$Array.map(from_promise, a);
  return to_promise(seqa(concurrency, a$1));
}

function seq$1(concurrency, l) {
  return seqa$1(concurrency, $$Array.of_list(l));
}

function resolvea$1(concurrency, a) {
  var a$1 = $$Array.map(from_promise, a);
  return $$Array.map(to_promise, resolvea(concurrency, a$1));
}

function resolve$1(concurrency, l) {
  return $$Array.to_list(resolvea$1(concurrency, $$Array.of_list(l)));
}

function execute$1(exceptionHandler, p, cb) {
  return execute(exceptionHandler, (function (param) {
                return from_promise(p, param);
              }), cb);
}

function finish$1(exceptionHandler, p) {
  return execute$1(exceptionHandler, p, (function () {
                return /* () */0;
              }));
}

function compose$2(_, p, fn) {
  return p.then(Curry.__1(fn));
}

function $great$great$1(p, fn) {
  return p.then(Curry.__1(fn));
}

function $$catch$1(_, p, fn) {
  return p.catch(Curry.__1(fn));
}

function $pipe$pipe$great$1(p, fn) {
  return $$catch$1(undefined, p, fn);
}

function pipe$1(_, p, fn) {
  return p.then((function (v) {
                return Promise.resolve(Curry._1(fn, v));
              }));
}

function $great$pipe$1(p, fn) {
  return pipe$1(undefined, p, fn);
}

function ensure$2(_, p, fn) {
  return ensure$1(true, p, fn);
}

function $unknown$great$1(p, fn) {
  return ensure$1(true, p, fn);
}

var Callback = [
  $$return,
  fail,
  compose,
  $great$great,
  $$catch,
  $pipe$pipe$great,
  pipe,
  $great$pipe,
  ensure,
  $unknown$great,
  ensure_pipe,
  $pipe$unknown$great,
  discard,
  repeat,
  repeat_unless,
  async_if,
  async_unless,
  fold_lefta,
  fold_left,
  fold_lefti,
  itera,
  iter,
  iteri,
  mapa,
  map,
  mapi,
  seqa,
  seq,
  resolvea,
  resolve,
  execute,
  finish
];

var Promise$1 = [
  $$return$1,
  fail$1,
  compose$2,
  $great$great$1,
  $$catch$1,
  $pipe$pipe$great$1,
  pipe$1,
  $great$pipe$1,
  ensure$2,
  $unknown$great$1,
  ensure_pipe$1,
  $pipe$unknown$great$1,
  discard$1,
  repeat$1,
  repeat_unless$1,
  async_if$1,
  async_unless$1,
  fold_lefta$1,
  fold_left$1,
  fold_lefti$1,
  itera$1,
  iter$1,
  iteri$1,
  mapa$1,
  map$1,
  mapi$1,
  seqa$1,
  seq$1,
  resolvea$1,
  resolve$1,
  execute$1,
  finish$1
];

exports.Callback = Callback;
exports.Make = Make;
exports.from_promise = from_promise;
exports.to_promise = to_promise;
exports.Promise = Promise$1;
/* No side effect */

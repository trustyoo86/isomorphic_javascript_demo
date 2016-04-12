import { camelizeKeys } from 'humps';
import superAgent       from 'superagent';
import Promise          from 'bluebird';
import _                from 'lodash';

export const CALL_API = Symbol('CALL_API');
/**
 * @description REST api Middleware function
 * @param {object} store Redux store
 * @param {object} action Redux action
 * @return {object} deferred.promise Promise object from bluebird library defer callbacks
 */
export default store => next => action => {
  if (!action[CALL_API]) {
    return next(action);
  }

  let request = action[CALL_API];
  let { getState } = store;
  let deferred = Promise.defer();
  let { method, url, successType, data } = request;


  superAgent[method](url)
    .send(data)
    .end((err, res) => {
      if (!err) {
        next({
          type : successType,
          response : res.body
        });

        if (_.isFunction(request.afterSuccess)) {
          request.afterSuccess({getState});
        }

        deferred.resolve();
      } else {
        deferred.reject();
      }
    });

  return deferred.promise;
};
"use strict";

/**
 * Helperfunctions
 * @param {Function} func Async handling
 * @return {Function} synced handling for cb
 */
export function wrapHandler(that, func) {
    func = func.bind(that);

    return (req, res, next) => {
        try {
            return func(req, res, next)?.catch((ex) => {
                return next(ex);
            });
        } catch (ex) {
            return next(ex);
        }
    };
};

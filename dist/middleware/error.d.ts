import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import type { Middleware } from 'koa';
/**
 * The response when something bad happens
 */
export interface ErrorResponse {
    /**
     * The generic reason why the request failed
     *
     * @type {String}
     * @example "Bad Request"
     */
    reason: ReasonPhrases | string;
    /**
     * The error message that explains the cause of the fail
     *
     * @type {string}
     */
    message: string;
    /**
     * The HTTP status code of the error
     *
     * @type {number}
     * @example 400
     */
    statusCode: StatusCodes;
    /**
     * In case of a validation error, this object will show the error by field
     *
     * @type {Record<string, string>}
     * @example <caption>Validation error when task's text is too short</caption>
     * ```json
     * {
     *   "text": "\"text\" length must be at least 3 characters long"
     * }
     * ```
     * @example <caption>Validation error when task's text is missing</caption>
     * ```json
     * {
     *   "text": "\"text\" is required"
     * }
     * ```
     */
    details?: Record<string, string>;
}
declare const errorHandler: Middleware;
export default errorHandler;

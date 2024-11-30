module.exports = function responsehandler(reqstatus, reqstatusCode, reqmessage, reqresult) {
    if (reqstatusCode == 400) {
        var statusText = "HTTP 400 Bad Request";
        var message = "Invalid request, missing required headers.";
    }
    else if (reqstatusCode == 401) {
        var statusText = "HTTP 401 Unauthorized";
        var message = "Invalid request, access token is invalid.";
    }
    else if (reqstatusCode == 403) {
        var statusText = "HTTP 403 Forbidden";
        var message = "Invalid request, missing authorization headers.";
    }
    else if (reqstatusCode == 415) {
        var statusText = "HTTP 415 Unsupported entity";
        var message = "Invalid request, json is not valid";
    }
    else if (reqstatusCode == 422) {
        var statusText = "HTTP 422 Unprocessable entity";
        var message = "Invalid request, missing required parameters.";
    }
    else if (reqstatusCode == 200) {
        var statusText = "HTTP 200 OK success";
    }
    else if (reqstatusCode == 500) {
        var statusText = "HTTP 500 Internal Server Error";
        var message = reqresult;
    }
    else if (reqstatusCode == 204) {
        var statusText = "HTTP 204 No Content";
    }
    else if (reqstatusCode == 406) {
        var statusText = "HTTP 406 Content Not Acceptable";
    }
    else {
        var statusText = "Invalid Status Code";
        var message = "The status code rejected by the server.";
    }
    if (reqstatus == 0) {
        if (reqstatusCode == 200 || reqstatusCode == 204 || reqstatusCode == 406) {
            var json_result =
            {
                status: reqstatus,
                statusCode: reqstatusCode,
                statusText: statusText,
                message: reqmessage
            }
        }
        else if (reqstatusCode == 500) {
            var json_result =
            {
                status: reqstatus,
                statusCode: reqstatusCode,
                statusText: statusText,
                message: message
            }
        }
        else {
            var json_result =
            {
                status: reqstatus,
                statusCode: reqstatusCode,
                statusText: statusText,
                message: message,
                result: reqresult,
            }
        }
    }
    else {
        if (!reqresult) {
            var json_result =
            {
                status: reqstatus,
                statusCode: reqstatusCode,
                statusText: statusText,
                message: reqmessage
            }
        }
        else {
            var json_result =
            {
                status: reqstatus,
                statusCode: reqstatusCode,
                statusText: statusText,
                message: reqmessage,
                result: reqresult
            }
        }
    }
    return json_result;
};
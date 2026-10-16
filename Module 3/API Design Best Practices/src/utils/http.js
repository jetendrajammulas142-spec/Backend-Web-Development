
function sendOk(res, data, status = 200) {
  return res.status(status).json({
    ok: true,
    data
  });
}

function sendError(res, status, code, message) {
  return res.status(status).json({
    ok: false,
    error: {
      code,
      message
    }
  });
}

module.exports = {
  sendOk,
  sendError
};

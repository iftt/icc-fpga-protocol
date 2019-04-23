const test = require('tape')

// NOTE: Test cases can only happen assuming an actual ICC-FPGA capable device is connected

test('timing test', function (t) {
  t.plan(1)

  t.equal(typeof Date.now, 'function')
})

var observer = require('../lib/observer');
describe('observer', function () {
    function B() {}
    before(function () {
        for (var pro in observer) {
            B.prototype[pro] = observer[pro];
        }
    });
    it('#B', function () {
        var b = new B();
        b.on('abc', function () {
            console.log('abc');
        });
        b.on('abc', function () {
            console.log('abc');
        });
        b.on('abc', function () {
            console.log('abc');
        });
        b.on('aaa', function () {
            console.log('aaa');
        })
        b.emit('abc');
        b.emit('aaa');
        b.off('abc');
        b.emit('abc');
        b.emit('aaa');
        b.clear();
        b.emit('aaa');
        b.should.have.property('on');
        b.should.have.property('off');
        b.should.have.property('emit');
        b.should.have.property('clear');
    });
});
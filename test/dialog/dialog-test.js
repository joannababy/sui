define(function(require) {
    var Dialog = require('dialog');

    describe('dialog', function() {
        var d;

        afterEach(function() {
            if (d) {
                d.hide();
                d.destroy();
                d = null;
            }
        });

        describe('content', function() {
            
            it('is string', function() {
                d = new Dialog({
                    content: 'test1'
                });
                // console.log(d)
                d.show();
                expect(d._find('content').html()).to.be('test1');
            });

        });
    });
});
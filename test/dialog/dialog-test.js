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
                d.show();
                expect(d._find('content').html()).to.be('test1');
            });

            it('is dom', function() {
                var $dom = $('<div id="test2">test2</div>');
                d = new Dialog({
                    content: $dom
                });
                d.show();

                var test = d._find('content').children().eq(0);
                expect(test.attr('id')).to.be('test2');
                expect(test.html()).to.be('test2');
            });

            it('is html', function() {
                d = new Dialog({
                    content: '<h1>test3</h1>'
                });
                d.show();
                expect(d._find('content').html()).to.be('<h1>test3</h1>');
            });

        });
    });
});
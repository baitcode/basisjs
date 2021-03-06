module.exports = {
  name: 'basis.l10n',

  html: __dirname + 'l10n.html',  // to properly load .l10n file
  init: function(){
    basis.require('basis.l10n');
  },

  test: [
    {
      name: 'fallback',
      test: function(){
        var res = JSON.parse(basis.require('./l10n.l10n').resource.get(true));
        var dict = basis.l10n.dictionary('l10n.l10n');
        basis.l10n.setCulture('en-US');
        this.is('base', dict.token('value').value);

        basis.l10n.setCultureList('en-US a/b b/c c');

        basis.l10n.setCulture('c');
        this.is('base', dict.token('value').value);
        basis.l10n.setCulture('b');
        this.is('base', dict.token('value').value);
        basis.l10n.setCulture('a');
        this.is('base', dict.token('value').value);

        res.c = { value: 'c' };
        dict.resource.update(JSON.stringify(res));
        basis.l10n.setCulture('c');
        this.is('c', dict.token('value').value);

        basis.l10n.setCulture('b');
        this.is('c', dict.token('value').value);
        basis.l10n.setCulture('a');
        this.is('c', dict.token('value').value);

        res.b = { value: 'b' };
        dict.resource.update(JSON.stringify(res));
        this.is('b', dict.token('value').value);
        basis.l10n.setCulture('b');
        this.is('b', dict.token('value').value);
        basis.l10n.setCulture('c');
        this.is('c', dict.token('value').value);

        res.a = { value: 'a' };
        dict.resource.update(JSON.stringify(res));
        basis.l10n.setCulture('a');
        this.is('a', dict.token('value').value);
        basis.l10n.setCulture('b');
        this.is('b', dict.token('value').value);
        basis.l10n.setCulture('c');
        this.is('c', dict.token('value').value);
      }
    },
    {
      name: 'dictionary',
      test: function(){
        this.is(true, basis.l10n.dictionary('l10n.l10n') === basis.l10n.dictionary('l10n.l10n'));
        this.is(true, basis.l10n.dictionary(basis.resource('./l10n.l10n')) === basis.l10n.dictionary('l10n.l10n'));

        var staticdata = { 'ru-RU': { test: 'Test' } };
        var dict = basis.l10n.dictionary(staticdata);
        this.is(true, dict instanceof basis.l10n.Dictionary);
        this.is(true, basis.l10n.dictionary(staticdata) !== basis.l10n.dictionary(staticdata));

        //
        basis.l10n.setCultureList('en-US ru-RU');

        basis.l10n.setCulture('en-US');
        this.is(true, dict.token('test').value === undefined);

        basis.l10n.setCulture('ru-RU');
        this.is('Test', dict.token('test').value);
      }
    },
    {
      name: 'culture/Culture',
      test: function(){
        basis.l10n.setCultureList('en-US ru-RU');

        basis.l10n.setCulture('en-US');
        this.is('en-US', basis.l10n.getCulture());
        this.is('en-US', basis.l10n.culture.value);
        this.is('en-US', basis.l10n.culture.get());
        this.is('en-US', basis.l10n.culture().name);

        basis.l10n.setCulture('ru-RU');
        this.is('ru-RU', basis.l10n.getCulture());
        this.is('ru-RU', basis.l10n.culture.value);
        this.is('ru-RU', basis.l10n.culture.get());
        this.is('ru-RU', basis.l10n.culture().name);

        basis.l10n.culture.set('en-US');
        this.is('en-US', basis.l10n.getCulture());
        this.is('en-US', basis.l10n.culture.value);
        this.is('en-US', basis.l10n.culture.get());
        this.is('en-US', basis.l10n.culture().name);

        // create culture
        this.is('en-US', (new basis.l10n.Culture('en-US')).name);
        this.is(true, (new basis.l10n.Culture('en-US')) !== (new basis.l10n.Culture('en-US')));

        // culture helper
        this.is(true, basis.l10n.culture('ru-RU') === basis.l10n.culture('ru-RU'));
        this.is(true, basis.l10n.culture() === basis.l10n.culture(basis.l10n.getCulture()));
        this.is(true, basis.l10n.culture() instanceof basis.l10n.Culture);
      }
    }
  ]
};

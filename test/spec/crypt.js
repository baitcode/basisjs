module.exports = {
  name: 'basis.crypt',

  init: function(){
    basis.require('basis.crypt');

    var UTF16 = basis.utils.utf16;
    var UTF8 = basis.utils.utf8;
    var base64 = basis.utils.base64;
    var SHA1 = basis.crypt.sha1;
    var MD5 = basis.crypt.md5;

    var utf16Bytes = [];
    utf16Bytes[0] = [63, 4, 64, 4, 56, 4, 50, 4, 53, 4, 66, 4];
    utf16Bytes[1] = [135, 8, 135, 9, 135, 24];
    utf16Bytes[2] = [127, 0, 128, 0, 255, 7, 0, 8];

    var utf16Str = [];
    utf16Str[0] = 'привет';
    utf16Str[1] = '\u0887\u0987\u1887';
    utf16Str[2] = '\u007F\u0080\u07FF\u0800';
    utf16Str[3] = utf16Str[0] + ' world';
    utf16Str[4] = utf16Str[0] + '\t\r\n world\n\r\t';
    utf16Str[5] = utf16Str[0] + utf16Str[1];
    utf16Str[6] = utf16Str[3] + utf16Str[1];
    utf16Str[7] = utf16Str[4] + utf16Str[1];

    var utf8Bytes = [];
    utf8Bytes[0] = [208, 191, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130];
    utf8Bytes[1] = [224, 162, 135, 224, 166, 135, 225, 162, 135];
    utf8Bytes[2] = [127, 194, 128, 223, 191, 224, 160, 128];

    var utf8Str = [];
    utf8Str[0] = utf8Bytes[0].map(code2char).join('');
    utf8Str[1] = utf8Bytes[1].map(code2char).join('');
    utf8Str[2] = utf8Bytes[2].map(code2char).join('');
    utf8Str[3] = utf8Str[0] + ' world';
    utf8Str[4] = utf8Str[0] + '\t\r\n world\n\r\t';
    utf8Str[5] = utf8Str[0] + utf8Str[1];
    utf8Str[6] = utf8Str[3] + utf8Str[1];
    utf8Str[7] = utf8Str[4] + utf8Str[1];

    function code2char(ch){
      return String.fromCharCode(ch);
    }

    function hex(value){
      var res = value.toString(16);
      return res.length == 1 ? '0' + res : res;
    };
  },

  test: [
    {
      name: 'UTF',
      test: [
        {
          name: 'UTF8',
          test: [
            {
              name: 'toBytes',
              test: function(){
                for (var i = 0; i < utf8Bytes.length; i++)
                  this.is(utf8Bytes[i], UTF8.toBytes(utf8Str[i]));
              }
            },
            {
              name: 'fromBytes',
              test: function(){
                for (var i = 0; i < utf8Bytes.length; i++)
                  this.is(utf8Str[i], UTF8.fromBytes(utf8Bytes[i]));
              }
            },
            {
              name: 'fromUTF16',
              test: function(){
                for (var i = 0; i < utf16Str.length; i++)
                  this.is(utf8Str[i], UTF8.fromUTF16(utf16Str[i]));
              }
            },
            {
              name: 'fromUTF16Bytes',
              test: function(){
                for (var i = 0; i < utf16Bytes.length; i++)
                  this.is(utf8Str[i], UTF8.fromUTF16Bytes(utf16Bytes[i]));
              }
            },
            {
              name: 'toUTF16',
              test: function(){
                for (var i = 0; i < utf8Str.length; i++)
                  this.is(utf16Str[i], UTF8.toUTF16(utf8Str[i]));
              }
            },
            {
              name: 'toUTF16Bytes',
              test: function(){
                for (var i = 0; i < utf16Bytes.length; i++)
                  this.is(utf16Bytes[i], UTF8.toUTF16Bytes(utf8Str[i]));
              }
            },
            {
              name: 'toUTF16 <=> fromUTF16',
              test: function(){
                var S = 'hello world';
                this.is(S, UTF8.toUTF16(UTF8.fromUTF16(S)));

                var S = 'привет мир';
                this.is(S, UTF8.toUTF16(UTF8.fromUTF16(S)));

                var S = 'hello мир';
                this.is(S, UTF8.toUTF16(UTF8.fromUTF16(S)));

                var S = '\t\r\nhello \rмир\n';
                this.is(S, UTF8.toUTF16(UTF8.fromUTF16(S)));
              }
            },
            {
              name: 'toUTF16 <=> fromUTF16 #2',
              test: function(){
                for (var i = 0; i < utf8Str.length; i++)
                  this.is(utf16Str[i], UTF8.toUTF16(UTF8.fromUTF16(utf16Str[i])));
              }
            },
            {
              name: 'toUTF16 <=> fromUTF16 #3',
              test: function(){
                for (var i = 0; i < utf16Str.length; i++)
                  this.is(utf8Str[i], UTF8.fromUTF16(UTF8.toUTF16(utf8Str[i])));
              }
            }
          ]
        },
        {
          name: 'UTF16',
          test: [
            {
              name: 'toBytes',
              test: function(){
                for (var i = 0; i < utf16Bytes.length; i++)
                  this.is(utf16Bytes[i], UTF16.toBytes(utf16Str[i]));
              }
            },
            {
              name: 'fromBytes',
              test: function(){
                for (var i = 0; i < utf16Bytes.length; i++)
                  this.is(utf16Str[i], UTF16.fromBytes(utf16Bytes[i]));
              }
            },
            {
              name: 'fromUTF8',
              test: function(){
                for (var i = 0; i < utf8Str.length; i++)
                  this.is(utf16Str[i], UTF16.fromUTF8(utf8Str[i]));
              }
            },
            {
              name: 'fromUTF8Bytes',
              test: function(){
                for (var i = 0; i < utf8Bytes.length; i++)
                  this.is(utf16Str[i], UTF16.fromUTF8Bytes(utf8Bytes[i]));
              }
            },
            {
              name: 'toUTF8',
              test: function(){
                for (var i = 0; i < utf16Str.length; i++)
                  this.is(utf8Str[i], UTF16.toUTF8(utf16Str[i]));
              }
            },
            {
              name: 'toUTF8Bytes',
              test: function(){
                for (var i = 0; i < utf8Bytes.length; i++)
                  this.is(utf8Bytes[i], UTF16.toUTF8Bytes(utf16Str[i]));
              }
            },
            {
              name: 'toUTF8 <=> fromUTF8',
              test: function(){
                var S = 'hello world';
                this.is(S, UTF16.toUTF8(UTF16.fromUTF8(S)));

                var S = [208, 191, 209, 128, 208, 184, 208, 178, 208, 181, 209, 130, 32, 208, 188, 208, 184, 209, 128].map(code2char).join('');
                this.is(S, UTF16.toUTF8(UTF16.fromUTF8(S)));

                var S = 'hello ' + [208, 188, 208, 184, 209, 128].map(code2char).join('');
                this.is(S, UTF16.toUTF8(UTF16.fromUTF8(S)));

                var S = '\t\r\nhello \r'  + [208, 188, 208, 184, 209, 128].map(code2char).join('') + '\n';
                this.is(S, UTF16.toUTF8(UTF16.fromUTF8(S)));
              }
            },
            {
              name: 'toUTF8 <=> fromUTF8 #2',
              test: function(){
                for (var i = 0; i < utf8Str.length; i++)
                  this.is(utf8Str[i], UTF16.toUTF8(UTF16.fromUTF8(utf8Str[i])));
              }
            },
            {
              name: 'toUTF8 <=> fromUTF8 #3',
              test: function(){
                for (var i = 0; i < utf16Str.length; i++)
                  this.is(utf16Str[i], UTF16.fromUTF8(UTF16.toUTF8(utf16Str[i])));
              }
            }
          ]
        }
      ]
    },
    {
      name: 'Hashes',
      test: [
        {
          name: 'Base64',
          test: [
            {
              name: 'encode',
              test: function(){
                this.is('', base64.encode(''));
                this.is('aABlAGwAbABvACAAdwBvAHIAbAA=', base64.encode('hello worl'));
                this.is('aABlAGwAbABvACAAdwBvAHIAbABkAA==', base64.encode('hello world'));
                this.is('aABlAGwAbABvACAAdwBvAHIAbABkACEA', base64.encode('hello world!'));
                this.is('PwRABDgEMgQ1BEIEIAA8BDgEQAQ=', base64.encode('привет мир'));
                this.is('0J/RgNC40LLQtdGCINC80LjRgEhlbGxvIHdvcmxk', base64.encode('Привет мирHello world', true));
                this.is('HwRABDgEMgQ1BEIEIAA8BDgEQARIAGUAbABsAG8AIAB3AG8AcgBsAGQA', base64.encode('Привет мирHello world'));
              }
            },
            {
              name: 'decode',
              test: function(){
                this.is('', base64.decode(''));
                this.is('hello worl', base64.decode('aABlAGwAbABvACAAdwBvAHIAbAA='));
                this.is('hello world', base64.decode('aABlAGwAbABvACAAdwBvAHIAbABkAA=='));
                this.is('hello world!', base64.decode('aABlAGwAbABvACAAdwBvAHIAbABkACEA'));
                this.is('привет мир', base64.decode('PwRABDgEMgQ1BEIEIAA8BDgEQAQ='));
                this.is('Привет мирHello world', base64.decode('0J/RgNC40LLQtdGCINC80LjRgEhlbGxvIHdvcmxk', true));
                this.is('Привет мирHello world', base64.decode('HwRABDgEMgQ1BEIEIAA8BDgEQARIAGUAbABsAG8AIAB3AG8AcgBsAGQA'));
              }
            }
          ]
        },
        {
          name: 'SHA1',
          test: function(){
            this.is('2fd4e1c67a2d28fced849ee1bb76e7391b93eb12', SHA1('The quick brown fox jumps over the lazy dog', true).map(hex).join(''));
            this.is('50edb0e47dbb65c8498d1bdd51723d4e9104f2a0', SHA1('Привет мирHello world').map(hex).join(''));
            this.is('654ff793e9a7c63429041383da52a32b517c60c5', SHA1('Привет мирHello world', true).map(hex).join(''));
          }
        },
        {
          name: 'MD5',
          test: function(){
            this.is('9e107d9d372bb6826bd81d3542a419d6', MD5('The quick brown fox jumps over the lazy dog', true).map(hex).join(''));
            this.is('1a279ee072886994b2cbd88559e3cdfa', MD5('Привет мирHello world').map(hex).join(''));
            this.is('42c488cb0b5fa1819d0f1e7d57ac1821', MD5('Привет мирHello world', true).map(hex).join(''));
          }
        }
      ]
    },
    {
      name: 'Array & String extension',
      test: [
        {
          name: '.md5()',
          test: function(){
          }
        },
        {
          name: '.md5hex()',
          test: function(){
          }
        },
        {
          name: '.sha1()',
          test: function(){
          }
        },
        {
          name: '.sha1hex()',
          test: function(){
          }
        },
        {
          name: '.base64()',
          test: function(){
          }
        },
        {
          name: '.hex()',
          test: function(){
          }
        }
      ]
    }
  ]
};

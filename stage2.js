/*

    EndPwn3 Stage 2 Payload
    Based on the EndPwn Reference Bootstrap
    
    Copyright 2018 EndPwn
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/

(() => {

    // use the discord native api to require electron and get electron.remote
    var electron = DiscordNative.nativeModules.requireModule('discord_/../electron').remote;
    var fs = electron.require('original-fs');

    // get the data path (where epapi.js should be)
    var data = electron.app.getPath('userData').replace(/\\\\/g, "/") + '/';

    // shakily reimplemented of require() intended for loading plugins and EPAPI itself
    function __krequire(path) {
        return eval('(()=>{var exports={};' + fs.readFileSync(data + path, 'utf8').toString() + ';return exports})()');
    }

    // EndPwn3 specific features
    document.addEventListener('ep-ready', () => {

        // enable experiments
        $api.util.findFuncExports('isDeveloper').__defineGetter__('isDeveloper', () => true);

        // disable that obnoxious warning about not pasting shit in the console
        $api.util.findFuncExports('consoleWarning').consoleWarning = e => { };

        // goodies for contributors, and also kat bc shes my girlfriend
        $api.util.wrapAfter(
            "wc.findCache('getUser')[0].exports.getUser",

            x => {

                if (x === undefined) return;

                switch (x.id) {
                    case '155799811134717952':      // ash^l1nkd
                        x.discriminator = 'L1NK'
                    case '133510610896814080':      // bootsy
                    case '141011672826511360':      // caela^dr1ft
                        x.bot = true;
                        break;
                    case '266757314864742421':      // astra^dr1ft
                        x.discriminator = 'CUTE';
                        break;
                    case '277916164661968896':      // toxoid49b
                        x.discriminator = 'DERG';
                        break;
                    case '112680555941744640':      // kat
                        x.discriminator = 'BOOB';
                        break;
                    case '430721014117433344':      // talia^l1nkd
                        x.discriminator = 'L1NK';
                        break;
                }

                return x;
            }
        );

        // goodies for servers directly associated with the endpwn project
        $api.util.wrapAfter(
            "wc.findCache('getGuild')[0].exports.getGuild",

            x => {

                if (x === undefined) return;

                switch (x.id) {
                    case '314082522067632130':      // Utopia
                        x.features.add('VERIFIED');
                        break;
                }

                return x;
            }
        );

    });

    // load EPAPI
    var epapi = __krequire('epapi.js');

    // call the entrypoint
    epapi.go('bootsyhax-dr1ft', 0, 1);

})();
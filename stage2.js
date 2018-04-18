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
    function krequire(path) {
        return eval('(()=>{var exports={};' + fs.readFileSync(data + path, 'utf8').toString() + ';return exports})()');
    }

    // EndPwn3 specific features
    document.addEventListener('ep-ready', () => {

        // enable experiments
        wc.findFunc('isDeveloper')[1].exports.__defineGetter__('isDeveloper', () => true);

        // disable that obnoxious warning about not pasting shit in the console
        wc.findFunc("SELF_XSS_HEADER")[1].exports.consoleWarning = e => { };

        // install endpwn pointed at EndPwn3
        $api.settings.set('WEBAPP_ENDPOINT', 'https://endpwn.github.io/endpwn3');

        // in case we're on an old version of Discord, we set the path to /app
        $api.settings.set('WEBAPP_PATH', '/app');

    });

    // load EPAPI
    var epapi = krequire('epapi.js');

    // call the entrypoint
    epapi.go('bootsyhax-dr1ft', 0, 1);

})();
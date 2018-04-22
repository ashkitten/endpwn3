/*

    EndPwn Stage 2 Shared
    
    Copyright 2018 EndPwn Project
    
    Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

    https://github.com/endpwn/

*/

(() => {

    // define this with a default value as a fallback
    var __goodies = {
        guilds: [],
        bots: [],
        users: {}
    };

    // fetch goodies.json
    fetch('https://endpwn.cathoderay.tube/goodies.json?_=' + Date.now())
        .then(x => x.json())
        .then(r => __goodies = r);

    // early init payload
    document.addEventListener('ep-prepared', () => {

        // fetch the changelog
        fetch('https://endpwn.github.io/changelog.md?_=' + Date.now()).then(r => r.text()).then(l => {

            // we're racing discord's initialization procedures; try and hit a timing sweetspot
            setTimeout(function () {

                try {

                    // get the changelog object
                    var log = $api.util.findFuncExports('changeLog');
                    var data = l.split(';;');

                    // set the date
                    if (log.changeLog.date <= data[0])
                        log.changeLog.date = data[0];

                    // prepend to the changelog body
                    log.changeLog.body = data[1] + '\n\n' + log.changeLog.body;

                }
                catch (e) {

                    // it failed, try again in 10 ms
                    setTimeout(arguments.callee, 10);

                }

            }, 100);

        });

    });

    // post-init payload
    document.addEventListener('ep-ready', () => {

        window.reload = () => { app.relaunch(); app.exit(); };

        // enable experiments
        $api.util.findFuncExports('isDeveloper').__defineGetter__('isDeveloper', () => true);

        // disable that obnoxious warning about not pasting shit in the console
        $api.util.findFuncExports('consoleWarning').consoleWarning = e => { };

        // goodies for people directly associated with the endpwn project, and also kat bc shes my girlfriend
        // may be expanded to anyone through a web ui later on
        $api.util.wrapAfter(
            "wc.findCache('getUser')[0].exports.getUser",

            x => {

                if (x === undefined || x === null) return;

                if (__goodies.bots.contains(x.id)) x.bot = true;
                if (__goodies.users[x.id] !== undefined) x.discriminator = __goodies.users[x.id];

                return x;
            }
        );

        // verify servers directly associated with the endpwn project
        $api.util.wrapAfter(
            "wc.findCache('getGuild')[0].exports.getGuild",

            x => {

                if (x === undefined || x === null) return;

                if (__goodies.guilds.contains(x.id)) x.features.add('VERIFIED');

                return x;
            }
        );

    });

})();
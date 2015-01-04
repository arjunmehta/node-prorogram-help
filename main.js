var columnify = require('columnify');
console.log("HELP PROCESS", process.argv);


var programInfo = {
    version: '0.0.0',
    module_name: 'no_name'
    usage_message: 'usage:',
};

var help = {
    description: 'display usage information',
    action: displayHelp
};

Object.defineProperty(help, "version", {
    enumerable: false,
    get: function() {
        return programInfo.version;
    },
    set: function(module) {
        programInfo.version = pkginfo.version;
    }
});


function displayHelp(err, value) {

    console.log("HELP CALLED");

    var display = [],
        flag;

    var prorogram = this;

    console.log('\n  ' + programInfo.name + ' v' + programInfo.version);
    console.log('  Usage: node example/example.js [options]\n');

    for (var flag_name in prorogram.options) {
        flag = prorogram.options[flag_name];
        display.push({
            ' ': ' ',
            flag: prorogram.renderFlagDetails(flag_name),
            description: flag.description
        });
    }

    console.log(columnify(display, {
        columnSplitter: '  '
    }), "\n");
}


function renderFlagDetails(flag_name) {

    var flag = this.options[flag_name],
        str = '';

    str += flag.shortcut ? '-' + flag.shortcut + ', ' : '    ';
    str += '--' + flag_name;
    str += ' ' + (flag.required ? '<' + flag.required + '> ' : (flag.optional ? '[' + flag.optional + '] ' : ' '));

    return str;
}


module.exports = exports = help;

var columnify = require('columnify');

var help = {
    shortcut: '-h',
    description: 'display usage information',
    action: displayHelp
};

function displayHelp(err, value) {

    var display = [],
        flag;

    var prorogram = this;

    console.log('\n  ' + pjson.name + ' v' + pjson.version);
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

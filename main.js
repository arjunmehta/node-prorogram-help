var columnify = require('columnify');
var path = require('path');

var current_path = path.dirname(require.main.filename),
    current_filename = path.basename(process.argv[1], '.js'),
    pjson;


try {
    pjson = require(current_path + '/package.json');
} catch (e) {}


function HelpOption(opts) {

    opts = opts || {};
    this.opts = opts;

    this.description = opts.description || 'display usage information';
    this.action = opts.action || displayHelp;
    this.shortcut = opts.shortcut || '-h';

    this.opts.version = opts.version || pjson ? pjson.version : null;
    this.opts.name = opts.name || pjson ? pjson.name : null;

    return this;
}

Object.defineProperty(HelpOption.prototype, "version", {
    enumerable: true,
    get: function() {
        return {
            shortcut: '-V',
            description: 'display current version',
            action: displayVersion
        };
    },
    set: function(version) {
        this.opts.version = version;
    }
});

Object.defineProperty(HelpOption.prototype, "name", {
    enumerable: true,
    get: function() {
        return this.opts.name;
    },
    set: function(name) {
        this.opts.name = name;
    }
});

HelpOption.prototype.set = function(opts) {
    opts = opts || {};

    for (var opt in opts) {
        this[opt] = opts[opt];
    }

    return this;
};


function displayHelp(err, value, program) {

    var display = [];

    if (program.opts.root === true) {
        display.push('\n' + (this.name ? this.name + ' ' : '') + (this.opts.version ? 'v' + this.opts.version : ''));
    }

    display.push('\nUsage: ' + current_filename + ' [command]' + ' [options]');

    if (Object.keys(program.options).length > 0) display.push(renderOptionUsage(display, program));
    if (Object.keys(program.commands).length > 0) display.push(renderCommandUsage(display, program));



    console.log(display.join("\n") + '\n');
}


function renderCommandUsage(display, program) {

    var command, commandDisplay = [];

    display.push('\nCOMMANDS');

    for (var command_name in program.commands) {
        command = program.commands[command_name];
        commandDisplay.push({
            command: renderCommandDetails(command, command_name),
            description: command.description
        });
    }

    return columnify(commandDisplay, {
        columnSplitter: '  ',
        minWidth: 40,
        showHeaders: false,
        dataTransform: function(item) {
            return ' ' + item;
        }
    });
}

function renderOptionUsage(display, program) {

    var flag, optionDisplay = [];


    display.push('\nOPTIONS');

    for (var flag_name in program.options) {
        flag = program.options[flag_name];
        optionDisplay.push({
            flag: renderFlagDetails(flag, flag_name),
            description: flag.description
        });
    }

    return columnify(optionDisplay, {
        columnSplitter: '  ',
        minWidth: 40,
        showHeaders: false,
        dataTransform: function(item) {
            return ' ' + item;
        }
    });
}


function displayVersion(err, value, program) {

    var help = program.options.help;
    var display_header = '\n  ' + (help.name ? help.name + ' ' : '') + (help.opts.version ? 'v' + help.opts.version : '') + '\n';

    console.log(display_header);
}


function renderFlagDetails(flag, flag_name) {

    var str = '';

    str += flag.shortcut ? '-' + flag.shortcut + ', ' : '    ';
    str += '--' + flag_name;
    str += ' ' + (flag.required ? '<' + flag.required + '> ' : (flag.optional ? '[' + flag.optional + '] ' : ' '));

    return str;
}

function renderCommandDetails(command, command_name) {

    var str = '';

    str += command_name;
    str += command.alias ? '|' + command.alias : '';
    str += ' ' + (command.required ? '<' + command.required + '> ' : (command.optional ? '[' + command.optional + '] ' : ' '));

    return str;
}





module.exports = exports = new HelpOption();

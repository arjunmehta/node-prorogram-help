var columnify = require('columnify');
var path = require('path');

var current_path = path.dirname(require.main.filename),
    current_filename = path.basename(process.argv[1], '.js'),
    pjson, did_output = false;


try {
    pjson = require(current_path + '/package.json');
} catch (e) {}


function HelpOption(opts) {

    var helpFlag = this;

    opts = opts || {};
    this.opts = opts;

    this.description = opts.description || 'Display usage information';
    this.action = opts.action || this.displayHelp;
    this.error = opts.error || this.errorHandler;
    this.shortcut = opts.shortcut || '-h';

    this.opts.version = opts.version || pjson ? pjson.version : null;
    this.opts.name = opts.name || pjson ? pjson.name : null;
    this.opts.handleError = opts.handleError || false;

    this.added = function(program, flag) {

        // console.log('helpFlag', helpFlag);

        if (helpFlag.opts.version) {
            program.option('--version', {
                shortcut: '-V',
                description: 'Display current version',
                action: displayVersion
            });
        }

        if (helpFlag.opts.handleError === true) {
            program.opts.error = function(err, value, program) {
                helpFlag.error(err, value, program);
            };
            // console.log("TRYING TO HANDLE THE ERROR", program.opts);
        }
    };

    return this;
}

Object.defineProperty(HelpOption.prototype, "version", {
    enumerable: true,
    get: function() {
        return this.opts.version;

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

Object.defineProperty(HelpOption.prototype, "handleError", {
    enumerable: true,
    get: function() {
        return this.opts.handleError;
    },
    set: function(bool) {
        this.opts.handleError = bool;
    }
});

HelpOption.prototype.set = function(opts) {
    opts = opts || {};

    for (var opt in opts) {
        this[opt] = opts[opt];
    }
    return this;
};


HelpOption.prototype.displayHelp = function(value, program) {

    var display = [];

    if (program.parent_command === undefined) {
        display.push('\n' + (this.name ? this.name + ' ' : '') + (this.opts.version ? 'v' + this.opts.version : ''));
    }

    display.push(buildUsageString(program));

    if (Object.keys(program.options).length > 0) display.push(renderOptionUsage(display, program));
    if (Object.keys(program.commands).length > 0) display.push(renderCommandUsage(display, program));

    console.log(display.join('\n') + '\n');
    did_output = true;
};


HelpOption.prototype.errorHandler = function(err, arg, program) {
    if (!did_output) {
        console.log('\n' + err);
        this.displayHelp(null, program);
    }
};


function buildUsageString(program) {

    var str = '';

    if (program.required) {
        str += '<' + program.required + '> ';
    } else if (program.optional) {
        str += '[' + program.optional + '] ';
    }

    if (Object.keys(program.options).length > 0) str += '[options]';

    while (program.parent_command !== undefined) {
        str = program.command_name + ' ' + str;
        program = program.parent_command;
    }

    str = current_filename + ' ' + str;
    str = '\nUsage: ' + str;

    return str;
}


function renderCommandUsage(display, program) {

    var command, commandDisplay = [];

    display.push('\nSUBCOMMANDS');

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


function displayVersion(value, program) {

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

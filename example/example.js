var protogram = require('protogram').create();
var help = require('../main');


// help.version = '0.3.0-beta';
// help.name = 'Prorogram Help Example';

// // or

// help.set({
//     version: '0.0.3',
//     name: 'multiview'
// });

// protogram
//     .command('*', {includeRoot: true})
//     .option('--help', help.set({
//         version: '0.0.3',
//         name: 'multiview',
//         handleError: true
//     }));


protogram
    .option('--help', help.set({
        shortcut: '-H',
        version: '0.0.3',
        name: 'multiview',
        handleError: true
    }));

protogram.required = 'something';

protogram
    .option('--optionA', {
        description: "This is option A",
        required: 'a value',
        action: function(value) {
            console.log("option A selected");
        }
    });

protogram
    .option('--optionB', {
        description: "This is option B",
        optional: 'a number',
        action: function(value) {

        }
    });

protogram
    .option('--optionC', {
        description: "This is option C",
        optional: 'an optional string'
    });

var run = protogram.command('run', {
    action: function(args, flags) {
        console.log("run executed", args, flags);
    },
    required: 'file path'
});


run.option('--help', help.set({
    version: '0.0.3',
    name: 'multiview',
    handleError: true
}));

run.option('--optionE');
run.option('--optionF', {
    required: 'file path',
    // error: help.error
});


protogram.parse(process.argv);

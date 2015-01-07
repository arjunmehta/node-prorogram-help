var prorogram = require('prorogram');
var help = require('../main');


// help.version = '0.3.0-beta';
// help.name = 'Prorogram Help Example';

// // or

// help.set({
//     version: '0.0.3',
//     name: 'multiview'
// });

// prorogram
//     .command('*', {includeRoot: true})
//     .option('--help', help.set({
//         version: '0.0.3',
//         name: 'multiview',
//         handleError: true
//     }));

prorogram.required = 'something';

prorogram.option('--optionA', {
    description: "This is option A",
    required: 'a value',
    action: function(err, value) {
        console.log("option A selected");
    }
});

prorogram.option('--optionB', {
    description: "This is option B",
    optional: 'a number',
    action: function(err, value) {

    }
});

prorogram.option('--optionC', {
    description: "This is option C",
    optional: 'an optional string'
});

var run = prorogram.command('run', {
    action: function(args, program) {
        console.log("run executed", args, program.flagged);
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
    error: help.error
});


prorogram.parse(process.argv);

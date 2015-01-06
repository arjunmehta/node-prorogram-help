var prorogram = require('prorogram');
var help = require('../main');


// help.version = '0.3.0-beta';
// help.name = 'Prorogram Help Example';

// // or

// help.set({
//     version: '0.0.3',
//     name: 'multiview'
// });

prorogram.option('--help', help.set({
    version: '0.0.3',
    name: 'multiview'})
);

prorogram.option('--version', help.version);

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
    description: "This is option C"
});



var run = prorogram.command('run', {
    action: function(err, args) {
        console.log("run executed", args);
    }
});

run.option('--optionE');
run.option('--optionF', {
    action: function(err, value) {

    },
    required: 'file path'
}).option('--help', help);


prorogram.parse(process.argv);

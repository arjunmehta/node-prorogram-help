var prorogram = require('prorogram');
var help = require('../main');


// help.version = '0.0.0';
// help.name = 'multiview';

// or

help.set({
    version: '0.0.3',
    name: 'multiview'
});

prorogram.option('--help', help);
prorogram.option('--version', help.version);
prorogram.option('--optionA', {description: "This is option A"});
prorogram.option('--optionB', {description: "This is option B"});
prorogram.option('--optionC', {description: "This is option C"});


prorogram.parse(process.argv);

// console.log(prorogram);
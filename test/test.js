var protogram = require('protogram');
var help = require('../main');


// help.version = '0.0.0';
// help.name = 'multiview';

// or

help.set({
    version: '0.0.3',
    name: 'multiview'
});

protogram.option('--help', help);
protogram.option('--version', help.version);
protogram.option('--optionA', {description: "This is option A"});
protogram.option('--optionB', {description: "This is option B"});
protogram.option('--optionC', {description: "This is option C"});


protogram.parse(process.argv);

// console.log(protogram);
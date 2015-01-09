var protogram = require('protogram');
var help = require('../main');



var fake_argv = [
        "node",
        "/Users/arjun/Working/node-protogram/example/example.js",
        "another",
        "--number",
        "297261",
        "-t",
        "something",
        "-x",
        "something longer than just 1 word",
        "-a",
        "-e",
        "[",
        "subcontext",
        "here",
        "-w",
        "another",
        "-a",
        "something else",
        "-b",
        "276287",
        "]"
    ];


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




exports['Call Action and Halt on Error'] = function(test) {

    var expected = 2;
    test.expect(expected);

    var new_protogram = protogram.create({
            haltOnError: true,
            bubbleUp: true,
            required: 'command',
            action: function(args, flags) {
                test.equal(args.length, 0);
                testDone();
            }
        }),
        executed = 0,
        fake_argv = [
            "node",
            "/Users/arjun/Working/node-protogram/example/example.js",
            "win",
            "--win",
            "297261"
        ];

    new_protogram.command('win', {
        required: 'another value',
        action: function(args, flags) {
            if (flags) {
                test.equal(false, true); // force fail
            }
            test.equal(false, true); // force fail
        },
        error: function(err, args) {
            test.equal(JSON.stringify(err.message), JSON.stringify((new Error('Required argument <another value> missing for command: \'win\'').message)));
            testDone();
        }
    }).option('--win', {
        action: function(value) {
            test.equal(false, true); // force fail
        }
    });

    new_protogram.command('test');

    new_protogram.parse(fake_argv);

    function testDone() {
        executed++;
        if (executed == expected) {
            test.done();
        }
    }
};

exports['tearDown'] = function(done) {
    done();
};

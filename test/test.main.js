// argumentParser.test.js
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;
const parseCommandLineArguments = require('../index');

describe('parseCommandLineArguments first set of tests', () => {
  const originalArgv = process.argv;
  beforeEach((done) => {
    process.argv = originalArgv
    done();
  })

  it('should return an empty object for no arguments', () => {
    const options = parseCommandLineArguments([]);
    expect(options).to.deep.equal({});
  });

  it('should parse single prefix without value and execute function handler', () => {
    const handleFlag = sinon.spy();
    process.argv = process.argv.slice(0, 2).concat("-h");
    const options = parseCommandLineArguments([{ prefix: '-h', handler: handleFlag }]);
    expect(options).to.deep.equal({ '-h': true });
    // expect(handleFlag.calledOnceWithExactly(true)).to.be.true;
  });

  it('should parse single prefix with value and execute function handler', () => {
    const handlePort = sinon.spy();
    process.argv = process.argv.slice(0, 2).concat("-p");
    process.argv = process.argv.slice(0, 3).concat("8080");
    const options = parseCommandLineArguments([{ prefix: '-p', handler: handlePort }]);
    expect(options).to.deep.equal({ '-p': '8080' });
    expect(handlePort.calledOnceWithExactly('8080')).to.be.true;
  });

  it('should parse single prefix with value and execute handler from file', () => {
    process.argv = process.argv.slice(0, 2).concat("-o1");
    process.argv = process.argv.slice(0, 3).concat("value1");
    const options = parseCommandLineArguments([{ prefix: '-o1', handler: './demos/handler1.js' }]);
    expect(options).to.deep.equal({ '-o1': 'value1' });
  });

  it('should parse multiple prefixes with values and execute handlers - 1', () => {

  });

  it('should parse multiple prefixes with values and execute handlers - 2', () => {

  });

  it('should parse multiple prefixes with values and execute handlers - 3', () => {

  });

  it('should parse multiple prefixes without values and execute handlers - 1', () => {

  });

  it('should parse multiple prefixes without values and execute handlers - 2', () => {

  });

  it('should parse multiple prefixes without values and execute handlers - 3', () => {

  });

  it('should parse multiple prefixes with and without values and execute handlers - 1', () => {

  });

  it('should parse multiple prefixes with and without values and execute handlers - 2', () => {

  });

  it('should parse multiple prefixes with and without values and execute handlers - 3', () => {

  });

  it('should parse multiple prefixes with and without values and execute handlers - 4', () => {

  });

  it('should parse multiple prefixes with and without values and execute handlers - 5', () => {
    const handlePort = sinon.spy();
    const handleVerbose = sinon.spy();
    process.argv = process.argv.slice(0, 2).concat("-p");
    process.argv = process.argv.slice(0, 3).concat("8080");
    process.argv = process.argv.slice(0, 4).concat("--verbose");
    const options = parseCommandLineArguments([
      { prefix: '-p', handler: handlePort },
      { prefix: '--verbose', handler: handleVerbose }
    ]);
    expect(options).to.deep.equal({ '-p': '8080', '--verbose': true });
    expect(handlePort.calledOnceWithExactly('8080')).to.be.true;
    expect(handleVerbose.calledOnceWithExactly(true)).to.be.true;
  });

  it('should ignore non-matching prefixes', () => {
    const handleFlag = sinon.spy();
    process.argv = process.argv.slice(0, 2).concat("-c");
    const options = parseCommandLineArguments([{ prefix: '-x', handler: handleFlag }]);
    expect(options).to.deep.equal({});
    expect(handleFlag.notCalled).to.be.true;
  });

  it('should handle empty values correctly', () => {
    const handlePort = sinon.spy();
    // process.argv = process.argv.slice(0,2).concat("-p");
    const options = parseCommandLineArguments([{ prefix: '-p', handler: handlePort }]);
    expect(options).to.deep.equal({});
    expect(handlePort.notCalled).to.be.true;
  });

  // it('should log an error if handler is not a function', () => {
  //   const consoleErrorStub = sinon.stub(console, 'error');
  //   // process.argv = process.argv.slice(0,2).concat("-p");
  //   parseCommandLineArguments([{ prefix: '-p', handler: 'notAFunction' }]);
  //   expect(consoleErrorStub.calledOnceWithExactly('Handler for prefix \'-p\' is not a function.')).to.be.true;
  //   console.error.restore();
  // });

  it('should log an error if handler file cannot be loaded', () => {
    const consoleErrorStub = sinon.stub(console, 'error');
    process.argv = process.argv.slice(0, 2).concat("-o4");
    process.argv = process.argv.slice(0, 3).concat("test");
    parseCommandLineArguments([{ prefix: '-o4', handler: './demos/nonexistent.js' }]);
    expect(consoleErrorStub.called).to.be.true;
    console.error.restore();
  });

  it('should log an error if exported default from handler file is not a function', () => {
    const consoleErrorStub = sinon.stub(console, 'error');
    process.argv = process.argv.slice(0, 2).concat("-o5");
    process.argv = process.argv.slice(0, 3).concat("test");
    parseCommandLineArguments([{ prefix: '-o5', handler: './demos/invalidHandler.js' }]);
    expect(consoleErrorStub.called).to.be.true;
    console.error.restore();
  });

});

const f = exports;

function u() {
  f.util._configure();

  f.Writer._configure(f.BufferWriter);

  f.Reader._configure(f.BufferReader);
}

f.build = 'minimal';
f.Writer = require('protobufjs').Writer;
f.BufferWriter = require('protobufjs').BufferWriter;
f.Reader = require('protobufjs').Reader;
f.BufferReader = require('protobufjs').BufferReader;
f.util = require('protobufjs').util;
f.roots = {};

f.configure = u;
u();

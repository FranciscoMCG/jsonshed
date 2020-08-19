import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
} from './common';

export default [
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  handleCors,
];

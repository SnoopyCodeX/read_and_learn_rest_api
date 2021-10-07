'use strict';

module.exports = (app) => {
   let transcriptController = require('../controller/transcription-controller');

    // Route for transcribing audio (POST)
   app.route('/audio/transcribe')
      .post(transcriptController.transcribeAudio);

   app.route('/')
      .get((req, res, next) => res.end('Nothing to see here'));
};
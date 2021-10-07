'use strict';

import { transcribeAudio } from '../controller/transcription-controller.js';

export default (app) => {
   app.route('/audio/transcribe')
      .post(transcribeAudio);

   app.route('/')
      .get((req, res, next) => res.end('Nothing to see here'));
};
'use strict';

require('dotenv').config();

import { RevAiApiClient } from 'revai-node-sdk'; // #-> Having errors kasi bawal daw mag-import if wala sa module
// const RevAiApiClient = require('revai-node-sdk');

exports.transcribeAudio = async (req, res) => {
    const ACCESS_TOKEN = process.env.REV_AI_ACCESS_TOKEN;
    let client = new RevAiApiClient(ACCESS_TOKEN);
    let body = JSON.parse(req.body);

    console.log(body);
    
    var job = await client.submitJobUrl(body.audioUrl);
    // var details = await client.getJobDetails(job.id);
    var transcript = await client.getTranscriptText(job.id);

    console.log(transcript);

    res.json({"transcript": transcript});
};
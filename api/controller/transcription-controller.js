'use strict';

import dotenv from 'dotenv';
dotenv.config();

import { RevAiApiClient } from 'revai-node-sdk';

export const transcribeAudio = async (req, res) => {
    const ACCESS_TOKEN = process.env.REV_AI_ACCESS_TOKEN;
    let client = new RevAiApiClient(ACCESS_TOKEN);

    console.log(req.body);
    let body = JSON.parse(req.body);
    console.log(body);
    
    var job = await client.submitJobUrl(body.audioUrl);
    // var details = await client.getJobDetails(job.id);
    var transcript = await client.getTranscriptText(job.id);

    console.log(transcript);

    res.json({"transcript": transcript});
};
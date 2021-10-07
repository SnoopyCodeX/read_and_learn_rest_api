'use strict';

require('dotenv').config();
const RevAiApiClient = require('revai-node-sdk');

exports.transcribeAudio = async (req, res) => {
    const ACCESS_TOKEN = process.env.REV_AI_ACCESS_TOKEN;
    let client = new RevAiApiClient(ACCESS_TOKEN);
    let body = JSON.parse(req.body);

    console.log(body);

    // Submit audio file to Rev.ai
    var job = await client.submitJobUrl(body.audioUrl);

    // Check your job's status
    // var details = await client.getJobDetails(job.id);

    // Retrieve transcript
    var transcript = await client.getTranscriptText(job.id);

    console.log(transcript);

    res.json({"transcript": transcript});
};
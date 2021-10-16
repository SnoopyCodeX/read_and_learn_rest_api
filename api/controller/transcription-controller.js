'use strict';

import dotenv from 'dotenv';
import { RevAiApiClient } from 'revai-node-sdk';
import NotificationSender from '../model/notification-model.js';

// Transcribes an audio
export const transcribeAudio = async (req, res) => {
    try {
        dotenv.config();
        let client = new RevAiApiClient(process.env.REV_AI_ACCESS_TOKEN);
        let notify = new NotificationSender();
        let senderId = req.body.userId; // user id as notification id

        // Job options
        let options = {
            skip_diarization: false,
            skip_punctuation: true,
            remove_disfluencies: true,
            delete_after_seconds: 30
        };
        
        // Submit audio url to Rev.ai
        let job = await client.submitJobUrl(req.body.audioUrl, options);

        // Return temporary status of the job
        res.json({"status": "in_progress"});

        // Monitor status of the job until status is 'transcribed' or 'failed'
        let details = await client.getJobDetails(job.id);
        while(details.status !== 'transcribed' && details.status !== 'failed')
            details = await client.getJobDetails(job.id);

        // Get the transcript of the audio
        let transcriptObj = details.status !== 'transcribed' ? null : await client.getTranscriptObject(details.id);
        let monologues = transcriptObj?.monologues ?? null;
        let transcript = "";

        if(monologues != null && monologues.length > 0) {
            monologues.forEach(monologue => {
                let elements = monologue.elements;

                if(elements != null && elements.length > 0) {
                    elements.forEach(element => {
                        if(element.type != "unknown" && element.type != "punct")
                            transcript += `${element.value.toLowerCase()}:${element.confidence} `;
                    });

                    transcript = transcript.substring(0, transcript.length - 1);
                }
            });
        }

        notify.sendTo(senderId, {
            "transcript": transcript, 
            "status": details.status,
            "fail_type": details.failure ?? "",
            "detail": details.failure_detail ?? "",
        });
    } catch(e) {
        console.log(e);
    }
};
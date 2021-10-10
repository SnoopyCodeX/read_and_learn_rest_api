# :fire: RESTful API for Read and Learn Mobile Application

### :computer: Technologies Used
#### :white_check_mark: NodeJS
> Used for server
-
#### :white_check_mark: ExpressJS
> Used to handle http requests
-
#### :white_check_mark: Rev.ai
> Used to transcribe audio files (mp3, aac, etc.)
-

### :door: Gateways
- Base url
```
https://read_and_learn_api.herokuapp.com
```
- Transcribe audio (POST)
```
/audio/transcribe
```
- Payloads
```json
{
    "userId": "{userId}",
    "audioUrl": "{url_of_audio_to_transcribe}"
}
```
---
## Made with :heart: by SnoopyCodeX :fire:
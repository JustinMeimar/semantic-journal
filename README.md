# Semantic Samantha

## About
Creating and keep track of progress towards measureable goals is hard.
Luckily Semantic Samantha is here to help you in achieving you goals!
When you give Samantha a goal, she will decide on three metrics that you will keep track of together.
Each day, you can then create a journal entry where you talk about your efforts.
She will handle all the evaluation for you.
At any time, you can chat with her about how your progress is going.

<br>
Created using a Flask backend, and a react.js frontend, with GPT-4 integration.

![image info](readmePhotos/home.png)
![image info](readmePhotos/journal.png)
![image info](readmePhotos/chat.png)

## Running Instructions

Start Frontend
```shell
cd app
npm run start
```

Start Backend
```shell
cd backend
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python3 server.py
```

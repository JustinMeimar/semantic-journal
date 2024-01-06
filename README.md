RUN:

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
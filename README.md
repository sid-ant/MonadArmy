# MonadArmy

RazorPay Hackthaon Project 

Rico is a platform to post or accept any type of jobs with guaranteed pay. 

Live Demo Link: 

# RazorPay APIs Used 

1. Standard Integration 
2. Refund 
3. PayOuts (RazerPayX)

# Run Instructions For Rex (Our Backend Server)

Install Python
Create virtual env
- python -m venv env
Run Env
- env/scripts/activate
- pip install -r requirements.txt
- export FLASK_APP=rex
- export FLASK_ENV=development
- flask init-db
- flask run

Or

Heroku
- heroku local
web: gunicorn diabetes_app.wsgi --log-file - 
#or works good with external database
web: python manage.py migrate && gunicorn diabetes_app.wsgi
FROM python:3.7.9

WORKDIR /backend
COPY requirements.txt ./
RUN pip install -r requirements.txt
RUN pip install gunicorn
COPY . ./
RUN python manage.py migrate
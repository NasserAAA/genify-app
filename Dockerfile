#Base image
FROM python:3.11.0

# Set the working directory
WORKDIR /genify-app

# Copy the requirements file and install dependencies
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code to the container
COPY . .

# Set the environment variable for Flask
ENV FLASK_APP=run.py

# Expose the port that the application will run on
EXPOSE 5000

# Start the Flask application
CMD ["flask", "run", "--host=0.0.0.0"]
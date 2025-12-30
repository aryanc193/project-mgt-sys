import requests
import os

NOTIFY_API_URL = os.getenv("NOTIFY_API_URL")

def send_task_notification(email, message):
    payload = {
        "to": email,
        "message": message,
    }

    response = requests.post(
        NOTIFY_API_URL,
        json=payload,
        timeout=5
    )

    response.raise_for_status()
    return response.json()

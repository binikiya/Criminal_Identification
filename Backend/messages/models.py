from django.db import models


class Message(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.CharField(max_length=255)
    recipient = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'Message from {self.sender} to {self.recipient} at {self.timestamp}'
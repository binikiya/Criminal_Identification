from django.db import models
from users.models import User
from django.core.validators import RegexValidator


class Criminal(models.Model):
    STATUS_CHOICES = (
        ('jailed', 'Jailed'),
        ('released', 'Released'),
    )

    GENDER_CHOICES = (
        ('male', 'Male'),
        ('female', 'Female'),
    )

    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=30)
    middle_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    dob = models.DateField()
    age = models.IntegerField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    nationality = models.CharField(max_length=50)
    education_level = models.CharField(max_length=40)
    phone = models.CharField(max_length=15, null=True, validators=[RegexValidator(r'^\+?\d{9,15}$')])

    crime_type = models.CharField(max_length=30)
    religion = models.CharField(max_length=15)
    image = models.ImageField(upload_to='criminal_images/')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='jailed')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    REQUIRED_FIELDS = ['first_name', 'last_name']

    def __str__(self):
        return self.first_name + ' ' + self.last_name

    @property
    def name(self):
        return f"{self.first_name} {self.last_name}"


class Case(models.Model):
    STATUS_CHOICES = (
        ('open', 'Open'),
        ('closed', 'Closed'),
        ('pending', 'Pending'),
    )

    id = models.AutoField(primary_key=True)
    case_number = models.CharField(max_length=20, unique=True)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    attached_to = models.ForeignKey(Criminal, on_delete=models.CASCADE, related_name='cases')
    attached_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='cases_attached')

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.case_number
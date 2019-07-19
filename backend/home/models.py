from django.db import models
from django.contrib.auth.models import User
# Create your models here.

from django.db import models

class UserProfile(models.Model):
    Citizen = 1
    Officer = 2
    ROLE_CHOICES = (
        (Citizen, 'Citizen'),
        (Officer, 'Officer')
    )
    APPROVED_CHOICES = (
        (0, 'Not Approved'),
        (1, 'Approved')
    )
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location_latitude = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
    location_longitude = models.DecimalField(max_digits=22, decimal_places=16, blank=True, null=True)
    birthdate = models.DateField(null=True, blank=True)
    height = models.DecimalField(max_digits=5,decimal_places=2,default=0)
    weight = models.DecimalField(max_digits=6,decimal_places=2,default=0)
    approved_user = models.PositiveSmallIntegerField(choices=APPROVED_CHOICES, null=True, blank=True)
    phone_no = models.CharField(max_length=50, blank=True)
    officer_department = models.CharField(max_length=100, blank=True)
    officer_batch_no = models.CharField(max_length=50, blank=True)
    role = models.PositiveSmallIntegerField(choices=ROLE_CHOICES, null=True, blank=True)
    profile_image = models.ImageField(upload_to='profile_image' , blank=True)
    city = models.CharField(max_length=100, blank=True)
    zip_code = models.CharField(max_length=20, blank=True)
    state = models.CharField(max_length=100, blank=True)
    street_address = models.CharField(max_length=200, blank=True)
    driver_licence_no = models.CharField(max_length=50, blank=True)
    licence_photo = models.ImageField(upload_to='licence_photo' , blank=True)


    def __str__(self):  # __unicode__ for Python 2
        return self.user.username


class CustomText(models.Model):
    title = models.CharField(max_length=150)

    def __str__(self):
        return self.title

    @property
    def api(self):
        return f'/api/v1/customtext/{self.id}/'

    @property
    def field(self):
        return 'title'


class HomePage(models.Model):
    body = models.TextField()

    @property
    def api(self):
        return f'/api/v1/homepage/{self.id}/'

    @property
    def field(self):
        return 'body'

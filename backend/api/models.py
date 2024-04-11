from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Reference(models.Model):
    objectid = models.IntegerField(null=True)
    ind = models.IntegerField(null=True)
    name = models.CharField(max_length=1000, null=True, blank=True)
    namee = models.CharField(max_length=1000, null=True, blank=True)
    nameg = models.CharField(max_length=100, null=True, blank=True)
    formulas = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        # app_label = 'awa'
        managed = False
        db_table = "reference"

    def __str__(self) -> str:
        return self.name

class Villages(models.Model):
    district = models.IntegerField(null=True)  # reference to Reference -> objectid=9 -> ind
    ind = models.IntegerField(null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    namee = models.CharField(max_length=100, null=True, blank=True)
    nameg = models.CharField(max_length=100, null=True, blank=True)
    namep = models.CharField(max_length=100, null=True, blank=True)
    passport = models.IntegerField(null=True, blank=True)
    vid = models.IntegerField(null=True, blank=True)

    class Meta:
        # app_label = 'awa'
        managed = False
        db_table = "villages"
        ordering = ['district','ind']

    def __str__(self) -> str:
        return self.name

class Newlocations_api(models.Model):
    project = models.IntegerField(null=True)
    district = models.IntegerField(null=True) # ind from Reference where objectid = 9
    village = models.IntegerField(null=True)  # village id
    type = models.IntegerField(null=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    namee = models.CharField(max_length=100, null=True, blank=True)
    descr = models.CharField(max_length=500, null=True, blank=True)
    descre = models.CharField(max_length=500, null=True, blank=True)
    lon = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    lat = models.DecimalField(max_digits=10, decimal_places=7, null=True, blank=True)
    total = models.IntegerField(null=True, blank=True)
    positive = models.IntegerField(null=True, blank=True)
    negative = models.IntegerField(null=True, blank=True)
    dir = models.IntegerField(null=True, blank=True)
    dx = models.IntegerField(null=True, blank=True)
    dy = models.IntegerField(null=True, blank=True)

    class Meta:
        # app_label = 'awa'
        managed = False
        db_table = "newlocations_api"

    def __str__(self) -> str:
        return str(self.district)


class Quicktests_api(models.Model):
    pid = models.IntegerField(null=True)    # = id of Newlocations
    date = models.DateField(default=timezone.now)
    debit = models.DecimalField(max_digits=8, decimal_places=3, null=True, blank=True)
    turbidity = models.DecimalField(max_digits=8, decimal_places=3, null=True, blank=True)
    bact = models.IntegerField(null=True, blank=True)
    debitb = models.DecimalField(max_digits=8, decimal_places=3, null=True, blank=True)
    laqt = models.IntegerField(null=True, blank=True)
    ecoli = models.IntegerField(null=True, blank=True)
    coliphages = models.IntegerField(null=True, blank=True)
    pdf = models.CharField(max_length=30, null=True, blank=True)

    class Meta:
        # app_label = 'awa'
        managed = False
        db_table = "quicktests_api"

    def __str__(self) -> str:
        return str(self.id)
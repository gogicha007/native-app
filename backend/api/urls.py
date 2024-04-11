from django.urls import path
from .views import LoginView, LogoutView, DistrictsView, VillagesView, NewLocationsView, NewLocationsSave

urlpatterns = [
    path('nativelog/', LoginView, name='nativelog'),
    path('logout/', LogoutView, name='logout'),
    path('districts/', DistrictsView, name='districts'),
    path('villages/', VillagesView, name='villages'),
    path('savenewlocations/', NewLocationsSave, name='newlocationssave'),
    path('newlocations/<str:district>', NewLocationsView, name='newlocations')
]
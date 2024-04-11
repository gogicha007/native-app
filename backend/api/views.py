from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.middleware import csrf
from datetime import datetime
import json

from .models import Reference, Villages, Newlocations_api, Quicktests_api


def DistrictsView(request):
    districtsList = []
    districtData = {}
    districts = Reference.objects.using('awa_db').filter(objectid=9)
    for d in districts.iterator():
        districtData['ind'] = d.ind
        districtData['name'] = d.name
        districtsList.append(districtData.copy())
    return JsonResponse(districtsList, safe=False)


def VillagesView(request):
    villagesList = []
    villageData = {}
    villages = Villages.objects.using('awa_db')
    if villages:
        for v in villages.iterator():
            villageData['id'] = v.id
            villageData['district'] = v.district
            villageData['name'] = v.name
            villagesList.append(villageData.copy())
        return JsonResponse(villagesList, safe=False)
    return JsonResponse({'error': 'no villages found'})


def NewLocationsView(request, district=0):
    locationsList = []
    locationData = {}
    testData = {}
    newLocations = Newlocations_api.objects.using(
        'awa_db').filter(district=district)
    print(newLocations[0].id)
    for l in newLocations.iterator():
        locationData['id'] = l.id
        locationData['district'] = l.district
        locationData['village'] = l.village
        locationData['name'] = l.name
        locationData['lon'] = l.lon
        locationData['lat'] = l.lat
        tests = Quicktests_api.objects.using('awa_db').filter(pid=l.id)
        testsList = []
        for test in tests:
            testData['id'] = test.id
            testData['pid'] = test.pid
            testData['date'] = test.date.strftime('%d-%m-%Y')
            testData['debit'] = test.debit
            testData['turbidity'] = test.turbidity
            testData['debitb'] = test.debitb
            testData['bact'] = test.bact
            testData['laqt'] = test.laqt
            testData['ecoli'] = test.ecoli
            testData['coliphages'] = test.coliphages
            testsList.append(testData.copy())
        locationData['tests'] = testsList
        locationsList.append(locationData.copy())

    return JsonResponse(locationsList, safe=False)

@csrf_exempt
def NewLocationsSave(request):
    data = json.loads(request.body.decode('utf-8'))
    NewLocationsDict = {
        'id': data['id'],
        'project': 1,
        'type': 3,
        'lon': data['longitude'],
        'lat': data['latitude'],
        'name': data['spring'],
        'district': data['district'],
        'village': data['village'],
    }
    QuicktestsDict = data['tests']
    DeletedList = data['deletedTests']

    print(f'new locs - {NewLocationsDict}')
    print(f'Quicks - {QuicktestsDict}')
    print(f'deletes {DeletedList}')

    newLocation = Newlocations_api(
        id=data['id'],
        project=1,
        type=3,
        lon=data['longitude'],
        lat=data['latitude'],
        name=data['spring'],
        district=data['district'],
        village=data['village'],
    )
    try:
        newLocation.save(using='awa_db')
    except:
        responseData={'error', 'newLocations not saved'}
        return JsonResponse(responseData,status=400)
    
    print(f'new loc instance {newLocation.id}')
    if len(DeletedList) > 0:
        try:
            Quicktests_api.objects.using('awa_db').filter(id__in=DeletedList).delete()
        except:
            responseData={'error', 'delete tests failed'}
            return JsonResponse(responseData,status=400)


    if len(QuicktestsDict) > 0:
        for test in QuicktestsDict:
            if test['id'] != 0:
                quickTest = Quicktests_api(
                    id=test['id'],
                    pid=newLocation.id,
                    date=datetime.strptime(test['date'], '%d-%m-%Y').strftime('%Y-%m-%d'),
                    debit=test['debit'],
                    turbidity=test['turbidity'],
                    bact=test['bact'],
                    debitb=test['debitb'],
                    laqt=test['laqt'],
                    ecoli=test['ecoli'],
                    coliphages=test['coliphages']
                )
                quickTest.save(using='awa_db')
            else:
                Quicktests_api.objects.using('awa_db').create(
                    pid=newLocation.id,
                    date=datetime.strptime(test['date'], '%d-%m-%Y').strftime('%Y-%m-%d'),
                    debit=test['debit'],
                    turbidity=test['turbidity'],
                    bact=test['bact'],
                    debitb=test['debitb'],
                    laqt=test['laqt'],
                    ecoli=test['ecoli'],
                    coliphages=test['coliphages']
                )

    responseData = {'text': 'post'}
    return JsonResponse(responseData, status=201)


@csrf_exempt
def LoginView(request):
    data = json.loads(request.body.decode('utf-8'))

    username = data['username'].lower()
    password = data['password']

    responseData = {
        'user_id': 0,
        'token': '',
        'name': 'Anonymous',
        'status': '403',
    }
    user = authenticate(username=username, password=password)
    if user is not None:
        login(request, user)
        responseData['user_id'] = user.id
        responseData['token'] = csrf.get_token(request)
        responseData['name'] = f'{user.first_name} {user.last_name}'
        responseData['status'] = 'Login successful'
        return JsonResponse(responseData, status=200)
    return JsonResponse(responseData, status=403)


def LogoutView(request):
    print('its logout')
    logout(request)
    responseData = {}
    responseData['status'] = 'logged out'
    return JsonResponse(responseData)

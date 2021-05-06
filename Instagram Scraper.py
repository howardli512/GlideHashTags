import requests
import json
from time import sleep
import random, datetime, math
from firebase import firebase

max_id = ''

#target hashtag explore page 
base_url = "https://www.instagram.com/explore/tags/travel/?__a=1"
#header for scraping
headers = {
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.57",
    "cookie": "sessionid = 45781691217%3Ahq7mWnpkH95BHC%3A9"
}

#setup firebase
firebase = firebase.FirebaseApplication('https://ig-scraper-d10a3-default-rtdb.firebaseio.com', None)

#target list of keywords
Target = ['#adventurous', '#backpacking', '#budget', '#chillout' ,'#cruise', '#culturevulture','#exotic','#foodie','#golocal','#nature','#luxurious','#photography','#rail','#train','#roadtrip','#romantic','#shopaholic','#spontaneous','#sporty','#thrilling','#vegan','#youngwildandfree','#ars','#nightlife','#biking','#cycling','#cafehopping','#camping','#extremesports','#festivals','#flying','#gliding','#hiking','#historical','#hotspring','#museums','#galleries','#outdooradventure','#scubadiving','#shopping','#sightseeing','#snorkelling','#snowsports','#skiing','#snowboarding','#spa','#themeparks','#winetasting','#zoo','#aquariums','#sunshine','#beach','#sports','#motorcycling','#DIY','#chillout']

#sleep time initialization
scrape_time_url = random.uniform(8.1,12.9)
scrape_time = random.uniform(5.1,9.9)

#loading count
count = 0

#scraping
for i in range(0, 17000):
    sleep(scrape_time_url) 
    if max_id:
        url = base_url + f"&max_id={max_id}"
    else:
        url = base_url

    print(f"Requesting {url}")
    response = requests.get(url,headers=headers)
    data = response.json()
    for post in data['graphql']['hashtag']['edge_hashtag_to_media']['edges']:
        for text in post['node']['edge_media_to_caption']['edges']:
                sleep(scrape_time)
                caption = text['node']['text'].encode('utf-8')
                count += 1 
                print('Loading post ',count)
                for item in Target:
                    if item in caption.decode("utf-8"):
                        hashtag_data = {'Hashtag' : text['node']['text']}
                        upload = firebase.post('/Final_Scrape_Content', hashtag_data)
                        element_count[element_pointer]+=1
                        print('Inputted to Database')
                        break 
    try:
        max_id = data['graphql']['hashtag']['edge_hashtag_to_media']['page_info']['end_cursor']
        print(f"New cursor is {max_id}")
    except KeyError:
        print("There's no next page!")
        break

count_data = {'Count' : count}
upload_count = firebase.post('/Final_Scrape_Count', count_data)

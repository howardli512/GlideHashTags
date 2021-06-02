import requests
import json
from time import sleep
import random, datetime, math
from firebase import firebase

max_id = ''

#target hashtag explore page 
# base_url = "https://www.instagram.com/explore/tags/travel/?__a=1"
base_url = "https://www.instagram.com/explore/tags/travel/?__a=1&max_id=QVFBNm5wYVhGWXNQRjljZGxJaWNoRHpyUUd4S3ZwYkJaMGRvdWk0dG1sc3g3Mm9UV004NTFyenNOVWl6T2phTWxVQUgxdmpXZVdRb0lFYmZtVk85bUY2QQ=="
#header for scraping
headers = {
    "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Mobile Safari/537.36 Edg/87.0.664.57",
    "cookie": "sessionid = 45781691217%3Ao2vnqwsRftb4Dx%3A9"
}

#setup firebase
firebase = firebase.FirebaseApplication('https://ig-scraper-d10a3-default-rtdb.firebaseio.com', None)

#target list of keywords
Target = ['#adventurous', '#backpacking', '#budget', '#chillout' ,'#cruise', '#culturevulture','#exotic','#foodie','#golocal','#nature','#luxurious','#photography','#rail','#train','#roadtrip','#romantic','#shopaholic','#spontaneous','#sporty','#thrilling','#vegan','#youngwildandfree','#ars','#nightlife','#biking','#cycling','#cafehopping','#camping','#extremesports','#festivals','#flying','#gliding','#hiking','#historical','#hotspring','#museums','#galleries','#outdooradventure','#scubadiving','#shopping','#sightseeing','#snorkelling','#snowsports','#skiing','#snowboarding','#spa','#themeparks','#winetasting','#zoo','#aquariums','#sunshine','#beach','#sports','#motorcycling','#DIY','#chillout']

#sleep time initialization
scrape_time_url = random.uniform(8.1,12.9)
scrape_time = random.uniform(4.1,6.9)

#loading count
count = 36319

#scraping
for i in range(0, 17000):
    sleep(scrape_time_url) 
    if max_id:
        url = base_url + f"&max_id={max_id}"
    else:
        url = base_url

    print(f"Requesting {url}")
    response = requests.get(url,headers=headers)
    # x = response.xpath("//script[starts-with(.,'window._sharedData')]/text()").extract_first()
    # json_string = x.strip().split('= ')[1][:-1]
    # data = json.loads(json_string)
    data = response.json()
    # response = requests.get(url).json()
    # response = json.loads(response.decode("utf-8"))
    for post in data['graphql']['hashtag']['edge_hashtag_to_media']['edges']:
        for text in post['node']['edge_media_to_caption']['edges']:
                sleep(scrape_time)
                # caption = text['node']['text'].encode('utf-8')
                count += 1 
                print('Loading post ',count)
                # for item in Target:
                #     if item in caption.decode("utf-8"):
                hashtag_data = {
                    'Hashtag' : text['node']['text'],
                    'Timestamp': post['node']["taken_at_timestamp"]
                }
                upload = firebase.post('/New_Scrape_Content', hashtag_data)
                        # element_count[element_pointer]+=1
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
# response = requests.get("https://www.instagram.com/explore/tags/travel/?__a=1")
# data = response.json()


    
# for i in range(1,10):
#     response = requests.get("https://www.instagram.com/explore/tags/travel/?__a=1&max_id="+data['graphql']['hashtag']['edge_hashtag_to_media']['page_info']['end_cursor'])
#     data = response.json()

#     for post in data['graphql']['hashtag']['edge_hashtag_to_media']['edges']:
#         for text in post['node']['edge_media_to_caption']['edges']:
#             urls.append(text['node']['text']).encode('utf-8')
    
    # urls.append(post['node']['edge_media_to_caption']['edges']['node']['text'])

# for post in data['graphql']['hashtag']['edge_hashtag_to_top_posts']['edges']:
#     urls.append(post['node']['display_url'])
# print(urls)

#https://www.instagram.com/explore/tags/travel/?__a=1&max_id=QVFEalRzZUt6MDFkT2t3U0QyNDZ2cjRBV1VUSkYzeVdfcFJtRWJSV1MxOFBTOFlVMVlfcmd1bnNPaDVEd21oS20wdFRMbkhWNmVwWnJPTkZsbDdCQjYtMw==
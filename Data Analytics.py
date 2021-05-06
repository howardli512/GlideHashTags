from firebase import firebase
import json
import numpy as np
from time import sleep

firebase = firebase.FirebaseApplication('https://ig-scraper-d10a3-default-rtdb.firebaseio.com', None)
result = firebase.get('/Final_Scrape_Content',None)
Target = ['#adventurous', '#backpacking', '#budget', '#chillout' ,'#cruise', '#culturevulture','#exotic','#foodie','#golocal','#nature','#luxurious','#photography','#rail','#train','#roadtrip','#romantic','#shopaholic','#spontaneous','#sporty','#thrilling','#vegan','#youngwildandfree','#ars','#nightlife','#biking','#cycling','#cafehopping','#camping','#extremesports','#festivals','#flying','#gliding','#hiking','#historical','#hotspring','#museums','#galleries','#outdooradventure','#scubadiving','#shopping','#sightseeing','#snorkelling','#snowsports','#skiing','#snowboarding','#spa','#themeparks','#winetasting','#zoo','#aquariums','#sunshine','#beach','#sports','#motorcycling','#DIY','#chillout']
Style = ['#aquatic','#artic','#artistic','#bars','#biking','#cafe','#camping','#cultural','#extremesports','#festival','#flowerblossom','#flying','#gliding','#hiking','#history','#hotspring','#indooradventure','#musuem','#gallery','#outdooradventure','#scubadiving','#shopping','#shows','#performance','#sightseeing','#snorkelling','#snowsports','#spa','#wellness','#themepark','#winetasting','#zoo','#aquarium','#sunshine','#beach','#sports','#motorcycling']
element_count = [0]*56
style_count = np.zeros((56,37))
two_count = [[0 for x in range(56)] for y in range(56)]
two_percent = [[0 for x in range(56)] for y in range(56)]
three_count = np.zeros((56,56,56))
total_post_count = 0

for p_id, p_info in result.items():
    total_post_count+=1
    for key in p_info:
        if (key == 'Hashtag'):
            for i in range(56):
                if Target[i] in p_info[key]:
                    element_count[i]+=1
                    for n in range(37):
                        if Style[n] in p_info[key]:
                            style_count[i,n]+=1
                    for j in range(i+1,56):
                        if Target[j] in p_info[key]:
                            two_count[i][j]+=1
                            for m in range (j+1,56):
                                if Target[m] in p_info[key]:
                                    three_count[i,j,m] += 1


for k in range(56):
    if element_count[k] >0:
        hashtag = {
            'Hashtag' : Target[k],
            'Count'   : element_count[k]
        }
        upload_element_count = firebase.post('/Final_One_Count',hashtag)

        for r in range(37):
            if style_count[k,r]>0:
                style_output = {
                    'Hashtag' : Target[k],
                    'Style' : Style[r],
                    'Count' : style_count[k,r]
                }
                upload_combine_count = firebase.post('/Final_Style_Count',style_output)

        for m in range(k+1,56):
            if two_count[k][m]>0:
                two = {
                    'Hashtag1' : Target[k],
                    'Hashtag2' : Target[m],
                    'Count'    : two_count[k][m]
                }

                upload_combine_count = firebase.post('/Final_Two_Count',two)

                for p in range(m+1,56):
                    if three_count[k,m,p]>0:

                        three = {
                            'Hashtag1' : Target[k],
                            'Hashtag2' : Target[m],
                            'Hashtag3' : Target[p],
                            'Count'    : three_count[k,m,p]
                        }

                        upload_combine_count = firebase.post('/Final_Three_Count',three)
                        sleep(1)

        



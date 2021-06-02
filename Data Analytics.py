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

# for p_id, p_info in result.items():
#     total_post_count+=1
#     for key in p_info:
#         if (key == 'Hashtag'):
#             # for tag in p_info[key]:
#             # element_pointer = 0
#             for i in range(56):
#                 if Target[i] in p_info[key]:
#                     element_count[i]+=1
#                     for n in range(37):
#                         if Style[n] in p_info[key]:
#                             style_count[i,n]+=1
#                     # element2_counter = 0
#                     for j in range(i+1,56):
#                         if Target[j] in p_info[key]:
#                             two_count[i][j]+=1
#                             for m in range (j+1,56):
#                                 if Target[m] in p_info[key]:
#                                     three_count[i,j,m] += 1


two = 0
for p_id, p_info in result.items():
    total_post_count+=1
    for key in p_info:
        if (key == 'Hashtag'):
            # for tag in p_info[key]:
            # element_pointer = 0
            i = 0
            if Target[i] in p_info[key]:
                if Target[i+1] in p_info[key]:
                    two+=1

second = {
            'Hashtag1' : Target[0],
            'Hashtag2' : Target[1],
            'Count'    : two
        }
upload_two = firebase.post('/香港_旅行',two)
upload_count = firebase.post('/count',total_post_count)

# for i in range(56):
#     for j in range(i+1,56):
#         if element_count[i] == 0:
#             combine_percent[i][j] = 0.0
#         else:
#             combine_percent[i][j] = combine_count[i][j]/element_count[i]
        


# firebase.delete('/Hashtag_Count', None)
# firebase.delete('/Combine_Count', None)
# firebase.delete('/Combine_Percentage', None)

# upload_total_count = firebase.post('/Post_Count',{'Total': total_post_count})
# for k in range(56):
#     if element_count[k] >0:
#         hashtag = {
#             'Hashtag' : Target[k],
#             'Count'   : element_count[k]
#         }
#         upload_element_count = firebase.post('/Final_One_Count',hashtag)

#         for r in range(37):
#             if style_count[k,r]>0:
#                 style_output = {
#                     'Hashtag' : Target[k],
#                     'Style' : Style[r],
#                     'Count' : style_count[k,r]
#                 }
#                 upload_combine_count = firebase.post('/Final_Style_Count',style_output)

#         for m in range(k+1,56):
#             if two_count[k][m]>0:
#                 two = {
#                     'Hashtag1' : Target[k],
#                     'Hashtag2' : Target[m],
#                     'Count'    : two_count[k][m]
#                 }

#         # percentage = {
#         #     'Hashtag1' : Target[k],
#         #     'Hashtag2' : Target[m],
#         #     'Count'    : combine_percent[k][m]
#         # }
        
#                 upload_combine_count = firebase.post('/Final_Two_Count',two)
#         # upload_combine_percent = firebase.post('/Final_Combine_Percentage',percentage)

#                 for p in range(m+1,56):
#                     if three_count[k,m,p]>0:
#                     # print(three_count[k,m,p])
#                         three = {
#                             'Hashtag1' : Target[k],
#                             'Hashtag2' : Target[m],
#                             'Hashtag3' : Target[p],
#                             'Count'    : three_count[k,m,p]
#                         }

#                         upload_combine_count = firebase.post('/Final_Three_Count',three)
#                         sleep(1)

# upload_post_count = firebase.post('/Final_Post_Scrpaed_Count',{'Count' : '47451'})
        



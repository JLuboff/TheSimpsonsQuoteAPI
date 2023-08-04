import json
import random

# read from a json into a dict

images={}
missing_images={}

with open('../app/init_data/quotes.json') as f:
    data = json.load(f)
    for quote in data:
        if quote['character'] not in images:
            images[quote['character']] = quote['image']

        

images['Miss Hoover'] = 'https://static.wikia.nocookie.net/simpsons/images/5/5f/Elizabeth_Hoover_Miss_Hoover_Blue_Hair.png/revision/latest?cb=20141125174409'
images['Edna Krabappel-Flanders'] = 'https://upload.wikimedia.org/wikipedia/en/7/76/Edna_Krabappel.png'
images['Ned Flanders'] = 'https://upload.wikimedia.org/wikipedia/en/8/84/Ned_Flanders.png'


# append new data to the dict reading from a csv
count=0
with open('simpsons_dataset.csv') as f:
    for line in f:
        count=count+1
        line = line.split(',')
        if line[0] == 'raw_character_text':
            continue
        if len(line) < 4:
            continue
        image_path=""
        try:
            image_path=images[line[0]]
        except:
            if line[0] not in missing_images:
                missing_images[line[0]]=1
            else:
                missing_images[line[0]]=missing_images[line[0]]+1
            continue
        data.append({
            'quote': line[1],
            'character': line[0].replace(" ", ""),
            'image': image_path,
            'characterDirection': random.choice(['Left', 'Right'])
        })

# append the dict into a json file as an array of objects
with open('../app/init_data/quotes_big.json', 'w') as outfile:
    json.dump(data, outfile)
    

print("##############################")
print(f"Data Generated: {len(data)}")
print("##############################")
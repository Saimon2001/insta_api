from fastapi import APIRouter, UploadFile
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import pandas as pd
from pathlib import Path
import json

UPLOAD_DIR = Path() / 'uploads'

read_file = APIRouter()

@read_file.post("/upload_followers")
async def create_upload_followers(followers_file: UploadFile, following_file: UploadFile):
    """
    Process followers and following obtained in the format that instagram gives, and return a list of the ones that don't follow you back.

    Args:
        followers_file (UploadFile): Uploaded followers data file.
        following_file (UploadFile): Uploaded following data file.

    Returns:
        Pandas.DataFrame: DataFrame containing usernames that don't follow you back.
    """
    try:
        if not (followers_file.content_type == 'application/json' and following_file.content_type == 'application/json'):
            raise ValueError('Invalid file format. Please upload JSON files.')
        #Read file
        followers_read = await followers_file.read()
        following_read = await following_file.read()
        #upload file
        followers_data = json.loads(followers_read)
        following_data = json.loads(following_read)
        #list comprehension for getting the specific values of the file provided by instagram
        valores_followers = [inner_item['value'] for item in followers_data for inner_item in item.get("string_list_data", [])]
        valores_following = [inner_item['value'] for item in following_data['relationships_following'] for inner_item in item.get("string_list_data", [])]
        #to dataframe 
        df_followers = pd.DataFrame(valores_followers, columns=['username'])
        df_following = pd.DataFrame(valores_following, columns=['username'])
        #merge to only leave the following that also dont follow me, and mark them to identify them easily
        result1 = pd.merge(df_following, df_followers, on='username', how='left', indicator=True)
        result1['_merge'] = result1['_merge'].map({'left_only':'unfollow', 'both':'keep'})
        #global df_result
        df_result = result1[result1['_merge'] == 'unfollow']
        df_result.drop(columns='_merge', inplace=True)
        #df_result1 = df_result.to_json()
        return df_result
        
        # with open('file.json', 'w') as f:
        #     f.write(df_result1)

        # return JSONResponse(content=jsonable_encoder(df_result1))
    
    except Exception as e:
        # Handle exceptions
        return JSONResponse(content={'error': str(e)}, status_code=400)
    
# @read_file.get("/get")
# async def get_file():
#     r = open('file.json', 'r')
#     return r.read()
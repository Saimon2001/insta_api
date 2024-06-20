#start to a great api jajaj
#to activate swagget is url/docs

from fastapi import FastAPI, UploadFile, File, HTTPException
#handle request from cross aplications other than the own of the api(react would do it)
from fastapi.middleware.cors import CORSMiddleware

from routers.r_file import read_file

app = FastAPI()
app.title = "🌌🧑🏻‍🚀 Insta followers: see who is not following you back🌎"


origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)
#get data
app.include_router(read_file)




#auth to get everythigng expect result, keep looking for any security issue?

#convert data

#retrun result to user
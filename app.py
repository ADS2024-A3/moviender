import streamlit as st
import os
import numpy as np
import pandas as pd
from spotlight.datasets.movielens import get_movielens_dataset

st.set_page_config(page_title="MovieEnder", layout='wide')

# Backend

# Important to have the Streamlit API key in the environment variable
# api_key = os.getenv("apikey")

dataset = get_movielens_dataset(variant='100K')
df = pd.DataFrame({
    'user_id': dataset.user_ids,
    'item_id': dataset.item_ids,
    'rating': dataset.ratings,
    'timestamp': dataset.timestamps
})

# Frontend

st.header(":blue[MovieEnder]", divider="rainbow")

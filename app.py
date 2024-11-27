import streamlit as st
import numpy as np
import pandas as pd
import requests
import pickle

st.set_page_config(page_title="MovieEnder", layout='wide')

# Load data
api_key = "d311b783288dbb8816391c7df8072be8"

with open("movies.pkl", "rb") as f:
    movies_dict = pickle.load(f)
movies = pd.DataFrame(movies_dict).drop_duplicates()

with open("movie_ratings.pkl", "rb") as f:
    vote_info = pickle.load(f)
vote = pd.DataFrame(vote_info)

with open('movie_to_movie_sparse.pkl', 'rb') as f:
    csr_data = pickle.load(f)

with open("5nn_model.pkl", "rb") as f:
    model = pickle.load(f)

def fetch_poster(movie_id):
    url = f'https://api.themoviedb.org/3/movie/{movie_id}?api_key={api_key}'
    response = requests.get(url)
    data = response.json()
    return f"https://image.tmdb.org/t/p/w500/{data['poster_path']}"

def recommend(movie_name):
    n_recommendations = 5
    idx = movies[movies['title'] == movie_name].index[0]
    distances, indices = model.kneighbors(csr_data[idx], n_neighbors=n_recommendations + 1)
    recommended_indices = indices.squeeze()[1:]
    
    recommended_movies = movies.iloc[recommended_indices]
    movie_ids = recommended_movies['movie_id'].values
    posters = [fetch_poster(mid) for mid in movie_ids]
    
    return recommended_movies['title'].values, posters, movie_ids

# Frontend
st.header("MovieEnder", divider="rainbow")
st.write("""
    <p>This movie recommendation engine recommends movies that are the most similar to your selection.</p>
    """, unsafe_allow_html=True)
st.caption('It uses content-based filtering to recommend movies to users based on their preferences. The system uses the MovieLens dataset to train the model and make predictions as well as TMDB API. The system is built using the Streamlit library for the front-end and back-end.')

with st.expander("Select a Movie", expanded=True):
    selected_movie_name = st.selectbox("", movies["title"].values[:-3])
    if st.button("Submit for Recommendations"):
        st.text("Here are top 5 recommendations for you based on your movie selection:")
        names, posters, movie_ids = recommend(selected_movie_name)
        cols = st.columns(5)
        for i, col in enumerate(cols):
            with col:
                st.write(f'<b style="color:blue">{names[i]}</b>', unsafe_allow_html=True)
                st.image(posters[i])
                vote_avg = vote[vote["id"] == movie_ids[i]].vote_average.values[0]
                vote_count = vote[vote["id"] == movie_ids[i]].vote_count.values[0]
                st.write(f'<b style="color:green">Rating</b>: {vote_avg}', unsafe_allow_html=True)
                st.write(f'<b style="color:green">Rating count</b>: {vote_count}', unsafe_allow_html=True)

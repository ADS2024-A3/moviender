import pandas as pd
import numpy as np
from flask_cors import CORS, cross_origin
from flask import Flask, request, jsonify
from sklearn.preprocessing import normalize
from sklearn.neighbors import NearestNeighbors
from pickle import load as pickle_load
from json import load as json_load

with open('data/movies.json', 'r') as f:
    movies_dict = json_load(f)

with open('data/genres.json', 'r') as f:
    genres_list = json_load(f)

with open('data/user_movie_matrix.pkl', 'rb') as f:
    user_movie_matrix = pickle_load(f)


def build_model():
    user_movie_matrix_normalized = normalize(user_movie_matrix, axis=1)

    knn_model = NearestNeighbors(metric='cosine', algorithm='brute')
    knn_model.fit(user_movie_matrix_normalized)

    return knn_model


model = build_model()


def Recommend(new_user_ratings):
    new_user_vector = np.zeros(user_movie_matrix.shape[1])
    for movie_id, rating in new_user_ratings.items():
        movie_id = int(movie_id)
        if movie_id in user_movie_matrix.columns:
            new_user_vector[user_movie_matrix.columns.get_loc(
                movie_id)] = rating

    new_user_vector_normalized = normalize([new_user_vector], axis=1)

    distances, indices = model.kneighbors(
        new_user_vector_normalized, n_neighbors=10)

    closest_users_ids = user_movie_matrix.index[indices[0]]

    top_rated_movies = (
        user_movie_matrix.loc[closest_users_ids]
        .apply(lambda x: x[x > 0].mean(), axis=0)
        .sort_values(ascending=False)
    )

    top_rated_movies_with_individuals = user_movie_matrix.loc[
        closest_users_ids].T.loc[top_rated_movies.index]
    top_rated_movies_with_individuals["Mean Rating"] = top_rated_movies

    recommended_movies = []
    i = 0
    already_seen_movies = []
    while len(recommended_movies) < 10 and i < len(top_rated_movies):
        movie_id = top_rated_movies.index[i]
        if movie_id not in new_user_ratings:
            recommended_movies.append(movie_id)
        else:
            already_seen_movies.append(movie_id)
        i += 1

    updated_recommendations = top_rated_movies_with_individuals.loc[recommended_movies]

    recommendations = pd.DataFrame({
        updated_recommendations.index.name: updated_recommendations.index,
        "rating": updated_recommendations['Mean Rating']
    }).to_dict("records")

    print("Recommended Movies: ", updated_recommendations)

    return recommendations


app = Flask(__name__)
CORS(app)


@app.route('/api/movies', methods=['GET'])
@cross_origin()
def movies():
    # returns all the movies in the dataset
    return jsonify(movies_dict)


@app.route('/api/genres', methods=['GET'])
@cross_origin()
def genres():
    # returns all the genres in the dataset
    return jsonify(genres_list)


@app.route('/api/recommendations', methods=['POST'])
@cross_origin()
def recommendations():
    # returns recommended movies based on user input
    new_user_ratings = request.json
    print(new_user_ratings)
    recommendations = Recommend(new_user_ratings)
    return jsonify(recommendations)


if __name__ == '__main__':
    app.run(debug=True, port=5000)

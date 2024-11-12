# MovieEnder

A movie recommendation system that uses collaborative filtering to recommend movies to users based on their preferences. The system uses the MovieLens dataset to train the model and make predictions. The system is built using Python and the Streamlit library for the front-end and back-end.

## Project Structure

The project is structured as follows:

- `app.py`: The main file that contains the code for the Streamlit application
- `movielens-analysis.ipynb`: A Jupyter notebook that contains the code for data analysis and model building

## Dataset

The dataset used for this project is the MovieLens dataset. The dataset contains 100,000 ratings and 3,600 tag applications applied to 9,000 movies by 600 users. The dataset can be found [here](https://grouplens.org/datasets/movielens/100k/).

## Features

- User can input their preferences for movies
- The system will recommend movies based on the user's preferences
- The system will display the top 10 recommended movies

## Installation

Use the package manager [pip](https://pip.pypa.io/en/stable/) to install the required packages.

```bash
pip install -r requirements.txt
```

## Usage

To run the application, use the following command:

```bash
streamlit run app.py
```

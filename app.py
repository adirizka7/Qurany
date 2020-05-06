from flask import Flask, render_template, request

import os
import yaml

app = Flask(__name__)

SURAHS_FOLDER = 'static/Surahs'
SURAHS_MAPPING = 'util/surahs.yaml'

def setup_static():
    surahs_file = open(SURAHS_MAPPING)
    surahs = yaml.safe_load(surahs_file)
    surahs = [surah for surah in surahs['surah_name']]
    return surahs

surahs = setup_static()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_surah', methods=['POST'])
def generate_surah():
    selected_surah = request.form.get('selected_surah')

    # to get surah's id from '1. Al-Fatihah' format
    selected_surah = selected_surah.split('. ')

    if len(selected_surah) != 2:
        raise ValueError(f"Surah's id is not valid, got {selected_surah}")

    selected_surah = int(selected_surah[0])
    surah_path = os.path.join(SURAHS_FOLDER, f'{selected_surah:03d}.mp3')

    print(surah_path)
    return render_template('index.html', surah_path=surah_path)

@app.context_processor
def context_processor():
    return dict(
        surahs=surahs
    )

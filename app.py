from flask import Flask, render_template, request

import os
import yaml

app = Flask(__name__)

_surahs_folder = 'static/Surahs'
_surahs_mapping = 'util/surahs.yaml'

def setup_static(): 
    surahs_file = open(_surahs_mapping)
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
    selected_surah = selected_surah.split('. ')

    if len(selected_surah) != 2:
        raise ValueError(f"Surah's name is not valid, got {selected_surah}")

    selected_surah = int(selected_surah[0])

    surah_path = os.path.join(_surahs_folder, f'{selected_surah:03d}.mp3')

    print(surah_path)
    return render_template('index.html', surah_path=surah_path)

@app.context_processor
def context_processor():
    return dict(surahs=surahs)

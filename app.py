from flask import Flask, render_template, request
from .util.surah import Surah, surah_mapping

app = Flask(__name__)

@app.route('/')
def index():
    surahs = [x for x in surah_mapping.keys()]
    return render_template('index.html', surahs=surahs)

@app.route('/generate_surah', methods=['POST'])
def generate_surah():
    selected_surah = request.form.get('selected_surah')
    start = int(request.form.get('start_ayah'))
    end = int(request.form.get('end_ayah'))
    surah = Surah(selected_surah)

    return render_template('index.html', surah_path=surah.slice(start, end))

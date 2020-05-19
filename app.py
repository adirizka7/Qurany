from flask import Flask, render_template, request
from util.context import context
from config import cfg

import os
import yaml
import logging

app = Flask(__name__)
logging.basicConfig(
    format='%(asctime)s %(levelname)-8s [%(filename)s:%(lineno)d] %(message)s',
    datefmt='%Y-%m-%d:%H:%M:%S',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

@app.route('/')
def index():
    return render_template('index.html')


@app.route('/generate_surah', methods=['POST'])
def generate_surah():
    selected_surah = request.form.get('selected_surah')
    selected_qari = request.form.get('selected_qari')

    # to get surah's id from '1. Al-Fatihah' format
    selected_surah = selected_surah.split('. ')

    if len(selected_surah) != 2:
        raise ValueError(f"Surah's id is not valid, got {selected_surah}")

    # choose the surahs index
    selected_surah = int(selected_surah[0])

    surah_path = os.path.join(
        cfg['directory']['surahs_folder'],
        selected_qari,
        f'{selected_surah:03d}.mp3'
    )

    logger.info(surah_path)
    return render_template('index.html', surah_path=surah_path)


@app.context_processor
def context_processor():
    return context

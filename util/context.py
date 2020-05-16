from config import cfg

import yaml
import os


def generate_surahs():
    surahs_file = open(cfg['directory']['surahs_mapping'])
    surahs_yaml = yaml.safe_load(surahs_file)
    surahs = [surah for surah in surahs_yaml['surah_name']]
    return surahs

def generate_qari():
    qari_name = os.listdir(cfg['directory']['surahs_folder'])
    qari_name.remove('README.md')
    return qari_name


context = {
    'surahs': generate_surahs(),
    'Qari': generate_qari()
}

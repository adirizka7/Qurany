from config import cfg

import yaml


def generate_surahs():
    surahs_file = open(cfg['directory']['surahs_mapping'])
    surahs_yaml = yaml.safe_load(surahs_file)
    surahs = [surah for surah in surahs_yaml['surah_name']]
    return surahs


context = {
    'surahs': generate_surahs()
}

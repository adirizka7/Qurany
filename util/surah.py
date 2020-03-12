from pydub import AudioSegment
from .mapping import surah_mapping

import os


class Surah:
    def __init__(self, name):
        self.name = name
        self.path = f'static/Surahs/{surah_mapping[self.name]["number"]}.mp3'
        self.child_dir = f'static/Surahs/{surah_mapping[self.name]["number"]}/'

        if not os.path.exists(self.child_dir):
            os.mkdir(self.child_dir)

    def slice(self, start, end):
        """
        start = int, start of ayah (verse)
        end = int, end of ayah (verse)
        Eg.
        surah.slice(5, 10)
        """
        # Get from mapping and convert from sec to milisec
        self.__start = surah_mapping[self.name]['ayah'][start]*1000
        self.__end = surah_mapping[self.name]['ayah'][end]*1000

        surah = AudioSegment.from_file(self.path)
        sliced = surah[self.__start:self.__end]

        if os.path.exists(
            self.child_dir
            + f'{start}-{end}.mp3'
        ):
            return self.child_dir + f'{start}-{end}.mp3'

        sliced.export(self.child_dir + f'{start}-{end}.mp3', format="mp3")

        return self.child_dir + f'{start}-{end}.mp3'



# files_path = 'mp3/'
# file_name = 'Memories'
# 
# startMin = 0
# startSec = 20
# 
# endMin = 0
# endSec = 22
# 
# # Time to miliseconds
# startTime = startMin*60*1000+startSec*1000
# endTime = endMin*60*1000+endSec*1000
# 
# # Opening file and extracting segment
# song = AudioSegment.from_file( files_path+file_name )
# extract = song[startTime:endTime]
# 
# # Saving
# extract.export( file_name+'-extract.mp3', format="mp3")

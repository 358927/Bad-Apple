from os import listdir
from PIL import Image
from time import sleep
import asyncio

h = 6
w = 4

InputImage = Image.open("../Frames/0001.png")
width, height = InputImage.size
buffer = "\n"*(height//6+5)


Frames = []

async def eee(file,i):
    print(i)
    InputImage = Image.open("../Frames/"+file)
    width, height = InputImage.size
    # InputImage.show()
    
    
    # taking half of the width:
    string = ""
    for y in range(0,height,6):
        for x in range(0,width,4):
            R,G,B,A = InputImage.getpixel((x, y))
            sum12 = (R+G+B)/3
            if sum12 == 0:
                string += " "
            elif sum12 < 50:
                string += "-"
            elif sum12 < 100:
                string += "~"
            elif sum12 < 150:
                string += "="
            elif sum12 < 200:
                string += "@"
            else:
                string += "#"
        string += "\n"
    Frames.insert(i,string + file)


# filesss = listdir("..\\Frames")
filesss = listdir("..\\Frames")[:1000]
async def main():
    for i,file in enumerate(filesss):
        asyncio.create_task(eee(file,i))
        # print(i)

asyncio.run(main())
for Frame in Frames:
    # print(buffer)
    print(buffer+Frame)
    sleep(1/60)
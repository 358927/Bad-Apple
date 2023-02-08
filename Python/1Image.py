from os import listdir
from PIL import Image
from time import sleep
from threading import Thread

h = 6
w = 4

InputImage = Image.open("../Frames/0001.png")
width, height = InputImage.size
buffer = "\n"*(height//6+5)

Frames = [""]*10000
threads = []
print(len(Frames))

def RenderImage(path):
    # print(path)
    # path = "../Frames/0100.png"
    InputImage = Image.open(path)
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
    # print(string)
    return string + path

# print(" #\n##")

def eee(file,i):
    print(i)
    Frames[i] = RenderImage("../Frames/"+str(file))


# filesss = listdir("..\\Frames")
filesss = listdir("..\\Frames")[:1000]

for i,file in enumerate(filesss):
    # print(file)
    t = Thread(target=eee, args=(file,i))
    threads.append(t)

for t in threads:
    t.start()
print("e")

for t in threads:
    t.join()

for Frame in Frames:
    print(buffer)
    print(Frame)
    sleep(1/60)

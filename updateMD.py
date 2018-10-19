import os

def updatedMD(file, deslab):
	position = 0
	og_content = ''
	with open(file,'r+b') as outfile:
		for (index,line) in enumerate(outfile):
				if line == b'---\r\n' and index !=0:
					position = index
				if position != 0 and line != b'---\r\n':
					og_content += line.decode('utf-8')
					
	with open(file,'r+b') as samefile:
		for (index,line) in enumerate(samefile):
			if index == position - 1:
				nextLvl = (deslab + og_content).encode('utf-8')
				samefile.write(nextLvl)
				
				
# for file in os.listdir('./_posts'):
	# des = file[11: len(file)-3].replace('-',' ')
	# deslab = 'description: {0}\r\n---'.format(des)
	# name = './_posts/' + file
	# updatedMD(name, deslab)

for file in os.listdir('./_posts'):	
	position = 0
	name = './_posts/' + file
	with open(name,'r+b') as outfile:
			for (index,line) in enumerate(outfile):
					if line == b'---\r\n' and index !=0:
						position = index
	with open(name,'r+b') as outfile:
			for (index,line) in enumerate(outfile):
					if index == position:
						outfile.write(b'\r\n')
				
				
				
				
				